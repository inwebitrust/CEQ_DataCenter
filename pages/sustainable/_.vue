<template>
    <div id="Sustainable" class="page" data-page="sustainable">

        <div id="ExportMask">
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        </div>

        <ceqModal :type="'countriesSelector'" :data-displayed="(displayModalHighlight) ? 'displayed' : ''" @closeModal="displayModalHighlight = false"></ceqModal>

        <ceqHeader :page="'sustainable'"></ceqHeader>

        <div class="page page_sustainable">
            <div class="page_wrapper">
                <div class="sustainable_title">Sustainable development goal</div>
                <div class="sustainable_content">
                    <div class="sustainable_image"></div>
                    <p class="content_p bolder">
                        The 2030 Agenda for Sustainable Development, adopted by all United Nations Member States in 2015, provides a shared blueprint for peace and prosperity for people and the planet, now and into the future. At its heart are the 17 Sustainable Development Goals (SDGs), which are an urgent call for action by all countries - developed and developing - in a global partnership. They recognize that ending poverty and other deprivations must go hand-in-hand with strategies that improve health and education, reduce inequality, and spur economic growth – all while tackling climate change and working to preserve our oceans and forests. The SDGs build on decades of work by countries and the UN, including the UN Department of Economic and Social Affairs.
                    </p>
                    <div class="content_title">Redistributive impact of fiscal policy</div>
                    <div class="content_subtitle">
                        In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation's residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.
                    </div>
                    
                    <div class="content_chart">
                        <div class="head_toggler toggler" :data-position="PDIPGTTogglerPositionTimeseries1">
                            <div class="toggler_label" data-position="off" @click="PDIPGTTogglerPositionTimeseries1 = 'off'">PDI</div>
                            <div class="toggler_toggle" @click="(PDIPGTTogglerPositionTimeseries1 == 'on') ? PDIPGTTogglerPositionTimeseries1 = 'off' : PDIPGTTogglerPositionTimeseries1 = 'on'">
                                <div class="toggle_chip"></div>
                            </div>
                            <div class="toggler_label" data-position="on" @click="PDIPGTTogglerPositionTimeseries1 = 'on'">PGT</div>
                        </div>

                        <highchartsTimeseriesBubbles :timeseriesSeries="timeseriesBubblesSeries1" :chartID="'SustainableBubbles'" :highlightedCountry="highlightedCountry1" :exportParams="{title: 'Redistributive impact of fiscal policy'}"></highchartsTimeseriesBubbles>

                        <div class="timeseriesbubbles_highlightsearchblock">
                            <div class="highlightsearchblock_title">Highlight another country</div>
                            <div class="highlightsearchblock_input_wrapper" :data-highlighting="(highlightedCountry1.name !== undefined) ? 'true':'false'">
                                <a class="input_icon" v-if="(highlightedCountry1.code == undefined)"></a>
                                <a class="input_icon" v-if="(highlightedCountry1.name != undefined)" @click="closeHighlight(1)"></a>
                                <button id="CountryHighlighterBt" @click="displayModalHighlight=true; displayedModal = 1;" :class="(highlightedCountry1.name !== undefined) ? 'active': ''">
                                    {{highlighterSelectionValue1}}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="content_title">Social spending concentrations in poor population</div>
                    <div class="content_subtitle">
                        In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation's residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.
                    </div>

                    <div class="content_chart">
                        <div class="head_toggler toggler" :data-position="PDIPGTTogglerPositionTimeseries2">
                            <div class="toggler_label" data-position="off" @click="PDIPGTTogglerPositionTimeseries2 = 'off'">PDI</div>
                            <div class="toggler_toggle" @click="(PDIPGTTogglerPositionTimeseries2 == 'on') ? PDIPGTTogglerPositionTimeseries2 = 'off' : PDIPGTTogglerPositionTimeseries2 = 'on'">
                                <div class="toggle_chip"></div>
                            </div>
                            <div class="toggler_label" data-position="on" @click="PDIPGTTogglerPositionTimeseries2 = 'on'">PGT</div>
                        </div>

                        <highchartsTimeseriesBubbles :timeseriesSeries="timeseriesBubblesSeries2" :chartID="'SustainableTimeseries'" :highlightedCountry="highlightedCountry2" :exportParams="{title: 'Social spending concentrations in poor population'}"></highchartsTimeseriesBubbles>
                        <div class="timeseriesbubbles_highlightsearchblock">
                            <div class="highlightsearchblock_title">Highlight another country</div>
                            <div class="highlightsearchblock_input_wrapper" :data-highlighting="(highlightedCountry2.name !== undefined) ? 'true':'false'">
                                <a class="input_icon" v-if="(highlightedCountry2.code == undefined)"></a>
                                <a class="input_icon" v-if="(highlightedCountry2.name != undefined)" @click="closeHighlight(2)"></a>
                                <button id="CountryHighlighterBt" @click="displayModalHighlight=true; displayedModal = 2;" :class="(highlightedCountry2.name !== undefined) ? 'active': ''">
                                    {{highlighterSelectionValue2}}
                                </button>
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
import highchartsTimeseries from '~/components/highchartsTimeseries.vue'
import highchartsTimeseriesBubbles from '~/components/highchartsTimeseriesBubbles.vue'
import ceqModal from '~/components/ceqModal'

