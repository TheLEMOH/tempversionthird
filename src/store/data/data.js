import { DownloadDataNewApi, DownloadDataNewApiStatistic, DownloadDataWindPm, Cut, CreateTimeGrid, CreateTimeLine } from "./download"
import { CreateShapes, CreateBorders } from "./shapes"
import { TemperatureDifference, } from "./difference"
import { CreateAnnotationsInverson, CreateAnnotationDate, Side, CreateAnnotationPoint /* CreateAnnotationsDifference */ } from "./annotation"
import CalculateIntervals from "./intervals"
import { HeightDifference } from "./heights"
import CreateProfile from "./profile"
import CreateRectangles from "./rectangles"
import Gradiend from "./gradient"
import CreateAdiabat from "./adiabat"
import InitGrap from "./initCharts"
import CreateTotalLines from "./linesTotal"
import DataTypes from "./dataTypes"
import CreateAnnotationWind from "./windAnnotations"

import Interpolate from "./interpolate"

const state = {
    data: {},
    chartData: {},
    profiles: [],
    adiabats: [],
    timestamp: { shapes: [], annotations: [] },
    borders: [],
    windDirection: [],
    startPoints: [],
    profileInversion: { shapes: [], annotations: [] },
    disabledProfile: null
}

const actions = {
    async Download(ctx, o) {
        /*  */
        document.activeElement.blur()

        ctx.commit('UpdateTimestamp', { shapes: [], annotations: [] })

        const today = new Date()
        const start = new Date(o.date[0])
        if (today < start) {
            this.dispatch('UpdateLoading', false)
            return ''
        }
        /*  */

        const { date } = o

        const hpp = o.sites ? o.sites : ctx.getters.sites
        const meteo = o.meteo ? o.meteo : ctx.getters.meteo
        const meteoIndicators = o.meteoIndicators ? o.meteoIndicators : ctx.getters.meteoIndicators
        const onInterpolate = o.onInterpolate ? o.onInterpolate : ctx.getters.onInterpolate

        const heights = o.heights ? o.heights : ctx.getters.heights
        const heightsInterpolate = ctx.getters.heightsInterpolate

        const interval = CalculateIntervals(o.date)
        const dataType = DataTypes(o.date)

        const timeGrid = CreateTimeGrid(date, heightsInterpolate)
        const timeLine = CreateTimeLine(date)

        const INTERPOLATESTEP = ctx.getters.INTERPOLATESTEP

        const heightDifference = HeightDifference(hpp)

        DownloadDataNewApiStatistic({ date }).then((contour) => {
            const promises = []
            hpp.forEach(async site => {
                const options = { date, site, interval, indicators: heights, dataType, heightDifference }
                if (site.query) {
                    const d = DownloadDataNewApi(options).then(async res => {
                        const data = res.data
                        const exist = data.length > 0
                        let interpolate = []
                        console.log(site.name)
                        if (onInterpolate)
                            interpolate = await Interpolate(data, timeLine, INTERPOLATESTEP)
                        else
                            interpolate = data
                        ctx.commit('UpdateData', { data: interpolate, site: site.id })
                        this.dispatch("UpdateDataExist", { data: exist, id: site.id })
                        return { data: interpolate, site: site.id, exist, children: site.children, profiler: site.profiler }
                    })
                    promises.push(d)
                }
            });

            meteo.forEach(async site => {
                const options = { date, site, interval, dataType, indicators: meteoIndicators }
                const d = DownloadDataWindPm(options)
                promises.push(d)
            })

            Promise.all(promises).then(async (res) => {
                const resTest = []

                const profilers = res.filter(v => v.profiler)
                const post = res.filter(v => !v.profiler)

                profilers.forEach(profiler => {
                    const values = Cut([profiler], JSON.parse(JSON.stringify(timeGrid)))
                    resTest.push({ data: values, site: profiler.site })
                })

                const mobileValues = res.filter(v => v.children && v.data.length != 0)
                const mobile = Cut(mobileValues, JSON.parse(JSON.stringify(timeGrid)))

                resTest.push(...post)
                resTest.push({ data: mobile, site: 1 })

                const sites = o.sites ? o.sites : ctx.getters.sites
                const dataTest = {}

                resTest.forEach(r => {
                    dataTest[r.site] = r.data
                })

                const graphics = await InitGrap(sites, dataTest, heightsInterpolate, contour)



                const x = graphics['4310'].termogramma[0].x
                const timestampPosition = Math.round(x.length / 2)
                const time = ctx.getters.x || x[timestampPosition]

                ctx.commit('UpdateGraphics', graphics)

                this.dispatch('UpdateTimestamp', time)
                this.dispatch('UpdateProfile', { date: time, site: 4310 })
                this.dispatch('UpdateLoading', false)
                this.dispatch('UpdateStartPoints')
                this.dispatch('UpdateWindDirection', post)
                this.dispatch('UpdateDrawer', false)

            })
        })
    },

    async UpdateProfile(ctx, options) {
        const sites = ctx.getters.sites.filter(s => s.data && s.id != 1)
        const heights = ctx.getters.heightsInterpolate
        const disabledProfile = ctx.getters.disabledProfile
        const { date } = options
        const charts = []
        sites.forEach(async (site, index) => {
            const data = ctx.state.data[site.id]
            const settings = { date, data, site, disabledProfile, index, heights }
            const profile = CreateProfile(settings)
            charts.push(profile)
        })

        Promise.all(charts).then(res => {
            const profiles = res.filter(p => p.x.length != 0)
            const adiabats = profiles.map(profile => { return CreateAdiabat(profile) })
            const difference = TemperatureDifference(profiles)
            this.dispatch('UpdateProfileLayout', res)
            ctx.commit('UpdateDifference', difference)
            ctx.commit('UpdateProfile', res)
            ctx.commit('UpdateAdiabats', adiabats)

        })

    },

    async UpdateBorders(ctx) {
        const sites = ctx.getters.sites.filter(s => s.id != 4310 && s.id != 1 && s.data)
        const data = ctx.getters.data
        const borders = []

        sites.forEach(s => {
            const { id, color } = s
            if (data[id].length != 0) {
                const first = data[id][0]
                const last = data[id][data[id].length - 1]
                borders.push(CreateBorders(first.time, last.time, color))
            }
        })
        ctx.commit('UpdateBorders', borders)
    },

    async UpdateWindDirection(ctx, data) {
        const sites = ctx.getters.sites
        const annotations = CreateAnnotationWind(data, sites)
        ctx.commit('UpdateWindDirection', annotations)
    },

    async UpdateStartPoints(ctx) {
        const sites = ctx.getters.sites.filter(s => s.id != 4310 && s.id != 1)
        const data = ctx.getters.data
        const pointsAnnotation = []
        sites.forEach(s => {
            const { id } = s
            if (data[id].length != 0) {
                const start = data[id][0]
                pointsAnnotation.push(CreateAnnotationPoint(start.time, s.name.split('-')[0]))
            }
        })
        ctx.commit('UpdateStartPoints', pointsAnnotation)
    },

    async UpdateProfileLayout(ctx, profiles) {
        const profilesExist = profiles.filter(p => p.x.length != 0)
        const heightLength = ctx.getters.heightsInterpolate.length
        const side = Side(profilesExist, heightLength)
        const shapes = []
        const annotations = []
        profilesExist.forEach((profile, index) => {
            const gradient = Gradiend(profile.x)
            const r = CreateRectangles(profile, gradient)
            const a = CreateAnnotationsInverson(profile, gradient, side[index])
            const lt = CreateTotalLines(profile)
            shapes.push({ shapes: [...r, ...lt.shapes], id: profile.id })
            annotations.push({ annotations: [...a, ...lt.annotations], id: profile.id })
        })
        ctx.commit('UpdateProfileInversion', { shapes, annotations })
    },

    async UpdateTimestamp(ctx, x) {
        const shapes = CreateShapes(x)
        const annotations = CreateAnnotationDate(x)
        ctx.commit('UpdateTimestamp', { shapes, annotations })
        ctx.commit('UpdateX', x)
    },

    async UpdateDisabledProfile(ctx, value) {
        if (value.visible == 'legendonly') {
            ctx.commit('UpdateDisabledProfile', value.id)
        } else
            ctx.commit('UpdateDisabledProfile', null)
    },
}

