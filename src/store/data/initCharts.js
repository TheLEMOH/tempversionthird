import CreateLineChart from "./termogramm"
import CreateAtmosphere from "./atmosphere"
import CreateInversion from "./inversion"
import InitWindPm from "./wind"

const CreateGraphics = async(prof, sensor, heights, contour, s) => {
    const termogramma = CreateLineChart(prof, heights)
    const atmosphere = CreateAtmosphere(prof, heights, contour, false, s)
    const inversion = CreateInversion(prof, heights)
    const windpm = InitWindPm(sensor)
    return Promise.all([termogramma, atmosphere, inversion, windpm]).then((res) => {
        return {
            termogramma: res[0],
            atmosphere: res[1],
            inversion: res[2],
            windpm: res[3]
        }
    })
}


const InitGrap = async(sites, data, heights, contour) => {
    const graphics = []
    sites.forEach(s => {
        const g = CreateGraphics(data[s.id], data[s.sensor], heights, contour, s)
        graphics.push({ data: g, site: s.id })
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