import Vue from 'vue'
import axios from 'axios'
import {_} from 'underscore'
var slugify = require("underscore.string/slugify")

import html2canvas from 'html2canvas'

var self = this

var countryISOMapping3To2 = {AFG: "AF", ALA: "AX", ALB: "AL", DZA: "DZ", ASM: "AS", AND: "AD", AGO: "AO", AIA: "AI", ATA: "AQ", ATG: "AG", ARG: "AR", ARM: "AM", ABW: "AW", AUS: "AU", AUT: "AT", AZE: "AZ", BHS: "BS", BHR: "BH", BGD: "BD", BRB: "BB", BLR: "BY", BEL: "BE", BLZ: "BZ", BEN: "BJ", BMU: "BM", BTN: "BT", BOL: "BO", BIH: "BA", BWA: "BW", BVT: "BV", BRA: "BR", VGB: "VG", IOT: "IO", BRN: "BN", BGR: "BG", BFA: "BF", BDI: "BI", KHM: "KH", CMR: "CM", CAN: "CA", CPV: "CV", CYM: "KY", CAF: "CF", TCD: "TD", CHL: "CL", CHN: "CN", HKG: "HK", MAC: "MO", CXR: "CX", CCK: "CC", COL: "CO", COM: "KM", COG: "CG", COD: "CD", COK: "CK", CRI: "CR", CIV: "CI", HRV: "HR", CUB: "CU", CYP: "CY", CZE: "CZ", DNK: "DK", DJI: "DJ", DMA: "DM", DOM: "DO", ECU: "EC", EGY: "EG", SLV: "SV", GNQ: "GQ", ERI: "ER", EST: "EE", ETH: "ET", FLK: "FK", FRO: "FO", FJI: "FJ", FIN: "FI", FRA: "FR", GUF: "GF", PYF: "PF", ATF: "TF", GAB: "GA", GMB: "GM", GEO: "GE", DEU: "DE", GHA: "GH", GIB: "GI", GRC: "GR", GRL: "GL", GRD: "GD", GLP: "GP", GUM: "GU", GTM: "GT", GGY: "GG", GIN: "GN", GNB: "GW", GUY: "GY", HTI: "HT", HMD: "HM", VAT: "VA", HND: "HN", HUN: "HU", ISL: "IS", IND: "IN", IDN: "ID", IRN: "IR", IRQ: "IQ", IRL: "IE", IMN: "IM", ISR: "IL", ITA: "IT", JAM: "JM", JPN: "JP", JEY: "JE", JOR: "JO", KAZ: "KZ", KEN: "KE", KIR: "KI", PRK: "KP", KOR: "KR", KWT: "KW", KGZ: "KG", LAO: "LA", LVA: "LV", LBN: "LB", LSO: "LS", LBR: "LR", LBY: "LY", LIE: "LI", LTU: "LT", LUX: "LU", MKD: "MK", MDG: "MG", MWI: "MW", MYS: "MY", MDV: "MV", MLI: "ML", MLT: "MT", MHL: "MH", MTQ: "MQ", MRT: "MR", MUS: "MU", MYT: "YT", MEX: "MX", FSM: "FM", MDA: "MD", MCO: "MC", MNG: "MN", MNE: "ME", MSR: "MS", MAR: "MA", MOZ: "MZ", MMR: "MM", NAM: "NA", NRU: "NR", NPL: "NP", NLD: "NL", ANT: "AN", NCL: "NC", NZL: "NZ", NIC: "NI", NER: "NE", NGA: "NG", NIU: "NU", NFK: "NF", MNP: "MP", NOR: "NO", OMN: "OM", PAK: "PK", PLW: "PW", PSE: "PS", PAN: "PA", PNG: "PG", PRY: "PY", PER: "PE", PHL: "PH", PCN: "PN", POL: "PL", PRT: "PT", PRI: "PR", QAT: "QA", REU: "RE", ROU: "RO", RUS: "RU", RWA: "RW", BLM: "BL", SHN: "SH", KNA: "KN", LCA: "LC", MAF: "MF", SPM: "PM", VCT: "VC", WSM: "WS", SMR: "SM", STP: "ST", SAU: "SA", SEN: "SN", SRB: "RS", SYC: "SC", SLE: "SL", SGP: "SG", SVK: "SK", SVN: "SI", SLB: "SB", SOM: "SO", ZAF: "ZA", SGS: "GS", SSD: "SS", ESP: "ES", LKA: "LK", SDN: "SD", SUR: "SR", SJM: "SJ", SWZ: "SZ", SWE: "SE", CHE: "CH", SYR: "SY", TWN: "TW", TJK: "TJ", TZA: "TZ", THA: "TH", TLS: "TL", TGO: "TG", TKL: "TK", TON: "TO", TTO: "TT", TUN: "TN", TUR: "TR", TKM: "TM", TCA: "TC", TUV: "TV", UGA: "UG", UKR: "UA", ARE: "AE", GBR: "GB", USA: "US", UMI: "UM", URY: "UY", UZB: "UZ", VUT: "VU", VEN: "VE", VNM: "VN", VIR: "VI", WLF: "WF", ESH: "EH", YEM: "YE", ZMB: "ZM", ZWE: "ZW"}

