<template>
    <div class="country_chartblock" :data-block="chartblockID" :id="chartblockID">

        <div class="chartblock_title">
            {{chartblockTitle}}    
        </div>

        <ceqModal :type="'countriesSelector'" :data-displayed="(displayModalHighlight) ? 'displayed' : ''" @closeModal="displayModalHighlight = false" :mapID="chartblockID+'_map'"></ceqModal>

        <div class="chartblock_head">

            <div class="head_infotxt isdesktop" v-if="['giniredis', 'poverty', 'netpay'].indexOf(chartblockID) > -1">
                <span class="isdesktop">Scenario</span>
            </div>

            <div v-if="['giniredis', 'poverty', 'netpay'].indexOf(chartblockID) > -1" class="head_toggler toggler" :data-position="PDIPGTTogglerPosition">
                <div class="toggler_label" data-position="off" @click="PDIPGTTogglerPosition = 'off'">PDI</div>
                <div class="toggler_toggle" @click="(PDIPGTTogglerPosition == 'on') ? PDIPGTTogglerPosition = 'off' : PDIPGTTogglerPosition = 'on'">
                    <div class="toggle_chip"></div>
                </div>
                <div class="toggler_label" data-position="on" @click="PDIPGTTogglerPosition = 'on'">PGT</div>
            </div>

            <div v-if="['netpay'].indexOf(chartblockID) > -1" class="head_toggler toggler" :data-position="netpayTogglerPosition">
                <div class="toggler_label" data-position="off" @click="netpayTogglerPosition = 'off'">by decile</div>
                <div class="toggler_toggle" @click="(netpayTogglerPosition == 'on') ? netpayTogglerPosition = 'off' : netpayTogglerPosition = 'on'">
                    <div class="toggle_chip"></div>
                </div>
                <div class="toggler_label" data-position="on" @click="netpayTogglerPosition = 'on'">by income category</div>
            </div>

            <div v-if="['netpay'].indexOf(chartblockID) > -1 && netpayTogglerPosition == 'on'" class="head_toggler toggler" :data-position="PPPTogglerPosition">
                <div class="toggler_label" data-position="off" @click="PPPTogglerPosition = 'off'">2005</div>
                <div class="toggler_toggle" @click="(PPPTogglerPosition == 'on') ? PPPTogglerPosition = 'off' : PPPTogglerPosition = 'on'">
                    <div class="toggle_chip"></div>
                </div>
                <div class="toggler_label" data-position="on" @click="PPPTogglerPosition = 'on'">2011</div>
            </div>

            <div v-if="['poverty'].indexOf(chartblockID) > -1" class="head_infotxt isdesktop">
                <span class="isdesktop">Poverty line</span>
            </div>
            <v-select v-if="['poverty'].indexOf(chartblockID) > -1" class="selectbox_combobox selectbox_combobox_poverty" v-model="selectboxPovertylineValue" :return-object="true" :items="selectboxPovertylineItems" solo label="" :hide-details="true">
                <template slot="selection" scope="data">
                    <div class="item_wrapper">
                        <div class="item_text">{{data.item}}</div>
                    </div>
                </template>
                <template slot="item" slot-scope="data">
                    <div class="item_wrapper">
                        <div class="item_text">{{data.item}}</div>
                    </div>
                </template>
            </v-select>

            <div v-if="['giniredis', 'poverty'].indexOf(chartblockID) > -1" class="head_infotxt isdesktop">
                <span class="isdesktop">Indicators</span>
            </div>

            <v-select v-if="['giniredis', 'poverty'].indexOf(chartblockID) > -1" class="selectbox_combobox selectbox_combobox_indicator" v-model="selectboxIndicatorValue" :return-object="true" :items="selectboxIndicatorItems" solo label="" :hide-details="true">
                <template slot="selection" scope="data">
                    <div class="item_wrapper">
                        <div class="item_text">{{data.item}}</div>
                    </div>
                </template>
                <template slot="item" slot-scope="data">
                    <div class="item_wrapper">
                        <div class="item_text">{{data.item}}</div>
                    </div>
                </template>
            </v-select>
        </div>

        <div v-if="subBlocks.length > 0" v-for="(subBlockObj, indexIndicator) in subBlocks" class="chartblock_subblock" :data-subblock="subBlockObj.id" :data-display="subBlockObj.displayOptions" :id="subBlockObj.id">
            <div class="subblock_text" id="GiniText" style="color: #000;">
                <div class="subblock_title" v-if="subBlockObj.title !== undefined">{{subBlockObj.title}}</div>
                <div class="subblock_p">
                    {{subBlockObj.text}}
                </div>
            </div>
            <div class="subblock_chartwrapper">

                <highchartsBarchart v-if="subBlockObj.chartType == 'barchart'" :chartID="chartblockID + '_barchart'" :barchartSeries="barchartSeries" :legend="subBlockObj.chartLegend" :isCountryPage="true" :selectedCountry="selectedCountryObj" :exportParams="{title: subBlockObj.title + ' for ' + selectedCountryObj.name, subtitle: exportArianBarchartLabel}"></highchartsBarchart>

                <highchartsTimeseries v-if="subBlockObj.chartType == 'timeseries' && subBlockObj.id == 'net_benefits'" :chartID="subBlockObj.id + '_timeseries'" :timeseriesSeries="timeseriesSeries_1" :isCountryPage="true" :selectedCountry="selectedCountryObj" :exportParams="{title: subBlockObj.title + ' for ' + selectedCountryObj.name, subtitle: exportArianTimeseriesLabel}" :xAxisCategories="timeseriesCategories" :seriesParams="{dimension: 'Decile', lineWidth:1}"></highchartsTimeseries>

                <!--
                <highchartsTimeseries v-if="subBlockObj.chartType == 'timeseries' && subBlockObj.id == 'poorest_decile'" :chartID="subBlockObj.id + '_timeseries'" :timeseriesSeries="timeseriesSeries_2" :isCountryPage="true" :selectedCountry="selectedCountryObj" :exportParams="{title: subBlockObj.title + ' for ' + selectedCountryObj.name, subtitle: exportArianTimeseriesLabel}" :xAxisCategories="timeseriesCategories" :seriesParams="{dimension: 'Decile', lineWidth:1}"></highchartsTimeseries>
                -->

                <highchartsTimeseriesBubbles :chartID="chartblockID + '_timeseriesbubbles'" v-if="subBlockObj.chartType == 'timeseriesBubbles'" :timeseriesSeries="timeseriesBubblesSeries" :legend="subBlockObj.chartLegend" :indicatorsObj="subBlockObj.indicatorsIDS" :selectboxLabel="subBlockObj.selectboxLabel" :highlightedCountry="highlightedCountry" :highlightedCountrySecond="highlightedCountrySecond" :exportParams="{title: subBlockObj.title + ' for ' + selectedCountryObj.name, subtitle: exportArianTimeseriesBubblesLabel}"></highchartsTimeseriesBubbles>

                <div class="timeseriesbubbles_highlightsearchblock" v-if="subBlockObj.chartType == 'timeseriesBubbles'">
                    <div class="highlightsearchblock_title">Highlight another country</div>
                    <div class="highlightsearchblock_input_wrapper" :data-highlighting="(highlightedCountry.name !== undefined && highlightedCountry.code !== selectedCountryObj.code) ? 'true':'false'">
                        <a class="input_icon" v-if="(highlightedCountry.code == selectedCountryObj.code)"></a>
                        <a class="input_icon" v-if="(highlightedCountry.name != undefined && highlightedCountry.code !== selectedCountryObj.code)" @click="closeHighlight()"></a>
                        <button id="CountryHighlighterBt" @click="displayModalHighlight=true" :class="(highlightedCountry.name !== undefined && highlightedCountry.code !== selectedCountryObj.code) ? 'active': ''">
                            {{highlighterSelectionValue}}
                        </button>
                    </div>
                </div>

                <div v-if="subBlockObj.hasSelectbox" class="timeseriesbubbles_selectbox country_chartblock_selectbox">
                    <div class="selectbox_label">{{subBlockObj.selectboxLabel}}</div>
                    <v-select class="selectbox_combobox" v-model="selectbox1Value" :return-object="true" :items="selectbox1Items" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
                        <template slot="selection" scope="data">
                            <div class="item_wrapper">
                                <div class="item_text">{{data.item}}</div>
                            </div>
                        </template>
                        <template slot="item" slot-scope="data">
                            <div class="item_wrapper">
                                <div class="item_text">{{data.item}}</div>
                            </div>
                        </template>
                    </v-select>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import Vue from 'vue'
