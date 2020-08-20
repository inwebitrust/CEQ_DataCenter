<template>
    <div id="ComparisonSelector">
        <ceqModal :type="'aboutIndicators'" :displayed="(displayModalAboutIndicators) ? true : false" @closeModal="displayModalAboutIndicators = false"></ceqModal>

        <nuxt-link :to="'/comparison/' + selectedIndicatorID" id="ViewChartBt" :class="(selectedIndicatorObj !== '' && selectedCountries.length > 0) ? 'enabled' : ''" class="isdesktop">View Chart</nuxt-link>

        <div class="selector_menu">
            <button class="menu_item" data-item="countries" :class="(selectedMenu == 'countries') ? 'selected' : ''" @click="selectedMenu = 'countries'">Choose countries</button>
            <button class="menu_item" data-item="indicator" :class="(selectedMenu == 'indicator') ? 'selected' : ''" @click="selectedMenu = 'indicator'">Choose indicator</button>
        </div>
        <button class="selector_aboutindicatorsbt" @click="displayModalAboutIndicators = true">About CEQ indicators</button>

        <div class="selector_inner">
            <countriesSelector :class="(selectedMenu == 'countries') ? 'displayed' : ''" :framed="true" @updateCountries="updateSelectedCountries()" :forcedUnselectedCountries="unselectedCountries" :mapID="'SelectorMapContainer'" mapColor="blue"></countriesSelector>
            <indicatorSelector :class="(selectedMenu == 'indicator') ? 'displayed' : ''" :framed="true" @updateIndicator="updateSelectedIndicator()" :forcedUnselectedCountries="unselectedCountries"></indicatorSelector>
        </div>

        <nuxt-link :to="'/comparison/' + selectedIndicatorID" id="ViewChartBt" :class="(selectedIndicatorObj !== '' && selectedCountries.length > 0) ? 'enabled' : ''" class="ismobile" :data-expanded="(bucketExpanded ? 'expanded' : '')">View Chart</nuxt-link>

        <div class="selector_bucket" :class="(bucketExpanded ? 'expanded' : '')">
            <div class="bucket_mobile ismobile">
                <div class="mobile_title">Your selection</div>
                <div class="mobile_selection">
                    {{selectedCountries.length}}
                    <span v-if="selectedCountries.length <= 1">country</span>
                    <span v-if="selectedCountries.length > 1">countries</span>
                    /
                    <span v-if="selectedIndicatorObj !== ''">1</span>
                    <span v-if="selectedIndicatorObj == ''">0</span>
                     indicator
                </div>
                <button @click="bucketExpanded = !bucketExpanded" :data-expanded="bucketExpanded" class="mobile_togglebt">
                    <span v-if="!bucketExpanded">View</span>
                    <span v-if="bucketExpanded">Hide</span>
                </button>
            </div>
            <div class="bucket_countrieswrapper">
                <div class="countrieswrapper_title">
                    <div class="title_text" v-if="selectedCountries.length > 0">
                        You have chosen<br />
                        <span class="bolder">{{selectedCountries.length}} </span>
                        <span class="bolder" v-if="selectedCountries.length <= 1">country</span>
                        <span class="bolder" v-if="selectedCountries.length > 1">countries</span>
                    </div>
                    <div class="title_text" v-if="selectedCountries.length == 0">No countries chosen</div>
                    <button class="countrieswrapper_removeallbt" @click="unselectAllCountries()" v-if="selectedCountries.length > 0">
                        Remove all countries
                    </button>
                </div>
                <div class="countrieswrapper_content">
                    <button class="content_choosebt" @click="selectedMenu = 'countries'; bucketExpanded = '';" v-if="selectedCountries.length == 0">Choose countries</button>
                    <div v-for="(countryObj, indexCountry) in selectedCountries" class="content_item" @click="unselectCountry(countryObj.code)">
                        <div class="item_checkbox"></div>
                        <span class="country_label">{{countryObj.name}}</span>
                    </div>
                </div>
            </div>

            <div class="bucket_indicatorwrapper">
                <div class="indicatorwrapper_title">
                    <div class="title_text" v-if="selectedIndicatorObj !== ''">
                        You have chosen <span class="bolder">{{selectedIndicatorObj.indicator.name | truncate(40)}}</span>
                    </div>
                    <div class="title_text" v-if="selectedIndicatorObj == ''">
                        No indicator chosen
                    </div>
                </div>
                <div class="indicatorswrapper_content">
                    <button class="content_choosebt" @click="selectedMenu = 'indicator'; bucketExpanded = '';" v-if="selectedIndicatorObj == ''">Choose an indicator</button>
                    <div class="indicatorwrapper_params" v-if="selectedIndicatorObj !== ''">
                        <div class="param_item" data-param="scenario" v-if="selectedIndicatorObj.concepts.length > 0" :data-nbscenarios="selectedIndicatorObj.concepts.length">
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
                        <div class="param_item" data-param="povertyline" v-if="selectedIndicatorObj.povertyLines.length > 0">
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
                        <div class="param_item" data-param="conversion" v-if="selectedIndicatorObj.conversionYears.length > 0">
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
                        <div class="param_item" data-param="decile" v-if="selectedIndicatorObj.dimensions.indexOf('Decile') > -1 && (this.conversionYearValue == '' || this.conversionYearValue == 'None')">
                            <div class="param_label">Specify a decile</div>
                            <div class="param_valuewrapper">
                                <v-select class="selectbox_combobox" v-model="decileValue" :return-object="true" :items="decileItems" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
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
                        <div class="param_item" data-param="inccat" v-if="selectedIndicatorObj.dimensions.indexOf('Income Category') > -1 && (this.conversionYearValue != '' && this.conversionYearValue != 'None')">
                            <div class="param_label">Specify an income category</div>
                            <div class="param_valuewrapper">
                                <v-select class="selectbox_combobox" v-model="inccatValue" :return-object="true" :items="inccatItems" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
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
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex'
    import Vue from 'vue'
    import * as UTILS from '~/commons/utils/index.js'

    import {_} from 'underscore';

    var filterTruncate = function(text, length, clamp){
        clamp = clamp || '...';
        var node = document.createElement('div');
        node.innerHTML = text;
        var content = node.textContent;
        return content.length > length ? content.slice(0, length) + clamp : content;
    };
    Vue.filter('truncate', filterTruncate);

    import countriesSelector from '~/components/countriesSelector.vue'
    import indicatorSelector from '~/components/indicatorSelector.vue'
    import ceqModal from '~/components/ceqModal.vue'

    import Vuetify from 'vuetify'
    Vue.use(Vuetify)
    import 'vuetify/dist/vuetify.min.css'

    export default {
        components: {
            'countriesSelector': countriesSelector,
            'indicatorSelector': indicatorSelector,
            'ceqModal': ceqModal
        },
        props: {

        },
        data: function () {
            return {
                dataLoaded: false,
                selectedMenu: 'countries',
                userKeyboardInput: '',
                PDIPGTTogglerPosition: 'off',
                povertyLineValue: '',
                povertyLineItems: [],
                conversionYearValue: '',
                conversionYearItems: [],
                decileValue: 'All Deciles',
                decileItems: ['All Deciles', 'Total', 'Decile 1', 'Decile 2', 'Decile 3', 'Decile 4', 'Decile 5', 'Decile 6', 'Decile 7', 'Decile 8', 'Decile 9', 'Decile 10'],
                inccatValue: 'All Income categories',
                inccatItems: ['All Income categories', 'Total', 'inccat 1', 'inccat 2', 'inccat 3', 'inccat 4', 'inccat 5'],
                selectedCountriesCodes: [],
                selectedCountries: [],
                unselectedCountries: [],
                selectedIndicatorObj: '',
                selectedIndicatorID: '',
                displayModalAboutIndicators: false,
                bucketExpanded: false
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

            if(this.$store.comparisonPageSelectedCountries !== undefined) {
                this.selectedCountries = this.$store.comparisonPageSelectedCountries;
            }

            if(this.$store.comparisonPageSelectedIndicatorObj !== undefined) {
                this.selectedIndicatorObj = this.$store.comparisonPageSelectedIndicatorObj;
            }

            if(this.$store.comparisonPagePDIPGTTogglerPosition !== undefined) {
                this.PDIPGTTogglerPosition = this.$store.comparisonPagePDIPGTTogglerPosition;
            }

            if(this.$store.comparisonPageSelectedDecile !== undefined) {
                this.decileValue = this.$store.comparisonPageSelectedDecile;
            }

            if(this.$store.comparisonPageSelectedInccat !== undefined) {
                this.inccatValue = this.$store.comparisonPageSelectedInccat;
            }
        },
        methods: {
            updateSelectedCountries: function () {
                var self = this;
                var tmpSelectedCountries = _.map(this.selectedCountriesCodes, function (countryCode){
                    if(self.DBCountriesObj[countryCode] !== undefined) {
                        return self.DBCountriesObj[countryCode];
                    }
                    return undefined;
                })

                this.selectedCountries = _.without(tmpSelectedCountries, undefined);
                this.$store.comparisonPageSelectedCountries = this.selectedCountries;
            },

            unselectCountry: function (countryCode) {
                console.log("unselectCountry", countryCode);
                this.unselectedCountries = JSON.parse(JSON.stringify([countryCode]));
            },

            unselectAllCountries: function () {
                this.unselectedCountries = _.map(this.selectedCountries, function (o){
                    return o.code;
                });
            },

            updateSelectedIndicator: function () {

            },

            computeIndicatorID: function () {
                var self = this;
                if(this.selectedIndicatorObj !== '') {
                    this.selectedIndicatorID = UTILS.computeIndicatorID(this.selectedIndicatorObj, this.DBIndicators, this.PDIPGTTogglerPosition, this.povertyLineValue, this.conversionYearValue, this.decileValue, this.inccatValue);
                }
                
                this.$store.comparisonPagePDIPGTTogglerPosition = this.PDIPGTTogglerPosition;
                this.$store.comparisonPageSelectedDecile = this.decileValue;
                this.$store.comparisonPageSelectedInccat = this.inccatValue;
            }
        },

        watch: {
            selectedIndicatorObj: function () {
                var self = this;

                console.log("update selectedIndicatorObj in parent", this.selectedIndicatorObj);
                if(this.selectedIndicatorObj.concepts !== undefined) {
                    if(this.selectedIndicatorObj.concepts.length == 1) {
                        if(this.selectedIndicatorObj.concepts[0] == "PDI") {
                            this.PDIPGTTogglerPosition = "off";
                        } else {
                            this.PDIPGTTogglerPosition = "on";
                        }
                    }
                }

                this.povertyLineItems = [];
                this.povertyLineValue = '';
                if(this.selectedIndicatorObj.povertyLines !== undefined) {
                    if(this.selectedIndicatorObj.povertyLines.length > 0) {
                        this.povertyLineItems = _.sortBy(this.selectedIndicatorObj.povertyLines, function (pl){ return pl; });
                        this.povertyLineValue = this.povertyLineItems[0];
                    }
                }

                this.conversionYearItems = [];
                this.conversionYearValue = '';
                if(this.selectedIndicatorObj.conversionYears !== undefined) {
                    if(this.selectedIndicatorObj.conversionYears.length > 0) {
                        this.conversionYearItems = _.sortBy(this.selectedIndicatorObj.conversionYears, function (cy){ return cy; });
                        this.conversionYearValue = this.conversionYearItems[0];

                        if(this.selectedIndicatorObj.dimensions.indexOf("Decile") > -1 && this.selectedIndicatorObj.dimensions.indexOf("Income Category") > -1) {
                            this.conversionYearItems.push("None");
                        }
                    }
                }

                this.$store.comparisonPageSelectedIndicatorObj = this.selectedIndicatorObj;
                this.computeIndicatorID();
            },

            PDIPGTTogglerPosition: function () {
                this.computeIndicatorID();
            },

            povertyLineValue: function () {
                this.computeIndicatorID();
            },

            decileValue: function () {
                this.computeIndicatorID();
            },

            inccatValue: function () {
                console.log("selectedIndicatorObj", this.selectedIndicatorObj);
                this.computeIndicatorID();
            },

            conversionYearValue: function () {
                this.computeIndicatorID();
            },

            bucketExpanded: function () {
                document.querySelector("body").setAttribute("data-masked", this.bucketExpanded);
            }


        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    #ComparisonSelector{
        background: #fff;
        position: relative;
        color: $colorBlack;
        margin-bottom: 80px;
        .selector_menu{
            position: absolute;
            left: 0px;
            bottom: 100%;
            .menu_item{
                display: inline-block;
                vertical-align: top;
                width: 200px;
                height: 40px;
                border-radius: 20px 20px 0 0;
                background: #A1BFC9;
                color: $colorBlack;
                border: 0px solid;
                line-height: 40px;
                font-size: 16px;
                font-family: "dm_sansbold";
                outline: none;
                position: relative;
                z-index: 10;
                &[data-item="indicator"]{
                    left: -14px;
                    z-index: 5;
                }
                &.selected{
                    background: #fff;
                }
            }
        }
        .selector_aboutindicatorsbt{
            position: absolute;
            right: 0px;
            bottom: 100%;
            font-size: 12px;
            font-family: "dm_sansitalic";
            color: #fff;
            margin-bottom: 10px;
            padding-right: 20px;
            &:after{
                content: "";
                position: absolute;
                right: 0px;
                top: 50%;
                @include transform(translate(0, -50%));
                background: url("/images/icons/icon-tooltip.svg") no-repeat center center #fff;
                background-size: 32px 32px;
                width: 16px;
                height: 16px;
                border-radius: 10px;
            }
        }

        .selector_inner{
            height: 400px;
        }

        .selector_bucket{
            background:$colorCyan;
            padding: 20px 30px 40px;
            position: relative;
            text-align: left;
            .bucket_mobile{
                position: relative;
                .mobile_title{
                    font-size: 16px;
                    text-transform: uppercase;
                    font-family: "dm_sansbold";
                }
                .mobile_selection{
                    font-size: 12px;
                    line-height: 16px;
                }
                .mobile_togglebt{
                    position: absolute;
                    right: 10px;
                    top: 10px;
                    font-size: 12px;
                    font-family: "dm_sansitalic";
                    outline: none;
                    &:after{
                        content: "";
                        position: absolute;
                        left: 100%;
                        top: 50%;
                        @include transform(translate(0,-50%));
                        background: url("/images/icons/icon-chevron_up.svg") no-repeat 0 0 ;
                        background-size: 100% 100%;
                        width: 32px;
                        height: 32px;
                    }
                    &[data-expanded="true"]{
                        &:after{
                            background: url("/images/icons/icon-chevron_down.svg") no-repeat 0 0 ;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .bucket_countrieswrapper{
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 63%;
                text-align: left;
                .countrieswrapper_title{
                    padding-bottom: 6px;
                    border-bottom: 2px solid #B3E0EF;
                    font-size: 16px;
                    line-height: 18px;
                    min-height: 40px;
                }
                .countrieswrapper_removeallbt{
                    position: absolute;
                    right: 12px;
                    outline: none;
                    top: 10px;
                    font-size: 12px;
                    white-space: nowrap;
                    padding-right: 4px;
                    &:after{
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 100%;
                        @include transform(translate(0, -50%));
                        width: 12px;
                        height: 12px;
                        background:url("/images/icons/icon-close-cyan.svg") no-repeat -4px -4px $colorBlack;
                        background-size: 20px 20px;
                        border-radius: 10px;
                    }
                    &:hover{
                        &:after{
                            background:url("/images/icons/icon-close-red.svg") no-repeat -4px -4px #fff;
                            background-size: 20px 20px;
                        }
                    }
                }
                .countrieswrapper_content{
                    margin-top: 10px;
                    .content_choosebt{
                        background:$colorOrange;
                        padding: 0 10px;
                        height: 24px;
                        color: #fff;
                        text-align: left;
                        line-height: 24px;
                        border-radius: 20px;
                        padding-right: 30px;
                        position: relative;
                        outline: none;
                        &:after{
                            content: "";
                            position: absolute;
                            right: 8px;
                            top: 50%;
                            @include transform(translate(0, -50%));
                            background: url("/images/icons/icon-chevron_right.svg") no-repeat -4px -4px #fff;
                            background-size: 22px 22px;
                            width: 14px;
                            height: 14px;
                            border-radius: 20px;
                        }
                    }
                    .content_item{
                        background:$colorBlack;
                        padding: 4px 10px;
                        color: #fff;
                        font-size: 12px;
                        color: #fff;
                        font-family: "dm_sansbold";
                        height: 24px;
                        cursor: pointer;
                        display: inline-block;
                        margin-right: 3px;
                        margin-top: 3px;
                        border-radius:4px;
                        position: relative;
                        padding-right: 24px;
                        &:hover{
                            background: #fff;
                            color: $colorBlack;
                            &:after{
                                background: url("/images/icons/icon-close.svg") no-repeat 0 0;
                            }
                        }
                        &:after{
                            content: "";
                            position: absolute;
                            right: -2px;
                            top: 50%;
                            @include transform(translate(0,-50%));
                            background: url("/images/icons/icon-close-white.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
            }
            .bucket_indicatorwrapper{
                display: inline-block;
                vertical-align: top;
                position: relative;
                width: 30%;
                margin-left: 6%;
                .indicatorwrapper_title{
                    padding-bottom: 6px;
                    border-bottom: 2px solid #B3E0EF;
                    font-size: 16px;
                    line-height: 18px;
                    height: 43px;
                }
                .indicatorswrapper_content{
                    margin-top: 10px;
                    .content_choosebt{
                        background:$colorOrange;
                        padding: 0 10px;
                        height: 24px;
                        color: #fff;
                        text-align: left;
                        line-height: 24px;
                        border-radius: 20px;
                        padding-right: 30px;
                        position: relative;
                        outline: none;
                        &:after{
                            content: "";
                            position: absolute;
                            right: 8px;
                            top: 50%;
                            @include transform(translate(0, -50%));
                            background: url("/images/icons/icon-chevron_right.svg") no-repeat -4px -4px #fff;
                            background-size: 22px 22px;
                            width: 14px;
                            height: 14px;
                            border-radius: 20px;
                        }
                    }
                }
                .indicatorwrapper_params{
                    padding: 0;
                    margin: 10px 0;
                    .param_item{
                        display: block;
                        height: 30px;
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
                            line-height: 16px;
                            height: auto;
                            margin-top: 8px;
                            .param_label{
                                width: 100%;
                                line-height: 14px;
                            }
                            .param_valuewrapper{
                                .selectbox_combobox{
                                    width: 100%;
                                }
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
        }

        #ViewChartBt{
            position: fixed;
            left: 50%;
            top: 100px;
            @include transform(translate(-50%, 0));
            margin-left: 380px;
            width: 200px;
            height: 40px;
            background: $colorBlack;
            color: #fff;
            text-align: center;
            font-size: 12px;
            text-transform: uppercase;
            border-radius: 20px;
            display: block;
            line-height: 40px;
            text-decoration: none;
            font-family: "dm_sansbold";
            text-align: left;
            padding-left: 40px;
            cursor: pointer;
            opacity: .5;
            z-index: 100000000;
            pointer-events: none;
            -webkit-box-shadow: 0px 0px 50px 0px rgba(27,27,27,0.75);
            -moz-box-shadow: 0px 0px 50px 0px rgba(27,27,27,0.75);
            box-shadow: 0px 0px 50px 0px rgba(27,27,27,0.75);
            &.enabled{
                display: block;
                opacity: 1;
                pointer-events: all;
                background: #fff;
                color: $colorBlack;
                &:after{
                    background: url("/images/icons/icon-chevron_right.svg") no-repeat 0 0;
                    background-size: 100% 100%;
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
            &:before{
                content: "";
                position: absolute;
                left: 5px;
                top: 50%;
                @include transform(translate(0,-50%));
                background: url("/images/icons/icon-chartbar-cyan.svg") no-repeat 0 0;
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
                background: url("/images/icons/icon-chevron_right-white.svg") no-repeat 0 0;
                background-size: 100% 100%;
                width: 32px;
                height: 32px;
            }
        }
    }
    
</style>