var countryISOMapping2To3 = {AF: 'AFG', AX: 'ALA', AL: 'ALB', DZ: 'DZA', AS: 'ASM', AD: 'AND', AO: 'AGO', AI: 'AIA', AQ: 'ATA', AG: 'ATG', AR: 'ARG', AM: 'ARM', AW: 'ABW', AU: 'AUS', AT: 'AUT', AZ: 'AZE', BS: 'BHS', BH: 'BHR', BD: 'BGD', BB: 'BRB', BY: 'BLR', BE: 'BEL', BZ: 'BLZ', BJ: 'BEN', BM: 'BMU', BT: 'BTN', BO: 'BOL', BA: 'BIH', BW: 'BWA', BV: 'BVT', BR: 'BRA', VG: 'VGB', IO: 'IOT', BN: 'BRN', BG: 'BGR', BF: 'BFA', BI: 'BDI', KH: 'KHM', CM: 'CMR', CA: 'CAN', CV: 'CPV', KY: 'CYM', CF: 'CAF', TD: 'TCD', CL: 'CHL', CN: 'CHN', HK: 'HKG', MO: 'MAC', CX: 'CXR', CC: 'CCK', CO: 'COL', KM: 'COM', CG: 'COG', CD: 'COD', CK: 'COK', CR: 'CRI', CI: 'CIV', HR: 'HRV', CU: 'CUB', CY: 'CYP', CZ: 'CZE', DK: 'DNK', DJ: 'DJI', DM: 'DMA', DO: 'DOM', EC: 'ECU', EG: 'EGY', SV: 'SLV', GQ: 'GNQ', ER: 'ERI', EE: 'EST', ET: 'ETH', FK: 'FLK', FO: 'FRO', FJ: 'FJI', FI: 'FIN', FR: 'FRA', GF: 'GUF', PF: 'PYF', TF: 'ATF', GA: 'GAB', GM: 'GMB', GE: 'GEO', DE: 'DEU', GH: 'GHA', GI: 'GIB', GR: 'GRC', GL: 'GRL', GD: 'GRD', GP: 'GLP', GU: 'GUM', GT: 'GTM', GG: 'GGY', GN: 'GIN', GW: 'GNB', GY: 'GUY', HT: 'HTI', HM: 'HMD', VA: 'VAT', HN: 'HND', HU: 'HUN', IS: 'ISL', IN: 'IND', ID: 'IDN', IR: 'IRN', IQ: 'IRQ', IE: 'IRL', IM: 'IMN', IL: 'ISR', IT: 'ITA', JM: 'JAM', JP: 'JPN', JE: 'JEY', JO: 'JOR', KZ: 'KAZ', KE: 'KEN', KI: 'KIR', KP: 'PRK', KR: 'KOR', KW: 'KWT', KG: 'KGZ', LA: 'LAO', LV: 'LVA', LB: 'LBN', LS: 'LSO', LR: 'LBR', LY: 'LBY', LI: 'LIE', LT: 'LTU', LU: 'LUX', MK: 'MKD', MG: 'MDG', MW: 'MWI', MY: 'MYS', MV: 'MDV', ML: 'MLI', MT: 'MLT', MH: 'MHL', MQ: 'MTQ', MR: 'MRT', MU: 'MUS', YT: 'MYT', MX: 'MEX', FM: 'FSM', MD: 'MDA', MC: 'MCO', MN: 'MNG', ME: 'MNE', MS: 'MSR', MA: 'MAR', MZ: 'MOZ', MM: 'MMR', NA: 'NAM', NR: 'NRU', NP: 'NPL', NL: 'NLD', AN: 'ANT', NC: 'NCL', NZ: 'NZL', NI: 'NIC', NE: 'NER', NG: 'NGA', NU: 'NIU', NF: 'NFK', MP: 'MNP', NO: 'NOR', OM: 'OMN', PK: 'PAK', PW: 'PLW', PS: 'PSE', PA: 'PAN', PG: 'PNG', PY: 'PRY', PE: 'PER', PH: 'PHL', PN: 'PCN', PL: 'POL', PT: 'PRT', PR: 'PRI', QA: 'QAT', RE: 'REU', RO: 'ROU', RU: 'RUS', RW: 'RWA', BL: 'BLM', SH: 'SHN', KN: 'KNA', LC: 'LCA', MF: 'MAF', PM: 'SPM', VC: 'VCT', WS: 'WSM', SM: 'SMR', ST: 'STP', SA: 'SAU', SN: 'SEN', RS: 'SRB', SC: 'SYC', SL: 'SLE', SG: 'SGP', SK: 'SVK', SI: 'SVN', SB: 'SLB', SO: 'SOM', ZA: 'ZAF', GS: 'SGS', SS: 'SSD', ES: 'ESP', LK: 'LKA', SD: 'SDN', SR: 'SUR', SJ: 'SJM', SZ: 'SWZ', SE: 'SWE', CH: 'CHE', SY: 'SYR', TW: 'TWN', TJ: 'TJK', TZ: 'TZA', TH: 'THA', TL: 'TLS', TG: 'TGO', TK: 'TKL', TO: 'TON', TT: 'TTO', TN: 'TUN', TR: 'TUR', TM: 'TKM', TC: 'TCA', TV: 'TUV', UG: 'UGA', UA: 'UKR', AE: 'ARE', GB: 'GBR', US: 'USA', UM: 'UMI', UY: 'URY', UZ: 'UZB', VU: 'VUT', VE: 'VEN', VN: 'VNM', VI: 'VIR', WF: 'WLF', EH: 'ESH', YE: 'YEM', ZM: 'ZMB', ZW: 'ZWE'}

