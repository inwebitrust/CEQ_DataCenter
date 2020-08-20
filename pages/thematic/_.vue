<template>
    <div id="Thematic" class="page" data-page="thematic" :data-article="displayedArticle">

        <ceqHeader :page="'thematic'"></ceqHeader>

        <div class="page page_thematic" :data-articledisplayed="displayedArticle">

            <div class="page_wrapper" v-if="displayedArticle">
                <div class="article_image">
                    <img :src="'/images/illus/'+selectedArticle.image" />
                </div>
                <div class="article_content">
                    <div class="content_disclaimer">Thematic focuses</div>
                    <div class="content_title">{{selectedArticle.title}}</div>
                    <div class="content_date">{{selectedArticle.date}}</div>
                    <div class="content_subtitle">{{selectedArticle.subtitle}}</div>
                    <div class="content_chapter" v-for="(chapterObj, index) in selectedArticle.chapters">
                        <div class="chapter_title">{{chapterObj.title}}</div>
                        <div class="chapter_content" v-html="chapterObj.content"></div>
                        <div class="chapter_citation">{{chapterObj.citation}}</div>
                    </div>
                </div>

                <button class="article_gobackbt isdesktop" @click="displayedArticle = false">Back to thematic focuses</button>
                <button class="article_gobackbt ismobile" @click="displayedArticle = false">Back to focuses</button>
            </div>

            <div class="page_wrapper" v-if="!displayedArticle">
                <div class="thematic_title">Thematic focuses</div>
                <div class="thematic_content">

                    <div class="content_item">
                        <div class="item_pic">
                            <img src="/images/illus/mi-pham-0DPyb8t_KfI-unsplash.jpg" />
                        </div>
                        <div class="item_text">
                            <div class="text_wrapper">
                                <div class="text_title">Sustainable development goals</div>
                                <div class="text_p">
                                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                                </div>
                                <div class="text_date">Published on march 04 2020</div>
                                <button class="text_readbt" @click="displayArticle('article_1')">Read</button>
                            </div>
                        </div>
                    </div>

                    <div class="content_item">
                        <div class="item_pic">
                            <img src="/images/illus/sharon-mccutcheon-8lnbXtxFGZw-unsplash.jpg" />
                        </div>
                        <div class="item_text">
                            <div class="text_wrapper">
                                <div class="text_title">Child focussed equity assessment</div>
                                <div class="text_p">
                                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                                </div>
                                <div class="text_date">Published on march 04 2020</div>
                                <button class="text_readbt" @click="displayArticle('article_1')">Read</button>
                            </div>
                        </div>
                    </div>

                    <div class="content_item">
                        <div class="item_pic">
                            <img src="/images/illus/mi-pham-0DPyb8t_KfI-unsplash.jpg" />
                        </div>
                        <div class="item_text">
                            <div class="text_wrapper">
                                <div class="text_title">A third theme about a new subject</div>
                                <div class="text_p">
                                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                                </div>
                                <div class="text_date">Published on march 04 2020</div>
                                <button class="text_readbt" @click="displayArticle('article_1')">Read</button>
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
            displayedArticle: false,
            selectedArticle: '',
            articlesObj:{
                "article_1":{
                    image: "mi-pham-0DPyb8t_KfI-unsplash.jpg",
                    title: "Child focussed equity assessment",
                    date: "Published on march 04 2020",
                    subtitle: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…",
                    chapters:[{
                        title: "Chapter title",
                        content: "On February 28, 2018, the CEQ Institute at Tulane University and the World Bank signed a Memorandum of Understanding to collaborate on common objectives. The forms of collaboration include data-sharing, re-estimates of studies applying new international poverty lines, advising and training, and knowledge sharing. <a class='content_link' href='#'>The data-sharing component</a> will significantly increase the country coverage in the CEQ Institute’s Data Center on Fiscal Redistribution. Through the assessment of the impact of taxation and social spending on inequality and poverty, the CEQ Institute aims to provide a roadmap for governments, multilateral institutions, and non-governmental organizations in their efforts to build more equitable societies."
                    },{
                        titel: "Chapter title",
                        content: "Mr. Lawrence M. v. D. Schloss, 1976 graduate from Tulane University and member of the Board of Tulane, has endowed the Lawrence M. v. D. Schloss Prize for Excellence in Economics. “The Schloss Prize is to be offered to outstanding full professors, associate professors, or assistant professors, or graduate or undergraduate students, who do outstanding work in the Department of Economics.”<br /><br />Mr. Schloss has had a distinguished career in the financial services industry. Following his 1976 graduation from Tulane, he earned an MBA from The Wharton School of The University of Pennsylvania in 1978. He then joined Donaldson, Lufkin & Jenrette (DLJ) in 1978 as an investment banker, and during his 22 years at DLJ rose to become Chairman of DLJ’s Merchant Banking Division. Upon the acquisition of DLJ by Credit Suisse in 2000, he became the Global Head of CSFB Private Equity. In 2010 he was appointed New York City’s Deputy Comptroller for Pensions and the Chief Investment Officer and Trustee of the New York City pension funds, whose assets grew from $100 billion to $145 billion under his leadership. He was named 2012 CIO of The Year – Large Public Pension Funds by Institutional Investor. Most recently, Mr. Schloss was the President of Angelo, Gordon & Co. In addition to serving on the Board of Tulane, Mr. Schloss is the Vice Chair of the New York Police and Fire Widows’ Fund and the Children’s Benefit Fund, and he has served on the boards of directors of numerous public and private companies, including Girls Who Invest.<br /><br />There are two recipients of the 2017-2018 Schloss Prize. Patrick Button is the faculty recipient of the Schloss Prize for Excellence in Research. Ali Enami is the graduate student recipient of the Schloss Prize for Excellence in Research. Each will receive a cash award of $2500.",
                        citation: "“Ali has a number of additional research projects underway, including several that have received grant support.”"
                    },{
                        title: "",
                        content: "On February 28, 2018, the CEQ Institute at Tulane University and the World Bank signed a Memorandum of Understanding to collaborate on common objectives. The forms of collaboration include data-sharing, re-estimates of studies applying new international poverty lines, advising and training, and knowledge sharing. The <span class='bolder'>data-sharing component</span> will significantly increase the country coverage in the CEQ Institute’s Data Center on Fiscal Redistribution. Through the assessment of the impact of taxation and social spending on inequality and poverty, the CEQ Institute aims to provide a roadmap for governments, multilateral institutions, and non-governmental organizations in their efforts to build more equitable societies."
                    }]
                }
            }
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
        var pathmatch = this.routeParams.pathMatch;
        if(this.articlesObj[pathmatch] !== undefined) {
            this.displayArticle(pathmatch);
        }
    },

    methods: {
        updatePage: function () {
            var self = this; 
        },

        displayArticle: function (articleID) {
            this.displayedArticle = true;
            this.selectedArticle = this.articlesObj[articleID];
        }
    },

    watch: {
        
    }
}

