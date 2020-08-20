import axios from 'axios'
import {_} from 'underscore'

export const state = () => ({

  itemsData : [],
  DBCountries: [],
  DBCountriesObj: {},
  DBIndicators: [],
  DBIndicatorsObj: {},
})

export const getters = {

}

export const mutations = {


  loadCountries(state,datas){
    state.DBCountries = datas

    state.DBCountriesObj = {}
    _.each(state.DBCountries, function (objCountry){
      state.DBCountriesObj[objCountry.code] = objCountry
    })
  },

  loadIndicators(state,datas){
    state.DBIndicators = datas

    state.DBIndicatorsObj = {}
    _.each(state.DBIndicators, function (objIndicator){
      state.DBIndicatorsObj[objIndicator.id] = objIndicator
    })
  },

}

export const actions = {

}