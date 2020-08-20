<template>
    <div class="ceq_footer">
    
        <div class="footer_wrapper isdesktop">
            <div class="footer_row" style="height:50px;">
                <div class="row_col" data-size="big">
                    <span class="txtblack">@CEQ Institute 2020</span>
                </div>
                <div class="row_col" data-size="mid">
                    <a class="col_link" data-link="privacy">Privacy policy</a>
                    <a class="col_link" data-link="contact">Contact us</a>
                </div>
                <div class="row_col" data-size="small">
                    Stay connected
                    <a class="col_link" href="https://twitter.com/ceqinstitute" target="_blank" data-link="tw"></a>
                    <a class="col_link" href="https://www.facebook.com/commitmentoequity/" target="_blank" data-link="fb"></a>
                    <a class="col_link" data-link="yt"></a>
                </div>
            </div>
            <div class="footer_row" >
                <div class="row_col" data-size="big">
                    Copyrights to CEQ materials on this website are owned and/or administered by Tulane University. CEQ, Commitment to Equity, and the Lorenz Curve logos are trademarks owned and/or administered by Tulane University. All rights reserved.
                </div>
                <div class="row_col" data-size="mid">
                    Commitment to Equity (CEQ) Institute Tulane University 6823 St. Charles Ave. Tilton Hall, Suite 206 New Orleans, LA 70118 USA
                </div>
            </div>
            <a class="footer_wddlink" href="https://wedodata.fr" target="_blank"></a>
        </div>

        <div class="footer_wrapper ismobile">
            <div class="footer_row">
                <div class="row_col" data-size="mid">
                    <a class="col_link" data-link="privacy">Privacy policy</a>
                    <a class="col_link" data-link="contact">Contact us</a>
                </div>
                <div class="row_col">
                    Stay connected
                    <a class="col_link" href="https://twitter.com/ceqinstitute" target="_blank" data-link="tw"></a>
                    <a class="col_link" href="https://www.facebook.com/commitmentoequity/" target="_blank" data-link="fb"></a>
                    <a class="col_link" data-link="yt"></a>
                </div>
                <div class="row_col last">
                    <span class="txtblack">@CEQ Institute 2020</span>
                </div>
            </div>
            <div class="footer_row padded" >
                <div class="row_col" data-size="big">
                    Copyrights to CEQ materials on this website are owned and/or administered by Tulane University. CEQ, Commitment to Equity, and the Lorenz Curve logos are trademarks owned and/or administered by Tulane University. All rights reserved.
                </div>
                <div class="row_col" data-size="mid" style="margin-top:10px;">
                    Commitment to Equity (CEQ) Institute Tulane University 6823 St. Charles Ave. Tilton Hall, Suite 206 New Orleans, LA 70118 USA
                </div>
            </div>
            <div class="footer_row wdd">
                <a class="footer_wddlink" href="https://wedodata.fr" target="_blank"></a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
      props: {

      },
      data: function () {
        return {
        }
    },
    mounted: function () {
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    .ceq_footer{
        margin-top: 60px;
        font-size: 11px;
        width: 100%;
        text-align: center;
        height: 220px;
        position: relative;
        background: #fff;
        padding-top: 20px;
        border-top: 6px solid #F2F3F4;
        &:after{
            content: "";
            position: absolute;
            height: 8px;
            width: 100%;
            background:$colorBlue;
            left: 0px;
            bottom: 0px;
        }
        .footer_wrapper{
            width: 960px;
            display: inline-block;
            vertical-align: top;
            height: 100%;
            position: relative;
            .footer_wddlink{
                position: absolute;
                display: block;
                cursor: pointer;
                right: 0px;
                bottom: 20px;
                background: url("/images/logos/logo-wedodata.svg") no-repeat 0 0;
                background-size: 100% 100%;
                width: 89px;
                height: 24px;
                &:hover{
                    opacity: .5;
                }
            }   
        }
        .footer_row{
            width: 100%;
            float: left;
            padding: 10px 0;
            border-bottom: 4px solid #F2F3F4;
            .row_col{
                color:#888;
                text-align: left;
                width: 340px;
                display: inline-block;
                vertical-align: top;
                margin-right: 60px;
                float: left;
                .txtblack{
                    color: #1B1B1B;
                }
                &[data-size="mid"]{
                    width: 300px;
                    margin-right: 10px;
                }
                &[data-size="small"]{
                    width: 210px;
                    margin-right: 0px;
                }
                .col_link{
                    display: inline-block;
                    vertical-align: top;
                    position: relative;
                    margin-right: 10px;
                    cursor: pointer;
                    color: #888;
                    &:after{
                        content: "";
                        position: absolute;
                        left: 100%;
                        top: 50%;
                        @include transform(translate(0,-50%));
                        width: 32px;
                        height: 32px;
                    }
                    &[data-link="privacy"]{
                        margin-right: 40px;
                        &:after{
                            background:url("/images/icons/icon-privacy_policy.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                        }
                        &:hover{
                            &:after{
                                background:url("/images/icons/icon-privacy_policy-black.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                            }
                        }
                    }
                    &[data-link="contact"]{
                        margin-right: 20px;
                        &:after{
                            background:url("/images/icons/icon-mail.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                        }
                        &:hover{
                            &:after{
                                background:url("/images/icons/icon-mail-black.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                            }
                        }
                    }
                    &[data-link="tw"]{
                        width: 32px;
                        height: 32px;
                        position: relative;
                        top: -10px;
                        &:after{
                            background:url("/images/icons/icon-brand_twitter.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                            left: 50%;
                            @include transform(translate(-50%,-50%));
                        }
                        &:hover{
                            &:after{
                                background:url("/images/icons/icon-brand_twitter-black.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                            }
                        }
                    }
                    &[data-link="fb"]{
                        width: 32px;
                        height: 32px;
                        position: relative;
                        top: -10px;
                        &:after{
                            background:url("/images/icons/icon-brand_facebook.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                            left: 50%;
                            @include transform(translate(-50%,-50%));
                        }
                        &:hover{
                            &:after{
                                background:url("/images/icons/icon-brand_facebook-black.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                            }
                        }
                    }
                    &[data-link="yt"]{
                        width: 32px;
                        height: 32px;
                        position: relative;
                        top: -10px;
                        &:after{
                            background:url("/images/icons/icon-brand_youtube.svg") no-repeat 0 0;
                            background-size: 100% 100%;
                            left: 50%;
                            @include transform(translate(-50%,-50%));
                        }
                        &:hover{
                            &:after{
                                background:url("/images/icons/icon-brand_youtube-black.svg") no-repeat 0 0;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
