<template>
    <div id="Country" class="page" data-page="country">

        <div id="ExportMask">
            <div class="lds-facebook"><div></div><div></div><div></div></div>
        </div>
    
        <ceqHeader :page="'country'"></ceqHeader>

        <div class="page page_country">
            <div class="page_wrapper">

                <div id="CountrySelector" v-if="selectedCountry == ''">
                    <div class="selector_head">
                        Choose a country
                    </div>
                    <div class="selector_content">
                        <countriesSelector></countriesSelector>
                    </div>
                </div>

                <div id="CountryProfile" v-if="selectedCountryObj !== '' && selectedCountryObj !== undefined">

                    <nuxt-link to="/country/" id="CountryBackBt" class="isdesktop">Change country</nuxt-link>
                    
                    <div class="profile_idcard">
                        <div class="idcard_countryregion">{{selectedCountryObj.geo_region}}</div>
                        <div class="idcard_countryname">{{selectedCountryObj.name}}</div>
                        <div class="idcard_mainfigures">
                            <div class="mainfigure" data-mainfigure="hdi">
                                › Human development index score : 
                                <span class="mainfigure_value">{{selectedCountryObj.hdi}}</span>
                            </div>
                            <div class="mainfigure" data-mainfigure="gdp">
                                › GDP per capita (2017): <span class="mainfigure_value">$7100</span>
                            </div>
                            <div class="mainfigure" data-mainfigure="inc">
                                › {{selectedCountryObj.income_group}} income country
                            </div>
                            <div class="mainfigure" data-mainfigure="ass">
                                › <span class="mainfigure_value">5 years</span> assessment
                            </div>
                        </div>
                        <nuxt-link class="profile_sourcesbt" :to="'/sources/'+selectedCountry">view sources</nuxt-link>
                    </div>

                    <countryChartblock v-for="(chartblockObj, chartblockID) in chartblocksData" :chartblockID="chartblockID" :subBlocks="chartblockObj.blocks" :selectedCountryObj="selectedCountryObj" :chartblockTitle="chartblockObj.title"></countryChartblock>
                    
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
import countriesSelector from '~/components/countriesSelector.vue'
import countryChartblock from '~/components/countryChartblock.vue'

var prune = require("underscore.string/prune")
var numberFormat = require('underscore.string/numberFormat')

