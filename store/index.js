// main store index

export const state = () => ({

  // GLOABAL APP ENV
  appTitle : process.env.appTitle,
  runMode : process.env.MODE_APP,
  log : process.env.LOG,

  // FOR TRANSLATIONS
  defaultLocale: undefined, 
  locale: undefined, 
  locales: undefined,

  appMounted:false,
  endAnim:false,

  selectedCountry : "",
  selectedTheme : "",

  projectGrouping : "pays",
  projectSelector:"",

  selectedSlide:1,
  userProjectID:""

})

export const getters = {

  // INTERNATIONALIZATION
  getDefaultLocale : (state, getters) => {
    return process.env.CONFIG_APP.defaultLocale
  },

  getCurrentLocale : (state, getters) => {
    return state.locale ? state.locale : getters.getDefaultLocale
  },

}

export const mutations = {

  // INTERNATIONALIZATION
  initLocales(state) {
    //console.log("S-index-M-initLocales ... ")

    let localesBuild = process.env.CONFIG_APP.localesBuild
    state.locales = localesBuild

    let defaultLocale = process.env.CONFIG_APP.defaultLocale
    state.locale = defaultLocale
    state.defaultLocale = defaultLocale

  },

  switchLocale(state, localeObject) {
    //console.log("S-index-M-switchLocale / localeObject : ", localeObject)
    state.locale = localeObject.code
    // this.$i18n.locale = localeObject.code
  },

  toggleMounted(state){
    state.appMounted = true
  },

  toggleEndanim(state){
    state.endAnim = true
  },

  selectCountry(state,country){
    state.selectedCountry = country
  },

  selectTheme(state,theme){
    state.selectedTheme = theme
  },

  updateGrouping(state,type){
    state.projectGrouping = type
  },

  updateSelector(state,value){
    state.projectSelector = value
  },

  updateSlide(state,n){
    state.selectedSlide = n
  },

  updateUserProjectID(state,id){
    state.userProjectID = id
  }



}

export const actions = {

}