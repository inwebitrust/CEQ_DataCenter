<template>
    <div id="Sources" class="page" data-page="sources">

        <ceqHeader :page="'sources'"></ceqHeader>

        <div class="page page_sources">
            <div class="page_wrapper">
                <div class="sources_content">
                    <div class="content_title">
                        Sources
                        <div class="sources_searchblock">
                            <div class="searchblock_label">Search a country</div>
                            <input type="text" v-model="inputSearchText" id="SearchInput" placeholder="e.g. France, USA, Egypt…" @keyup="updateAutocomplete()" />
                            <div class="input_autocomplete" v-if="displayAutocomplete">
                                <div class="autocomplete_item" @click="selectedCountry = item.code; displayAutocomplete = false;" v-for="(item, itemInc) in autocompleteItems">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content_countries">
                        <div class="content_country" v-for="(countryObj, itemInc) in sourcesObj" :data-code="countryObj.code">
                            <a :href="'#'+countryObj.code"></a>
                            <div class="country_name">{{countryObj.name}}</div>
                            <div class="country_year" v-for="(yearObj, yearID) in countryObj.years">
                                <div class="year_label">{{yearID}}</div>
                                <div class="country_block" v-if="yearObj.reference != 'n.a.'">
                                    <div class="block_title">References</div>
                                    <div class="block_text">{{yearObj.reference}}</div>
                                </div>
                                <div class="country_block" v-if="yearObj.source != 'n.a.'">
                                    <div class="block_title">CEQ Master Workbook Source</div>
                                    <div class="block_text">{{yearObj.source}}</div>
                                </div>
                                <div class="country_block" v-if="yearObj.citation != 'n.a.'">
                                    <div class="block_title">Household survey citation</div>
                                    <div class="block_text">{{yearObj.citation}}</div>
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

export default {
    components: {
        'ceqHeader': ceqHeader,
        'ceqFooter': ceqFooter,
    },
    head () {
        return {
          title: 'CEQ Data Center - Sources',
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
            autocompleteItems: [],
            inputSearchText: '',
            displayAutocomplete: false,
            selectedCountry: '',
            sourcesData: [],
            sourcesObj: {}
        }
    },

    computed: {
        ...mapState({
            DBCountries : state => state.database.DBCountries,
            DBCountriesObj: state => state.database.DBCountriesObj,
        })
    },

    mounted: function () {
        var self = this;
        this.loadSources();
    },

    methods: {
        loadSources: function (){
            var self = this;
            if(this.sourcesData.length == 0) {
                this.$store.promiseSources = UTILS.getAPICountriesSources(this.$store)
                this.$store.promiseSources.then( function(promiseCallback) {
                    self.sourcesData = promiseCallback;
                    self.updatePage()
                })
            } else {
                this.updatePage()
            }
        },

        updatePage: function () {
            var self = this; 

            self.sourcesObj = {};
            console.log(self.sourcesData)
            _.each(self.sourcesData, function (obj){
                if(self.sourcesObj[obj.country_code] === undefined){
                    self.sourcesObj[obj.country_code] = {
                        code: obj.country_code,
                        name: self.DBCountriesObj[obj.country_code].name,
                        years: {}
                    }
                }
                self.sourcesObj[obj.country_code].years[obj.start_year] = {
                    reference: obj.reference,
                    source: obj.source,
                    citation: obj.citation
                }
            });

            self.sourcesObj = JSON.parse(JSON.stringify(self.sourcesObj));
            console.log("sourcesObj", self.sourcesObj);

            if(this.routeParams.pathMatch !== "") {
                setTimeout(function (){
                    self.selectedCountry = self.routeParams.pathMatch;
                }, 10)
                
            }
        },

        updateAutocomplete: function () {
            var self = this;
            console.log("updateAutocomplete", self.inputSearchText)
            this.autocompleteItems = []
            _.each(this.DBCountries, function (countryObj){
                if(countryObj.name.toLowerCase().indexOf(self.inputSearchText.toLowerCase()) > -1){
                    console.log("countryObj", countryObj)
                    self.autocompleteItems.push({
                        code: countryObj.code,
                        name: countryObj.name
                    })
                }
                
            })

            this.displayAutocomplete = false;
            if(this.autocompleteItems.length > 0) {
                this.displayAutocomplete = true;
            }
            console.log("autocompleteItems", this.autocompleteItems);
        },
    },

    watch: {
        selectedCountry: function () {
            var countryContainer = document.querySelector(".content_country[data-code='"+this.selectedCountry.toUpperCase()+"']");

            if(countryContainer !== null) window.scrollTo(0, countryContainer.offsetTop);
        }
    }
}

</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    #Sources{
        background: $colorOrange2;
    }

    .page_sources{
        padding: 40px 0;
        text-align: center;
        .page_wrapper{
            text-align: center;
            position: relative;
            .sources_content{
                background: #fff;
                padding: 30px 60px;
                text-align: left;
                .content_countries{
                    .content_country{
                        margin-top: 46px;
                        .country_name{
                            color:$colorOrange2;
                            font-size: 24px;
                            line-height: 30px;
                            font-family: "dm_sansbold";
                            border-bottom:1px solid $colorOrange2;
                        }
                        .country_year{
                            margin-top: 24px;
                            &:nth-child(3){
                                margin-top: 10px;
                            }
                            .year_label{
                                font-size: 20px;
                                color: $colorBlack;
                            }
                            .country_block{
                                margin-top: 10px;
                                .block_title{
                                    font-size: 20px;
                                    color: #8f8989;
                                }
                                .block_text{
                                    font-size: 14px;
                                    line-height: 24px;
                                    color: $colorBlack;
                                }
                            }
                        }
                    }
                }
                .content_title{
                    font-size: 32px;
                    font-family: "dm_sansbold";
                    color: $colorOrange2;
                    border-bottom: 1px solid $colorBlack;
                    padding-bottom: 16px;
                    position: relative;
                    .sources_searchblock{
                        font-size: 12px;
                        color: $colorBlack;
                        position: absolute;
                        right: 0px;
                        top: -6px;
                        .searchblock_label{
                            font-family: "dm_sansitalic";
                        }
                        #SearchInput{
                            border: 1px solid $colorBlack;
                            border-radius:5px;
                            width: 240px;
                            height: 32px;
                            padding: 0 6px;
                        }
                        .input_autocomplete{
                            position: absolute;
                            top: 100%;
                            margin-top: 6px;
                            left: 0px;
                            width: 240px;
                            background: #fff;
                            padding: 10px;
                            box-shadow: 0px 0px 2px 2px rgba(0,0,0,0.2);
                            border-radius: 5px;
                            .autocomplete_item{
                                padding: 8px;
                                cursor: pointer;
                                &:hover{
                                    background: $colorBlack;
                                    color: #fff;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
</style>