var missingDataObj = {
    "N/A-0": "The data is not provided or the cell is blank in CEQSI_Sep11_2019.xlsx ",
    "N/A-1": "The indicator should not be calculated due to methodological reasons or characteristics of the fiscal system.",
    "N/A-2": "The indicator was not calculated by the author/s.",
    "N/A-3": "The indicator was calculated but it is not publicly available, requests should be put directly to author/s.",
    "N/A-4": "The indicator is no longer published on the World Bank's Data Bank.",
    "N/A-5": "The indicator is no longer published on the World Bank's report.",
    "N/A-6": "Omitted for being unreliable data.",
    "N/A-7": "The indicator has not been calculated."
}

var incomeCategoriesOrder = {
    "Total": -1,
    "y < 1.25":0,
    "y < 1.90": 1,
    "1.25 <= y < 2.50": 2,
    "1.90 <= y < 3.20": 3,
    "2.50 <= y < 4.00": 4,
    "3.20 <= y < 5.50": 5,
    "4.00 <= y < 10.00": 6,
    "5.50 <= y < 10.00": 7,
    "10.00 <= y < 50.00": 8,
    "50.00 <= y": 9
}

// get indicators table
// GLOBAL VAR : $store.DBClassifIndicators - $store.DBIndicators - $store.DBIndicatorsObj
async function getAPIDatavalues ($store, indicatorsIDS, indicatorDimension) {

    // console.log('domains.auth.getUserInfos')
    const config = {
        headers: {
        // 'authorization': 'Bearer ' + token
        }
    }
    
    var randNb = Math.round(Math.random()*1000000)
    var apiRequest = process.env.CONFIG_APP.api_url + 'getDatavalues.php?rand='+randNb+'&indicatorsIDS='+indicatorsIDS;
    if(indicatorDimension == "Income Category") apiRequest = process.env.CONFIG_APP.api_url + 'getDatavaluesInccat.php?rand='+randNb+'&indicatorsIDS='+indicatorsIDS
    else if(indicatorDimension == "Decile") apiRequest = process.env.CONFIG_APP.api_url + 'getDatavaluesDecile.php?rand='+randNb+'&indicatorsIDS='+indicatorsIDS

        
    return axios.get(apiRequest, config)
    .then(response => {
        var tmpArray = response.data
        return tmpArray
    })
    .catch(err => {
        console.log('Une erreur est survenue', err)
        return null
    })
}

