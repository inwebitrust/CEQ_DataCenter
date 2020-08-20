<template>
    <div class="timeseries_wrapper">
        <div class="wrapper_hasdata" :class="(!hasNoData) ? 'displayed' : ''" :id="'Wrapper_' + chartID">
            <div class="timeseries_tooltip" :class="(tooltipDisplayed) ? 'displayed':''" v-if="tooltipData.country !== ''">
                <div class="tooltip_country">{{DBCountriesObj[tooltipData.country].name}}</div>
                <div class="tooltip_value">
                    <span>| {{tooltipData.value}}</span>
                </div>
                <div class="tooltip_xcategory" v-if="seriesParams.dimension == 'Income Category' || seriesParams.dimension == 'Decile'">
                    ({{tooltipData.xCategory}})
                </div>
            </div>

            <div class="highcharts_container" :id="chartID"></div>

            <div class="timeseries_dlblock country_chartblock_dlblock">
                <div class="dlblock_title">Download</div>
                <button class="dlblock_bt" data-dltype="jpg" @click="exportTimeseries()">.pdf</button>
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
                    return 'Timeseries'
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
            xAxisParams: {
                type: Object,
                default: function () {
                    return {
                        displayLabels: true
                    }
                }
            },
            xAxisCategories: {
                type: Array,
                default: function () {
                    return []
                }
            },
            isCountryPage: {
                type: Array,
                default: function () {
                    return false
                }
            },
            yAxisParams: {
                type: Object,
                default: function () {
                    return {
                        min:0,
                        displayLabels: true,
                    }
                }
            },
            highlightedCountry: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            seriesParams: {
                type: Object,
                default: function () {
                    return {
                        lineWidth: 2,
                        dimension: "Country"
                    }
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
                tooltipDisplayed: false,
                tooltipData: {
                    country: '',
                    rank: '',
                    value: '',
                    dataMissing: '',
                    xCategory: ''
                },
                totalCountriesWithValues: 0,
                hasNoData: false,
                hoverSeriesColor: '#FF613C',
                seriesColor: '#67C2E0'
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
            this.renderTimeseries();
            if(this.isCountryPage){
                this.hoverSeriesColor = '#1B1B1B';
                this.seriesColor = '#FF613C';
            }
        },
        methods: {

            renderTimeseries: function () {
                var self = this

                console.log("renderTimeseries xAxisCategories", self.xAxisCategories);
                console.log("renderTimeseries timeseriesSeries", self.timeseriesSeries);

                if(self.timeseriesSeries[0] !== undefined && self.timeseriesSeries[0].data.length == 0) {
                    this.hasNoData = true;
                } else {
                    this.hasNoData = false;

                    this.timeseriesHigcharts = new Highcharts.chart({
                        chart: {
                            renderTo: self.chartID,
                            type: 'line',
                            spacing:[25,10,10,10],
                        },
                        title: { text: '', enabled: false},
                        subtitle: { text: '', enabled: false},
                        credits:{ enabled: false },
                        xAxis: {
                            labels:{
                                enabled:true
                            },
                            tickWidth:0,
                            gridLineWidth: 0,
                            lineWidth: 1,
                            lineColor: "#8F8989",
                            categories: self.xAxisCategories
                        },
                        yAxis: {
                            lineWidth: 0,
                            gridLineWidth: 1,
                            lineColor: "#8F8989",
                            title:{enabled: false}
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions:{
                            series:{
                                lineWidth: self.seriesParams.lineWidth,
                                connectNulls: true,
                                findNearestPointBy: 'xy',
                                stickyTracking: false,
                                marker:{
                                    enabled: false
                                },
                                point:{
                                    events:{
                                        mouseOut: function (evt) {
                                            var target = evt.target;
                                            self.tooltipDisplayed = false;
                                            self.triggerHighlightedCountryTooltip();
                                        }
                                    }
                                },
                                
                                events: {
                                    mouseOver: function(evt) {
                                        this.update({
                                            color: self.hoverSeriesColor
                                        });
                                    },
                                    mouseOut: function(evt) {
                                        if(self.highlightedCountry.code !== undefined && evt.target.name == self.highlightedCountry.code) {

                                        } else {
                                            this.update({
                                                color: self.seriesColor
                                            });
                                        }
                                    },
                                },
                                
                                states:{
                                    hover:{
                                        color: self.hoverSeriesColor
                                    }
                                }
                            }
                        },
                        tooltip: {
                            enabled: true,
                            formatter: function () {
                                console.log("ici", this);
                                self.tooltipData.country = this.series.name
                                self.tooltipData.value = this.y.toFixed(2);
                                self.tooltipData.xCategory = this.x;
                                self.tooltipDisplayed = true;
                            }
                        },
                        series: self.timeseriesSeries
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

            triggerHighlightedCountryTooltip: function () {
                var self = this;
                if(this.highlightedCountry.code !== undefined) {
                    this.tooltipDisplayed = true;
                    var selectedCountryObj = _.find(this.timeseriesSeries, function (o) {
                        return o.name == self.highlightedCountry.code
                    })
                    self.tooltipData.country = selectedCountryObj.name;
                    /*
                    self.tooltipData.xCategory = self.xAxisCategories[target.x];
                    self.tooltipData.value = selectedCountryObj.y;
                    */
                } else {
                    self.tooltipDisplayed = false;
                }
            },

            exportTimeseries: function () {
                UTILS.exportGTAB('Wrapper_' + this.chartID, this.exportParams);
                //UTILS.exportHighcharts(this.chartID, "l", this.exportParams);
            },

            exportXLS: function () {
                 var self = this;
                var tableArray = [["Country", "Dimension", "Value"]];

                _.each(this.timeseriesSeries, function (countryObj){
                    _.each(countryObj.data, function (dataValue, index){
                        var dimensionStr = self.xAxisCategories[index];

                        if(isNaN(dataValue)) dataValue = "No data";
                        tableArray.push([self.DBCountriesObj[countryObj.name].name, dimensionStr, dataValue]);
                    })
                    
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
                this.renderTimeseries();
            },
            xAxisCategories: function () {
                this.renderTimeseries();
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

    .timeseries_wrapper{
        position: relative;
        color: $colorBlack;
        padding-top: 20px;
        padding-bottom: 80px;

        .wrapper_hasdata{
            display: none;
            width: 100%;
            height: 100%;
            &.displayed{
                display: block;
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
            bottom: 40px;
        }

        .timeseries_tooltip{
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

        .timeseries_legend{
            color: $colorGrey;
            font-size: 12px;
            position: absolute;
            left: 4px;
            top: 30px;
        }

        .timeseries_countryfocus{
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
        }

        .timeseries_highlightsearchblock{
            position: absolute;
            left: 0px;
            bottom: 10px;
            .highlightsearchblock_title{
                color: $colorBlack;
                font-family: "dm_sansitalic";
                font-size: 12px;
            }
            .highlightsearchblock_input_wrapper{
                position: relative;
                width: 320px;
                height: 32px;
                margin-top: 2px;
                .highlightsearchblock_input{
                    width: 100%;
                    height: 32px;
                    border:1px solid $colorBlack;
                    border-radius: 2px;
                    font-size: 12px;
                    padding: 0 8px;
                    margin: 0;
                }
                .highlightsearchblock_input_icon{
                    position: absolute;
                    right: 5px;
                    top: 50%;
                    @include transform(translate(0,-50%));
                    background: url("/images/icons/icon-highlight.svg") no-repeat center center;
                    background-size: 100% 100%;
                    width: 32px;
                    height: 32px;
                }
            }
        }
    }

    .highcharts-axis-labels{
        position: relative;
        text{
            font-family: "dm_sansregular";
        }
    }
</style>
