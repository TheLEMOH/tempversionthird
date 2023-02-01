import CreateLineChart from "./termogramm"
import CreateAtmosphere from "./atmosphere"
import CreateInversion from "./inversion"
import InitWindPm from "./wind"

import { CreateGridDifference } from "./difference"


const InitGrap = async (sites, data, heights, contour) => {
    const CreateGraphics = async (prof, sensor, heights, contour, site) => {
        let termogramma = []
        let atmosphere = []
        let inversion = []
        let windpm = []
        let atmosphereDifference = []

        if (site.graphics.termogramma) {
            termogramma = CreateLineChart(prof, heights)
        }

        if (site.graphics.atmosphere) {
            atmosphere = CreateAtmosphere(prof, heights, contour, false, site)
        }

        if (site.graphics.inversion) {
            inversion = CreateInversion(prof, heights)
        }

        if (site.graphics.windpm) {
            windpm = InitWindPm(sensor)
        }

        if (site.graphics.atmosphereDifference) {
            const dataForDifferenceAtmosphere = [data[4310], data[1]]
            const grid = await CreateGridDifference(dataForDifferenceAtmosphere, heights)
            atmosphereDifference = CreateAtmosphere(grid, heights)
        }

        return Promise.all([termogramma, atmosphere, inversion, windpm, atmosphereDifference]).then((res) => {
            return {
                termogramma: res[0],
                atmosphere: res[1],
                inversion: res[2],
                windpm: res[3],
                atmosphereDifference: res[4]
            }
        })
    }


    const graphics = []
    sites.forEach(site => {
        const postData = []
        site.sensor.forEach(sensor => {
            sensor.indicators.forEach(indicator => {

                postData.push(...data[sensor.id].filter(d => d.indicator == indicator))
            })
        })


        console.log(site.name)
        
        const g = CreateGraphics(data[site.id], postData, heights, contour, site)
        graphics.push({ data: g, site: site.id })
    })


    return Promise.all(graphics).then(async res => {
        const object = {}
        for (let i = 0; i < res.length; i++) {
            object[res[i].site] = await res[i].data
        }
        return object
    })
}




export default InitGrap