// get indicators table
// GLOBAL VAR : $store.DBClassifIndicators - $store.DBIndicators - $store.DBIndicatorsObj
async function getAPICountriesSources ($store) {

    // console.log('domains.auth.getUserInfos')
    const config = {
        headers: {
        // 'authorization': 'Bearer ' + token
        }
    }
    
    var randNb = Math.round(Math.random()*1000000)
    var apiRequest = process.env.CONFIG_APP.api_url + 'getCountriesSources.php?rand='+randNb;
        
    return axios.get(apiRequest, config)
    .then(response => {
        var tmpArray = response.data
        return tmpArray
    })
    .catch(err => {
        console.log('Une erreur est survenue', err)
        return null
    })
}

function computeIndicatorsObj (DBIndicatorsSelector) {
    var themedIndicatorsObj = {};

    _.each(DBIndicatorsSelector, function (indicatorObj, index){

        if(themedIndicatorsObj[indicatorObj.theme] == undefined) {
            themedIndicatorsObj[indicatorObj.theme] = {
                themeID: indicatorObj.theme,
                totalItems: 0,
                level1Items: {}
            }
        }

        if(indicatorObj.category == "") {
            if(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name] == undefined) {
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name] = {
                    name: indicatorObj.name,
                    type: "indicator",
                    indicator: indicatorObj,
                    concepts: [],
                    povertyLines: [],
                    conversionYears: [],
                    dimensions: [],
                }
                themedIndicatorsObj[indicatorObj.theme].totalItems += 1;
            }

            themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].dimensions.push(indicatorObj.dimension);
            themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].dimensions = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].dimensions);

            if(indicatorObj.concept !== "") {
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].concepts.push(indicatorObj.concept)
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].concepts = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].concepts)
            }

            if(indicatorObj.poverty_line !== "") {
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].povertyLines.push(indicatorObj.poverty_line)
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].povertyLines = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].povertyLines)
            }

            if(indicatorObj.conversion_year !== "") {
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].conversionYears.push(indicatorObj.conversion_year)
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].conversionYears = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.name].conversionYears)
            }
        } else {
            if(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category] == undefined) {
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category] = {
                    id: indicatorObj.category,
                    type: "category",
                    totalItems: 0,
                    level2Items: {}
                }
            }

            if(indicatorObj.subcategory_1 == "") {
                if(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name] == undefined) {
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name] = {
                        name: indicatorObj.name,
                        type: "indicator",
                        indicator: indicatorObj,
                        concepts: [],
                        povertyLines: [],
                        conversionYears: [],
                        dimensions: []
                    }
                    themedIndicatorsObj[indicatorObj.theme].totalItems += 1;
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].totalItems += 1;
                }

                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].dimensions.push(indicatorObj.dimension)
                themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].dimensions = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].dimensions)

                if(indicatorObj.concept !== "") {
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].concepts.push(indicatorObj.concept)
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].concepts = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].concepts)
                }

                if(indicatorObj.poverty_line !== "") {
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].povertyLines.push(indicatorObj.poverty_line)
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].povertyLines = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].povertyLines)
                }

                if(indicatorObj.conversion_year !== "") {
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].conversionYears.push(indicatorObj.conversion_year)
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].conversionYears = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.name].conversionYears)
                }
            } else {
                if(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1] == undefined) {
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1] = {
                        id: indicatorObj.subcategory_1,
                        type: "subcategory1",
                        totalItems: 0,
                        level3Items: {}
                    }
                }

                if(indicatorObj.subcategory_2 == "") {
                    if(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name] == undefined) {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name] = {
                            name: indicatorObj.name,
                            type: "indicator",
                            indicator: indicatorObj,
                            concepts: [],
                            povertyLines: [],
                            conversionYears: [],
                            dimensions: []
                        }
                        themedIndicatorsObj[indicatorObj.theme].totalItems += 1;
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].totalItems += 1;
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].totalItems += 1;
                    }

                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].dimensions.push(indicatorObj.dimension)
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].dimensions = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].dimensions)

                    if(indicatorObj.concept !== "") {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].concepts.push(indicatorObj.concept)
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].concepts = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].concepts)
                    }

                    if(indicatorObj.poverty_line !== "") {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].povertyLines.push(indicatorObj.poverty_line)
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].povertyLines = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].povertyLines)
                    }

                    if(indicatorObj.conversion_year !== "") {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].conversionYears.push(indicatorObj.conversion_year)
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].conversionYears = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.name].conversionYears)
                    }
                } else {
                    if(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2] == undefined) {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2] = {
                            id: indicatorObj.subcategory_2,
                            type: "subcategory2",
                            totalItems: 0,
                            level4Items: {}
                        }
                    }

                    if(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name] == undefined) {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name] = {
                            name: indicatorObj.name,
                            type: "indicator",
                            indicator: indicatorObj,
                            concepts: [],
                            povertyLines: [],
                            conversionYears: [],
                            dimensions: []
                        }
                        themedIndicatorsObj[indicatorObj.theme].totalItems += 1;
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].totalItems += 1;
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].totalItems += 1;
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].totalItems += 1;
                    }

                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].dimensions.push(indicatorObj.dimension)
                    themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].dimensions = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].dimensions)

                    if(indicatorObj.concept !== "") {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].concepts.push(indicatorObj.concept)
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].concepts = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].concepts)
                    }

                    if(indicatorObj.poverty_line !== "") {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].povertyLines.push(indicatorObj.poverty_line)
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].povertyLines = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].povertyLines)
                    }

                    if(indicatorObj.conversion_year !== "") {
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].conversionYears.push(indicatorObj.conversion_year)
                        themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].conversionYears = _.uniq(themedIndicatorsObj[indicatorObj.theme].level1Items[indicatorObj.category].level2Items[indicatorObj.subcategory_1].level3Items[indicatorObj.subcategory_2].level4Items[indicatorObj.name].conversionYears)
                    }
                }
            }
        }
    });

    return  themedIndicatorsObj;
}

