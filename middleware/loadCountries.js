import axios from 'axios'
import {_} from 'underscore'

export default async function ({ store }) {
  // console.log('domains.auth.getUserInfos')
  const config = {
    headers: {
      // 'authorization': 'Bearer ' + token
    }
  }

  var randNb = Math.round(Math.random()*1000000)
  let countriesFromDB = await axios.get(process.env.CONFIG_APP.api_url + 'getCountries.php?rand='+randNb, config)
    .then(response => {
      var tmpArray = response.data
      var DBCountries = tmpArray
      console.log("in loadcountries", DBCountries)
      store.commit('database/loadCountries', DBCountries)
    })
    .catch(err => {
      console.log('Une erreur est survenue', err)
    })

  return true
}