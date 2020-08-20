<template>
    <div id="IndicatorSelector" :data-framed="framed">
        <div class="selector_sidebar">
            <div class="sidebar_searchblock">
                <div class="searchblock_label">Search an indicator...</div>
                <div class="searchblock_inputblock" :data-searching="(userKeyboardInput == '') ? 'false' : 'true'">
                    <a class="input_icon" @click="closeSearch()"></a>
                    <input type="text" id="IndicatorSearchInput" placeholder="e.g. Gini, payroll…" @keyup="keyboardInput($event.target.value)" />
                </div>
            </div>  

            <div class="sidebar_items isdesktop" v-if="userKeyboardInput == ''">
                <div v-for="(themedIndicatorObj, index) in sortedThemedIndicators" :data-theme="themedIndicatorObj.themeID" class="items_theme" :class="(selectedThemeObj.themeID == themedIndicatorObj.themeID) ? 'selected' : ''" @click="selectTheme(themedIndicatorObj)">
                    <div class="item_label" :class="(themedIndicatorObj.themeID.length > 30) ? 'smaller' : ''">
                        {{themedIndicatorObj.themeID}} <span class="lighter">({{themedIndicatorObj.totalItems}})</span>
                    </div>
                </div>
            </div>

            <v-select class="selectbox_combobox ismobile" v-model="selectedThemeObj" :return-object="true" :items="sortedThemedIndicators" solo label="" :hide-details="true" :menu-props="{contentClass:'bigger'}">
                <template slot="selection" scope="data">
                    <div class="item_wrapper">
                        <div class="item_text">{{data.item.themeID}} <span class="italiced">({{data.item.totalItems}})</span></div>
                    </div>
                </template>
                <template slot="item" slot-scope="data">
                    <div class="item_wrapper">
                        <div class="item_text">{{data.item.themeID}} <span class="italiced">({{data.item.totalItems}})</span></div>
                    </div>
                </template>
            </v-select>

            <!--
            <div class="sidebar_searchresults" v-if="userKeyboardInput != ''">


            </div>
            -->
        </div>

        <div class="selector_content" v-if="userKeyboardInput != ''">
            <div class="content_treelist" v-if="searchedIndicators.length > 0">
                <div class="treelist_wrapper">
                    <div class="treelist_level">
                        <div class="treelist_item" v-for="(searchedItem, searchedItemID) in searchedIndicators" @click="selectTreelistItem(searchedItem, searchedItem.type)">
                            <div class="indicator_item">
                                <div class="item_radiobt"></div>
                                
                                <div class="item_name">
                                    <span class="item_category" v-if="searchedItem.category !== ''">{{searchedItem.category}} - </span>
                                    {{searchedItem.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="searchedIndicators.length == 0">
                no results
            </div>
        </div>

        <div class="selector_content" v-if="userKeyboardInput == ''">
            <button class="treelist_backbt ismobile" v-if="selectedLevel > 1" @click="goBackLevel()">
                {{backbtCategoryLabel}}
            </button>
            <div class="content_arian" v-if="selectedThemeObj != ''">
                <span class="arian_item arian_theme" @click="selectTheme(selectedThemeObj)">
                    {{selectedThemeObj.themeID}} ({{selectedThemeObj.totalItems}})
                </span>
                <span class="arian_arrow" v-if="selectedCategory != ''"></span>
                <span class="arian_item arian_category" v-if="selectedCategory != ''" @click="selectCategory(selectedCategory)">
                    {{selectedCategory.id}} ({{selectedCategory.totalItems}})
                </span>
                <span class="arian_arrow" v-if="selectedSubcategory1 != ''"></span>
                <span class="arian_item arian_subcategory1" v-if="selectedSubcategory1 != ''" @click="selectSubcategory1(selectedSubcategory1)">
                    {{selectedSubcategory1.id}} ({{selectedSubcategory1.totalItems}})
                </span>
                <span class="arian_arrow" v-if="selectedSubcategory2 != ''"></span>
                <span class="arian_item arian_subcategory2" v-if="selectedSubcategory2 != ''" @click="selectSubcategory2(selectedSubcategory2)">
                    {{selectedSubcategory2.id}} ({{selectedSubcategory2.totalItems}})
                </span>
            </div>  

            <div class="content_treelist">
                <div class="treelist_wrapper" :data-selectedlevel="selectedLevel">
                    <div class="treelist_level" data-level="1">
                        <div class="treelist_item" v-for="(level1Item, level1ItemID) in selectedThemeObj.level1Items" :data-category="level1ItemID" :data-type="level1Item.type" @click="selectTreelistItem(level1Item, level1Item.type)">
                            <div class="level_item" v-if="level1Item.type != 'indicator'">{{level1ItemID}} <span class="italiced">({{level1Item.totalItems}})</span></div>
                            <div class="indicator_item" v-if="level1Item.type == 'indicator'" :class="(selectedIndicatorObj !== '' && selectedIndicatorObj.indicator.name == level1Item.indicator.name) ? 'selected' : ''">
                                <div class="item_radiobt"></div>
                                <span class="item_name">{{level1Item.indicator.name}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="treelist_level" data-level="2" v-if="selectedCategory != ''">
                        <div class="treelist_item" v-for="(level2Item, level2ItemID) in selectedCategory.level2Items" :data-subcategory1="level2ItemID" :data-type="level2Item.type" @click="selectTreelistItem(level2Item, level2Item.type)">
                            <div class="level_item" v-if="level2Item.type != 'indicator'">{{level2ItemID}} <span class="italiced">({{level2Item.totalItems}})</span></div>
                            <div class="indicator_item" v-if="level2Item.type == 'indicator'" :class="(selectedIndicatorObj !== '' && selectedIndicatorObj.indicator.name == level2Item.indicator.name) ? 'selected' : ''">
                                <div class="item_radiobt"></div>
                                <span class="item_name">{{level2Item.indicator.name}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="treelist_level" data-level="3" v-if="selectedSubcategory1 != ''">
                        <div class="treelist_item" v-for="(level3Item, level3ItemID) in selectedSubcategory1.level3Items" :data-subcategory2="level3ItemID" :data-type="level3Item.type" @click="selectTreelistItem(level3Item, level3Item.type, 'subcategory2')">
                            <div class="level_item" v-if="level3Item.type != 'indicator'">{{level3ItemID}} <span class="italiced">({{level3Item.totalItems}})</span></div>
                            <div class="indicator_item" v-if="level3Item.type == 'indicator'" :class="(selectedIndicatorObj !== '' && selectedIndicatorObj.indicator.name == level3Item.indicator.name) ? 'selected' : ''">
                                <div class="item_radiobt"></div>
                                <span class="item_name">{{level3Item.indicator.name}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="treelist_level" data-level="4" v-if="selectedSubcategory2 != ''">
                        <div class="treelist_item" v-for="(level4Item, level4ItemID) in selectedSubcategory2.level4Items" :data-subcategory2="level4ItemID" :data-type="level4Item.type" @click="selectTreelistItem(level4Item, level4Item.type)">
                            <div class="level_item" v-if="level4Item.type != 'indicator'">{{level4ItemID}} <span class="italiced">({{level4Item.totalItems}})</span></div>
                            <div class="indicator_item" v-if="level4Item.type == 'indicator'" :class="(selectedIndicatorObj !== '' && selectedIndicatorObj.indicator.name == level4Item.indicator.name) ? 'selected' : ''">
                                <div class="item_radiobt"></div>
                                <span class="item_name">{{level4Item.indicator.name}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>


    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState, mapGetters, mapActions } from 'vuex'

    import * as UTILS from '~/commons/utils/index.js'
    import {_} from 'underscore'

    import Vuetify from 'vuetify'
    Vue.use(Vuetify)
    import 'vuetify/dist/vuetify.min.css'

    export default {
        components: {
        },
        props: {
            framed: {
                type:Boolean,
                default: function () {
                    return false
                }
            },
            forcedUnselectedCountries: {
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
                themedIndicatorsObj: {},
                sortedThemedIndicators: [],
                selectedThemeObj: '',
                selectedCategory: '',
                selectedSubcategory1: '',
                selectedSubcategory2: '',
                selectedIndicatorObj: '',
                DBIndicatorsSelector: [],
                selectedLevel: 1,
                searchedIndicators: [],
                backbtCategoryLabel: ''
            }
        },

        computed: {
            ...mapState({
                DBIndicators : state => state.database.DBIndicators,
                DBIndicatorsObj: state => state.database.DBIndicatorsObj
            })
        },

        mounted: function () {
            var self = this

            this.DBIndicatorsSelector = this.DBIndicators;

            this.initAfterDataLoaded();
        },
        methods: {

            initAfterDataLoaded: function () {
                var self = this
                
                this.computeIndicators()
            },

            computeIndicators: function () {
                var self = this;

                this.themedIndicatorsObj = UTILS.computeIndicatorsObj(this.DBIndicatorsSelector);

                this.searchedIndicators = [];
                _.each(this.themedIndicatorsObj, function (o){
                    _.each(o.level1Items, function (item){
                        if(item.type == "indicator"){
                            self.searchedIndicators.push(item);
                        } else {
                            _.each(item.level2Items, function (item2){
                                if(item.type == "indicator"){
                                    self.searchedIndicators.push(item2);
                                } else {
                                    _.each(item2.level3Items, function (item3){
                                        if(item3.type == "indicator"){
                                            self.searchedIndicators.push(item3);
                                        } else {
                                            _.each(item3.level4Items, function (item4){
                                                if(item4.type == "indicator"){
                                                    self.searchedIndicators.push(item4);
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                })

                console.log("searchedIndicators", this.searchedIndicators);

                this.sortedThemedIndicators = _.sortBy(this.themedIndicatorsObj, function (o){
                    return o.themeID;
                })


                console.log("process sortedThemedIndicators", this.sortedThemedIndicators);

                if(this.$store.comparisonPageSelectedIndicatorObj !== undefined) {
                    this.selectedIndicatorObj = this.$store.comparisonPageSelectedIndicatorObj;

                    console.log("inside found", this.selectedIndicatorObj)
                    console.log("sortedThemedIndicators", this.sortedThemedIndicators);

                    this.selectedThemeObj = _.find(this.sortedThemedIndicators, function (tObj){
                        return tObj.themeID == self.selectedIndicatorObj.indicator.theme;
                    })

                    if(this.selectedThemeObj.level1Items !== undefined && this.selectedThemeObj.level1Items[this.selectedIndicatorObj.indicator.category] !== undefined) {
                        this.selectedCategory = this.selectedThemeObj.level1Items[this.selectedIndicatorObj.indicator.category];
                        this.selectedLevel = 2.
                        if(this.selectedCategory.level2Items !== undefined && this.selectedCategory.level2Items[this.selectedIndicatorObj.indicator.subcategory_1] !== undefined) {
                            this.selectedSubcategory1 = this.selectedCategory.level2Items[this.selectedIndicatorObj.indicator.subcategory_1];
                            this.selectedLevel = 3;
                            if(this.selectedSubcategory1.level3Items !== undefined && this.selectedSubcategory1.level3Items[this.selectedIndicatorObj.indicator.subcategory_2] !== undefined) {
                                this.selectedSubcategory2 = this.selectedSubcategory1.level3Items[this.selectedIndicatorObj.indicator.subcategory_2];
                                this.selectedLevel = 4;
                            }
                        }
                    }
                    
                } else {
                    this.selectedThemeObj = this.sortedThemedIndicators[0];
                }

                
            },

            keyboardInput: function (keybaordValue) {                
                var self = this
                this.userKeyboardInput = keybaordValue

                var tmpIndicators = JSON.parse(JSON.stringify(this.searchedIndicators));
                console.log("tmpIndicators", tmpIndicators);
                console.log("userKeyboardInput", this.userKeyboardInput);
                _.each(tmpIndicators, function(objIndicator){
                    if(self.userKeyboardInput == ''){
                        objIndicator.isSearched = true
                    } else {
                        var nameIndex = objIndicator.name.toLowerCase().indexOf(self.userKeyboardInput.toLowerCase());
                        if(nameIndex > -1) {
                            objIndicator.isSearched = true
                            tmpIndicators.push(objIndicator);
                        } else {
                            objIndicator.isSearched = false
                        }
                    }
                })

                this.searchedIndicators = JSON.parse(JSON.stringify(tmpIndicators))
                console.log("searchedIndicators", this.searchedIndicators);
            },

            selectTheme: function (themeObj) {
                this.selectedThemeObj = themeObj;
                this.selectedLevel = 1;
                this.backbtCategoryLabel = '';
                this.selectedCategory = '';
                this.selectedSubcategory1 = '';
                this.selectedSubcategory2 = '';
                this.selectedIndicatorObj = '';
            },

            selectCategory: function (categoryObj) {
                console.log("selectCategory", categoryObj);
                this.selectedLevel = 2;
                this.backbtCategoryLabel = this.selectedThemeObj.themeID;
                this.selectedCategory = categoryObj;
                this.selectedSubcategory1 = '';
                this.selectedSubcategory2 = '';
                this.selectedIndicatorObj = '';
            },

            selectSubcategory1: function (subacategory1Obj) {
                this.selectedLevel = 3;
                this.backbtCategoryLabel = this.selectedCategory.name;
                this.selectedSubcategory1 = subacategory1Obj;
                this.selectedSubcategory2 = '';
                this.selectedIndicatorObj = '';
            },

            selectSubcategory2: function (subacategory2Obj) {
                this.selectedLevel = 4;
                this.selectedSubcategory2 = subacategory2Obj;
                this.selectedIndicatorObj = '';
            },

            selectTreelistItem: function (listItem, itemType) {
                if(itemType == "category") {
                    this.selectedCategory = listItem;
                    this.backbtCategoryLabel = this.selectedThemeObj.themeID;
                    this.selectedLevel = 2;
                } else if (itemType == "subcategory1") {
                    this.selectedSubcategory1 = listItem;
                    this.backbtCategoryLabel = this.selectedCategory.id;
                    this.selectedLevel = 3;
                } else if (itemType == "subcategory2") {
                    this.selectedSubcategory2 = listItem;
                    this.backbtCategoryLabel = this.selectedSubcategory1.id;
                    this.selectedLevel = 4;
                } else if(itemType == "indicator") {
                    if(this.selectedIndicatorObj !== '' && this.selectedIndicatorObj.indicator.name == listItem.indicator.name) {
                        this.selectedIndicatorObj = '';
                    } else {
                        this.selectedIndicatorObj = listItem;
                    }
                    console.log("selectedIndicatorObj", this.selectedIndicatorObj);
                }
            },

            goBackLevel: function () {
                console.log("goBackLevel", this.selectedLevel);
                if(this.selectedLevel == 2) {
                    this.selectTheme(this.selectedThemeObj)
                } else if(this.selectedLevel == 4) {
                    this.selectSubcategory1(this.selectedSubcategory1);
                } else if(this.selectedLevel == 3){
                    this.selectCategory(this.selectedCategory);
                }
            }
            
        },

        watch: {
            selectedIndicatorObj: function () {
                this.$parent.selectedIndicatorObj = this.selectedIndicatorObj;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    #IndicatorSelector{
        background: #fff;
        height: 360px;
        display: none;
        &.displayed{
            display: block;
        }
        .selector_content{
            margin: 0px;
            padding: 30px 0;
            display: inline-block;
            vertical-align: top;
            width: 600px;
            .content_arian{
                .arian_item{
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;
                    cursor: pointer;
                    line-height: 20px;
                }
                .arian_arrow{
                    display: inline-block;
                    vertical-align: top;
                    background: url("/images/icons/icon-chevron_right.svg") no-repeat 0 0;
                    background-size: 100% 100%;
                    width: 32px;
                    height: 32px;
                    line-height: 20px;
                    margin-top: -6px;
                }
            }
            .content_treelist{
                height: 300px;
                position: relative;
                overflow: hidden;
                margin-top: 10px;
                .treelist_wrapper{
                    position: relative;
                    left: 0%;
                    width: 100%;
                    height: 100%;
                    @include transition((all), 0.6s, ease-in-out);
                    &[data-selectedlevel="1"]{
                        left: 0%;
                    }
                    &[data-selectedlevel="2"]{
                        left: -100%;
                    }
                    &[data-selectedlevel="3"]{
                        left: -200%;
                    }
                    &[data-selectedlevel="4"]{
                        left: -300%;
                    }
                }
                .treelist_level{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    overflow: auto;
                    &[data-level="2"]{
                        left: 100%;
                    }
                    &[data-level="3"]{
                        left: 200%;
                    }
                    &[data-level="4"]{
                        left: 300%;
                    }
                }
                .treelist_item{
                    min-height: 32px;
                    border-bottom: 1px solid #C7C4C4;
                    position: relative;
                    cursor: pointer;
                    &:hover{
                        background: $colorBlack;
                        color: #fff;
                        .level_item{
                            &:after{
                                background: url("/images/icons/icon-chevron_right-white.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                            }
                        }
                    }
                    .level_item{
                        font-family: "dm_sansbold";
                        font-size: 12px;
                        position: relative;
                        padding: 8px 24px;
                        &:after{
                            content: "";
                            position: absolute;
                            top: 50%;
                            right: 10px;
                            @include transform(translate(0, -50%));
                            background: url("/images/icons/icon-chevron_right.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                            width: 32px;
                            height: 32px;
                        }
                    }
                    .indicator_item{
                        display: inline-block;
                        line-height: 16px;
                        font-size: 12px;
                        padding-left: 6px;
                        position: relative;
                        width: 100%;
                        .item_radiobt{
                            width: 12px;
                            height: 12px;
                            border-radius: 12px;
                            background: #fff;
                            border:1px solid $colorBlack;
                            display: inline-block;
                            vertical-align: middle;
                            position: absolute;
                            top: 50%;
                            left: 6px;
                            @include transform(translate(0, -50%));
                        }
                        .item_name{
                            padding:8px 20px;
                            display: block;
                        }
                        &.selected{
                            background: $colorCyan;
                            font-family: "dm_sansbold";
                            .item_radiobt{
                                border: 3px solid $colorBlack;
                            }
                        }
                    }
                }
            }
        }
    }

    .selector_sidebar{
        color: $colorBlack;
        width: 305px;
        padding: 20px 30px;
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
                #IndicatorSearchInput{
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
            margin-top: 6px;
            max-height: 320px;
            overflow: auto;
            .items_theme{
                border:1px solid $colorBlack;
                border-radius: 3px;
                height: 32px;
                width: 240px;
                font-size: 12px;
                padding: 0 10px;
                line-height: 32px;
                color: $colorBlack;
                font-family: "dm_sansbold";
                margin-top: 8px;
                cursor: pointer;
                position: relative;
                &:after{
                    content: "";
                    position: absolute;
                    top: 50%;
                    @include transform(translate(0,-50%));
                    right: 0px;
                    background: url("/images/icons/icon-chevron_right.svg") no-repeat 0 0;
                    background-size: 100% 100%;
                    width: 32px;
                    height: 32px;
                }
                &.selected{
                    background: $colorCyan !important;
                    border:1px solid $colorCyan !important;
                    &:after{
                        background: url("/images/icons/icon-chevron_right.svg") no-repeat 0 0 !important;
                    }
                }
                &:hover{
                    background: $colorBlack;
                    color: #fff;
                    &:after{
                        background: url("/images/icons/icon-chevron_right-white.svg") no-repeat 0 0;
                    }
                }
                .item_label.smaller{
                    font-size: 10.5px;
                }
            }
        }
    }
    
</style>
