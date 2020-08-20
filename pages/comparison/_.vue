<template>
    <div id="Comparison" class="page" data-page="comparison">

        <div id="ExportMask">
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        </div>

        <ceqModal :type="'countriesSelector'" :displayed="(displayModalHighlight) ? true : false" @closeModal="displayModalHighlight = false" :countriesSelectorDisplayedList="selectedCountries"></ceqModal>

        <ceqHeader :page="'comparison'"></ceqHeader>

        <div class="page page_comparison" :data-selector="(selectedIndicatorID == '') ? 'true' : 'false'" :data-nooptions="(selectedIndicatorInThemedObj !== '' && (selectedIndicatorInThemedObj.concepts.length == 0 && selectedIndicatorInThemedObj.povertyLines.length == 0 && selectedIndicatorInThemedObj.conversionYears.length == 0)) ? 'true' : 'false'">

            <div class="page_head" v-if="selectedIndicatorID != ''">
                <div class="head_wrapper">
                    <div class="head_indicatorcard">
                        <div class="indicatorcard_arian">
                            <span class="arian_item arian_theme">
                                {{selectedIndicatorObj.theme}}
                            </span>
                            <span class="arian_arrow" v-if="selectedIndicatorObj.category != ''"></span>
                            <span class="arian_item arian_category" v-if="selectedIndicatorObj.category != ''">
                                {{selectedIndicatorObj.category}}
                            </span>
                            <span class="arian_arrow" v-if="selectedIndicatorObj.subcategory_1 != ''"></span>
                            <span class="arian_item arian_subcategory1" v-if="selectedIndicatorObj.subcategory_1 != ''">
                                {{selectedIndicatorObj.subcategory_1}}
                            </span>
                            <span class="arian_arrow" v-if="selectedIndicatorObj.subcategory_2 != ''"></span>
                            <span class="arian_item arian_subcategory2" v-if="selectedIndicatorObj.subcategory_2 != ''">
                                {{selectedIndicatorObj.subcategory_2}}
                            </span>
                        </div>
                        <div class="indicatorcard_name">
                            {{selectedIndicatorObj.name}}
                        </div>
                        <div class="indicatorcard_params">
                            <div class="param_item" data-param="concept" v-if="selectedIndicatorObj.concept != ''">
                                <div class="item_label">Under {{selectedIndicatorObj.concept}} scenario</div>
                            </div>
                            <div class="param_item" data-param="decile" v-if="selectedIndicatorObj.dimension == 'Decile'">
                                <div class="item_label">Decile: {{selectedDecile}}</div>
                            </div>
                            <div class="param_item" data-param="inccat" v-if="selectedIndicatorObj.dimension == 'Income Category'">
                                <div class="item_label">Inc. cat: {{selectedInccat}}</div>
                            </div>
                            <div class="param_item" data-param="countries">
                                <div class="item_label" v-if="selectedCountries.length == DBCountries.length">All countries ({{selectedCountries.length}})</div>
                                <div class="item_label" v-if="selectedCountries.length != DBCountries.length">{{selectedCountries.length}} countries</div>
                            </div>
                        </div>
                    </div>
                    <nuxt-link to="/comparison/" id="ComparisonBackBt">Change selection</nuxt-link>
                </div>
            </div>

            <div class="page_wrapper">
                <div id="ComparisonSelectorWrapper" v-if="selectedIndicatorID == ''">
                    <div class="selector_head">
                        Choose an indicator and one or many countries…
                    </div>
                    <div class="selector_content">
                        <comparisonSelector></comparisonSelector>
                    </div>
                </div>

                <div id="ComparisonData" v-if="selectedIndicatorID != ''">
                    
                    <div class="page_chart" :data-chart="(selectedIndicatorObj.dimension == 'Country') || (selectedIndicatorObj.dimension == 'Decile' && selectedDecile != 'All Deciles') || (selectedIndicatorObj.dimension == 'Income Category' && selectedInccat != 'All Income categories') ? 'barchart' : 'timeseries'">
                        <highchartsBarchart v-if="(selectedIndicatorObj.dimension == 'Country') || (selectedIndicatorObj.dimension == 'Decile' && selectedDecile != 'All Deciles') || (selectedIndicatorObj.dimension == 'Income Category' && selectedInccat != 'All Income categories')" chartID="ComparisonBarchart" :barchartSeries="barchartSeries" :yAxisParams="{min:null}" :xAxisParams="{displayLabels:false}" :highlightedCountry="highlightedCountry" :exportParams="{'title':selectedIndicatorObj.name, 'subtitle':exportParamsString, 'arianLabel': exportArianString}"></highchartsBarchart>
                        <highchartsTimeseries v-if="(selectedIndicatorObj.dimension == 'Decile' && selectedDecile == 'All Deciles') || (selectedIndicatorObj.dimension == 'Income Category' && selectedInccat == 'All Income categories')" chartID="ComparisonTimeseries" :timeseriesSeries="timeseriesSeries" :yAxisParams="{min:null}" :xAxisParams="{displayLabels:false}" :xAxisCategories="xAxisCategories" :highlightedCountry="highlightedCountry" :seriesParams="{lineWidth: 1, dimension:selectedIndicatorObj.dimension}" :exportParams="{'title':selectedIndicatorObj.name, 'subtitle':exportParamsString, 'arianLabel': exportArianString}"></highchartsTimeseries>
                    </div>

                    <div class="page_highlighter">
                        <nuxt-link to="/comparison/" id="ComparisonBackBt" class="ismobile">Change selection</nuxt-link>
                        <div class="highlighter_label">Highlight a country</div>
                        <div class="highlighter_inputblock" :data-highlighting="(highlightedCountry.name !== undefined) ? 'true':'false'">
                            <a class="input_icon" v-if="(highlightedCountry.name == undefined)"></a>
                            <a class="input_icon" v-if="(highlightedCountry.name != undefined)" @click="closeHighlight()"></a>
                            <button id="CountryHighlighterBt" placeholder="e.g. France, USA, Egypt…" @click="displayModalHighlight=true" :class="(highlightedCountry.name !== undefined) ? 'active': ''">
                                {{highlighterSelectionValue}}
                            </button>
                        </div>
                    </div>

                    <div class="comparison_options" v-if="selectedIndicatorInThemedObj !== '' && (selectedIndicatorInThemedObj.concepts.length > 0 || selectedIndicatorInThemedObj.povertyLines.length > 0 || selectedIndicatorInThemedObj.conversionYears.length > 0)">
                        <div class="options_title">Indicator option</div>
                        <div class="options_params">
                            <div class="param_item" data-param="scenario" v-if="selectedIndicatorInThemedObj.concepts.length > 0" :data-nbscenarios="selectedIndicatorInThemedObj.concepts.length">
                                <div class="param_label">Scenario</div>
                                <div class="param_valuewrapper">
                                    <div class="toggler" :data-position="PDIPGTTogglerPosition">
                                        <div class="toggler_label" data-position="off" @click="PDIPGTTogglerPosition = 'off'">PDI</div>
                                        <div class="toggler_toggle" @click="(PDIPGTTogglerPosition == 'on') ? PDIPGTTogglerPosition = 'off' : PDIPGTTogglerPosition = 'on'">
                                            <div class="toggle_chip"></div>
                                        </div>
                                        <div class="toggler_label" data-position="on" @click="PDIPGTTogglerPosition = 'on'">PGT</div>
                                    </div>
                                </div>
                            </div>
                            <div class="param_item" data-param="povertyline" v-if="selectedIndicatorInThemedObj.povertyLines.length > 0">
                                <div class="param_label">Poverty line</div>
                                <div class="param_valuewrapper">
                                    <v-select class="selectbox_combobox" v-model="povertyLineValue" :return-object="true" :items="povertyLineItems" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
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
                            <div class="param_item" data-param="conversion" v-if="selectedIndicatorInThemedObj.conversionYears.length > 0">
                                <div class="param_label">Conversion Year</div>
                                <div class="param_valuewrapper">
                                    <v-select class="selectbox_combobox" v-model="conversionYearValue" :items="conversionYearItems" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
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
                            <div class="param_item" data-param="decile" v-if="selectedIndicatorInThemedObj.dimensions.indexOf('Decile') > -1 && (this.conversionYearValue == '' || this.conversionYearValue == 'None')">
                                <div class="param_label">Specify a decile</div>
                                <div class="param_valuewrapper">
                                    <v-select class="selectbox_combobox" v-model="selectedDecile" :return-object="true" :items="decileItems" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
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
                            <div class="param_item" data-param="inccat" v-if="selectedIndicatorInThemedObj.dimensions.indexOf('Income Category') > -1 && (this.conversionYearValue != '' && this.conversionYearValue != 'None')">
                                <div class="param_label">Specify an income category</div>
                                <div class="param_valuewrapper">
                                    <v-select class="selectbox_combobox" v-model="selectedInccat" :return-object="true" :items="inccatItems" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
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
                </div>

            </div>
        </div>

        <ceqFooter></ceqFooter>
    </div>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import * as UTILS from '~/commons/utils/index.js'