function computeIndicatorID(selectedIndicatorObj, DBIndicators, conceptPosition, povertyLineValue, conversionYearValue, decileValue, inccatValue) {
    var self = this;

    console.log("computeIndicatorID", selectedIndicatorObj, DBIndicators, conceptPosition, povertyLineValue, conversionYearValue)

    var filteredIndicators = _.filter(DBIndicators, function (indic) {
        return (indic.category == selectedIndicatorObj.indicator.category && indic.subcategory_1 == selectedIndicatorObj.indicator.subcategory_1 && indic.subcategory_2 == selectedIndicatorObj.indicator.subcategory_2 && indic.theme == selectedIndicatorObj.indicator.theme && indic.name == selectedIndicatorObj.indicator.name)
    });
    console.log("1st filteredIndicators", filteredIndicators)

    if(selectedIndicatorObj.concepts !== undefined && selectedIndicatorObj.concepts.length > 0) {
        if(conceptPosition == "off") {
            filteredIndicators = _.filter(filteredIndicators, function (indic){
                return indic.concept == "PDI";
            })
        } else if(conceptPosition == "on") {
            filteredIndicators = _.filter(filteredIndicators, function (indic){
                return indic.concept == "PGT"
            })
        }
    }
    console.log("2nd filteredIndicators", filteredIndicators)

    if(selectedIndicatorObj.povertyLines.length > 0) {
        filteredIndicators = _.filter(filteredIndicators, function (indic){
            return indic.poverty_line == povertyLineValue
        });
    }
    console.log("3rd filteredIndicators", filteredIndicators)

    if(selectedIndicatorObj.conversionYears.length > 0) {
        var tmpConvValue = conversionYearValue;
        if(tmpConvValue == "None") tmpConvValue = "";
        filteredIndicators = _.filter(filteredIndicators, function (indic){
            return indic.conversion_year == tmpConvValue
        });
    }
    console.log("4th filteredIndicators", filteredIndicators)

    if(selectedIndicatorObj.indicator.dimension == "Decile") {
        console.log("check deciles", selectedIndicatorObj)
    }

    return filteredIndicators[0].id;
}