export default {
    components: {
        'ceqHeader': ceqHeader,
        'ceqFooter': ceqFooter,
        'countriesSelector': countriesSelector,
        'countryChartblock': countryChartblock
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
            selectedCountry: '',
            selectedCountryObj: '',
            chartblocksData: {
                'giniredis':{
                    title: "Inequality",
                    blocks:[
                        {
                            id: 'gini',
                            title: 'Gini coefficient',
                            text: 'In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation\'s residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.',
                            displayOptions: 'doublecols',
                            chartType: 'barchart',
                            chartLegend: '',
                            indicatorsSelectionType: 'toggler_and_indicator',
                            indicatorsIDS:{
                                "Gini coefficient":{
                                    'PDI': ['3.2.1','3.2.2','3.2.3','3.2.4'],
                                    'PGT': ['3.3.1','3.3.2','3.3.3','3.3.4']
                                },
                                'Theil index': {
                                    'PDI': ['3.5.1.1','3.5.1.2','3.5.1.3','3.5.1.4'],
                                    'PGT': ['3.5.2.1','3.5.2.2','3.5.2.3','3.5.2.4']
                                },
                                'Absolute Gini': {
                                    'PDI': ['3.7.1.1','3.7.1.2','3.7.1.3','3.7.1.4'],
                                    'PGT': ['3.7.2.1','3.7.2.2','3.7.2.3','3.7.2.4']
                                },
                                '90-10 ratio': {
                                    'PDI': ['3.6.1.1','3.6.1.2','3.6.1.3','3.6.1.4'],
                                    'PGT': ['3.6.2.1','3.6.2.2','3.6.2.3','3.6.2.4']
                                }
                                
                            }
                        },
                        {
                            id: 'redistributive',
                            title: 'Redistributive impact',
                            text: 'In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation\'s residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.',
                            displayOptions: 'singlecol',
                            chartType: 'timeseriesBubbles',
                            chartLegend: '',
                            hasSelectbox: true,
                            selectboxLabel: 'Between marker income plus…',
                            indicatorsSelectionType: 'toggler_and_indicator_and_selectbox',
                            indicatorsIDS:{
                                "Gini coefficient":{
                                    "pensions and disposable income":{
                                        "id":"pensions and disposable income",
                                        "PDI":['3.4.1.1'],
                                        "PGT":['3.4.2.1']
                                    },
                                    "pensions and consumable income":{
                                        "id":"pensions and consumable income",
                                        "PDI":['3.4.1.2'],
                                        "PGT":['3.4.2.2']
                                    },
                                    "pensions and final income":{
                                        "id":"pensions and final income",
                                        "PDI":['3.4.1.3'],
                                        "PGT":['3.4.2.3']
                                    }
                                },
                                "Theil index":{
                                    "pensions and disposable income":{
                                        "id":"pensions and disposable income",
                                        "PDI":['3.5.3.1'],
                                        "PGT":['3.5.4.1']
                                    },
                                    "pensions and consumable income":{
                                        "id":"pensions and consumable income",
                                        "PDI":['3.5.3.2'],
                                        "PGT":['3.5.4.2']
                                    },
                                    "pensions and final income":{
                                        "id":"pensions and final income",
                                        "PDI":['3.5.3.3'],
                                        "PGT":['3.5.4.3']
                                    }
                                },
                                "Absolute Gini":{
                                    "pensions and disposable income":{
                                        "id":"pensions and disposable income",
                                        "PDI":['3.5.3.1'],
                                        "PGT":['3.5.4.1']
                                    },
                                    "pensions and consumable income":{
                                        "id":"pensions and consumable income",
                                        "PDI":['3.5.3.2'],
                                        "PGT":['3.5.4.2']
                                    },
                                    "pensions and final income":{
                                        "id":"pensions and final income",
                                        "PDI":['3.5.3.3'],
                                        "PGT":['3.5.4.3']
                                    }
                                },
                                "90-10 ratio":{
                                    "pensions and disposable income":{
                                        "id":"pensions and disposable income",
                                        "PDI":['3.6.3.1'],
                                        "PGT":['3.6.4.1']
                                    },
                                    "pensions and consumable income":{
                                        "id":"pensions and consumable income",
                                        "PDI":['3.6.3.2'],
                                        "PGT":['3.6.4.2']
                                    },
                                    "pensions and final income":{
                                        "id":"pensions and final income",
                                        "PDI":['3.6.3.3'],
                                        "PGT":['3.6.4.3']
                                    }
                                }
                            }
                        }
                    ]
                },
                'poverty':{
                    title: "Poverty",
                    blocks:[
                        {
                            id: 'poverty_headcount',
                            title: 'Poverty headcount ratio',
                            text: 'In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation\'s residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.',
                            displayOptions: 'doublecols',
                            chartLegend: '',
                            chartType: 'barchart',
                            indicatorsSelectionType: 'toggler_and_indicator_and_povertyline',
                            indicatorsIDS:{
                                "Poverty headcount ratio":{
                                    "$1.25":{
                                        'PDI': ['4.10.1.1.1', '4.10.1.1.2','4.10.1.1.3','4.10.1.1.4'],
                                        'PGT': ['4.10.2.1.1', '4.10.2.1.2','4.10.2.1.3','4.10.2.1.4'],
                                    },
                                    "$2.50":{
                                        'PDI': ['4.10.1.2.1', '4.10.1.2.2','4.10.1.2.3','4.10.1.2.4'],
                                        'PGT': ['4.10.2.2.1', '4.10.2.2.2','4.10.2.2.3','4.10.2.2.4'],
                                    },
                                    "$4.00":{
                                        'PDI': ['4.10.1.3.1', '4.10.1.3.2','4.10.1.3.3','4.10.1.3.4'],
                                        'PGT': ['4.10.2.3.1', '4.10.2.3.2','4.10.2.3.3','4.10.2.3.4'],
                                    }
                                },
                                "Poverty gap ratio":{
                                    "$1.25":{
                                        'PDI': ['4.14.1.1.1', '4.14.1.1.2','4.14.1.1.3','4.14.1.1.4'],
                                        'PGT': ['4.14.2.1.1', '4.14.2.1.2','4.14.2.1.3','4.14.2.1.4'],
                                    },
                                    "$2.50":{
                                        'PDI': ['4.14.1.2.1', '4.14.1.2.2','4.14.1.2.3','4.14.1.2.4'],
                                        'PGT': ['4.14.2.2.1', '4.14.2.2.2','4.14.2.2.3','4.14.2.2.4'],
                                    },
                                    "$4.00":{
                                        'PDI': ['4.14.1.3.1', '4.14.1.3.2','4.14.1.3.3','4.14.1.3.4'],
                                        'PGT': ['4.14.2.3.1', '4.14.2.3.2','4.14.2.3.3','4.14.2.3.4'],
                                    }
                                },
                                "Squared poverty gap ratio":{
                                    "$1.25":{
                                        'PDI': ['4.18.1.1.1', '4.18.1.1.2','4.18.1.1.3','4.18.1.1.4'],
                                        'PGT': ['4.18.2.1.1', '4.18.2.1.2','4.18.2.1.3','4.18.2.1.4'],
                                    },
                                    "$2.50":{
                                        'PDI': ['4.18.1.2.1', '4.18.1.2.2','4.18.1.2.3','4.18.1.2.4'],
                                        'PGT': ['4.18.2.2.1', '4.18.2.2.2','4.18.2.2.3','4.18.2.2.4'],
                                    },
                                    "$4.00":{
                                        'PDI': ['4.18.1.3.1', '4.18.1.3.2','4.18.1.3.3','4.18.1.3.4'],
                                        'PGT': ['4.18.2.3.1', '4.18.2.3.2','4.18.2.3.3','4.18.2.3.4'],
                                    }
                                },                              
                            }
                        },
                        {
                            id: 'poverty_impact',
                            title: 'Poverty Impact',
                            text: 'In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation\'s residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.',
                            displayOptions: 'singlecol',
                            chartType: 'timeseriesBubbles',
                            chartLegend: '',
                            hasSelectbox: true,
                            selectboxLabel: 'Between marker income plus…',
                            indicatorsSelectionType: 'toggler_and_indicator_and_povertyline_and_selectbox',
                            indicatorsIDS:{
                                "Poverty headcount ratio":{
                                    "$1.25":{
                                        "pensions and disposable income":{
                                            "PDI":['4.11.1.1.1'],
                                            "PGT":['4.11.2.1.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.11.1.1.2'],
                                            "PGT":['4.11.2.1.2']
                                        }
                                    },
                                    "$2.50":{
                                        "pensions and disposable income":{
                                            "PDI":['4.11.1.2.1'],
                                            "PGT":['4.11.2.2.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.11.1.2.2'],
                                            "PGT":['4.11.2.2.2']
                                        }
                                    },
                                    "$4.00":{
                                        "pensions and disposable income":{
                                            "PDI":['4.11.1.3.1'],
                                            "PGT":['4.11.2.3.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.11.1.3.2'],
                                            "PGT":['4.11.2.3.2']
                                        }
                                    }
                                },
                                "Poverty gap ratio":{
                                    "$1.25":{
                                        "pensions and disposable income":{
                                            "PDI":['4.15.1.1.1'],
                                            "PGT":['4.15.2.1.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.15.1.1.2'],
                                            "PGT":['4.15.2.1.2']
                                        }
                                    },
                                    "$2.50":{
                                        "pensions and disposable income":{
                                            "PDI":['4.15.1.2.1'],
                                            "PGT":['4.15.2.2.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.15.1.2.2'],
                                            "PGT":['4.15.2.2.2']
                                        }
                                    },
                                    "$4.00":{
                                        "pensions and disposable income":{
                                            "PDI":['4.15.1.3.1'],
                                            "PGT":['4.15.2.3.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.11.1.3.2'],
                                            "PGT":['4.11.2.3.2']
                                        }
                                    }
                                },
                                "Squared poverty gap ratio":{
                                    "$1.25":{
                                        "pensions and disposable income":{
                                            "PDI":['4.19.1.1.1'],
                                            "PGT":['4.19.2.1.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.19.1.1.2'],
                                            "PGT":['4.19.2.1.2']
                                        }
                                    },
                                    "$2.50":{
                                        "pensions and disposable income":{
                                            "PDI":['4.19.1.2.1'],
                                            "PGT":['4.19.2.2.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.19.1.2.2'],
                                            "PGT":['4.19.2.2.2']
                                        }
                                    },
                                    "$4.00":{
                                        "pensions and disposable income":{
                                            "PDI":['4.19.1.3.1'],
                                            "PGT":['4.19.2.3.1']
                                        },
                                        "pensions and consumable income":{
                                            "PDI":['4.19.1.3.2'],
                                            "PGT":['4.19.2.3.2']
                                        }
                                    }
                                }, 
                            }
                        }
                    ]
                },
                'netpay':{
                    title: "Net payers / Net beneficiaries",
                    blocks:[
                        {
                            id: 'net_benefits',
                            title: 'Net payers / beneficiaries',
                            text: 'In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation\'s residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.',
                            displayOptions: 'singlecol',
                            chartType: 'timeseries',
                            chartTitle: 'Net benefits (+) from fiscal policy/Net payments (-) to the fisc',
                            chartLegend: 'By decile (as % of prefiscal income)',
                            indicatorsSelectionType: 'toggler_netpay',
                            indicatorsIDS: {
                                "PDI":{
                                    "decile":{
                                        "P05":["2.6.1.1.2"],
                                        "P11":["2.6.1.1.2"]
                                    },
                                    "inccat":{
                                        "P05":["2.6.2.1.2"],
                                        "P11":["2.6.3.1.2"]
                                    }
                                },
                                "PGT":{
                                    "decile":{
                                        "P05":["2.6.1.3.2"],
                                        "P11":["2.6.1.3.2"]
                                    },
                                    "inccat":{
                                        "P05":["2.6.2.3.2"],
                                        "P11":["2.6.3.3.2"]
                                    }
                                }
                            }
                        },
                        {
                            id: 'poorest_decile',
                            title: 'Poorest decile',
                            text: 'In economics, the Gini coefficient, sometimes called the Gini index or Gini ratio, is a measure of statistical dispersion intended to represent the income or wealth distribution of a nation\'s residents, and is the most commonly used measurement of inequality. It was developed by the Italian statistician and sociologist Corrado Gini and published in his 1912 paper Variability and Mutability.',
                            displayOptions: 'singlecol',
                            chartType: 'timeseriesBubbles',
                            hasSelectbox: false,
                            selectboxLabel: '',
                            chartTitle: 'Poorest decile who are Net Payers to the fisc',
                            chartLegend: 'Decile 1 = poorest decile; Decile 10 = richest decile',
                            indicatorsSelectionType: 'toggler_netpay',
                            indicatorsIDS: {
                                "PDI":{
                                    "decile":{
                                        "P05":["2.6.1.2"],
                                        "P11":["2.6.1.2"]
                                    },
                                    "inccat":{
                                        "P05":["2.6.2.2"],
                                        "P11":["2.6.3.2"]
                                    }
                                },
                                "PGT":{
                                    "decile":{
                                        "P05":["2.6.1.4"],
                                        "P11":["2.6.1.4"]
                                    },
                                    "inccat":{
                                        "P05":["2.6.2.4"],
                                        "P11":["2.6.3.4"]
                                    }
                                }
                            }
                        }
                    ]
                }
            },
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

        this.selectedCountry = this.routeParams.pathMatch.replace('/','')

        /*
        if(this.selectedCountry !== '') {
            if(this.$store.DBCountries === undefined) {
                this.$store.csvDataPromiseCountries = UTILS.getAPICountries(this.$store)
                this.$store.csvDataPromiseCountries.then( function(promiseCallback) {
                    self.DBCountries = self.$store.DBCountries
                    self.DBCountriesObj = self.$store.DBCountriesObj
                    self.loadCountryProfile()
                })
            } else {
                self.DBCountries = self.$store.DBCountries
                self.DBCountriesObj = self.$store.DBCountriesObj
                this.loadCountryProfile()
            }
        }*/
        this.loadCountryProfile();
    },

    methods: {
        loadCountryProfile: function () {
            var self = this

            this.selectedCountryObj = this.DBCountriesObj[this.selectedCountry];
            /*
            if(this.$store.csvDataPromiseIndicators === undefined) {
                this.$store.csvDataPromiseIndicators = UTILS.getAPIDatavalues(this.$store)
                this.$store.csvDataPromiseIndicators.then( function(promiseCallback) {
                    self.updatePage()
                })
            } else {
                this.updatePage()
            }
            */
        },

        updatePage: function () {
            
        },
    },

    watch: {
        selectedCountry: function (){
            if(this.selectedCountry !== '') {
                this.loadCountryProfile();
            }
        }
    }
}