import * as UTILS from '~/commons/utils/index.js'
import {_} from 'underscore'
import highchartsBarchart from '~/components/highchartsBarchart.vue'
import highchartsTimeseriesBubbles from '~/components/highchartsTimeseriesBubbles.vue'
import highchartsTimeseries from '~/components/highchartsTimeseries.vue'
import ceqModal from '~/components/ceqModal'

import Vuetify from 'vuetify'
Vue.use(Vuetify)
import 'vuetify/dist/vuetify.min.css'

export default {
    components: {
        'highchartsBarchart': highchartsBarchart,
        'highchartsTimeseriesBubbles': highchartsTimeseriesBubbles,
        'highchartsTimeseries': highchartsTimeseries,
        'ceqModal': ceqModal
    },

    props: {
        chartblockID: {
            type: String,
            default: function () {
                return '';
            }
        },
        subBlocks: {
            type: Array,
            default: function () {
                return [];
            }
        },
        selectedCountryObj: {
            type: Object,
            default: function () {
                return {}
            }
        },
        chartblockTitle: {
            type: String,
            default: function () {
                return ''
            }
        }
    },
    data: function () {
        return {
            PDIPGTTogglerPosition: 'off',
            netpayTogglerPosition: 'off',
            PPPTogglerPosition: 'off',
            togglerValue: 'PDI',
            selectbox1Items: [],
            selectbox1Value: '',
            allIndicatorsIDS: [],
            allIndicatorsDatavalues: '',
            barchartSeries: [],
            timeseriesSeries_1: [],
            timeseriesSeries_2: [],
            timeseriesBubblesSeries: [],
            timeseriesCategories: [],
            defaultHighlightedCountry: {},
            highlightedCountry: {},
            highlightedCountrySecond: {},
            defaultHighlighterSelectionValue: 'e.g. France, Egypt, Canada…',
            highlighterSelectionValue: '',
            displayModalHighlight: false,

            selectboxPovertylineValue: '',
            selectboxPovertylineItems: [],
            selectboxIndicatorValue: '',
            selectboxIndicatorItems: [],

            exportArianBarchartLabel: '',
            exportArianTimeseriesBubblesLabel: '',
            exportArianTimeseriesLabel: ''
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
    mounted: function () {
        var self = this;

        this.defaultHighlightedCountry = this.selectedCountryObj;
        this.highlightedCountry = this.defaultHighlightedCountry;
        this.highlighterSelectionValue = this.defaultHighlighterSelectionValue;

        if(this.chartblockID == "giniredis") {
            this.selectboxIndicatorItems = ["Gini coefficient", "Theil index", "90-10 ratio", "Absolute Gini"];
            this.selectboxIndicatorValue = this.selectboxIndicatorItems[0];
            this.selectbox1Items = ["pensions and disposable income", "pensions and consumable income", "pensions and final income"];
            this.selectbox1Value = this.selectbox1Items[0];
        } else if(this.chartblockID == "poverty") {
            this.selectboxIndicatorItems = ["Poverty headcount ratio", "Poverty gap ratio", "Squared poverty gap ratio"];
            this.selectboxIndicatorValue = this.selectboxIndicatorItems[0];
            this.selectboxPovertylineItems = ["$1.25", "$2.50", "$4.00"];
            this.selectboxPovertylineValue = this.selectboxPovertylineItems[0];
            this.selectbox1Items = ["pensions and disposable income", "pensions and consumable income"];
            this.selectbox1Value = this.selectbox1Items[0];
        }

        this.getIndicatorsData();
    },
    methods: {
        getIndicatorsData: function () {
            var self = this;

            this.allIndicatorsIDS = [];
            _.each(this.subBlocks, function (blockObj){
                if(blockObj.indicatorsIDS !== undefined) {
                    if(blockObj.indicatorsSelectionType == "toggler") {
                        self.allIndicatorsIDS.push(_.map(blockObj.indicatorsIDS, function (indicatorsArray) {
                            return indicatorsArray;
                        }));
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_selectbox" || blockObj.indicatorsSelectionType == "toggler_and_indicator") {
                        _.each(blockObj.indicatorsIDS, function (selectbox1Obj){
                            self.allIndicatorsIDS.push(_.map(selectbox1Obj, function (indicatorsArray, paramID) {
                                if(paramID !== "id") return indicatorsArray;
                            }));
                        }) 
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_indicator_and_povertyline" || blockObj.indicatorsSelectionType == "toggler_and_indicator_and_selectbox" || blockObj.indicatorsSelectionType == "toggler_netpay") {
                        _.each(blockObj.indicatorsIDS, function (selectboxIndicatorObj){
                            _.each(selectboxIndicatorObj, function (facetteObj){
                                self.allIndicatorsIDS.push(_.map(facetteObj, function (indicatorsArray, paramID) {
                                    if(paramID !== "id") return indicatorsArray;
                                }));
                            })
                        }) 
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_indicator_and_povertyline_and_selectbox"){
                        _.each(blockObj.indicatorsIDS, function (selectboxIndicatorObj){
                            _.each(selectboxIndicatorObj, function (facetteObj){
                                 _.each(facetteObj, function (subfacetteObj){
                                    self.allIndicatorsIDS.push(_.map(subfacetteObj, function (indicatorsArray, paramID) {
                                        if(paramID !== "id") return indicatorsArray;
                                    }));
                                });
                            })
                        })                        
                    }
                }
            })
            
            this.allIndicatorsIDS = _.without(_.flatten(this.allIndicatorsIDS), undefined);

            if(this.allIndicatorsDatavalues === '') {
                this.$store.promiseIndicatorsDatavalues = UTILS.getAPIDatavalues(this.$store, this.allIndicatorsIDS)
                this.$store.promiseIndicatorsDatavalues.then( function(promiseCallback) {
                    self.allIndicatorsDatavalues = promiseCallback;

                    //callback call for income cat with netpay
                    if(self.chartblockID == "netpay") {
                        self.$store.promiseIndicatorsDatavaluesDecile = UTILS.getAPIDatavalues(self.$store, ["2.6.1.1.2", "2.6.1.3.2"], "Decile")
                        self.$store.promiseIndicatorsDatavaluesDecile.then( function (promiseCallback){
                            self.allIndicatorsDatavalues.push(promiseCallback);
                            self.allIndicatorsDatavalues = _.flatten(self.allIndicatorsDatavalues);
                            self.$store.promiseIndicatorsDatavaluesIncCat = UTILS.getAPIDatavalues(self.$store, ["2.6.2.1.2", "2.6.3.1.2", "2.6.2.3.2", "2.6.3.3.2"], "Income Category")
                            self.$store.promiseIndicatorsDatavaluesIncCat.then( function (promiseCallback){
                                self.allIndicatorsDatavalues.push(promiseCallback);
                                self.allIndicatorsDatavalues = _.flatten(self.allIndicatorsDatavalues);
                            })

                            self.processIndicatorsData();
                        })
                    } else {
                        self.processIndicatorsData();
                    }
                });
            } else {
                self.processIndicatorsData();
            }
        },

        processIndicatorsData: function (timeseriesOnly) {
            var self = this;

            if(this.chartblockID == 'giniredis') {
                this.exportArianBarchartLabel = this.togglerValue + " - " + this.selectboxIndicatorValue;
                this.exportArianTimeseriesBubblesLabel = this.togglerValue + " - " + this.selectboxIndicatorValue + " - " + this.selectbox1Value;
            } else if(this.chartblockID == 'poverty') {
                this.exportArianBarchartLabel = this.togglerValue + " - " + this.selectboxPovertylineValue + ' - ' + this.selectboxIndicatorValue;
                this.exportArianTimeseriesBubblesLabel = this.togglerValue + " - " + this.selectboxPovertylineValue + ' - ' + this.selectboxIndicatorValue + ' - ' + this.selectbox1Value;
            } else if(this.chartblockID == 'netpay') {
                this.exportArianTimeseriesLabel = this.togglerValue;
                this.exportArianTimeseriesBubblesLabel = this.togglerValue;
            }
            

            _.each(this.subBlocks, function (blockObj){

                if(blockObj.indicatorsIDS !== undefined) {

                    var indicatorsList = [];
                    if(blockObj.indicatorsSelectionType == "toggler") {
                        indicatorsList = blockObj.indicatorsIDS[self.togglerValue];
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_selectbox") {
                        if(blockObj.indicatorsIDS[self.selectbox1Value] !== undefined && blockObj.indicatorsIDS[self.selectbox1Value][self.togglerValue] !== undefined) {
                            indicatorsList = blockObj.indicatorsIDS[self.selectbox1Value][self.togglerValue];
                        }
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_indicator") {
                        if(blockObj.indicatorsIDS[self.selectboxIndicatorValue] !== undefined && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.togglerValue] !== undefined) {
                            indicatorsList = blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.togglerValue];
                        }
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_indicator_and_povertyline") {
                        if(blockObj.indicatorsIDS[self.selectboxIndicatorValue] !== undefined && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectboxPovertylineValue] && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectboxPovertylineValue][self.togglerValue] !== undefined) {
                            indicatorsList = blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectboxPovertylineValue][self.togglerValue];
                        }
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_indicator_and_selectbox") {
                        if(blockObj.indicatorsIDS[self.selectboxIndicatorValue] !== undefined && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectbox1Value] && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectbox1Value][self.togglerValue] !== undefined) {
                            indicatorsList = blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectbox1Value][self.togglerValue];
                        }
                    } else if(blockObj.indicatorsSelectionType == "toggler_and_indicator_and_povertyline_and_selectbox") {
                        if(blockObj.indicatorsIDS[self.selectboxIndicatorValue] !== undefined && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectboxPovertylineValue] && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectboxPovertylineValue][self.selectbox1Value] !== undefined && blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectboxPovertylineValue][self.selectbox1Value][self.togglerValue] !== undefined) {
                            indicatorsList = blockObj.indicatorsIDS[self.selectboxIndicatorValue][self.selectboxPovertylineValue][self.selectbox1Value][self.togglerValue];
                        }
                    } else if(blockObj.indicatorsSelectionType == "toggler_netpay") {
                        var netpayToggler = "decile";
                        if(self.netpayTogglerPosition == "on") netpayToggler = "inccat";

                        var pppToggler = "P05";
                        if(self.PPPTogglerPosition == "on") pppToggler = "P11";

                        indicatorsList = blockObj.indicatorsIDS[self.togglerValue][netpayToggler][pppToggler];
                    }

                    console.log("blockObj.chartType", blockObj.id, blockObj.chartType);
                    if(blockObj.chartType == "barchart") {
                        if(timeseriesOnly == undefined || timeseriesOnly == false) self.computeBarchartSeries(blockObj, indicatorsList);
                    } else if(blockObj.chartType == "timeseriesBubbles") {
                        self.computeTimeseriesBubblesSeries(blockObj, indicatorsList);
                    } else if(blockObj.chartType == "timeseries") {
                        self.computeTimeseriesSeries(blockObj, indicatorsList);
                    }
                }  
            });
        },

        computeBarchartSeries: function (blockObj, indicatorsList) {
            var self = this;

            if(indicatorsList.length > 0) {
                var countryValues = _.filter(self.allIndicatorsDatavalues, function (datavaluesRow){
                    return (_.indexOf(indicatorsList, datavaluesRow.indicator_id) > -1) && (self.selectedCountryObj.code == datavaluesRow.country_code);
                })

                this.barchartSeries = [
                    {
                        name: blockObj.title,
                        data:[]
                    }
                ]

                var dataYears = _.map(countryValues, function (cObj){
                    return parseInt(cObj.start_year, 10);
                })
                var sortedYears = _.sortBy(dataYears, function (y){
                    return -y;
                })
                var lastYear = String(sortedYears[0]);

                countryValues = _.filter(countryValues, function (cObj){
                    return cObj.start_year == lastYear;
                })

                _.each(countryValues, function (countryValueObj){
                    var indicatorName = "";
                    if(self.DBIndicatorsObj[countryValueObj.indicator_id] !== undefined) indicatorName = self.DBIndicatorsObj[countryValueObj.indicator_id].name

                    self.barchartSeries[0].data.push({
                        name: indicatorName,
                        y: parseFloat(countryValueObj.indicator_value) * 100,
                        color: "#FF613C"
                    })
                });

                this.barchartSeries = JSON.parse(JSON.stringify(this.barchartSeries));
            }
        },

        computeTimeseriesBubblesSeries: function (blockObj, indicatorsList) {
            var self = this;

            var countriesValues = _.filter(self.allIndicatorsDatavalues, function (datavaluesRow){
                return (_.indexOf(indicatorsList, datavaluesRow.indicator_id) > -1);
            })

            this.timeseriesBubblesSeries = [
                {
                    name: blockObj.title,
                    color: "#EB804B",
                    data:[]
                }
            ]

            var seriesData = [];
            _.each(countriesValues, function (countryValueObj){
                if(UTILS.missingDataObj[countryValueObj.indicator_value] === undefined) {
                    var pointColor = "#3BBD89";
                    //if(countryValueObj.country_code == self.selectedCountryObj.code) pointColor = "#FF613C";
                    seriesData.push({
                        name: countryValueObj.country_code,
                        y: parseFloat(countryValueObj.indicator_value) * 100,
                        color: pointColor
                    })
                }
            });

            var sortedSeriesData = _.sortBy(seriesData, function (o){
                return o.y;
            });
            this.timeseriesBubblesSeries[0].data = sortedSeriesData;
            this.timeseriesBubblesSeries = JSON.parse(JSON.stringify(this.timeseriesBubblesSeries));
        },

        computeTimeseriesSeries: function (blockObj, indicatorsList) {
            var self = this;

            console.log("computeTimeseriesSeries", blockObj, indicatorsList);
            console.log("allIndicatorsDatavalues", self.allIndicatorsDatavalues);

            var indicatorValues = _.filter(self.allIndicatorsDatavalues, function (datavaluesRow){
                return (_.indexOf(indicatorsList, datavaluesRow.indicator_id) > -1);
            })

            console.log("indicatorValues", indicatorValues);

            var countryValues = _.filter(indicatorValues, function (o){
                return o.country_code == self.selectedCountryObj.code;
            })

            var lastYearRow = _.max(countryValues, function (o){ return o.start_year});
            console.log("lastYearRow", lastYearRow);
            var lastYear = lastYearRow.start_year;

            var lastCountryValuesObj = _.filter(countryValues, function (c){
                return c.start_year == lastYear;
            })

            var lastCountryValues = _.map(lastCountryValuesObj, function(l){
                return parseFloat(l.indicator_value);
            })

            console.log("lastCountryValues", lastCountryValues);

            var timeseriesInc = "2";
            if(blockObj.id == "net_benefits") timeseriesInc = "1";

            this["timeseriesSeries_"+timeseriesInc] = [
                {
                    name: self.selectedCountryObj.code,
                    color: "#EB804B",
                    data:[]
                }
            ]
            this["timeseriesSeries_"+timeseriesInc][0].data = lastCountryValues;
            this.timeseriesCategories = ["Decile 1", "Decile 2", "Decile 3", "Decile 4", "Decile 5", "Decile 6", "Decile 7", "Decile 8", "Decile 9", "Decile 10"];
            this["timeseriesSeries_"+timeseriesInc] = JSON.parse(JSON.stringify(this["timeseriesSeries_"+timeseriesInc]));
        },

        closeHighlight: function () {
            this.highlightedCountry = this.defaultHighlightedCountry;
            this.highlightedCountrySecond = {};
            this.highlighterSelectionValue = this.defaultHighlighterSelectionValue;
        }
    },

    watch:{
        PDIPGTTogglerPosition: function () {
            if(this.PDIPGTTogglerPosition == "on") this.togglerValue = "PGT";
            else this.togglerValue = "PDI"
            this.processIndicatorsData();
        },

        netpayTogglerPosition: function () {
            this.processIndicatorsData();
        },

        PPPTogglerPosition: function () {
            this.processIndicatorsData();
        },

        selectbox1Value: function () {
            this.processIndicatorsData(true);
        },

        selectboxIndicatorValue: function () {
            this.processIndicatorsData();
        },

        selectboxPovertylineValue: function () {
            this.processIndicatorsData();
        },

        highlightedCountry: function () {
            if(this.highlightedCountry.code !== undefined && this.highlightedCountry.code !== this.selectedCountryObj.code) {
                this.highlighterSelectionValue = this.highlightedCountry.name;
                this.highlightedCountrySecond = this.defaultHighlightedCountry;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/_variables.scss";
@import "~assets/scss/_browsers.scss";

.selectbox_combobox_poverty{
    width: 100px !important;
}

.selectbox_combobox_indicator{
    width: 180px !important;
}

.country_chartblock{
    padding: 60px 40px 20px;
    background:#fff;
    margin-top: 120px;
    border-radius: 20px;
    position: relative;
    .chartblock_title{
        color: #fff;
        font-family: "dm_sansregular";
        font-size: 32px;
        letter-spacing: 0.05em;
        margin-bottom: 34px;
        position: absolute;
        bottom: 100%;
        left: 0px;
    }
    .chartblock_head{
        background: $colorGreen;
        height: 40px;
        padding-left: 40px;
        padding-right: 20px;
        position: absolute;
        border-radius: 0 20px 20px 0;
        left: 0px;
        top: -20px;
        line-height: 40px;
        font-size: 12px;
        .head_txt{
            display: inline-block;
            vertical-align: top;
            line-height: 40px;
            margin-right: 20px;
        }
        .head_toggler{
            display: inline-block;
            vertical-align: top;
            margin-right: 20px;
            position: relative;
            top: -1px;
        }
        .head_infotxt{
            display: inline-block;
            vertical-align: top;
            line-height: 40px;
            padding-left: 20px;
            position: relative;
            text-transform: uppercase;
            margin-right: 20px;
            &:before{
                content: "";
                position: absolute;
                left: 0px;
                top: 50%;
                @include transform(translate(0,-50%));
                background:url("/images/icons/icon-tooltip-white.svg") no-repeat center center $colorBlack;
                width: 16px;
                height: 16px;
                border-radius: 32px;
                background-size: 32px 32px;
            }
        }
        .selectbox_combobox{
            width: 170px;
            display: inline-block;
            margin-right: 20px;
        }
    }

    .chartblock_subblock{
        color: $colorBlack;
        text-align: left;

        .subblock_text{
            display: inline-block;
            vertical-align: top;
            width: 100%;
            .subblock_title{
                font-family: "dm_sansbold";
                color: $colorBlack;
                font-size: 24px;
            }
            .subblock_p{
                font-size: 14px;
                line-height: 18px;
            }
        }

        .subblock_chartwrapper{
            display: inline-block;
            vertical-align: top;
            width: 100%;
            margin-top: 20px;
            position: relative;
            min-height: 200px;
            .timeseriesbubbles_highlightsearchblock{
                position: absolute;
                left: 0px;
                bottom: 10px;
                .highlightsearchblock_title{
                    color: $colorBlack;
                    font-family: "dm_sansitalic";
                    font-size: 12px;
                }
                .highlightsearchblock_input_wrapper{
                    .input_icon{
                        position: absolute;
                        left: 205px;
                        top: 32px;
                        cursor: pointer;
                        @include transform(translate(0,-50%));
                        background: url("/images/icons/icon-highlight.svg") no-repeat 0 0;
                        background-size: 100% 100%;
                        width: 32px;
                        height: 32px;
                    }
                    #CountryHighlighterBt{
                        width: 240px;
                        height: 32px;
                        border:1px solid $colorBlack;
                        border-radius: 2px;
                        background: #fff;
                        text-align: left;
                        padding: 0 10px;
                        font-size: 12px;
                        outline: none;
                        cursor: pointer;
                        font-family: "dm_sansregular";
                        color: #8F8989;
                        &.active{
                            background: $colorOrange;
                            color:$colorBlack;
                            font-family: "dm_sansbold";
                        }
                    }
                    &[data-highlighting="true"]{
                        .input_icon{
                            background: url("/images/icons/icon-close.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .timeseriesbubbles_selectbox{
                position: absolute;
                right: 0px;
                top: 0px;
            }
        }

        &[data-display="doublecols"]{
            .subblock_text{
                width: 320px;
            }
            .subblock_chartwrapper{
                width: 550px;
                height: 390px;
                margin-left: 10px;
                margin-top: 0px;
                position: relative;
                top: -30px;
            }
        }
    }
}

</style>
