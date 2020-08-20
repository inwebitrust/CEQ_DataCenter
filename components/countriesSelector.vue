<template>
    <div id="CountriesSelector" :data-framed="framed" :data-modaled="modaled">
        <div class="selector_sidebar">
            
            <div class="sidebar_searchblock">
                <div class="searchblock_label">Search a country</div>
                <div class="searchblock_inputblock" :data-searching="(userKeyboardInput == '') ? 'false' : 'true'">
                    <a class="input_icon" @click="closeSearch()"></a>
                    <input type="text" id="CountriesSearchInput" placeholder="e.g. France, USA, Egypt…" @keyup="keyboardInput($event.target.value)" />
                </div>
            </div>  

            <div class="sidebar_items" v-if="userKeyboardInput == ''">

                <div class="items_selectall" v-if="framed" @click="toggleAllCountries()" :data-selected="hasAllCountriesSelected()">
                    <div class="item_checkbox"></div>
                    <div class="selectall_label">All countries <span class="label_smaller">({{countriesList.length}} countries)</span></div>
                </div>

                <div v-for="(countryGroup, groupID) in groupedCountries" :data-group="groupID" :key="groupID" class="items_group" :class="((expandedGroup == groupID) || (expandedGroup == 'all')) ? 'expanded' : ''">
                    <div class="group_label" @click="expandGroup(groupID)">
                        By {{countryGroup.label}} ({{ countriesList.length }})
                        <div class="group_arrow"></div>
                    </div>
                    <div v-for="(subgroupItems, subgroupID) in countryGroup.items" class="subgroup">

                        <div class="subgroup_item" @click="toggleSubgroupCountries(subgroupID, groupID)" :data-selected="(hasAllCountriesSelectedInSubgroup(subgroupID, groupID))">
                            <div class="item_checkbox" v-if="framed"></div>
                            <div class="subgroup_label" v-if="!framed">{{subgroupID}} ({{subgroupItems.length}})</div>
                            <div class="subgroup_label" v-if="framed">
                                <span v-if="groupID != 'hdi'">All</span> {{subgroupID}}'s countries ({{subgroupItems.length}})
                            </div>
                        </div>

                        <div class="subgroup_countries">

                            <nuxt-link v-if="!modaled && !framed && countryObj.isSearched" :to="'/country/'+countryObj.code" v-for="(countryObj, indexCountry) in subgroupItems" class="subgroup_country" :data-countrycode="countryObj.code" @mouseover="selectedCountries = [countryObj.code]" @mouseleave="selectedCountries = []">
                                <span class="country_label">{{countryObj.name}}</span>
                            </nuxt-link>

                            <div v-if="modaled && !framed && countryObj.isSearched" v-for="(countryObj, indexCountry) in subgroupItems" class="subgroup_country" :data-countrycode="countryObj.code" @mouseover="selectedCountries = [countryObj.code]" @mouseleave="selectedCountries = []" @click="selectModaledCountry = countryObj">
                                <span class="country_label">{{countryObj.name}}</span>
                            </div>

                            <div v-if="framed && countryObj.isSearched" v-for="(countryObj, indexCountry) in subgroupItems" class="subgroup_country" @click="toggleCountry(countryObj.code)" :data-selected="(selectedCountries.indexOf(countryObj.code) > -1) ? 'true': 'false'" @mouseover="hoverFramedCountry(countryObj.code)" @mouseleave="leaveFramedCountry(countryObj.code)">
                                <div class="item_checkbox"></div>
                                <span class="country_label">{{countryObj.name}}</span>
                            </div>



                        </div>

                    </div>
                </div>
            </div>

            <div class="sidebar_searchresults" v-if="userKeyboardInput != ''">

                <nuxt-link v-if="!modaled && !framed && countryObj.isSearched" :to="'/country/'+countryObj.code" v-for="(countryObj, indexCountry) in searchedCountries" class="searchedcountry" :data-countrycode="countryObj.code" @mouseover="selectedCountries = [countryObj.code]" @mouseleave="selectedCountries = []">
                    <span class="country_label">{{countryObj.name}}</span>
                </nuxt-link>

                <div v-if="modaled && !framed && countryObj.isSearched" v-for="(countryObj, indexCountry) in searchedCountries" class="searchedcountry" :data-countrycode="countryObj.code" @mouseover="selectedCountries = [countryObj.code]" @mouseleave="selectedCountries = []" @click="selectModaledCountry = countryObj">
                    <span class="country_label">{{countryObj.name}}</span>
                </div>

                <div v-if="framed && countryObj.isSearched" v-for="(countryObj, indexCountry) in searchedCountries" class="searchedcountry" @click="toggleCountry(countryObj.code)" :data-selected="(selectedCountries.indexOf(countryObj.code) > -1) ? 'true': 'false'" @mouseover="hoverFramedCountry(countryObj.code)" @mouseleave="leaveFramedCountry(countryObj.code)">
                    <div class="item_checkbox"></div>
                    <span class="country_label">{{countryObj.name}}</span>
                </div>

            </div>
        </div>

        <div class="selector_map">
            <highmapsChoropleth :mapID="mapID" :mapColor="mapColor" :geojsonID="'custom/world-robinson'" :mapSeries="mapCountriesSeries" @toggleCountryFromMap="toggleCountry"></highmapsChoropleth>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapGetters, mapActions } from 'vuex'

    import * as UTILS from '~/commons/utils/index.js'
    import {_} from 'underscore'

    import highmapsChoropleth from '~/components/highmapsChoropleth.vue'

    import Vuetify from 'vuetify'
    Vue.use(Vuetify)
    import 'vuetify/dist/vuetify.min.css'

    export default {
        components: {
            'highmapsChoropleth': highmapsChoropleth
        },
        props: {
            framed: {
                type:Boolean,
                default: function () {
                    return false
                }
            },
            modaled: {
                type:Boolean,
                default: function () {
                    return false;
                }
            },
            forcedUnselectedCountries: {
                type: Array,
                default: function () {
                    return []
                }
            },
            mapID: {
                type: String, 
                default: function () {
                    return "MapContainer"
                }
            },
            mapColor: {
                type: String, 
                default: function () {
                    return "green"
                }
            },
            countriesOnlyList: {
                type: Array,
                default: function () {
                    return []
                }
            }
        },
        data: function () {
            return {
                dataLoaded: false,
                userKeyboardInput: '',
                groupedCountries: {
                    "regions":{
                        label:"Region",
                        items:{}
                    },
                    "hdi":{
                        label:"HDI",
                        items:{}
                    },
                    "income_groups":{
                        label:"Income categories",
                        items:{}
                    }
                },
                expandedGroup: "",
                searchedCountries: [],
                selectedCountries: [],
                hoveredCountries: [],
                mapCountriesSeries:[],
                mapCountryColor:"#3bbd89",
                selectModaledCountry: '',
                countriesList: [],
                countriesListObj: {}
            }
        },

        computed: {
            ...mapState({
                DBCountries : state => state.database.DBCountries,
                DBCountriesObj: state => state.database.DBCountriesObj
            })
        },

        mounted: function () {
            var self = this

            if(this.framed){
                this.mapCountryColor = "#448094"
            } else if(this.modaled) {
                this.mapCountryColor = "#FF613C";
            }

            this.computeCountriesList();
            this.initAfterDataLoaded();
        },
        methods: {

            computeCountriesList: function () {
                var self = this;
                if(this.countriesOnlyList.length > 0) {
                    this.countriesList = this.countriesOnlyList;
                    this.countriesListObj = {};
                    _.each(this.countriesList, function (cObj){
                        self.countriesListObj[cObj.code] = cObj;
                    })
                } else {
                    this.countriesList = this.DBCountries;
                    this.countriesListObj = this.DBCountriesObj;
                }
            },

            initAfterDataLoaded: function () {
                var self = this
                
                this.groupCountries();
                this.computeMapCountriesSeries();
            },

            groupCountries: function () {

                this.searchedCountries = _.sortBy(_.map(this.countriesList, function (c){
                    c.isSearched = true;
                    return c;
                }), function (objC){
                    return objC.name;
                });

                var sortedCountriesByRegion = _.sortBy(this.countriesList, function (c){
                    c.isSearched = true;
                    return c.geo_region;
                });
                this.groupedCountries["regions"].items = _.groupBy(sortedCountriesByRegion, function (c){
                    return c.geo_region;
                })

                var sortedCountriesByHDI = _.sortBy(this.countriesList, function (c){
                    c.isSearched = true;
                    return c.hdi;
                });
                this.groupedCountries["hdi"].items = _.groupBy(sortedCountriesByHDI, function (c){
                    var floatHDI = parseFloat(c.hdi);
                    if(floatHDI >= 0.8) return "Very High Human Development";
                    else if(floatHDI >= 0.7) return "High Human Development";
                    else if(floatHDI >= 0.55) return "Medium Human Development";
                    else return "Low Human Development";
                    
                    //return c.hdi;
                }) 

                var sortedCountriesByIncomeGroups = _.sortBy(this.countriesList, function (c){
                    c.isSearched = true;
                    return c.income_group;
                });
                this.groupedCountries["income_groups"].items = _.groupBy(sortedCountriesByIncomeGroups, function (c){
                    return c.income_group;
                })
            },

            computeMapCountriesSeries: function () {
                var self = this;
                this.mapCountriesSeries = [];

                var allCountries = _.map(UTILS.countryISOMapping3To2, function (codeA2, codeA3){
                    var countryColor = "#c7c4c4";
                    if(self.countriesListObj[codeA3] !== undefined) {
                        countryColor = self.mapCountryColor;
                    }
                    if(_.indexOf(self.hoveredCountries, codeA3) > -1) {
                        countryColor = "#1b1b1b";
                    }
                    if(_.indexOf(self.selectedCountries, codeA3) > -1) {
                        countryColor = "#67C2E0";
                    }

                    return {
                        code: codeA2,
                        color: countryColor
                    }
                })
                this.mapCountriesSeries.push({
                    name: "All Countries",
                    data: allCountries
                })
            },

            keyboardInput: function (keybaordValue) {                
                var self = this

                if(keybaordValue.length > 1) {
                    this.userKeyboardInput = keybaordValue

                    var tmpGroupedCountries = JSON.parse(JSON.stringify(this.searchedCountries))
                    
                    _.each(tmpGroupedCountries, function(objCountry){
                        if(self.userKeyboardInput == ''){
                            objCountry.isSearched = true
                        } else {
                            var nameIndex = objCountry.name.toLowerCase().indexOf(self.userKeyboardInput.toLowerCase());
                            if(nameIndex > -1) {
                                objCountry.isSearched = true
                            } else {
                                objCountry.isSearched = false
                            }
                        }
                    })

                    this.searchedCountries = JSON.parse(JSON.stringify(tmpGroupedCountries))
                }
            },

            expandGroup: function (groupID) {
                if(this.expandedGroup == groupID) this.expandedGroup = '';
                else this.expandedGroup = groupID;
            },

            toggleCountry: function (countryCode) {
                console.log("toggleCountry", this);
                if(this.modaled) {
                    this.selectModaledCountry = JSON.parse(JSON.stringify(this.DBCountriesObj[countryCode]));
                } else if(!this.modaled && !this.framed){
                    //country profile page
                    this.$router.push({
                        path: '/country/'+countryCode
                    });
                } else {
                    if(_.indexOf(this.selectedCountries, countryCode) > -1){
                        this.selectedCountries = _.without(this.selectedCountries, countryCode);
                    } else {
                        this.selectedCountries.push(countryCode);
                    }
                }
            },

            toggleSubgroupCountries: function (subgroupID, groupID){
                var self = this;

                var subgroupCountriesCodes = _.map(this.groupedCountries[groupID].items[subgroupID], function (cObj){
                    return cObj.code;
                });

                var areAllSelected = true;
                _.each(subgroupCountriesCodes, function (countryCode){
                    if(self.selectedCountries.indexOf(countryCode) == -1){
                        areAllSelected = false;
                    }
                })

                if(areAllSelected == false) {
                    this.selectedCountries.push(subgroupCountriesCodes);
                } else {
                    this.selectedCountries = _.difference(this.selectedCountries, subgroupCountriesCodes);
                }
                this.selectedCountries = _.uniq(_.flatten(this.selectedCountries));
            },

            hasAllCountriesSelectedInSubgroup: function (subgroupID, groupID) {
                var self = this;

                var groupCountriesList = _.map(this.groupedCountries[groupID].items[subgroupID], function (o){
                    return o.code;
                });

                var selectedCountriesByGroup = _.intersection(groupCountriesList, this.selectedCountries);
                if(selectedCountriesByGroup.length == groupCountriesList.length) {
                    return 'true'
                } else if(selectedCountriesByGroup.length == 0) {
                    return 'false';
                }
                return 'partial';
            },

            toggleAllCountries: function () {
                if(this.selectedCountries.length == this.countriesList.length) {
                    this.selectedCountries = []
                } else {
                    this.selectedCountries = _.map(this.countriesList, function (o){
                        return o.code;
                    })
                }
            },

            hasAllCountriesSelected: function () {
                if(this.selectedCountries.length == this.countriesList.length) {
                    return 'true';
                }
                return 'false';
            },

            closeSearch: function () {
                this.userKeyboardInput = '';
                document.querySelector("#CountriesSearchInput").value = this.userKeyboardInput;
            },

            hoverFramedCountry: function (countryCode) {
                this.hoveredCountries = [countryCode];
            },

            leaveFramedCountry: function (countryCode) {
                this.hoveredCountries = [];
            },
        },

        watch: {
            selectedCountries: function () {
                this.computeMapCountriesSeries();
                if(this.framed) {
                    this.$parent.selectedCountriesCodes = this.selectedCountries;
                    this.$emit('updateCountries')
                }
            },

            hoveredCountries: function () {
                this.computeMapCountriesSeries();
            },

            forcedUnselectedCountries: function () {
                console.log("forcedUnselectedCountries", this.selectedCountries, this.forcedUnselectedCountries);
                var tmpCountries = _.difference(this.selectedCountries, this.forcedUnselectedCountries);
                this.selectedCountries = JSON.parse(JSON.stringify(tmpCountries));

            },

            selectModaledCountry: function (countryObj) {
                console.log("watch selectModaledCountry", this);
                this.$parent.selectedModaledCountry = JSON.parse(JSON.stringify(countryObj));
            },

            countriesOnlyList: function () {
                this.computeCountriesList();
                this.initAfterDataLoaded();
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    #CountriesSelector{
        background: #fff;
        height: 400px;
        display: none;
        &.displayed{
            display: block;
        }
        &[data-framed="true"]{
            padding: 0px;
            height: 100%;
            .selector_sidebar .sidebar_items .items_group .subgroup .subgroup_item{
                padding-left: 6px;
                cursor: pointer;
            }
            .selector_sidebar .sidebar_items .items_group .subgroup .subgroup_country{
                margin-left: 20px;
                &:hover{
                    background: none;
                    &:before{
                        display: block;
                        background:$colorBlack;
                    }
                    .item_checkbox{
                        background: #fff;
                        &:after{
                            background: url("/images/icons/icon-checkbox_tick-selection.svg") no-repeat center center;
                            background-size: 100% 100%;
                        }
                    }
                }
            }

            .selector_sidebar .sidebar_items .items_group .subgroup .subgroup_item .subgroup_label{
                font-size: 12px;
                font-family: "dm_sansregular";
                color: $colorBlack;
            }

            .selector_sidebar .sidebar_items .items_group[data-group="hdi"] .subgroup .subgroup_item .subgroup_label{
                font-size: 10px;
                line-height: 18px;
                padding-left: 4px;
            }

            .selector_sidebar .sidebar_items .items_group .subgroup .subgroup_item, .selector_sidebar .sidebar_items .items_group .subgroup .subgroup_country, .selector_sidebar .sidebar_items .items_selectall, .selector_sidebar .sidebar_searchresults .searchedcountry{
                &[data-selected="true"]{
                    .item_checkbox{
                        background:$colorBlack;
                        &:after{
                            display: block;
                            background: url("/images/icons/icon-checkbox_tick-white.svg") no-repeat center center !important;
                            background-size: 100% 100%;
                        }
                    }
                }
                &[data-selected="partial"]{
                    .item_checkbox{
                        background:$colorBlack;
                        &:after{
                            display: block;
                            background: url("/images/icons/icon-checkbox_tick-selection-white.svg") no-repeat center center !important;
                            background-size: 100% 100%;
                        }
                    }
                }
            }

            .selector_sidebar .sidebar_items .items_group .subgroup .subgroup_country{
                position: relative;
                &[data-selected="true"]{
                    &:before{
                        display: block;
                    }
                }
            }

            .selector_sidebar .sidebar_items .items_group .subgroup .subgroup_country .country_label{
                display: inline-block;
                vertical-align: top;
                margin-left: 6px;
            }
            .selector_sidebar .sidebar_searchresults .searchedcountry{
                &:hover{
                    background: none;
                    color: $colorBlack;
                }
                .country_label{
                    margin-left: 6px;
                }
            }
        }

        .item_checkbox{
            width: 16px;
            height: 16px;
            border-radius: 2px;
            border:1px solid $colorBlack;
            display: inline-block;
            vertical-align: top;
            position: relative;
            &:after{
                display: none;
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                @include transform(translate(-50%, -50%));
                background: url("/images/icons/icon-checkbox_tick-white.svg") no-repeat center center;
                background-size: 100% 100%;
                width: 16px;
                height: 16px;
            }
        }
    }

    .selector_map{
        display: inline-block;
        vertical-align: top;
        width: 654px;
        padding: 0px 0px 40px;
        height: 100%;
        background: #F2F3F4;
    }

    .selector_sidebar{
        color: $colorBlack;
        width: 305px;
        padding: 30px 30px;
        display: inline-block;
        vertical-align: top;
        .sidebar_searchblock{
            .searchblock_label{
                color:$colorBlack;
                font-size: 12px;
                font-family: "dm_sansitalic";
            }
            .searchblock_inputblock{
                position: relative;
                .input_icon{
                    position: absolute;
                    left: 210px;
                    top: 50%;
                    cursor: pointer;
                    @include transform(translate(0,-50%));
                    background: url("/images/icons/icon-search.svg") no-repeat 0 0;
                    background-size: 100% 100%;
                    width: 32px;
                    height: 32px;
                }
                #CountriesSearchInput{
                    width: 240px;
                    height: 32px;
                    border:1px solid $colorBlack;
                    border-radius: 2px;
                    background: #fff;
                    padding: 0 10px;
                    font-size: 12px;
                    font-family: "dm_sansregular";
                }
                &[data-searching="true"] {
                    .input_icon{
                        background: url("/images/icons/icon-close.svg") no-repeat 0 0;
                        background-size: 100% 100%;
                    }
                }
            }
        }

        .sidebar_searchresults{
            margin-top: 20px;
            height: 280px;
            overflow: auto;
            .searchedcountry{
                padding: 0 8px;
                font-family: "dm_sansbold";
                font-size: 12px;
                cursor: pointer;
                height: 24px;
                line-height: 24px;
                border-radius: 4px;
                display: block;
                text-decoration: none;
                color:$colorBlack;
                &:hover{
                    background:$colorBlack;
                    color:#fff;
                }
                .item_checkbox{
                    position: relative;
                    top: 3px;
                }
            }
        }

        .sidebar_items{
            margin-top: 20px;
            max-height: 280px;
            overflow: auto;

            .items_selectall{
                display: block;
                border-bottom: 1px solid $colorBlack;
                padding-bottom: 4px;
                margin-bottom: 6px;
                width: 240px;
                cursor: pointer;
                .selectall_label{
                    display: inline-block;
                    vertical-align: top;
                    font-size: 12px;
                    text-transform: uppercase;
                    margin-left: 10px;
                    .label_smaller{
                        font-size: 10;
                        text-transform: none;
                        font-family: "dm_sansitalic";
                    }
                }
            }

            .items_group{
                width: 240px;
                height: 30px;
                overflow: hidden;
                &.expanded{
                    height: auto;
                    overflow: auto;
                }
                .group_label{
                    font-size: 12px;
                    text-transform: uppercase;
                    height: 30px;
                    line-height: 30px;
                    position: relative;
                    cursor: pointer;
                    padding: 0 8px;
                    border-bottom:1px solid #c7c4c4;
                    .group_arrow{
                        position: absolute;
                        top: 50%;
                        @include transform(translate(0,-50%));
                        right: 0px;
                        background: url("/images/icons/icon-chevron_down.svg") no-repeat 0 0;
                        background-size: 100% 100%;
                        width: 32px;
                        height: 32px;
                    }
                }
                .subgroup{
                    margin-top: 5px;
                    .subgroup_item{
                        position: relative;
                        .item_checkbox{
                            position: relative;
                            top: 4px;
                        }
                        .subgroup_label{
                            color: $colorGrey;
                            font-size: 12px;
                            font-family: "dm_sansitalic";
                            padding: 0 0px 0 6px;
                            margin-top: 4px;
                            display: inline-block;
                            vertical-align: top;
                        }    
                    }
                    
                    .subgroup_countries{
                        margin-top: 4px;
                    }
                    .subgroup_country{
                        padding: 0 8px;
                        font-family: "dm_sansbold";
                        font-size: 12px;
                        cursor: pointer;
                        height: 24px;
                        line-height: 24px;
                        border-radius: 4px;
                        display: block;
                        color: $colorBlack;
                        text-decoration: none;
                        &:before{
                            content: "";
                            width: 100%;
                            position: absolute;
                            top: 3px;
                            bottom: 5px;
                            left: 8px;
                            background:$colorCyan;
                            display: none;
                        }
                        .item_checkbox{
                            position: relative;
                            top: 3px;
                        }
                        .country_label{
                            position: relative;
                            line-height: 22px;
                        }
                        &:hover{
                            background:$colorBlack;
                            color:#fff;
                        }
                    }
                }
            }
        }
    }
    
</style>