</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    .page_country{
        padding: 30px 0;
        background:$colorDarkGreen;

        #CountriesSelector{
            display: block !important;
        }

        #CountrySelector{
            color: #fff;
            text-align: left;
            .selector_head{
                font-size: 24px;
            }
            .selector_content{
                margin-top: 30px;
            }
        }

        #CountryProfile{
            position: relative;
            #CountryBackBt{
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
                top: 0px;
                display: block;
                line-height: 40px;
                text-decoration: none;
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
                    right: 0px;
                    top: 50%;
                    @include transform(translate(0,-50%));
                    background: url("/images/icons/icon-globe-green.svg") no-repeat 0 0;
                    background-size: 100% 100%;
                    width: 32px;
                    height: 32px;
                }
            }

            .profile_idcard{
                text-align: left;
                .profile_sourcesbt{
                    background: #fff;
                    color: $colorBlack;
                    width: 120px;
                    height: 24px;
                    line-height: 24px;
                    padding: 0 0 0 10px;
                    display: inline-block;
                    cursor: pointer;
                    text-decoration: none;
                    border-radius: 20px;
                    position: relative;
                    font-family: "dm_sansbold";
                    margin-top: 10px;
                    &:after{
                        content: "";
                        position: absolute;
                        top: 50%;
                        right: -5px;
                        @include transform(translate(0,-50%));
                        background: url("/images/icons/icon-chevron_right.svg") no-repeat 0 0;
                        background-size: 100% 100%;
                        width: 32px;
                        height: 32px;
                    }
                    &:hover{
                        background: $colorBlack;
                        color: #fff;
                        &:after{
                            background: url("/images/icons/icon-chevron_right-white.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                        }
                    }
                }
                .idcard_countryregion{
                    color:$colorLightGreen;
                    font-size: 12px;
                }
                .idcard_countryname{
                    font-size: 24px;
                    color: #fff;
                    text-transform: uppercase;
                }
                .idcard_mainfigures{
                    width: 100%;
                    max-width: 540px;
                    color: #fff;
                    margin-top: 10px;
                    .mainfigure{
                        display: inline-block;
                        vertical-align: top;
                        width: 50%;
                        text-align: left;
                        position: relative;
                        padding-left: 24px;
                        font-size: 12px;
                        line-height: 16px;
                        &:before{
                            content: "";
                            position: absolute;
                            left: 0px;
                            top: 50%;
                            @include transform(translate(0,-50%));
                        }
                        &[data-mainfigure="hdi"]{
                            &:before{
                                background: url("/images/icons/icon-hdi_index-white.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                                width: 32px;
                                height: 32px;
                            }
                        }
                        &[data-mainfigure="gdp"]{
                            &:before{
                                background: url("/images/icons/icon-gdp_per_capita-white.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                                width: 32px;
                                height: 32px;
                            }
                        }
                        &[data-mainfigure="inc"]{
                            &:before{
                                background: url("/images/icons/icon-low_income_country-white.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                                width: 32px;
                                height: 32px;
                            }
                        }
                        &[data-mainfigure="ass"]{
                            &:before{
                                background: url("/images/icons/icon-assessment-white.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                                width: 32px;
                                height: 32px;
                            }
                        }
                        .mainfigure_value{
                            font-family: "dm_sansbold";
                        }
                    }
                }
            }
        }
    }
</style>
