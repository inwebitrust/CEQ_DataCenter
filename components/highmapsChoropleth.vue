<template>
    <div class="highmaps_areas" :data-mapcolor="mapColor">

        <div class="highmaps_container" :id="mapID" style="z-index:100;"></div>

        <div class="highmaps_legend">
            <div class="legend_zoomblock">
                <button class="zoomblock_bt" data-bt="raz" @click="zoomZeroMap()"></button>
                <button class="zoomblock_bt" data-bt="zoomout" @click="zoomOutMap()"></button>
                <button class="zoomblock_bt" data-bt="zoomin" @click="zoomInMap()"></button>
            </div>
            <div class="legend_block">
                <div class="legend_item" data-legend="available">Available</div>
                <div class="legend_item" data-legend="selected">Selected</div>
                <div class="legend_item" data-legend="nonavailable">Non-available</div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {_} from 'underscore'
    import * as UTILS from '~/commons/utils/index.js'

    export default {
        props: {
            mapID: {
                type: String,
                default: function () {
                    return 'MapContainer'
                }
            },
            geojsonID: {
                type: String,
                default: function () {
                    return ''
                }
            },
            mapSeries: {
                type: Array,
                default: function () {
                    return []
                }
            },
            hoveredArea: {
                type: String,
                default: function() {
                    return ''
                }
            },
            selectedAreas: {
                type: Array,
                default: function () {
                    return []
                }
            },
            mapColor: {
                type: String,
                default: function () {
                    return 'green'
                }
            }
        },
        data: function () {
            return {
                mapHighmaps: '',
                mapHighmapsBg: '',
                defaultColor: '#c7c4c4',
                mapZoom: 50,
                mapZoomFactor: 1,
                mapZoomDefault: true,
            }
        },
        mounted () {
            var self = this
            this.generateMap();
        },
        methods: {

            generateMap: function () {

                var self = this
                var nullColor = '#c7c4c4'
                if(this.mapColor == 'green') nullColor = '#a1d8d8'
                else if(this.mapColor == 'darkgrey') nullColor = '#8c8c8c'

                this.mapHighmaps = new Highcharts.mapChart({
                    chart: { 
                        renderTo: self.mapID,
                        spacing: [0, 0, 0, 0],
                        backgroundColor: 'transparent',
                        animation: false,
                        map: self.geojsonID,
                    },
                    mapNavigation: { enabled: true },
                    title: { text: '' },
                    legend: { enabled: false },
                    credits: {enabled: false},
                    plotOptions: {
                        map: {
                            allAreas: false,
                            joinBy: ['iso-a2', 'code'],
                            dataLabels: {
                                enabled: true,
                                color: '#FFFFFF',
                                style: {
                                    fontWeight: 'bold'
                                },
                            },
                            point:{
                                events:{
                                    click: function(e, d){
                                        var that = this;
                                        var findCountry = _.find(self.mapSeries[0].data, function (obj){
                                            return obj.code == that.code
                                        });
                                        if(findCountry.color != self.defaultColor) {
                                            self.$emit('toggleCountryFromMap', UTILS.countryISOMapping2To3[this.code])
                                        }
                                    }
                                }
                            }
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        borderColor: 'transparent',
                        padding: 0,
                        style: {
                            width: '200px'
                        },
                        formatter: function () { 
                            return this.key;
                        }
                    },
                    series: [{
                        name:"All Countries",
                        data: []
                    }]
                })
            },

            updateMapAreas: function () {
                var self = this;
                var mapSeriesCopy = JSON.parse(JSON.stringify(this.mapSeries))

                if(self.mapHighmaps.series == undefined) this.generateMap();

                _.each(mapSeriesCopy, function (seriesObj, index){
                    self.mapHighmaps.series[index].update(seriesObj)
                })

                this.mapHighmaps.mapZoom()
            },

            zoomInMap: function () {
                this.mapZoom += 10;
                this.mapZoomFactor = 0.75;
                this.mapZoomDefault = false;
            },

            zoomOutMap: function () {
                this.mapZoom -= 10;
                this.mapZoomFactor = 1.3333333;
                this.mapZoomDefault = false;
            },

            zoomZeroMap: function () {
                var self = this;
                this.mapZoom = 50;
                this.mapZoomFactor = 0;
                this.mapZoomDefault = true;
                setTimeout(function () {
                    self.mapHighmaps.mapZoom()
                }, 5)
            },
        },

        watch: {
            mapSeries: function(obj){
                this.updateMapAreas()
            },

            hoveredArea: function () {
                var allPaths = document.querySelectorAll('#'+this.mapID+' path')
                for (var i = 0; i < allPaths.length; i++) {
                    allPaths[i].setAttribute('data-hovered', 'false');
                }

                var geoIso2 = UTILS.countryISOMapping3To2[this.hoveredArea]
                if(geoIso2 !== undefined) {
                    var svgGeoPath = document.querySelector('#'+this.mapID+' path.highcharts-key-' + geoIso2.toLowerCase())
                    if(svgGeoPath !== null) svgGeoPath.setAttribute("data-hovered", "true")
                }
            },

            selectedAreas: function () {
                var self = this

                var allPaths = document.querySelectorAll('#'+this.mapID+' path')
                for (var i = 0; i < allPaths.length; i++) {
                    allPaths[i].setAttribute('data-selected', 'false');
                }

                _.each(this.selectedAreas, function(areaM49){
                    if(self.$store.DBGeographyObj[areaM49].iso !== undefined) {
                        var geoIso = self.$store.DBGeographyObj[areaM49].iso
                        var geoIso2 = UTILS.countryISOMapping3To2[geoIso]
                        if(geoIso2 !== undefined) {
                            var svgGeoPath = document.querySelector('#'+self.mapID+' path.highcharts-key-' + geoIso2.toLowerCase())
                            if(svgGeoPath !== null) svgGeoPath.setAttribute("data-selected", "true")
                        }
                    }
                })
            },

            mapZoom: function () {
                var self = this

                if(!this.mapZoomDefault) {
                    setTimeout(function () {
                        self.mapHighmaps.mapZoom(self.mapZoomFactor)
                    }, 5)
                }
            },

            mapZoomDefault: function () {
                var self = this
                console.log("update mapZoomDefault");
                if(this.mapZoomDefault) {
                    setTimeout(function () {
                        self.mapHighmaps.mapZoom()
                    }, 5)
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    .highmaps_areas{
        position: relative;
        width: 100%;
        height: 100%;
        .highmaps_container{
            position: absolute;
            left: 50%;
            @include transform(translate(-50%, 0));
            top: 0px;
            width: 100%;
            height: 100%;
            path{
                &[data-hovered="true"], &[data-selected="true"], &:hover{
                    fill:#1b1b1b !important;
                    stroke: #1b1b1b !important;
                }
            }
            .highcharts-map-navigation{
                display: none;
            }

            path[fill="#448094"]{
                cursor: pointer;
                stroke:#004146;
            }

            path[fill="#67C2E0"]{
                cursor: pointer;
                stroke:#448094;
            }

            path[fill="#c7c4c4"]{
                stroke:#8f8989;
            }

            path[fill="#3bbd89"]{
                cursor: pointer;
                stroke: #449473;
            }
        }

        &[data-mapcolor="grey"]{
            .highmaps_container{
                path{
                    &[data-hovered="true"], &[data-selected="true"], &:hover{
                        fill:$colorRed !important;
                    }
                }
            }
        }

        &[data-mapcolor="green"]{
            .legend_block{
                .legend_item{
                    color: $colorBlack;
                    &[data-legend="available"]{
                        &:before{
                            background: $colorGreen;
                        }
                    }
                    &[data-legend="selected"]{
                        display: none;
                    }
                    &[data-legend="nonavailable"]{
                        &:before{
                            background: #C7C4C4;
                        }
                    }
                }
            }
        }

        &[data-mapcolor="orange"]{
            .legend_block{
                .legend_item{
                    color: $colorBlack;
                    &[data-legend="available"]{
                        &:before{
                            background: $colorOrange;
                        }
                    }
                    &[data-legend="selected"]{
                        display: none;
                    }
                    &[data-legend="nonavailable"]{
                        &:before{
                            background: #C7C4C4;
                        }
                    }
                }
            }
        }
    }

    .highcharts-tooltip{
        text-align: center;
        width: 120px;
        .tooltip_content{
            text-align: center;
            .tooltip_year{
                font-size: 12px;
                color: #2F2F2F;
                font-family: "montserratitalic";
            }
            .tooltip_geo{
                font-size: 12px;
                color: #2F2F2F;
                font-family: "montserratbold";
            }
            .tooltip_value{
                font-size: 12px;
                font-family: "montserratbold";
            }
        }
    }

    .highmaps_legend{
        position: absolute;
        left: 40px;
        top: 98%;
        padding-top: 12px;
        border-top: 3px solid #fff;
        right: 40px;
        z-index: 100000;
        background: #F2F3F4;
        .legend_zoomblock{
            display: inline-block;
            vertical-align: top;
            height: 30px;
            position: relative;
            top: -4px;
            margin-right: 40px;
            .zoomblock_bt{
                display: inline-block;
                vertical-align: top;
                cursor: pointer;
                border: 0px;
                width: 24px;
                height: 24px;
                border-radius: 2px;
                outline: none;
                &[data-bt="raz"]{
                    background:url("/images/icons/icon-map_center.svg") no-repeat 0 0 #fff;
                    background-size: 100% 100%;
                    margin-right: 4px;
                }
                &[data-bt="zoomout"]{
                    background:url("/images/icons/icon-map_zoomout.svg") no-repeat 0 0 #fff;
                    background-size: 100% 100%;
                    margin-right: 1px;
                }
                &[data-bt="zoomin"]{
                    background:url("/images/icons/icon-map_zoomin.svg") no-repeat 0 0 #fff;
                    background-size: 100% 100%;
                }
                &:hover{
                    &[data-bt="raz"]{
                        background:url("/images/icons/icon-map_center-white.svg") no-repeat 0 0 $colorBlack;
                        background-size: 100% 100%;
                    }
                    &[data-bt="zoomout"]{
                        background:url("/images/icons/icon-map_zoomout-white.svg") no-repeat 0 0 $colorBlack;
                        background-size: 100% 100%;
                    }
                    &[data-bt="zoomin"]{
                        background:url("/images/icons/icon-map_zoomin-white.svg") no-repeat 0 0 $colorBlack;
                        background-size: 100% 100%;
                    }
                }
            }
        }
        .legend_block{
            display: inline-block;
            vertical-align: top;
            height: 30px;
            .legend_item{
                display: inline-block;
                vertical-align: top;
                font-family: "dm_sansitalic";
                font-size: 12px;
                margin: 0px 8px;
                padding-left: 16px;
                position: relative;
                &:before{
                    content: "";
                    position: absolute;
                    left: 0px;
                    top: 50%;
                    @include transform(translate(0,-50%));
                    width: 10px;
                    height: 10px;
                    border-radius: 12px;
                }

                &[data-legend="available"]{
                    &:before{
                        background: #448094;
                    }
                }
                &[data-legend="selected"]{
                    &:before{
                        background: #67C2E0;
                    }
                }
                &[data-legend="nonavailable"]{
                    &:before{
                        background: #C7C4C4;
                    }
                }
            }
        }
    }
</style>