function exportHighcharts (containerID, way, exportParams) {
    var self = this

    this.$ExportMask = document.querySelector("#ExportMask");
    this.$ExportMask.setAttribute("data-displayed", "true");

    var pdfWay = "p";
    if(way !== undefined) pdfWay = way;
    console.log("pdfWay", pdfWay);

    this.dlElement = document.querySelector('#'+containerID);
    this.dlElement.setAttribute("data-downloading", "true");

    var width = this.dlElement.offsetWidth;
    var height = this.dlElement.offsetHeight;
    var ratio = width / height;
    console.log(width, height);

    html2canvas(this.dlElement, {scrollX: 0, scrollY: -window.scrollY}).then(canvas => {
        self.dlElement.setAttribute("data-downloading", "false");
        var imgData = canvas.toDataURL("image/jpeg", 1.0);
        var pdf = new jsPDF(pdfWay, 'mm', "a4");

        var dpiWidth = width * 0.264583;
        var dpiHeight = height * 0.264583;

        var logoData = "data:image/png;base64,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"


        //pdf.addFont('dm_sansregular', 'dm_sansregular', 'normal', 'StandardEncoding');
        //pdf.addFont('dm_sansbold', 'dm_sansbold', 'normal', 'StandardEncoding');
        //pdf.setFont('dmsans-regular-webfont');
        /*
        pdf.addFont('Arial', 'Arial', 'normal');
        pdf.setFontType('normal');
        pdf.setFont('Arial');
        */

        pdf.addFont('ArialMS', 'Arial', 'normal');
        pdf.setFont('helvetica');
        pdf.addImage(logoData, "PNG", 10, 5)

        var graphPositionY = 30;

        console.log("exportParams", exportParams);
        if(exportParams !== undefined) {
            if(exportParams.arianLabel !== undefined && exportParams.arianLabel !== "") {
                pdf.setFontSize(12)
                pdf.text(10, graphPositionY, exportParams.arianLabel)
                graphPositionY += 6;
            }

            if(exportParams.title !== undefined && exportParams.title !== "") {
                pdf.setFontType('bold');
                pdf.setFontSize(16)
                pdf.text(10, graphPositionY, exportParams.title)
                graphPositionY += 5;
            }

            if(exportParams.subtitle !== undefined && exportParams.subtitle !== "") {
                pdf.setFontType('normal');
                pdf.setFontSize(10)
                pdf.text(10, graphPositionY, exportParams.subtitle)
                graphPositionY += 5;
            }
        }       

        pdf.addImage(imgData, 'JPEG', 10, graphPositionY, dpiWidth, dpiHeight);
        pdf.save("export-CEQ-data_center.pdf");
        self.$ExportMask.setAttribute("data-displayed", "false");
    });

    /*
    setTimeout(function(){
        self.dlElement.setAttribute("data-downloading", "false");
    }, 0)
    */
}

