<template>
    <div id="About" class="page" data-page="about" >

        <ceqHeader :page="'about'"></ceqHeader>

        <div class="page page_about">
            <div class="page_wrapper">
                <div class="about_content">
                    <div class="content_title">
                        About
                    </div>
                    <div class="content_text">
                        The Commitment to Equity (CEQ) Institute works to reduce inequality and poverty through comprehensive and rigorous tax and benefit incidence analysis, and active engagement with the policy community. Building on the seven years of achievements of the CEQ project, the Institute was founded in May 2015 with Nora Lustig as its Director. The CEQ Data Center on Fiscal Redistribution consists of an information and monitoring system with key indicators and –when proper permission has been obtained– a harmonized micro-fiscal database to assess the impact of fiscal systems on inequality and poverty.<br /><br />

                        The information on this website is the property of Tulane Educational Fund and may be used under proper citation.<br /><br />

                        For inquiries regarding the CEQ Data Center, please email <a href="mailto:datacenter@ceqinstitute.org">datacenter@ceqinstitute.org</a><br /><br />

                        Because national and international agencies often update their data series, the information included here may be subject to change.
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
          title: 'CEQ Data Center - About',
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
        }
    },

    computed: {

    },

    mounted: function () {
        var self = this
        var pathmatch = this.routeParams.pathMatch;
        
    },

    methods: {
        updatePage: function () {
            var self = this; 
        },
    },

    watch: {
        
    }
}

</script>

<style lang="scss">
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    #About{
        background: $colorBlue;
    }

    .page_about{
        padding: 40px 0;
        text-align: center;
        .page_wrapper{
            text-align: center;
            position: relative;
            .about_content{
                background: #fff;
                padding: 30px 60px 60px;
                text-align: left;
                .content_title{
                    font-size: 32px;
                    font-family: "dm_sansbold";
                    color: $colorBlue;
                    border-bottom: 1px solid $colorBlack;
                    padding-bottom: 16px;
                    position: relative;
                }
                .content_text{
                    margin-top: 30px;
                    width: 80%;
                    a{
                        color: $colorBlue;
                    }
                }
            }
        }
    }
</style>
