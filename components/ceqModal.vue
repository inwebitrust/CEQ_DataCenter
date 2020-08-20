<template>
    <div class="ceq_modalwrapper" :data-displayed="(displayed) ? 'displayed' : ''" :data-type="type">
        <div class="ceq_modalbg" @click="closeModal()"></div>

        <div class="ceq_modal" v-if="type == 'countriesSelector'">
            <div class="modal_title">
                Highlight a country
                <a class="modal_closebt" @click="closeModal()"></a>
            </div>
            <div class="modal_content">
                <countriesSelector :mapID="mapID" :modaled="true" mapColor="orange" :countriesOnlyList="countriesSelectorDisplayedList"></countriesSelector>
            </div>
        </div>

        <div class="ceq_modal" v-if="type == 'aboutIndicators'">
            <div class="modal_title">
                About CEQ Indicators
                <a class="modal_closebt" @click="closeModal()"></a>
            </div>
            <div class="modal_content">
                <div class="content_title">Modal title</div>
                <div class="content_text">
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                    <br /><br />
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                    <br /><br />
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                    <br /><br />
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                    <br /><br />
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                    <br /><br />
                    Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices…
                </div>
            </div>
        </div>

        <div class="ceq_modal" v-if="type == 'downloadIndicators'">
            <div class="modal_title">
                Ceq standard Indicators
                <a class="modal_closebt" @click="closeModal()"></a>
            </div>
            <div class="modal_content">
                <div class="content_title">Download CEQ standard indicators by…</div>
                <div class="content_dlitems">
                    <button class="dlitembt" data-item="gender">Gender</button>
                    <button class="dlitembt" data-item="age">Child age groups</button>
                    <button class="dlitembt" data-item="race">Race and ethnicity</button>
                    <button class="dlitembt" data-item="urban">Urban/Rural</button>
                </div>
            </div>
        </div>        

    </div>
</template>

<script>

    import countriesSelector from '~/components/countriesSelector.vue'

    export default {
        components: {
            'countriesSelector': countriesSelector,
        },
        props: {
            displayed:{
                type:Boolean,
                default: function(){
                    return false
                },
            },
            type: {
                type: String,
                default: function () {
                    return 'privacy'
                }
            },
            countriesSelectorDisplayedList: {
                type:Array,
                default: function () {
                    return []
                }
            },
            mapID:{
                type:String,
                default: function (){
                    return "MapContainer"
                }
            }
        },
        data: function () {
            return {
                datafileURL: "",
                selectedModaledCountry: ''
            }
        },
        mounted: function () {
            this.datafileURL = process.env.CONFIG_APP.datafile_url;
        },
        methods: {
            closeModal: function() {
                this.$emit('closeModal')
            }
        },
        watch: {
            selectedModaledCountry: function () {
                console.log("watch parent", this.selectedModaledCountry);
                this.$parent.highlightedCountry = JSON.parse(JSON.stringify(this.selectedModaledCountry));
                this.$store.highlightedCountry = this.selectedModaledCountry;
                this.$emit('closeModal')
            },

            displayed: function () {
                if(this.displayed){
                    document.querySelector("body").setAttribute("data-overflowed", "true");
                } else {
                    document.querySelector("body").setAttribute("data-overflowed", "false");
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "~assets/scss/_variables.scss";
    @import "~assets/scss/_browsers.scss";

    .ceq_modalwrapper{
        position: fixed;
        left:0px;
        top: 0px;
        bottom: 0px;
        width: 100%;
        display: none;
        z-index: 1000000;
        &[data-displayed="displayed"]{
            display: block;
        }
        &[data-type="downloadIndicators"], &[data-type="aboutIndicators"]{
            .ceq_modalbg{
                background: rgba(68,128,148,0.9);
            }
            .ceq_modal{
                width: 800px;
                height: 300px;
                .modal_content{
                    padding: 40px;
                    text-align: center;
                    -webkit-box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                    -moz-box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                    box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                    .content_title{
                        font-size: 24px;
                        font-family: "dm_sansbold";
                    }
                    .content_dlitems{
                        margin-top: 80px;
                        margin-bottom: 60px;
                        .dlitembt{
                            font-size: 12px;
                            text-transform: uppercase;
                            font-family: "dm_sansbold";
                            margin: 0 20px;
                            position: relative;
                            outline: none;
                            display: inline-block;
                            vertical-align: top;
                            &[data-item="gender"]{
                                &:before{
                                    background: url("/images/icons/icon-download-data_gender.svg") no-repeat 0 0;
                                    background-size: 100% 100%;   
                                }   
                            }
                            &[data-item="age"]{
                                &:before{
                                    background: url("/images/icons/icon-download-data_age.svg") no-repeat 0 0;
                                    background-size: 100% 100%;   
                                }   
                            }
                            &[data-item="race"]{
                                &:before{
                                    background: url("/images/icons/icon-download-data_ethnicity.svg") no-repeat 0 0;
                                    background-size: 100% 100%;   
                                }   
                            }
                            &[data-item="urban"]{
                                &:before{
                                    background: url("/images/icons/icon-download-data_city.svg") no-repeat 0 0;
                                    background-size: 100% 100%;   
                                }   
                            }
                            &:before{
                                content: "";
                                position: absolute;
                                left: 50%;
                                bottom: 100%;
                                width: 60px;
                                height: 60px;
                                @include transform(translate(-50%, 0));
                            }
                            &:after{
                                content: "";
                                position: absolute;
                                left: 50%;
                                top: 100%;
                                margin-top: 10px;
                                @include transform(translate(-50%, 0));
                                width: 40px;
                                height: 32px;
                                border: 1px solid $colorBlack;
                                border-radius: 4px;
                                background: url("/images/icons/icon-download.svg") no-repeat center center;
                                background-size: 32px 32px;
                            }
                            &:hover{
                                &:after{
                                    background: url("/images/icons/icon-download_white.svg") no-repeat center center $colorBlack;
                                    background-size: 32px 32px;
                                }
                            }
                        }
                    }
                }
            }
        }

        &[data-type="aboutIndicators"]{
            .ceq_modal{
                height: auto;
                .modal_content{
                    max-height: 400px;
                    overflow: auto;
                    text-align: left;
                    -webkit-box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                    -moz-box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                    box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                }
            }
        }

        .ceq_modalbg{
            background:rgba(255,97,60,0.85);
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
        }
        .ceq_modal{
            position: absolute;
            left: 50%;
            top: 50%;
            @include transform(translate(-50%, -50%));
            width: 960px;
            height: 500px;
            text-align: left;
            #CountriesSelector{
                display: block !important;
            }
            .modal_title{
                color: #fff;
                font-size: 22px;
                position: relative;
                .modal_closebt{
                    position: absolute;
                    right: 0px;
                    bottom: 0px;
                    cursor: pointer;
                    background: url("/images/icons/icon-close-white.svg") no-repeat -6px -6px;
                    background-size: 40px 40px;
                    width: 30px;
                    height: 30px;
                    border:1px solid #fff;
                    border-radius: 3px;
                }
            }
            .modal_content{
                background: #fff;
                margin-top: 20px;
                -webkit-box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                -moz-box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
                box-shadow: 0px 20px 40px 0px rgba(26,26,26,1);
            }
        }
    }

</style>