function downloadAllCountryData (contentType) {
    var self = this;

    var tab_text = ''
    var data_type = 'data:application/vnd.ms-excel'

    tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">'
    tab_text += '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>'

    tab_text += '<x:Name>Data</x:Name>'

    tab_text += '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>'
    tab_text += '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>'

    tab_text += "<table border='1px'>"

    tab_text += '<tr><th>Indicator</th><th>Country</th><th>Year</th><th>Data Value</th></tr>'

    var lastYear = self.timeseriesCategories[self.timeseriesCategories.length-1]
    _.each(this.allAreasData, function (countryObj){
        var toAppend = false
        if(contentType == 'chart') {
            if(_.indexOf(self.selectedGeographies, countryObj.m49) > -1) toAppend = true
        } else {
            toAppend = true
        }

        if(toAppend) {


            if(self.timeseriesDisplayed) {
                _.each(self.timeseriesCategories, function(categYear, indexYear){
                    _.each(self.timeseriesGeographiesData, function(geoObj){
                        var countryValue = geoObj.data[indexYear]
                        if(isNaN(countryValue)) countryValue = "no data";

                        if(self.selectedIndicatorObj.dataviz_type == "ordinal") {
                            countryValue = (parseFloat(countryValue)).toFixed(1)
                            if(countryValue=="0.0") countryValue = "0";
                            else if(countryValue=="1.0") countryValue = "1";
                        }

                        tab_text += '<tr><td>'+self.$store.DBIndicatorsObj[self.selectedIndicator].name+'</td><td>'+geoObj.name+'</td><td>'+categYear+'</td><td>'+countryValue+'</td></tr>'
                    })
                })
            } else {
                var countryValue = countryObj.value
                if(isNaN(countryValue)) countryValue = "no data"
                    else {
                        if(self.selectedIndicatorObj.dataviz_type == "ordinal") {

                            countryValue = (parseFloat(countryValue)).toFixed(1)
                            if(countryValue=="0.0") countryValue = "0";
                            else if(countryValue=="1.0") countryValue = "1";

                        }
                    }
                    tab_text += '<tr><td>'+self.$store.DBIndicatorsObj[self.selectedIndicator].name+'</td><td>'+self.$store.DBGeographyObj[countryObj.m49].name+'</td><td>'+self.indicatorLastYear+'</td><td>'+countryValue+'</td></tr>'
                }
            }
        })

    tab_text += '<tr></tr><tr></tr><tr></tr>';
    tab_text += '<tr><td>PARIS21 Statistical Capacity Monitor based on ' + this.selectedIndicatorObj.source + '</td></tr>';
    tab_text += '<tr><td>' + this.selectedIndicatorObj.definition + '</td></tr>';
    tab_text = tab_text + '</table></body></html>';

    tab_text = tab_text.replace(/[é]/g,"&eacute;")
    .replace(/[É]/g,"&Eacute;")
    .replace(/[à]/g,"&agrave;")
    .replace(/[è]/g,"&egrave;")
    .replace(/[â]/g,"&acirc;")
    .replace(/[Â]/g,"&Acirc;");


    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    this.xlsLinkAttr = data_type + ', ' + encodeURIComponent(tab_text)

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
            var blob = new Blob([tab_text], {
                type: "application/csv;charset=utf-8;"
            });
            navigator.msSaveBlob(blob, 'Statistical Capacity Monitor data download.xls');
        }
    } else {
        document.querySelector('#HeadLinkFake').setAttribute('href', this.xlsLinkAttr)
        document.querySelector('#HeadLinkFake').click()
    }
}