</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    #Thematic{
        background: #F2F3F4;
        &[data-article="true"]{
            .page_thematic{
                background: $colorOrange3;
                .page_wrapper{
                    background: #fff;
                    padding: 40px;
                    margin-bottom: 90px;
                }
            }
        }
    }

    .page_thematic{
        padding: 40px 0;
        text-align: center;
        .page_wrapper{
            text-align: center;
            position: relative;
            .article_gobackbt{
                border: 1px solid #fff;
                border-radius: 4px;
                text-align: center;
                color: #fff;
                text-transform: uppercase;
                z-index: 100;
                background: $colorOrange3;
                font-family: "dm_sansbold";
                font-size: 12px;
                width: 240px;
                height: 40px;
                line-height: 40px;
                display: inline-block;
                position: fixed;
                bottom: 40px;
                left: 50%;
                cursor: pointer;
                outline: none;
                @include transform(translate(-50%, 0));
                &:hover{
                    background: #fff;
                    color: $colorOrange2;
                }
            }
            .article_image{
                height: 248px;
                overflow: hidden;
                background: $colorOrange2;
                img{
                    width: 100%;
                    filter: grayscale(100%);
                    mix-blend-mode: screen;
                }
            }
            .article_content{
                text-align: left;
                margin-top: 20px;
                width: 80%;
                .content_disclaimer{
                    font-size: 12px;
                    text-decoration: underline;
                }
                .content_title{
                    font-size: 32px;
                    font-family: "dm_sansbold";
                    color: $colorOrange2;
                }
                .content_date{
                    font-size: 12px;
                    color: #8F8989;
                }
                .content_subtitle{
                    font-size: 14px;
                    line-height: 20px;
                    margin-top: 20px;
                    font-family: "dm_sansbold";
                }
                .content_chapter{
                    margin-top: 20px;
                    .chapter_title{
                        font-size: 20px;
                        font-family: "dm_sansbold";
                        color: $colorOrange2;
                    }
                    .chapter_content{
                        font-size: 14px;
                        line-height: 24px;
                        a{
                            font-family: "dm_sansbold";
                            text-decoration: none;
                            color: $colorBlack;
                            border-bottom: 2px solid $colorOrange2;
                        }
                    }
                    .chapter_citation{
                        font-size: 32px;
                        font-family: "dm_sansbold_italic";
                        color: $colorOrange2;
                        line-height: 38px;
                        margin: 30px 0;
                    }
                }
            }
        }

        .thematic_title{
            font-size: 32px;
            line-height: 32px;
            color: #fff;
            color: $colorBlack;
            font-family: "dm_sansregular";
        }

        .thematic_content{
            color: $colorBlack;
            margin-top: 40px;
            border-radius: 0px 20px 20px 20px;
            .content_item{
                height: 290px;
                margin-top: 10px;
                padding: 20px;
                background: #fff;
                text-align: left;
                .item_pic{
                    display: inline-block;
                    vertical-align: top;
                    width: 280px;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                    background: $colorOrange2;
                    img{
                        height: 100%;
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        filter: grayscale(100%);
                        mix-blend-mode: screen;
                        @include transform(translate(-50%, -50%));
                    }
                }
                .item_text{
                    display: inline-block;
                    vertical-align: top;
                    height: 100%;
                    width: 540px;
                    position: relative;
                    margin-left: 40px;
                    .text_wrapper{
                        position: absolute;
                        top:50%;
                        @include transform(translate(0,-50%));
                        text-align: left;
                        .text_title{
                            color: $colorOrange2;
                            font-size: 32px;
                            line-height: 32px;
                            font-family: "dm_sansbold";
                        }
                        .text_p{
                            font-size: 14px;
                            line-height: 20px;
                            color: $colorBlack;
                            margin-top: 10px;
                        }
                        .text_date{
                            margin-top: 10px;
                            color: #8F8989;
                            font-size: 12px;
                            line-height: 20px;
                        }
                        .text_readbt{
                            width: 80px;
                            height: 32px;
                            border-radius:3px;
                            border:1px solid $colorBlack;
                            font-size: 12px;
                            font-family: "dm_sansbold";
                            outline: none;
                            cursor: pointer;
                            margin-top: 10px;
                        }
                    }
                }
            }
        }
    }
</style>
