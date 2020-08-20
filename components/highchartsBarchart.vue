<template>
    <div class="barchart_wrapper">

        <div class="wrapper_hasdata" :class="(!hasNoData) ? 'displayed' : ''" :id="'Wrapper_' + chartID">
            <div class="barchart_tooltip" :class="(tooltipDisplayed) ? 'displayed':''" v-if="tooltipData.country !== ''" :data-missing="(tooltipData.dataMissing !== '') ? 'true': ''">
                <div class="tooltip_country">{{DBCountriesObj[tooltipData.country].name}}</div>
                <div class="tooltip_rank" v-if="barchartSeries[0] !== undefined && barchartSeries[0].data !== undefined && tooltipData.dataMissing == '' && !isCountryPage">
                    <span class="rank_str" v-if="[1,2,3,11,12,13,21,22,23,31,32,33].indexOf(tooltipData.rank) == -1">{{tooltipData.rank}}<sup>th</sup></span>
                    <span class="rank_str" v-if="[1,11,21,31].indexOf(tooltipData.rank) > -1">{{tooltipData.rank}}<sup>st</sup></span>
                    <span class="rank_str" v-if="[2,12,22,32].indexOf(tooltipData.rank) > -1">{{tooltipData.rank}}<sup>nd</sup></span>
                    <span class="rank_str" v-if="[3,13,23,33].indexOf(tooltipData.rank) > -1">{{tooltipData.rank}}<sup>rd</sup></span>
                    /{{totalCountriesWithValues}}
                </div>
                <div class="tooltip_xcategory" v-if="isCountryPage">
                    | {{tooltipData.xCategory}}
                </div>
                <div class="tooltip_value">
                    <div v-if="tooltipData.dataMissing == ''"><span class="isdesktop">|</span> {{tooltipData.value}}</div>
                    <div v-if="tooltipData.dataMissing != ''"><span class="isdesktop">|</span> {{tooltipData.dataMissing}}</div>
                </div>
            </div>

            <div class="highcharts_container" :id="chartID" ></div>

            <div class="barchart_dlblock country_chartblock_dlblock">
                <div class="dlblock_title">Download</div>
                <button class="dlblock_bt" data-dltype="jpg" @click="exportBarchart()">.pdf</button>
                <button class="dlblock_bt" data-dltype="xls" @click="exportXLS()">.xls</button>
            </div>
        </div>

        <div class="wrapper_hasnodata" :class="(hasNoData) ? 'displayed' : ''">
            <div class="hasnodata_label">No Data</div>
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
                    return 'Barchart'
                }
            },
            barchartSeries: {
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
            xAxisParams: {
                type: Object,
                default: function () {
                    return {
                        displayLabels: true
                    }
                }
            },
            yAxisParams: {
                type: Object,
                default: function () {
                    return {
                        min:0,
                        displayLabels: true
                    }
                }
            },
            highlightedCountry: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            isCountryPage: {
                type: Boolean,
                default: function () {
                    return false;
                }
            },
            selectedCountry: {
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
                barchartHigcharts: '',
                tooltipDisplayed: false,
                tooltipData: {
                    country: '',
                    rank: '',
                    value: '',
                    dataMissing: '',
                    xCategory: ''
                },
                totalCountriesWithValues: 0,
                maxValue: null,
                minValue: null,
                hasNoData: false
            }
        },
        computed: {
            ...mapState({
                DBCountries : state => state.database.DBCountries,
                DBCountriesObj: state => state.database.DBCountriesObj,
                DBIndicators : state => state.database.DBIndicators,
                DBIndicatorsObj: state => state.database.DBIndicatorsObj
            })
        },
        mounted () {
            var self = this;
            this.renderBarchart();
        },
        methods: {

            renderBarchart: function () {
                var self = this;

                var chartType = "column";

                var dataLabelsParams = {
                    rotation: -90,
                    align: "left"
                }

                if(document.querySelector("body").offsetWidth < 640 && !this.isCountryPage) {
                    chartType = "bar";
                    dataLabelsParams.rotation = 0;
                }

                if(this.barchartSeries[0] !== undefined) {
                    var countriesWithValues = _.filter(this.barchartSeries[0].data, function (o){
                        return o.dataMissing == '';
                    })
                    this.totalCountriesWithValues = countriesWithValues.length;

                    var hoverColor = "#FF613C";
                    if(this.isCountryPage) hoverColor = "#1B1B1B";
                    
                    var sortedMax = _.sortBy(self.barchartSeries[0].data, function (dataObj){
                        return -dataObj.y;
                    })

                    if(sortedMax.length > 0) this.maxValue = sortedMax[0].y;

                    var sortedMin = _.sortBy(self.barchartSeries[0].data, function (dataObj){
                        return dataObj.y;
                    })
                    if(sortedMin.length > 0) this.minValue = sortedMin[0].y;

                    if(this.maxValue <= 0 && this.minValue < 0) {
                        dataLabelsParams.align = "right";
                    }
                }

                var onlyNull = true;
                if(self.barchartSeries[0] !== undefined) {
                    _.each(self.barchartSeries[0].data, function (dataObj){
                        if(dataObj.y !== null) onlyNull = false;
                    })
                }

                if(onlyNull) {
                    this.hasNoData = true;
                } else {
                    this.hasNoData = false;
                    this.barchartHigcharts = new Highcharts.chart({
                        chart:{
                            type: chartType,
                            renderTo: self.chartID,
                            spacing:[30,10,30,10]
                        },
                        title: { text: '', enabled: false},
                        subtitle: { text: '', enabled: false},
                        credits:{ enabled: false },
                        xAxis: {
                            type: 'category',
                            tickWidth: 0,
                            gridLineWidth: 0,
                            lineColor: "#8F8989",
                            gridLineColor: "#8F8989",
                            labels: {
                                enabled: (self.xAxisParams.displayLabels) ? true : false, 
                                rotation: 0,
                                style: {
                                    fontSize: '11px',
                                    color: '#333',
                                    fontFamily: 'dm_sansregular'
                                },
                                overflow: 'allow',
                                reserveSpace: true,
                                useHTML: true,
                                formatter: function () {
                                    if(this.value == "Market income plus pensions") return "Market income<br />plus pensions";
                                    return this.value;
                                }
                            }
                        },
                        yAxis: {
                            min: self.yAxisParams.min,
                            title: { text: this.legend}

                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions:{
                            series:{
                                minPointLength: 3,
                                point:{
                                    events:{
                                        mouseOver: function (evt) {
                                            var target = evt.target;
                                            if(self.isCountryPage) {
                                                self.tooltipData.country = self.selectedCountry.code;
                                                self.tooltipData.xCategory = target.name;
                                                self.tooltipData.value = target.y.toFixed(2);
                                            } else {
                                                self.tooltipData.country = target.name;
                                                var totalNoValues = self.barchartSeries[0].data.length - self.totalCountriesWithValues;
                                                self.tooltipData.rank = self.totalCountriesWithValues - (target.x - totalNoValues);
                                                if(target.displayedValue != "") self.tooltipData.value = target.displayedValue;
                                                else self.tooltipData.value = target.y.toFixed(2);
                                                self.tooltipData.dataMissing = target.dataMissing;
                                                if(UTILS.missingDataObj[self.tooltipData.dataMissing] !== undefined) {
                                                    self.tooltipData.dataMissing = UTILS.missingDataObj[self.tooltipData.dataMissing];
                                                }
                                            }
                                            self.tooltipDisplayed = true;
                                        },
                                        mouseOut: function (evt) {
                                            self.tooltipDisplayed = false;
                                            if(!self.isCountryPage) {
                                                self.triggerHighlightedCountryTooltip();
                                            }
                                        }
                                    }
                                },
                                dataLabels: {
                                    enabled: true,
                                    rotation: dataLabelsParams.rotation,
                                    allowOverlap: true,
                                    crop: false,
                                    align: dataLabelsParams.align,
                                    useHTML: true,
                                    formatter: function (evt) {
                                        if(self.highlightedCountry.code !== undefined) {
                                            if(self.highlightedCountry.code == this.key) {
                                                //return "<span style='color:#FF613C'>NO DATA</span>";
                                            }
                                        }
                                        if(this.point.dataMissing !== undefined && this.point.dataMissing !== "") {
                                            return "<span style='color:#8F8989'>NO DATA</span>";
                                        }

                                        if(self.DBCountriesObj[this.key] !== undefined) {
                                            return "<span style='color:#8F8989' class='datalabel_yes'>"+self.DBCountriesObj[this.key].name+"</span>";
                                        } else {
                                            return "";
                                        }
                                        
                                    },
                                },
                                states:{
                                    hover:{
                                        color: hoverColor
                                    }
                                }
                            }
                        },

                        tooltip: {
                            enabled: false
                        },

                        series: self.barchartSeries
                    });

                    setTimeout(function (){
                        self.beautifyAxis();
                    }, 100)
                }
            },

            beautifyAxis: function () {
                // search for zero
                var foundZeroPosition = null;
                var textes = document.querySelectorAll(".highcharts-yaxis-labels text");
                textes.forEach(function (textElem, position){
                    if(textElem.innerHTML == "0"){
                        foundZeroPosition = position;
                    }
                })

                if(foundZeroPosition !== null && foundZeroPosition !== 0) {
                    var yAxisGridLines = document.querySelectorAll(".highcharts-yaxis-grid .highcharts-grid-line");
                    yAxisGridLines[foundZeroPosition].setAttribute("stroke-width", "1px");
                    yAxisGridLines[foundZeroPosition].setAttribute("stroke-dasharray", "0px");
                    yAxisGridLines[foundZeroPosition].setAttribute("stroke", "#8F8989");

                    var xAxisLine = document.querySelector(".highcharts-xaxis .highcharts-axis-line");
                    xAxisLine.setAttribute("stroke-width", "0px");
                }
            },

            updateBarchart: function () {
                var self = this
                if(this.barchartSeries.length > 0 && this.barchartHigcharts.series !== undefined && this.barchartHigcharts.series[0] !== undefined) {
                    //this.barchartHigcharts.series[0].update(self.barchartSeries[0]);
                }
            },

            triggerHighlightedCountryTooltip: function () {
                var self = this;

                if(this.highlightedCountry.code !== undefined) {
                    this.tooltipDisplayed = true;
                    var selectedCountryObj = _.find(this.barchartSeries[0].data, function (o) {
                        return o.name == self.highlightedCountry.code
                    })
                    self.tooltipData.country = selectedCountryObj.name;
                    var totalNoValues = self.barchartSeries[0].data.length - self.totalCountriesWithValues;
                    self.tooltipData.rank = self.totalCountriesWithValues - (selectedCountryObj.dataInc - totalNoValues);
                    self.tooltipData.value = selectedCountryObj.y;
                    self.tooltipData.dataMissing = selectedCountryObj.dataMissing;
                    if(UTILS.missingDataObj[self.tooltipData.dataMissing] !== undefined) {
                        self.tooltipData.dataMissing = UTILS.missingDataObj[self.tooltipData.dataMissing];
                    }
                } else {
                    self.tooltipDisplayed = false;
                }
            },

            exportBarchart: function () {
                UTILS.exportGTAB('Wrapper_' + this.chartID, this.exportParams);
                //UTILS.exportHighcharts('Wrapper_' + this.chartID, "l", this.exportParams);
            },

            exportXLS: function () {
                var tableArray = [["Indicator", "Value"]];

                _.each(this.barchartSeries[0].data, function (objData){
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
            barchartSeries: function () {
                if(this.barchartSeries[0] !== undefined) {
                    this.renderBarchart();
                } else {

                }
            },

            highlightedCountry: function () {
                this.triggerHighlightedCountryTooltip();
            }
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    .barchart_wrapper{
        width: 100%;
        height: 100%;
        position: relative;

        .wrapper_hasdata{
            display: none;
            width: 100%;
            height: 100%;
            &.displayed{
                display: block;
            }
        }

        .highcharts-text-outline{
            display: none;
        }

        .datalabel_yes{
            display: none;
        }

        .wrapper_hasdata[data-downloading="true"] {
            .datalabel_yes{
                display: block;
            }
            .barchart_dlblock{
                display: none;
            }
        }

        .wrapper_hasnodata{
            width: 100%;
            height: 100%;
            position: relative;
            display: none;
            &.displayed{
                display: block;
            }
            .hasnodata_label{
                position: absolute;
                left: 50%;
                top: 50%;
                @include transform(translate(-50%, -50%));
                font-size: 24px;
                text-transform: uppercase;
                font-family: "dm_sansbold";
                color: #8f8989;
            }
        }

        .country_chartblock_dlblock{
            position: absolute;
            right: 0px;
            bottom: -10px;
        }

        .barchart_tooltip{
            position: absolute;
            left: 0px;
            top: 0px;
            background: $colorOrange;
            font-family: "dm_sansbold";
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            border-radius: 20px;
            padding: 0 10px;
            z-index: 1000;
            display: none;
            &.displayed{
                display: block;
            }
            .tooltip_country, .tooltip_rank, .tooltip_value, .tooltip_xcategory{
                display: inline-block;
                vertical-align: top;
            }
            .tooltip_xcategory{
                margin-left: 4px;
            }
            .tooltip_rank{
                margin-left: 4px;
            }
            .tooltip_value{
                margin-left: 4px;
            }
        }

        .highcharts_container{
            width: 100%;
            height: 90%;
            position: relative;

            .highcharts-yaxis-grid{
                stroke-dasharray:3px;
            }
            .highcharts-series{
                .highcharts-point{
                    cursor: pointer;
                }
            }
            .highcharts-data-labels{
                .highcharts-data-label{
                    cursor: pointer;
                }
            }
        }
        .highcharts-label{
            text-align: center;
        }

        .smaller{
            font-size: 10px;
        }

    }

    .highcharts-axis-labels{
        position: relative;
        text{
            font-family: "dm_sansregular";
        }
    }

    .subblock_chartwrapper{
        .barchart_dlblock{
            bottom: -30px;
        }

        .barchart_wrapper .highcharts_container{
            height: 100%;
        }
    }
</style>