export default {
    components: {
        'ceqHeader': ceqHeader,
        'ceqFooter': ceqFooter,
        'highchartsTimeseries': highchartsTimeseries,
        'highchartsTimeseriesBubbles': highchartsTimeseriesBubbles,
        'ceqModal': ceqModal
    },
    head () {
        return {
          title: 'CEQ Data Center - Sustainable development goal',
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
            timeseriesBubbles1Indicators: {
                "PDI": '3.4.1.1',
                "PGT": '3.4.2.1'
            },
            timeseriesBubbles2Indicators: {
                "PDI":'3.4.1.2',
                "PGT":'3.4.2.2'
            },
            allIndicatorsDatavalues: '',
            timeseriesBubblesSeries1: [],
            timeseriesBubblesSeries2: [],
            highlightedCountry: {},
            highlightedCountry1: {},
            highlighterSelectionValue1: '',
            highlightedCountry2: {},
            highlighterSelectionValue2: '',
            displayModalHighlight: false,
            displayedModal: '',
            defaultHighlighterSelectionValue: 'e.g. France, Egypt, Canada…',
            PDIPGTTogglerPositionTimeseries1: 'off',
            PDIPGTTogglerPositionTimeseries2: 'off'
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
        this.highlighterSelectionValue1 = this.defaultHighlighterSelectionValue;
        this.highlighterSelectionValue2 = this.defaultHighlighterSelectionValue;
        console.log("pathmatch", this.routeParams.pathMatch);

        this.getIndicatorsData();
        
    },

    methods: {

        getIndicatorsData: function () {
            var self = this;

            if(this.allIndicatorsDatavalues === '') {
                var allIndicators = _.flatten(_.map(this.timeseriesBubbles1Indicators, function (i){return i; }), _.map(this.timeseriesBubbles2Indicators, function (i){return i; }))
                this.$store.promiseIndicatorsDatavalues = UTILS.getAPIDatavalues(this.$store, allIndicators)
                this.$store.promiseIndicatorsDatavalues.then( function(promiseCallback) {
                    self.allIndicatorsDatavalues = promiseCallback;
                    self.processIndicatorsData();
                });
            } else {
                self.processIndicatorsData();
            }
        },

        processIndicatorsData: function () {
            console.log("allIndicatorsDatavalues", this.allIndicatorsDatavalues);

            this.computeTimeseriesSeriesBubbles1();
            this.computeTimeseriesSeriesBubbles2();
        },

        computeTimeseriesSeriesBubbles1: function () {
            var self = this;

            var toggleIndicatorID = this.timeseriesBubbles1Indicators["PDI"];
            if(this.PDIPGTTogglerPositionTimeseries1 == "on") toggleIndicatorID = this.timeseriesBubbles1Indicators["PGT"];

            var countriesValues = _.filter(self.allIndicatorsDatavalues, function (datavaluesRow){
                return datavaluesRow.indicator_id == toggleIndicatorID;
            })

            this.timeseriesBubblesSeries1 = [
                {
                    name: "Redistributive",
                    data:[]
                }
            ]

            var seriesData = [];
            _.each(countriesValues, function (countryValueObj){
                if(UTILS.missingDataObj[countryValueObj.indicator_value] === undefined) {
                    var pointColor = "#D46E87";
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
            this.timeseriesBubblesSeries1[0].data = sortedSeriesData;
        },

        computeTimeseriesSeriesBubbles2: function () {
            var self = this;

            var toggleIndicatorID = this.timeseriesBubbles1Indicators["PDI"];
            if(this.PDIPGTTogglerPositionTimeseries1 == "on") toggleIndicatorID = this.timeseriesBubbles1Indicators["PGT"];

            var countriesValues = _.filter(self.allIndicatorsDatavalues, function (datavaluesRow){
                return datavaluesRow.indicator_id == toggleIndicatorID;
            })

            console.log("countriesValues", countriesValues);
            this.timeseriesBubblesSeries2 = [
                {
                    name: "Redistributive",
                    color: "#D46E87",
                    data:[]
                }
            ]

            var seriesData = [];
            _.each(countriesValues, function (countryValueObj){
                if(UTILS.missingDataObj[countryValueObj.indicator_value] === undefined) {
                    //if(countryValueObj.country_code == self.selectedCountryObj.code) pointColor = "#FF613C";
                    seriesData.push({
                        name: countryValueObj.country_code,
                        y: parseFloat(countryValueObj.indicator_value) * 100,
                    })
                }
            });

            console.log("seriesData", seriesData);

            var sortedSeriesData = _.sortBy(seriesData, function (o){
                return o.y;
            });
            this.timeseriesBubblesSeries2[0].data = sortedSeriesData;
            console.log("timeseriesBubblesSeries2", this.timeseriesBubblesSeries2)
        },

        updatePage: function () {
            var self = this;
        },

        closeHighlight: function (type) {
            if(type == 1) {
                this.highlightedCountry1 = {};
                this.highlighterSelectionValue1 = this.defaultHighlighterSelectionValue;
            } else if(type == 2) {
                this.highlightedCountry2 = {};
                this.highlighterSelectionValue2 = this.defaultHighlighterSelectionValue;
            }
            
            
        }
    },

    watch: {
        //callback from modal
        highlightedCountry: function (){
            if(this.displayedModal == 1) {
                this.highlightedCountry1 = this.highlightedCountry;
                this.highlighterSelectionValue1 = this.highlightedCountry1.name;
            } else if(this.displayedModal == 2) {
                this.highlightedCountry2 = this.highlightedCountry;
                this.highlighterSelectionValue2 = this.highlightedCountry2.name;
            }
        },

        PDIPGTTogglerPositionTimeseries1: function () {
            this.computeTimeseriesSeriesBubbles1();
        },

        PDIPGTTogglerPositionTimeseries2: function () {
            this.computeTimeseriesSeriesBubbles2();
        }
    }
}

</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    .page_sustainable{
        padding: 30px 0;
        background:$colorPurple;
        text-align: center;
        .page_wrapper{
            text-align: left;
        }

        .sustainable_image{
            background: url("/images/logos/sustainable-goals-development_ceq-institute.svg") no-repeat 0 0;
            background-size: 100% 100%;
            width: 650px;
            height: 73px;
        }

        .sustainable_title{
            font-size: 24px;
            line-height: 32px;
            color: #fff;
            font-family: "dm_sansregular";
        }

        .sustainable_content{
            background: #fff;
            color: $colorBlack;
            padding: 30px;
            margin-top: 20px;
            margin-bottom: 30px;
            border-radius: 0px 20px 20px 20px;
            .sustainable_image{
                margin: 40px 0 60px;
            }
            .content_p{
                font-size: 16px;
                line-height: 20px;
            }
            .content_title{
                font-family: "dm_sansbold";
                font-size: 24px;
                line-height: 32px;
            }
            .content_subtitle{
                font-size: 14px;
                line-height: 20px;
            }
            .content_chart{
                position: relative;
                .head_toggler{
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    z-index: 1000;
                }
                .timeseriesbubbles_wrapper{
                    margin-top: 10px;
                }
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
            }
        }
    }
</style>
