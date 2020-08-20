<template>
    <div id="Home" class="page" data-page="home">
        
        <ceqModal type="downloadIndicators" :class="(displayDownloadModal) ? 'displayed' : ''" @closeModal="displayDownloadModal = false"></ceqModal>
        <ceqHeader :page="'home'"></ceqHeader>
        
        <div class="page page_home">
            <div class="page_wrapper">

                <h1 class="home_title">Welcome on CEQ Data Center</h1>
                <div class="home_subtitle">
                    <span class="bolder">The CEQ Data Center</span> on Fiscal Redistribution consists of an information and monitoring system with key indicators and – when proper permission has been obtained – a harmonized micro-fiscal database to assess the impact of fiscal systems on inequality and poverty.
                </div>

                <div class="home_blocks">
                    <nuxt-link to="/comparison/" class="home_block" data-block="comparison">
                        <div class="block_text">
                            <div class="block_title">Country comparison</div>
                            <div class="block_subtitle">Compare countries on a specific indicator</div>
                        </div>
                        <button class="block_bt"></button>
                    </nuxt-link>
                    <nuxt-link to="/country/" class="home_block" data-block="country">
                        <div class="block_text">
                            <div class="block_title">Country profile</div>
                            <div class="block_subtitle">Compare countries on a specific indicator</div>
                        </div>
                        <button class="block_bt"></button>
                    </nuxt-link>
                    <nuxt-link to="/sustainable/" class="home_block" data-block="sustainable">
                        <div class="block_text">
                            <div class="block_title">Sutainable development goals</div>
                            <div class="block_subtitle">Lorem text two lines…</div>
                        </div>
                        <button class="block_bt"></button>
                    </nuxt-link>

                    <div class="home_dlblock ismobile" @click="displayDownloadModal = true">
                        <div class="dlblock_text">
                            CEQ standard Indicators<br />
                            <span class="smaller">Download CEQ standard indicators data package</span>
                            <button class="block_dlbt"></button>
                        </div>
                    </div>
                </div>

                <div class="home_dlblock isdesktop" @click="displayDownloadModal = true">
                    <div class="dlblock_text">
                        CEQ standard Indicators<br />
                        <span class="smaller">Download CEQ standard indicators data package</span>
                        <button class="block_dlbt"></button>
                    </div>
                </div>

                <div class="home_disaggregated">
                    <div class="dlblock_text">
                        CEQ disaggregated data<br />
                        <span class="smaller">Download CEQ disaggregated data</span>
                        <button class="block_dlbt"></button>
                    </div>
                </div>

                <!--
                <div class="home_thematic">
                    <div class="thematic_title">Thematic focuses</div>
                    <nuxt-link to="/thematic/article_1" class="thematic_item">
                        <div class="item_pic">
                            <img src="/images/illus/mi-pham-0DPyb8t_KfI-unsplash.jpg" />
                        </div>
                        <div class="item_text">
                            <div class="text_title">Child focussed equity assessment</div>
                            <div class="text_p">
                                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                            </div>
                            <div class="text_published">Published on march 04 2020</div>
                            <button class="item_readmorebt">Read</button>
                        </div>
                    </nuxt-link>
                    <nuxt-link to="/thematic/article_1" class="thematic_item">
                        <div class="item_pic">
                            <img src="/images/illus/sharon-mccutcheon-8lnbXtxFGZw-unsplash.jpg" />
                        </div>
                        <div class="item_text">
                            <div class="text_title">Focus title…</div>
                            <div class="text_p">
                                Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                            </div>
                            <div class="text_published">Published on march 04 2020</div>
                            <button class="item_readmorebt">Read</button>
                        </div>
                    </nuxt-link>
                    <div class="thematic_row">

                        <nuxt-link to="/thematic/" class="thematic_allbt">All thematic focuses</nuxt-link>
                    </div>
                </div>
                -->
            </div>
        </div>

        <ceqFooter></ceqFooter>
    </div>
</template>

<script>
import ceqHeader from '~/components/ceqHeader.vue'
import ceqFooter from '~/components/ceqFooter.vue'
import ceqModal from '~/components/ceqModal.vue'

