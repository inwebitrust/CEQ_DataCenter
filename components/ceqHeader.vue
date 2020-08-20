<template>
    <div class="ceq_header">

        <div class="header_wrapper isdesktop">
            <div class="header_logos">
                <a href="http://commitmentoequity.org/" target="_blank" class="logo_ceq"></a>
                <nuxt-link to="/" class="logo_datacenter"></nuxt-link>
            </div>
            <div class="header_menu">
                <nuxt-link to="/" data-link="home" class="menu_link" :class="(page == 'home') ? 'selected' : ''">
                    <span class="link_txt">Homepage</span>
                </nuxt-link>
                <nuxt-link to="/comparison/" data-link="comparison" class="menu_link" :class="(page == 'comparison') ? 'selected' : ''">
                    <span class="link_txt">Country comparison</span>
                </nuxt-link>
                <nuxt-link to="/country/" data-link="country" class="menu_link" :class="(page == 'country') ? 'selected' : ''">
                    <span class="link_txt">Country profile</span>
                </nuxt-link>
                <nuxt-link to="/sustainable/" data-link="sustainable" class="menu_link" :class="(page == 'sustainable') ? 'selected' : ''">
                    <span class="link_txt">Sustainable Dev. Goals</span>
                </nuxt-link>
                <!--
                <nuxt-link to="/thematic/" data-link="thematic" class="menu_link" :class="(page == 'thematic') ? 'selected' : ''">
                    <span class="link_txt">Thematic focuses</span>
                </nuxt-link>
                -->
                <nuxt-link to="/sources/" data-link="sources" class="menu_link" :class="(page == 'sources') ? 'selected' : ''">
                    <span class="link_txt">Sources</span>
                </nuxt-link>
                <nuxt-link to="/about/" data-link="about" class="menu_link" :class="(page == 'about') ? 'selected' : ''">
                    <span class="link_txt">About</span>
                </nuxt-link>
            </div>
        </div>

        <div class="header_wrapper ismobile">
            <div class="header_mobilerow" data-row="1">
                <a href="http://commitmentoequity.org/" target="_blank" class="header_logo"></a>
            </div>
            <div class="header_mobilerow" data-row="2">
                <nuxt-link to="/" class="header_logo"></nuxt-link>
                <button class="header_menubt" @click="displayMobileMenu = true;">Menu</button>
            </div>
        </div>

        <div id="MobileMenu" v-if="displayMobileMenu">
            <div class="menu_wrapper">
                <button class="menu_closebt" @click="displayMobileMenu = false;">Menu</button>
                <div class="menu_links">
                    <nuxt-link to="/" data-link="home" class="menu_link" :class="(page == 'home') ? 'selected' : ''">
                        <span class="link_txt">Homepage</span>
                    </nuxt-link>
                    <nuxt-link to="/comparison/" data-link="comparison" class="menu_link" :class="(page == 'comparison') ? 'selected' : ''">
                        <span class="link_txt">Country comparison</span>
                    </nuxt-link>
                    <nuxt-link to="/country/" data-link="country" class="menu_link" :class="(page == 'country') ? 'selected' : ''">
                        <span class="link_txt">Country profile</span>
                    </nuxt-link>
                    <nuxt-link to="/sustainable/" data-link="sustainable" class="menu_link" :class="(page == 'sustainable') ? 'selected' : ''">
                        <span class="link_txt">Sustainable Dev. Goals</span>
                    </nuxt-link>
                    <!--
                    <nuxt-link to="/thematic/" data-link="thematic" class="menu_link" :class="(page == 'thematic') ? 'selected' : ''">
                        <span class="link_txt">Thematic focuses</span>
                    </nuxt-link>
                    -->
                    <nuxt-link to="/sources/" data-link="sources" class="menu_link" :class="(page == 'sources') ? 'selected' : ''">
                        <span class="link_txt">Sources</span>
                    </nuxt-link>
                    <nuxt-link to="/about/" data-link="about" class="menu_link" :class="(page == 'about') ? 'selected' : ''">
                        <span class="link_txt">About</span>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        page: {
            default: function () {
                return 'home'
            }
        }
    },
    data: function () {
        return {
            langsBlockSelected: false,
            displayMobileMenu: false
        }
    },
    mounted: function () {
        this.displayMobileMenu = false;
    },
    methods: {
        clickLogo: function () {
            if(this.page == 'home') location.reload()
        },

        emitAboutModal: function () {
            this.$emit('aboutModal')
        },

        emitDownloadModal: function () {
            this.$emit('downloadModal')
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/_variables.scss";
@import "~assets/scss/_browsers.scss";

.ceq_header{
    position: fixed;
    height: 84px;
    left: 0px;
    top: 0px;
    width: 100%;
    background: #fff;
    text-align: center;
    z-index: 10000000;
    &:before{
        content: "";
        position: absolute;
        left: 0px;
        bottom: 0px;
        height: 4px;
        width: 100%;
        background: #F2F3F4;
    }
    .header_wrapper{
        display: inline-block;
        vertical-align: top;
        width: 960px;
        height: 100%;
        position: relative;
        .header_logos{
            position: absolute;
            left: 0px;
            height: 100%;

            &:before{
                content: "";
                position: absolute;
                left: 152px;
                top: 50%;
                @include transform(translate(0, -50%));
                width: 1px;
                background:#aaa;
                height: 30px;
            }

            .logo_ceq{
                background:url("/images/logos/logo-ceq-institute@2x.png") no-repeat 0 0;
                background-size: 100% 100%;
                width: 140px;
                height: 40px;
                position: absolute;
                left: 0px;
                top: 50%;
                @include transform(translate(0, -50%));
            }

            .logo_datacenter{
                position: absolute;
                left: 170px;
                top: 50%;
                @include transform(translate(0, -50%));
                background: url("/images/logos/logo-ceq-datacenter.svg") no-repeat 0px 0;
                width: 97px;
                height: 31px;
                background-size: 100% 100%;
                z-index: 1000;
            }

        }
        .header_menu{
            position: absolute;
            right: 0px;
            height: 100%;
            .menu_link{
                width: 80px;
                margin-left: 4px;
                float: left;
                height: 100%;
                font-size: 12px;
                text-decoration: none;
                color: $colorBlack;
                position: relative;
                &:after{
                    content: "";
                    position: absolute;
                    left: 0px;
                    bottom: 0px;
                    width: 100%;
                    height: 4px;
                    display: none;
                }
                &:hover{
                    background: $colorBlack;
                    color: #fff;
                    font-family: "dm_sansbold";
                    &:after{
                        display: block;
                    }
                }
                &[data-link="home"]{
                    &:after{
                        background-color: $colorBlue;
                    }
                }
                &[data-link="comparison"]{
                    &:after{
                        background-color: $colorCyan;
                    }
                }
                &[data-link="country"]{
                    &:after{
                        background-color: $colorGreen;
                    }
                }
                &[data-link="sustainable"]{
                    &:after{
                        background-color: $colorPurple;
                    }
                }
                &[data-link="thematic"], &[data-link="sources"]{
                    &:after{
                        background-color: $colorOrange2;
                    }
                }
                &[data-link="about"]{
                    &:after{
                        background-color: $colorBlue;
                    }
                }
                .link_txt{
                    position: absolute;
                    top: 50%;
                    @include transform(translate(0,-50%));
                    left: 0px;
                    width: 100%;
                    text-align: center;
                }
                &.selected{
                    font-family: "dm_sansbold";
                    &:after{
                        display: block;
                    }
                }
            }
        }
    }
}

</style>
