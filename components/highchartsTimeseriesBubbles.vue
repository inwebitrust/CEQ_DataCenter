<template>
    <div class="timeseriesbubbles_wrapper" :id="'Wrapper_' + chartID">
        <div class="timeseriesbubbles_countryfocus" v-if="tooltipData.country !== '' && DBCountriesObj[tooltipData.country] !== undefined">
            <span class="countryfocus_name">{{ DBCountriesObj[tooltipData.country].name }}</span>
            <span class="countryfocus_ranking">
                <span class="rank_str" v-if="[1,2,3,11,12,13,21,22,23,31,32,33].indexOf(tooltipData.rank) == -1">{{tooltipData.rank}}<sup>th</sup></span>
                <span class="rank_str" v-if="[1,11,21,31].indexOf(tooltipData.rank) > -1">{{tooltipData.rank}}<sup>st</sup></span>
                <span class="rank_str" v-if="[2,12,22,32].indexOf(tooltipData.rank) > -1">{{tooltipData.rank}}<sup>nd</sup></span>
                <span class="rank_str" v-if="[3,13,23,33].indexOf(tooltipData.rank) > -1">{{tooltipData.rank}}<sup>rd</sup></span>
                <span class="rank_on">/{{totalCountriesWithValues}}</span>
            </span>
            <span class="countryfocus_value">| {{tooltipData.value}}</span>
        </div>

        <div class="timeseriesbubbles_legend">{{legend}}</div>
        <div class="highcharts_container" :id="chartID" ></div>

        <div class="timeseriesbubbles_dlblock country_chartblock_dlblock">
            <div class="dlblock_title">Download</div>
            <button class="dlblock_bt" data-dltype="jpg" @click="exportTimeseries()">.pdf</button>
            <button class="dlblock_bt" data-dltype="xls" @click="exportXLS()">.xls</button>
        </div>
    </div>
</template>