export default {
    components: {
        'ceqHeader': ceqHeader,
        'ceqFooter': ceqFooter,
        'ceqModal': ceqModal
    },
    head () {
        return {
            title: 'CEQ Data Center - Home',
            meta: [
                { hid: 'description', name: 'description', content: 'The CEQ Data Center on Fiscal Redistribution consists of an information and monitoring system with key indicators and – when proper permission has been obtained – a harmonized micro-fiscal database to assess the impact of fiscal systems on inequality and poverty.' },
                { hid: 'og:image', name: 'og:image', content: 'http://statisticalcapacitymonitor.org/images/share-img.png' }
            ]
        }
    },
    data: function () {
        return {
            selectorExpanded:'',
            displayIndicatorsModal: false,
            displayDownloadModal: false,
            displayPrivacyModal: false
        }
    },
    mounted: function () {

    },
    methods: {

    }
}

</script>

<style lang="scss">
@import "~assets/scss/_variables.scss";
@import "~assets/scss/_browsers.scss";

.page_home{
    text-align: center;
    padding-top: 30px;
    .home_title{
        font-weight: 400;
        font-size: 32px;
    }
    .home_subtitle{
        font-size: 16px;
        line-height: 20px;
        width: 600px;
        position: relative;
        left: 50%;
        @include transform(translate(-50%, 0));
        margin-top: 10px;
    }

    .home_blocks{
        margin-top: 40px;
        text-align: center;
        .home_block{
            width: 312px;
            height: 320px;
            display: inline-block;
            vertical-align: top;
            position: relative;
            margin: 0 2px;
            overflow: hidden;
            color: #1B1B1B;
            &:hover{
                &:before{
                    opacity: 1;
                }
                .block_bt{
                    background:url("/images/icons/icon-chevron_right-white.svg") no-repeat 0 0 #1B1B1B;
                    background-size: 100% 100%;
                }
            }
            &:before{
                content:"";
                position: absolute;
                opacity: .4;
            }
            .block_bt{
                position: absolute;
                right: 30px;
                bottom: 30px;
                border:1px solid #1b1b1b;
                width: 32px;
                height: 32px;
                border-radius: 2px;
                background:url("/images/icons/icon-chevron_right.svg") no-repeat 0 0;
                background-size: 100% 100%;
                width: 32px;
                height: 32px;
            }
            &[data-block="comparison"]{
                background: $colorCyan;
                &:before{
                    background:url("/images/homepage/illustration-country-comparison.svg") no-repeat 0 0;
                    background-size: 100% 100%;
                    width: 138px;
                    height: 154px;
                    right: 40px;
                    top: 30px;
                }
            }
            &[data-block="country"]{
                background: $colorGreen;
                &:before{
                    background:url("/images/homepage/illustration-country-profile.svg") no-repeat 0 0;
                    background-size: 100% 100%;
                    width: 448px;
                    height: 254px;
                    left: 50%;
                    @include transform(translate(-50%, 0));
                    top: 10px;
                }
            }
            &[data-block="sustainable"]{
                background: $colorPurple2;
                &:before{
                    background:url("/images/homepage/illustration-sdg.svg") no-repeat 0 0;
                    background-size: 100% 100%;
                    width: 215px;
                    height: 105px;
                    left: 30px;
                    top: 40px;
                }
            }
            .block_text{
                position: absolute;
                left: 30px;
                bottom: 30px;
                text-align: left;
                width: 160px;
                .block_title{
                    font-weight: 700;
                    font-family: "dm_sansbold";
                    font-size: 32px;
                    line-height: 32px;
                }
                .block_subtitle{
                    margin-top: 20px;
                }
            }
        }
    }

    .home_dlblock, .home_disaggregated{
        background: $colorBlue;
        width: 943px;
        margin-top: 6px;
        height: 168px;
        display: inline-block;
        position: relative;
        cursor: pointer;
        &:hover{
            &:before{
                opacity: 1;
            }
            .dlblock_text{
                .block_dlbt{
                    background: url("/images/icons/icon-download.svg") no-repeat 0 0 #fff;
                    background-size: 100% 100%;
                }
            }
        }
        &:before{
            content: "";
            position: absolute;
            background:url("/images/homepage/illustration-ceq-indicators.svg") no-repeat 0 0;
            background-size: 100% 100%;
            width: 240px;
            height: 80px;
            opacity: .4;
            right: 40px;
            top: 50%;
            @include transform(translate(0,-50%));
        }
        .dlblock_text{
            position: absolute;
            left: 30px;
            top: 50%;
            @include transform(translate(0, -50%));
            color: #fff;
            text-align: left;
            font-size: 32px;
            line-height: 26px;
            font-weight: 700;
            .smaller{
                font-size: 14px;
            }
            .block_dlbt{
                display: block;
                width: 32px;
                height: 32px;
                border:1px solid #fff;
                border-radius: 2px;
                background: url("/images/icons/icon-download_white.svg") no-repeat 0 0;
                background-size: 100% 100%;
                width: 32px;
                height: 32px;
                margin-top: 4px;
            }
        }
    }

    .home_disaggregated{
        background: $colorOrange2;
        &:before{
            background:url("/images/homepage/illustration-disagregated-data.svg") no-repeat 0 0;
            background-size: 100% 100%;
        }
    }

    .home_thematic{
        padding-top: 30px;
        padding-bottom: 30px;
        margin-top: 60px;
        background: #F2F3F4;
        position: relative;
        &:before, &:after{
            content: "";
            position: absolute;
            left: 100%;
            top: 0px;
            width: 100%;
            background: #F2F3F4;
            height: 100%;
        }
        &:after{
            left: auto;
            right: 100%;
        }
        .thematic_title{
            font-size: 32px;
        }
        .thematic_row{
            margin-top: 60px;
            .thematic_allbt{
                text-transform: uppercase;
                color: #1b1b1b;
                border-radius: 2px;
                border:1px solid #1b1b1b;
                background: none;
                font-size: 12px;
                width: 200px;
                height: 40px;
                line-height: 38px;
                display: inline-block;
                text-decoration: none;
                font-family: "dm_sansbold";
                &:hover{
                    background: $colorBlack;
                    color: #fff;
                }
            }
        }
        .thematic_item{
            margin-top: 30px;
            position: relative;
            width: 100%;
            text-align: left;
            cursor: pointer;
            display: inline-block;
            color: $colorBlack;
            background: #fff;
            padding: 20px;
            &:hover{
                .item_pic{
                    img{
                        height: 120%;
                    }
                }
                .item_text{
                    .item_readmorebt{
                        background: $colorBlack;
                        color: #fff;
                    }
                }
            }
            .item_pic{
                width: 280px;
                height: 288px;
                display: inline-block;
                vertical-align: top;
                overflow: hidden;
                background: $colorOrange2;
                position: relative;
                img{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    @include transform(translate(-50%, -50%));
                    height: 100%;
                    filter: grayscale(100%);
                    mix-blend-mode: screen;
                    @include transition((all), 0.3s, ease-in-out);
                }
            }
            .item_text{
                text-align: left;
                display: inline-block;
                vertical-align: top;
                width: 600px;
                left: 320px;
                top: 50%;
                @include transform(translate(0,-50%));
                position: absolute;
                .text_title{
                    color: $colorOrange2;
                    font-family: "dm_sansbold";
                    font-size: 32px;
                    font-family: 700;
                }
                .text_p{
                    margin-top: 10px;
                    width: 500px;
                }
                .text_published{
                    color: #8f8989;
                    font-size: 12px;
                    margin-top: 10px;
                }
                .item_readmorebt{
                    margin-top: 20px;
                    color: #1b1b1b;
                    border-radius: 2px;
                    border:1px solid #1b1b1b;
                    background: none;
                    width: 80px;
                    height: 32px;
                    line-height: 30px;
                    text-align: center;
                    font-size: 12px;
                    display: block;
                    text-decoration: none;
                    font-family: "dm_sansbold";
                }
            }
        }
    }
}
</style>