function exportGTAB(containerID, exportParams) {
    console.log("exportGTAB", containerID, exportParams)
    this.dlElement = document.querySelector('#' + containerID);
    console.log(this.dlElement, this.dlElement.outerHTML);

    var HTMLOuter = this.dlElement.outerHTML;
    var datasHTML = "<html><head></head><body id='bodySite' size='A4' layout='portrait'><div class='export_page'><img src='https://staging-ceq-data-center.wedodata.dev/images/logos/banner-logo-ceq@2x.png' width='270' /><div class='export_content'>";

    if(exportParams.arianLabel !== undefined && exportParams.arianLabel !== "") {
        datasHTML += "<div class='export_arian'>"+exportParams.arianLabel+"</div>";
    }

    if(exportParams.title !== undefined && exportParams.title !== "") {
        datasHTML += "<div class='export_title'>"+exportParams.title+"</div>";
    }

    if(exportParams.subtitle !== undefined && exportParams.subtitle !== "") {
        datasHTML += "<div class='export_subtitle'>"+exportParams.subtitle+"</div>";
    }

    datasHTML += HTMLOuter+"</div></div></body></html>";

    //http://localhost:3006/wddceq/html-to-pdf
    //https://staging.pdf.gtab.io/wddceq/html-to-pdf
    axios.post('https://staging.pdf.gtab.io/wddceq/html-to-pdf', 
        {
            datas: datasHTML,
            title: "export-CEQ-data_center.pdf",
            source: "https://staging-ceq-data-center.wedodata.dev/", //https://staging-ceq-data-center.wedodata.dev/  http://localhost:1360
            assets: {              // List assets by type for rewriting html urls
                'css': {
                   'folder': 'css', // Ce sera 'build' sur le staging ou la prod 
                   'files': ['print.css'] // print.min.css staging/prod
                 }
              }
        },
        {
            responseType: 'blob',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRzIjoid2Vkb2RhdGEiLCJwcm9qZWN0IjoiQ0VRIERBVEEgQ0VOVEVSIn0.8ns_s_45dlN--EOd3yjdoDX_AwcsXUs73JTJ_psDxDs",
                
            }
    }).then(response => {
        console.log("response", response);
        var file = new Blob([response.data], { type: 'application/pdf' })
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL); 
        var a         = document.createElement('a');
        a.href        = fileURL; 
        a.target      = '_blank';
        a.download    = 'export-CEQ-data_center.pdf';
        document.body.appendChild(a);
        a.click();
    })
}


function csvToArray (csvString) {
// The array we're going to build
var csvArray = []
// Break it into rows to start
var csvRows = csvString.split(/\n/)
// Take off the first line to get the headers, then split that into an array
var csvHeaders = csvRows.shift().split(';')

// Loop through remaining rows
for (var rowIndex = 0; rowIndex < csvRows.length; ++rowIndex) {
    var rowArray = csvRows[rowIndex].split(';')

// Create a new row object to store our data.
var rowObject = csvArray[rowIndex] = {}

// Then iterate through the remaining properties and use the headers as keys
for (var propIndex = 0; propIndex < rowArray.length; ++propIndex) {
// Grab the value from the row array we're looping through...
var propValue = rowArray[propIndex].replace(/^"|"$/g, '')
// ...also grab the relevant header (the RegExp in both of these removes quotes)
var propLabel = csvHeaders[propIndex].replace(/^"|"$/g, '')

rowObject[propLabel] = propValue
}
}

return csvArray
}

function getLastKeyFromObj(obj, param, returnType){
    if(obj[param] !== undefined) {
        var sizeValues = _.size(obj[param])
        var dataValue = _.keys(obj[param])[sizeValues-1]
        return dataValue
    }
    return undefined
}

export {
    getAPIDatavalues,
    getAPICountriesSources,
    countryISOMapping3To2,
    countryISOMapping2To3,
    missingDataObj,
    getLastKeyFromObj,
    computeIndicatorsObj,
    computeIndicatorID,
    incomeCategoriesOrder,
    exportHighcharts,
    exportGTAB
}