<script>
    import * as UTILS from '~/commons/utils/index.js'
    import { mapState, mapGetters, mapActions } from 'vuex'
    import axios from 'axios'
    import {_} from 'underscore'

    export default {
        props: {
            chartID: {
                type: String,
                default: function () {
                    return 'TimeseriesBubbles'
                }
            },
            timeseriesSeries: {
                type: Array,
                default: function () {
                    return []
                }
            },
            legend: {
                type: String,
                default: function () {
                    return ''
                }
            },
            selectboxLabel: {
                type: String,
                default: function () {
                    return ''
                }
            },
            indicatorsObj: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            highlightedCountry: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            highlightedCountrySecond: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            exportParams: {
                type: Object, 
                default: function () {
                    return {}
                }
            }
        },
        data: function () {
            return {
                timeseriesHigcharts: '',
                tooltipData:{
                    country: '',
                    rank: '',
                    value: ''
                },
                totalCountriesWithValues: 0
            }
        },
        computed: {
            ...mapState({
                DBCountries : state => state.database.DBCountries,
                DBCountriesObj: state => state.database.DBCountriesObj,
            })
        },
        mounted () {
            var self = this;
            this.renderTimeseries();

            this.tooltipData.country = this.highlightedCountry.code;
        },
        methods: {

            renderTimeseries: function () {
                var self = this

                var markerRadius = 6;
                var markerRadiusPlus = 3;
                if(document.querySelector("body").offsetWidth < 640) {
                    markerRadius = 3;
                    markerRadiusPlus = 1;
                }

                this.timeseriesHigcharts = new Highcharts.chart({
                    chart: {
                        renderTo: self.chartID,
                        type: 'line',
                        spacing: [30, 10, 10, 10]
                    },
                    title: { text: '', enabled: false},
                    subtitle: { text: '', enabled: false},
                    credits:{ enabled: false },
                    xAxis: {
                        labels:{enabled:false},
                        tickWidth:0,
                        gridLineWidth: 0,
                        lineWidth: 1,
                        lineColor: "#8F8989"
                    },
                    yAxis: {
                        min: 0,
                        title: { 
                            align:'high', offset:0, rotation:0, y:0, text: this.legend,
                            textAlign: 'left', enabled: false
                        },
                        lineWidth: 0,
                        gridLineWidth: 1,
                    },
                    legend: {
                        enabled: false
                    },
                    plotOptions:{
                        series:{
                            lineWidth:0,
                            dataLabels:{
                                enabled: true,
                                rotation: -90,
                                allowOverlap: true,
                                align: "left",
                                crop: false,
                                padding: 10,
                                useHTML: true,
                                x: 0,
                                y: -10,
                                formatter: function (evt) {
                                    if(self.DBCountriesObj[this.key] !== undefined) {
                                        return "<span style='color:#8F8989' class='datalabel_yes'>"+self.DBCountriesObj[this.key].name+"</span>";
                                    } else {
                                        return "";
                                    }
                                },
                            },
                            states:{
                                hover:{
                                    lineWidth: 0,
                                    lineWidthPlus: 0,
                                },
                            },
                            events: {
                                mouseOut: function (evt) {
                                    self.highlightCountry();
                                }
                            },
                            marker:{
                                radius: markerRadius,
                                enabled:true,
                                states: {
                                    hover: {
                                        fillColor: "#FF613C",
                                        radiusPlus: markerRadiusPlus,
                                        lineColor: "#333",
                                        lineWidth: 2
                                    }
                                }
                            },
                            point:{
                                events:{
                                    mouseOver: function (evt) {
                                        var target = evt.target;
                                        self.tooltipData.country = target.name
                                        self.tooltipData.rank = self.timeseriesSeries[0].data.length - target.x;
                                        self.tooltipData.value = target.y.toFixed(2);
                                    },
                                    mouseOut: function (evt) {
                                        /*
                                        console.log("mouseout", evt.target.name);
                                        if(evt.target.name !== self.highlightedCountry) {
                                            setTimeout(function (){
                                                self.highlightCountry();
                                            }, 10)
                                        }
                                        */
                                    }
                                }
                            }
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                    series: self.timeseriesSeries
                });

                self.highlightCountry();
            },

            highlightCountry: function () {
                var self = this;

                if(this.timeseriesHigcharts !== undefined && this.timeseriesHigcharts.series && this.timeseriesHigcharts.series[0] !== undefined && this.highlightedCountry.code !== undefined) {
                    var findIndexCountry = _.findIndex(this.timeseriesSeries[0].data, function (d){
                        return d.name == self.highlightedCountry.code;
                    })
                    if(findIndexCountry > -1) this.timeseriesHigcharts.series[0].points[findIndexCountry].onMouseOver();
                } else {
                    this.tooltipData.country = '';
                }

                if(this.timeseriesHigcharts !== undefined && this.timeseriesHigcharts.series && this.timeseriesHigcharts.series[0] !== undefined && this.highlightedCountrySecond.code !== undefined){
                    var findIndexCountry = _.findIndex(this.timeseriesSeries[0].data, function (d){
                        return d.name == self.highlightedCountrySecond.code;
                    })
                    var markers = document.querySelectorAll("#"+this.chartID+" .highcharts-markers path");
                    if(markers[findIndexCountry+1] !== undefined) markers[findIndexCountry+1].setAttribute("data-bordered", "true");
                }
            },

            exportTimeseries: function () {
                UTILS.exportGTAB('Wrapper_' + this.chartID, this.exportParams);
                //UTILS.exportHighcharts('Wrapper_' + this.chartID, "l", this.exportParams);
            },

            exportXLS: function () {
                var tableArray = [["Country", "Value"]];

                _.each(this.timeseriesSeries[0].data, function (objData){
                    tableArray.push([objData.name, objData.y]);
                })

                var csvTitle = this.exportParams.title;
                var arianLabel = this.exportParams.arianLabel;
                var subtitle = this.exportParams.arianLabel;

                tableArray.push(['','','','','']);
                tableArray.push(['','','','','']);
                tableArray.push([csvTitle, arianLabel, subtitle,'','']);
                tableArray.push(['CEQ Data Center','','','','']);

                generateXLS(tableArray);
            }

        },
        watch: {
            timeseriesSeries: function () {
                this.totalCountriesWithValues = this.timeseriesSeries[0].data.length;
                this.renderTimeseries();
            },

            highlightedCountry: function () {
                this.renderTimeseries();
            },

            highlightedCountrySecond: function () {
                this.renderTimeseries();
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    .timeseriesbubbles_wrapper{
        position: relative;
        color: $colorBlack;
        padding-top: 20px;
        padding-bottom: 80px;

        .datalabel_yes{
            display: none;
        }

        &[data-downloading="true"] {
            .datalabel_yes{
                display: block;
            }
            .timeseriesbubbles_dlblock{
                display: none;
            }
        }

        .highcharts_container{
            width: 100%;
            height: 280px;
            position: relative;

            .highcharts-yaxis-grid{
                stroke-dasharray:3px;
            }
        }
        .highcharts-label{
            text-align: center;
        }
        .smaller{
            font-size: 10px;
        }

        .timeseriesbubbles_legend{
            color: $colorGrey;
            font-size: 12px;
            position: absolute;
            left: 4px;
            top: 30px;
        }

        .timeseriesbubbles_dlblock{
            
        }

        .timeseriesbubbles_countryfocus{
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 1000;
            background: $colorOrange;
            color: $colorBlack;
            font-family: "dm_sansbold";
            font-size: 12px;
            height: 24px;
            padding: 0 10px;
            line-height: 24px;
            border-radius: 10px;
            .countryfocus_name, .countryfocus_ranking, .countryfocus_value{
                display: inline-block;
                vertical-align: top;
            }

            .countryfocus_ranking{
                margin-left: 4px;
                line-height: 24px;
                height: 100%;
            }

            .countryfocus_value{
                margin-left: 4px;
            }
        }

    }

    .highcharts-axis-labels{
        position: relative;
        text{
            font-family: "dm_sansregular";
        }
    }

    .highcharts-markers path{
        &[data-bordered="true"]{
            stroke-width:2px;
            stroke: #000;
        }
    }
</style>