import {_} from 'underscore'

import ceqHeader from '~/components/ceqHeader.vue'
import ceqFooter from '~/components/ceqFooter.vue'
import ceqModal from '~/components/ceqModal'
import comparisonSelector from '~/components/comparisonSelector.vue'
import highchartsBarchart from '~/components/highchartsBarchart.vue'
import highchartsTimeseries from '~/components/highchartsTimeseries.vue'

var numberFormat = require('underscore.string/numberFormat')

export default {
    components: {
        'ceqHeader': ceqHeader,
        'ceqFooter': ceqFooter,
        'ceqModal': ceqModal,
        'comparisonSelector': comparisonSelector,
        'highchartsBarchart': highchartsBarchart,
        'highchartsTimeseries': highchartsTimeseries,
    },
    head () {
        return {
          title: 'CEQ Data Center - Country',
          meta: [
            { hid: 'description', name: 'description', content: 'Find and explore indicators on statistical capacity' },
            { hid: 'og:image', name: 'og:image', content: 'http://statisticalcapacitymonitor.org/images/share-img.png' }
          ]
        }
      },
    asyncData: async ({ app, params, payload }) => ({
        routeParams: params
    }),
    data: function () {
        return {
            routeParams: '',
            dataLoaded: false,
            selectedCountries: [],
            selectedIndicatorID: '',
            selectedIndicatorObj: {},
            selectedIndicatorDatavalues: '',
            selectedDecile: 'All Deciles',
            selectedInccat: 'Total',
            barchartSeries: [],
            timeseriesSeries: [],
            highlightedCountry: {},
            defaultHighlighterSelectionValue: 'e.g. France, Egypt, Canada…',
            highlighterSelectionValue: '',
            displayModalHighlight: false,
            xAxisCategories: [],
            themedIndicatorsObj: '',
            selectedIndicatorInThemedObj: '',
            PDIPGTTogglerPosition: 'off',
            povertyLineValue: '',
            povertyLineItems: [],
            conversionYearValue: '',
            conversionYearItems: [],
            decileItems: ['All Deciles', 'Total', 'Decile 1', 'Decile 2', 'Decile 3', 'Decile 4', 'Decile 5', 'Decile 6', 'Decile 7', 'Decile 8', 'Decile 9', 'Decile 10'],
            inccatItems: ['All Income categories', 'Total', 'inccat 1', 'inccat 2', 'inccat 3', 'inccat 4', 'inccat 5'],
            exportArianString: '',
            exportParamsString: ''
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
        var self = this

         document.querySelector("body").setAttribute("data-masked", "false");

         console.log("comparisonPageSelectedCountries", this.$store.comparisonPageSelectedCountries);

        this.highlighterSelectionValue = this.defaultHighlighterSelectionValue;
        this.selectedIndicatorID = this.routeParams.pathMatch.replace('/','');

        if(this.$store.comparisonPageSelectedDecile !== undefined) {
            this.selectedDecile = this.$store.comparisonPageSelectedDecile;
        }

        if(this.$store.comparisonPageSelectedInccat !== undefined) {
            this.selectedInccat = this.$store.comparisonPageSelectedInccat;
        }

        if(this.$store.comparisonPageSelectedCountries !== undefined) {
            this.selectedCountries = this.$store.comparisonPageSelectedCountries;
        }

        if(this.$store.highlightedCountry !== undefined) this.highlightedCountry = this.$store.highlightedCountry;
    },

    methods: {
        updatePage: function () {
            var self = this;

            if(this.selectedIndicatorID != ''){
                this.selectedIndicatorObj = this.DBIndicatorsObj[this.selectedIndicatorID];
                if(this.selectedCountries.length == 0) {
                    this.selectedCountries = this.DBCountries;
                }

                if(this.selectedIndicatorDatavalues === '') {
                    this.promiseIndicatorDatavalues = UTILS.getAPIDatavalues(this.$store, [this.selectedIndicatorID], this.selectedIndicatorObj.dimension)
                    this.promiseIndicatorDatavalues.then( function(promiseCallback) {
                        self.selectedIndicatorDatavalues = promiseCallback;
                        self.processIndicatorData();
                    });
                } else {
                    self.processIndicatorData();
                }
            }
        },

        processIndicatorData: function () {
            var self = this;

            if(this.selectedIndicatorObj.dimension == "Income Category") {
                var tmpInccatItems = _.uniq(_.map(this.selectedIndicatorDatavalues, function (datavalueObj){
                    return datavalueObj.income_category;
                }));
                var sortedTmpItems = _.sortBy(tmpInccatItems, function (itemLabel){
                    return UTILS.incomeCategoriesOrder[itemLabel];
                });

                var inccatItems = ['All Income categories'];
                console.log("sortedTmpItems", sortedTmpItems);
                inccatItems.push(sortedTmpItems);
                console.log("inccatItems", inccatItems);
                this.inccatItems = _.flatten(inccatItems);
            }

            this.themedIndicatorsObj = UTILS.computeIndicatorsObj(this.DBIndicators);

            if(this.selectedIndicatorObj.concept == "PGT") this.PDIPGTTogglerPosition = "on";
            else if(this.selectedIndicatorObj.concept == "PDI") this.PDIPGTTogglerPosition = "off";


            if(this.selectedIndicatorObj.category == "") {
                this.selectedIndicatorInThemedObj = this.themedIndicatorsObj[this.selectedIndicatorObj.theme].level1Items[this.selectedIndicatorObj.name];
            } else if(this.selectedIndicatorObj.subcategory_1 == "") {
                this.selectedIndicatorInThemedObj = this.themedIndicatorsObj[this.selectedIndicatorObj.theme].level1Items[this.selectedIndicatorObj.category].level2Items[this.selectedIndicatorObj.name];
            } else if(this.selectedIndicatorObj.subcategory_2 == "") {
                this.selectedIndicatorInThemedObj = this.themedIndicatorsObj[this.selectedIndicatorObj.theme].level1Items[this.selectedIndicatorObj.category].level2Items[this.selectedIndicatorObj.subcategory_1].level3Items[this.selectedIndicatorObj.name];
            } else {
                this.selectedIndicatorInThemedObj = this.themedIndicatorsObj[this.selectedIndicatorObj.theme].level1Items[this.selectedIndicatorObj.category].level2Items[this.selectedIndicatorObj.subcategory_1].level3Items[this.selectedIndicatorObj.subcategory_2].level4Items[this.selectedIndicatorObj.name];
            }

            console.log("inside this.selectedIndicatorObj", this.selectedIndicatorObj);
            console.log("inside this.selectedIndicatorInThemedObj", this.selectedIndicatorInThemedObj);

            this.conversionYearValue = this.selectedIndicatorObj.conversion_year;
            this.conversionYearItems = this.selectedIndicatorInThemedObj.conversionYears;

            this.povertyLineValue = this.selectedIndicatorObj.poverty_line;
            this.povertyLineItems = this.selectedIndicatorInThemedObj.povertyLines;

            if( (this.selectedIndicatorInThemedObj.dimensions.indexOf("Decile") > -1) && this.selectedIndicatorInThemedObj.dimensions.indexOf("Income Category") > -1) {
                this.conversionYearItems.push("None");

                if(this.conversionYearValue == "") this.conversionYearValue = "None";
            }

            var countriesCodes = _.map(this.selectedCountries, function (c){
                return c.code;
            })
            this.countriesDatavalues = _.groupBy(this.selectedIndicatorDatavalues, function (indicObj){
                if(countriesCodes.indexOf(indicObj.country_code) > -1) return indicObj.country_code;
            })

            delete this.countriesDatavalues[undefined];

            if(this.highlightedCountry.name !== undefined) {
                this.highlighterSelectionValue = this.highlightedCountry.name;
            }

            this.exportArianString = this.selectedIndicatorObj.theme;
            if(this.selectedIndicatorObj.category !== "") this.exportArianString += " - " + this.selectedIndicatorObj.category;
            if(this.selectedIndicatorObj.subcategory_1 !== "") this.exportArianString += " - " + this.selectedIndicatorObj.subcategory_1;
            if(this.selectedIndicatorObj.subcategory_2 !== "") this.exportArianString += " - " + this.selectedIndicatorObj.subcategory_2;

            this.exportParamsString = "";
            if(this.selectedIndicatorObj.concept != "") this.exportParamsString = "Under " + this.selectedIndicatorObj.concept + " scenario";
            
            if(this.selectedIndicatorObj.dimension == "Decile") {
                var prefix = "";
                if(this.exportParamsString !== "") prefix = " - ";
                this.exportParamsString += prefix + "Decile: " + this.selectedDecile;
            } else if(this.selectedIndicatorObj.dimension == "Income Category") {
                var prefix = "";
                if(this.exportParamsString !== "") prefix = " - ";
                this.exportParamsString += prefix + "Inc. cat: " + this.selectedDecile;
            }

            if(this.selectedCountries.length == this.DBCountries.length) {
                var prefix = "";
                if(this.exportParamsString !== "") prefix = " - ";
                this.exportParamsString += prefix + "All countries";
            } else {
                var prefix = "";
                if(this.exportParamsString !== "") prefix = " - ";
                this.exportParamsString += prefix + this.selectedCountries.length + " countries";
            }

            if(this.selectedIndicatorObj.dimension == "Country") {
                this.computeBarchartSeries();
            } else if(this.selectedIndicatorObj.dimension == "Decile") {
                if(this.selectedDecile != 'All Deciles') {
                    this.computeBarchartSeries()
                } else {
                    this.computeTimeseriesSeries();
                }
            } else if(this.selectedIndicatorObj.dimension == "Income Category") {
                if(this.selectedInccat != "All Income categories") {
                    this.computeBarchartSeries()
                } else {
                    this.computeTimeseriesSeries()
                }
            }

            console.log("selectedIndicatorInThemedObj", this.selectedIndicatorInThemedObj);
        },

        computeBarchartSeries: function () {
            var self = this;

            this.barchartSeries = [{
                name: this.selectedIndicatorObj.name,
                data: []
            }]

            var barchartCountriesValues = this.countriesDatavalues
            var seriesData = []

            console.log("this.selectedIndicatorObj", self.selectedIndicatorObj)
            console.log("barchartCountriesValues", barchartCountriesValues);
            _.each(barchartCountriesValues, function (cObj, countryCode){

                var objDatavalues = cObj;

                if(self.selectedIndicatorObj.dimension == "Decile") {
                    if(self.selectedDecile == "Total") {
                        var totalValueObj = _.filter(cObj, function (valueObj){
                            return valueObj.decile == "Total";
                        })
                        objDatavalues = totalValueObj;
                    }
                } else if(self.selectedIndicatorObj.dimension == "Income Category") {
                    objDatavalues = _.filter(cObj, function (valueObj) {
                        return valueObj.income_category == self.selectedInccat;
                    })
                }
                
                var sortedValuesByYear = _.sortBy(objDatavalues, function (yObj){
                    return - parseInt(yObj.start_year, 10);
                })
                var objDatavalue = sortedValuesByYear[0];
                
                var seriesColor = "#67C2E0";

                var indicatorValue = objDatavalue.indicator_value;
                var dataMissing = "";
                var displayedValue = "";
                if(indicatorValue.split("N/").length > 1){
                    dataMissing = indicatorValue;
                    indicatorValue = 0;
                    seriesColor = "#c7c4c4";
                } else if(self.selectedIndicatorObj.unit == "Income category"){
                    displayedValue = indicatorValue
                    if(indicatorValue == "y < 1.25")indicatorValue = 1;
                    else if(indicatorValue == "2.50 <= y < 4.00") indicatorValue = 3;
                    else if(indicatorValue == "4.00 <= y < 10.00") indicatorValue = 7;
                    else if(indicatorValue == "10.00 <= y < 50.00") indicatorValue = 25;
                    else if(indicatorValue == "1.25 <= y < 2.50") indicatorValue = 2;
                    else if(indicatorValue == "50.00 <= y") indicatorValue = 50;
                    else if(indicatorValue == "1.90 <= y < 3.20") indicatorValue = 2.5;
                    else if(indicatorValue == "3.20 <= y < 5.50") indicatorValue = 4;
                    else if(indicatorValue == "5.50 <= y < 10.00") indicatorValue = 8;
                    else if(indicatorValue == "y < 1.90") indicatorValue = 1;
                } else{
                    indicatorValue = parseFloat(indicatorValue)
                }

                if(self.highlightedCountry.code == countryCode) seriesColor = "#FF613C";

                seriesData.push({
                    name: countryCode,
                    y: indicatorValue,
                    color: seriesColor,
                    dataMissing: dataMissing,
                    displayedValue: displayedValue
                })
            })

            var noData = _.filter(seriesData, function (s){
                return s.dataMissing !== "";
            })

            var withData = _.filter(seriesData, function (s){
                return s.dataMissing == "";
            })

            var sortedWithData = _.sortBy(withData, function (sd){
                return sd.y;
            })


            var sortedData = _.flatten(_.union(noData, sortedWithData));
            sortedData = _.map(sortedData, function (sd, inc){
                sd.dataInc = inc;
                return sd;
            })
            self.barchartSeries[0].data = sortedData;
        },

        computeTimeseriesSeries: function () {
            var self = this;

            this.timeseriesSeries = []

            var timeseriesCountriesValues = this.countriesDatavalues;
            var seriesData = []

            _.each(timeseriesCountriesValues, function (cObj, countryCode) {

                var sortedValuesByYear = _.sortBy(cObj, function (yObj){
                    return - parseInt(yObj.start_year, 10);
                })
                var lastYear = sortedValuesByYear[0].start_year;

                var lastYearArray = _.filter(cObj, function (o) {
                    return o.start_year == lastYear;
                })

                
                var dimensionArray = [];

                if(self.selectedIndicatorObj.dimension == "Decile") {

                    var sortedValuesByDecile = [];
                    sortedValuesByDecile = _.sortBy(lastYearArray, function (o){
                        return parseInt(o.decile, 10);
                    })
                    sortedValuesByDecile = _.filter(sortedValuesByDecile, function (sd){
                        return sd.decile !== "Total";
                    })

                    self.xAxisCategories = ["Decile 1", "Decile 2", "Decile 3", "Decile 4", "Decile 5", "Decile 6", "Decile 7", "Decile 8", "Decile 9", "Decile 10"]
                    dimensionArray = _.map(sortedValuesByDecile, function (o){
                        return parseFloat(o.indicator_value);
                    })

                } else if(self.selectedIndicatorObj.dimension == "Income Category") {
                    var sortedValuesByDimension = [];
                    sortedValuesByDimension = _.sortBy(lastYearArray, function (o){
                        return parseInt(o.income_category, 10);
                    })
                    sortedValuesByDimension = _.filter(sortedValuesByDimension, function (sd){
                        return sd.income_category !== "Total";
                    })

                    var sortedByxAxisCategories = _.sortBy(sortedValuesByDimension, function (sd){
                        return UTILS.incomeCategoriesOrder[sd.income_category];
                    })
                    self.xAxisCategories = _.map(sortedByxAxisCategories, function (sbxc){
                        return sbxc.income_category;
                    })

                    dimensionArray = _.map(sortedValuesByDimension, function (o){
                        return parseFloat(o.indicator_value);
                    })
                }

                
                
                var seriesColor = "#67C2E0";
                var markerRadius = 0;
                if(self.highlightedCountry.code == countryCode){
                    seriesColor = "#FF613C";
                    markerRadius = 4;
                }

                seriesData.push({
                    name: countryCode,
                    data: dimensionArray,
                    color: seriesColor,
                    marker: {
                        radius: markerRadius,
                        symbol: "circle"
                    }
                })
            })


            self.timeseriesSeries = seriesData;
        },

        closeHighlight: function (){
            this.highlightedCountry = {};
            this.$store.highlightedCountry = {};
            this.highlighterSelectionValue = this.defaultHighlighterSelectionValue;
        },

        triggerOption: function (force) {
            if(this.selectedIndicatorID !== '' && this.selectedIndicatorInThemedObj !== '') {
                var computedIndicatorID = UTILS.computeIndicatorID(this.selectedIndicatorInThemedObj, this.DBIndicators, this.PDIPGTTogglerPosition, this.povertyLineValue, this.conversionYearValue, this.selectedDecile, this.selectedInccat);

                if(computedIndicatorID !== this.selectedIndicatorID) {
                    this.$router.push({
                        path: '/comparison/' + computedIndicatorID
                    })
                } else if(force) {
                    this.processIndicatorData();
                }
            }
        }
    },

    watch: {
        selectedIndicatorID: function () {
            this.updatePage();
        },

        selectedCountries: function () {
            this.updatePage();
        },

        highlightedCountry: function () {
            this.updatePage();
        },

        selectedInccat: function () {
            this.$store.comparisonPageSelectedInccat = this.selectedInccat;
            this.triggerOption(true);
        },

        selectedDecile: function () {
            this.$store.comparisonPageSelectedDecile = this.selectedDecile;
            this.triggerOption(true);
        },

        conversionYearValue: function () {
            this.triggerOption()
        },

        PDIPGTTogglerPosition: function () {
            this.triggerOption()            
        }
    }
}

</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    #Comparison{
        .ceq_footer{
            margin-top: 20px;
        }
    }

    #ComparisonBarchart{
        padding-top: 20px;
    }

    .page_comparison{
        padding: 30px 0 0;
        background:$colorBlue;

        &[data-nooptions="true"]{
            padding-bottom: 20px !important;
            border-bottom: 8px solid $colorCyan;
        }

        .comparison_options{
            background:$colorCyan;
            padding: 20px 0;
            position: relative;
            text-align: left;
            margin-top: 40px;
            &:after, &:before{
                content: "";
                position: absolute;
                left: 100%;
                top: 0px;
                width: 1000px;
                height: 100%;
                background:$colorCyan;
            }
            &:before{
                left: auto;
                right: 100%;
            }
            .options_title{
                font-size: 16px;
                color: $colorBlack;
            }

            .options_params{
                border-top:2px solid #B3E0EF;
                padding-top: 10px;
                margin-top: 4px;
                .param_item{
                    display: inline-block;
                    vertical-align: top;
                    margin-right: 40px;
                    line-height: 28px;
                    &[data-param="scenario"]{
                        &[data-nbscenarios="1"]{
                            .toggler{
                                pointer-events: none;
                                cursor: default !important;
                                &[data-position="on"]{
                                    .toggler_label[data-position="on"]{
                                        opacity: 1;
                                    }
                                }
                                &[data-position="off"]{
                                    .toggler_label[data-position="off"]{
                                        opacity: 1;
                                    }
                                }
                            }
                            .toggler_toggle{
                                opacity: .5;
                            }
                            .toggler_label{
                                opacity: .5;
                            }
                        }
                    }
                    &[data-param="decile"], &[data-param="inccat"]{
                        height: auto;
                        .param_label{
                            width: auto;
                            margin-right: 10px;
                        }
                    }
                    .param_label{
                        display: inline-block;
                        vertical-align: top;
                        text-transform: uppercase;
                        font-size: 10px;
                        width: 100px;
                        text-align: left;
                    }
                    .param_valuewrapper{
                        font-size: 12px;
                        display: inline-block;
                        vertical-align: top;
                        .toggler{
                            position: relative;
                            top: -2px;
                        }
                        .selectbox_combobox{
                            width: 160px;
                            position: relative;
                        }
                    }
                }

            }
        }

        &[data-selector="false"]{
            background: #fff;
            padding: 0 0 0px;
        }

        .page_head{
            background:$colorBlue;
            min-height: 110px;
            position: relative;
            .head_wrapper{
                position: relative;
                width: 960px;
                height: 100%;
                display: inline-block;
                vertical-align: top;
                padding: 20px 0;
                .head_indicatorcard{
                    color: #fff;
                    text-align: left;
                    width: 60%;
                    .indicatorcard_arian{
                        font-size: 12px;
                        color: #B3E0EF;
                    }
                    .indicatorcard_name{
                        font-size: 24px;
                    }
                    .indicatorcard_params{
                        margin-top: 6px;
                        .param_item{
                            font-size: 12px;
                            display: inline-block;
                            vertical-align: top;
                            margin-right: 30px;
                            margin-left: -4px;
                            .item_label{
                                position: relative;
                                padding-left: 14px;
                                &:before{
                                    content: "";
                                    position: absolute;
                                    left: 0px;
                                    top: 50%;
                                    @include transform(translate(0,-50%));
                                    background: url("/images/icons/icon-chevron_right-white.svg") no-repeat 0 0;
                                    background-size: 100% 100%;
                                    width: 14px;
                                    height: 14px;
                                }
                            }
                        }
                    }
                }
                #ComparisonBackBt{
                    width: 200px;
                    height: 40px;
                    background: $colorBlack;
                    color: #fff;
                    text-align: center;
                    font-size: 12px;
                    text-transform: uppercase;
                    position: absolute;
                    border-radius: 20px;
                    right: 0px;
                    top: 50%;
                    @include transform(translate(0, -50%));
                    display: block;
                    line-height: 40px;
                    text-decoration: none;
                    font-family: "dm_sansbold";
                    &:before{
                        content: "";
                        position: absolute;
                        left: 0px;
                        top: 50%;
                        @include transform(translate(0,-50%));
                        background: url("/images/icons/icon-chevron_left-white.svg") no-repeat 0 0;
                        background-size: 100% 100%;
                        width: 32px;
                        height: 32px;
                    }
                    &:after{
                        content: "";
                        position: absolute;
                        right: 5px;
                        top: 50%;
                        @include transform(translate(0,-50%));
                        background: url("/images/icons/icon-change_selection-cyan.svg") no-repeat 0 0;
                        background-size: 100% 100%;
                        width: 32px;
                        height: 32px;
                    }
                    &:hover{
                        background: #fff;
                        color: $colorBlack;
                        &:before{
                            background: url("/images/icons/icon-chevron_left.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
        }

        #ComparisonSelectorWrapper{
            color: #fff;
            text-align: left;
            .selector_head{
                font-size: 24px;
            }
            .selector_content{
                margin-top: 60px;
            }
        }

        #ComparisonData{
            position: relative;
            padding: 20px 0 0;
            text-align: left;
            .page_chart{
                width: 100%;
                height: 340px;
                position: relative;
                z-index: 1000;
            }
            .page_highlighter{
                text-align: left;
                position: relative;
                top: 0px;
                z-index: 100000;
                display: inline-block;
                width: 300px;
                .highlighter_label{
                    font-family: "dm_sansitalic";
                    font-size: 12px;
                }
                .highlighter_inputblock{
                    position: relative;
                    margin-top: 2px;
                    .input_icon{
                        position: absolute;
                        left: 205px;
                        top: 50%;
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
        }
    }
</style>