const mutations = {
    UpdateData(state, value) {
        state.data[value.site] = value.data
    },
    UpdateGraphics(state, value) {
        state.chartData = value
    },
    UpdateTermogramma(state, value) {
        if (!state.chartData[value.site])
            state.chartData[value.site] = { termogramma: null }
        state.chartData[value.site].termogramma = value.chart
    },
    UpdateProfile(state, value) {
        state.profiles = value
    },
    UpdateDifference(state, value) {
        state.difference = value
    },
    UpdateAdiabats(state, value) {
        state.adiabats = value
    },
    UpdateInversion(state, value) {
        if (!state.chartData[value.site])
            state.chartData[value.site] = { inversion: null }
        state.chartData[value.site].inversion = value.chart
    },
    UpdateAtmosphere(state, value) {
        if (!state.chartData[value.site])
            state.chartData[value.site] = { atmosphere: null }
        state.chartData[value.site].atmosphere = value.chart
    },
    UpdateAtmosphereDifference(state, value) {
        if (!state.chartData[value.site])
            state.chartData[value.site] = { atmosphereDifference: null }
        state.chartData[value.site].atmosphereDifference = value.chart
    },
    UpdateTimestamp(state, shapes) {
        state.timestamp = shapes
    },
    UpdateBorders(state, borders) {
        state.borders = borders
    },
    UpdateStartPoints(state, points) {
        state.startPoints = points
    },
    UpdateProfileInversion(state, value) {
        state.profileInversion = value
    },
    UpdateDisabledProfile(state, value) {
        state.disabledProfile = value
    },
    UpdateWindDirection(state, value) {
        state.windDirection = value
    }

}

const getters = {
    chartData(state) {
        return state.chartData
    },
    data(state) {
        return state.data
    },
    timestamp(state) {
        return state.timestamp
    },
    profileInversion(state) {
        const disabled = state.disabledProfile
        const shapes = state.profileInversion.shapes.filter(s => s.id != disabled);
        const annotations = state.profileInversion.annotations.filter(a => a.id != disabled);
        const s = []
        const a = []
        shapes.forEach(sh => {
            s.push(...sh.shapes)
        })
        annotations.forEach(an => {
            a.push(...an.annotations)
        })
        return { shapes: s, annotations: a }
    },
    borders(state) {
        return state.borders
    },
    startPoints(state) {
        return state.startPoints
    },
    profiles(state) {
        const profiles = [...state.profiles];
        return profiles
    },
    difference(state) {
        return state.difference
    },
    adiabats(state) {
        return state.adiabats
    },
    disabledProfile(state) {
        return state.disabledProfile
    },
    windDirection(state) {
        return state.windDirection
    }
}



export default { state, actions, mutations, getters }