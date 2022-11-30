import { DownloadSets, FormatDate } from "../data/download"
/* import CalculateIntervals from "../data/intervals" */
import { ElMessage } from 'element-plus'
import initSets from "../data/intiSets"
const state = {
    activeTab: 'rawData',
    sites: [],
    meteo: [],
    heights: [],
    meteoIndicators: [],
    activeSite: '4310',
    activePostComparison: [],
    dateControl: null,
    loading: false,
    profileModal: false,
    activeTime: null,
    onBorders: false,
    onAdiabats: false,
    detailsTermogramm: false,
    drawer: false,
    about: false,
    relayout: {},
    x: null,
    mapModal: false,
    windows: { profile: null, rawData1: null, rawData2: null, comparison1: null, comparison2: null },
}

const actions = {
    async GetSets(ctx, date) {
        this.dispatch('UpdateLoading', true)

        const profilemerSets = await DownloadSets('hpp-mtp5')
        const meteoSets = await DownloadSets('hpp-meteo')
        const sites = initSets(profilemerSets.sites)
        const heights = profilemerSets.indicators
        const meteo = meteoSets.sites
        const meteoIndicators = meteoSets.indicators
        const options = { sites, meteo, meteoIndicators, heights, date }

        ctx.commit('UpdateSites', sites)
        ctx.commit('UpdateMeteo', meteo)
        ctx.commit('UpdateHeights', heights)
        ctx.commit('UpdateMeteoIndicators', meteoIndicators)
        ctx.commit("UpdateDate", date)

        this.dispatch("Download", options)
    },

    UpdateTab(ctx, value) {
        if (value == 'comparison')
            ctx.commit('UpdateSite', '4310')

        ctx.commit("UpdateTab", value)
    },
    UpdateSite(ctx, value) {
        ctx.commit("UpdateSite", value)
    },
    UpdateMode(ctx, value) {
        ctx.commit("UpdateMode", value)
    },
    UpdateActivePostComparison(ctx, value) {
        ctx.commit("UpdateActivePostComparison", value)
    },
    UpdateDataExist(сtx, value) {
        сtx.commit('UpdateDataExist', value)
    },
    UpdateDate(ctx, value) {
        const options = { date: value }

        this.dispatch("Download", options)

        ctx.commit('UpdateRelaout', {})
        ctx.commit('UpdateLoading', true)
        ctx.commit("UpdateDate", value)
    },
    UpdateLoading(ctx, value) {
        ctx.commit('UpdateLoading', value)
    },
    UpdateProfileModal(ctx, value) {
        ctx.commit('UpdateProfileModal', value)
    },
    UpdateActiveTime(ctx, value) {
        ctx.commit('UpdateActiveTime', value)
    },
    UpdateOnBorders(ctx, value) {
        ctx.commit('UpdateOnBorders', value)
    },
    UpdateOnAdiabats(ctx, value) {
        ctx.commit('UpdateOnAdiabats', value)
    },
    UpdateDetailsTermogramm(ctx, value) {
        ctx.commit('UpdateDetailsTermogramm', value)
    },
    UpdateRelaout(ctx, value) {
        ctx.commit('UpdateRelaout', value)
    },
    UpdateDrawer(ctx, value) {
        ctx.commit('UpdateDrawer', value)
    },
    UpdateAbout(ctx, value) {
        ctx.commit('UpdateAbout', value)
    },
    UpdateX(ctx, value) {
        ctx.commit('UpdateX', value)
    },
    UpdateWindow(ctx, value) {
        ctx.commit('UpdateWindow', value)
    },
    UpdateWindows(ctx, value) {
        ctx.commit('UpdateWindows', value)
    },
    UpdateMapModal(ctx, value) {
        ctx.commit('UpdateMapModal', value)
    },
    CopyUrl() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            ElMessage({
                message: 'Скопировано',
                type: 'success',
            })
        }).catch((e) => {
            ElMessage({
                message: e,
                type: 'error',
            })
        })
    }
}

const mutations = {
    UpdateTab(state, value) {
        state.activeTab = value
    },
    UpdateSites(state, value) {
        state.sites = value
    },
    UpdateMeteo(state, value) {
        state.meteo = value
    },
    UpdateHeights(state, value) {
        state.heights = value
    },
    UpdateMeteoIndicators(state, value) {
        state.meteoIndicators = value
    },
    UpdateSite(state, value) {
        state.activeSite = +value
    },
    UpdateMode(state, value) {
        state.activeMode = value
    },
    UpdateDate(state, value) {
        state.dateControl = value
    },
    UpdateLoading(state, value) {
        state.loading = value
    },
    UpdateProfileModal(state, value) {
        state.profileModal = value
    },
    UpdateDataExist(state, value) {
        const index = state.sites.findIndex(s => s.id == value.id)
        state.sites[index].data = value.data
    },
    UpdateOnBorders(state, value) {
        state.onBorders = value
    },
    UpdateOnAdiabats(state, value) {
        state.onAdiabats = value
    },
    UpdateDetailsTermogramm(state, value) {
        state.detailsTermogramm = value
    },
    UpdateRelaout(state, value) {
        state.relayout = value
    },
    UpdateDrawer(state, value) {
        state.drawer = value
    },
    UpdateAbout(state, value) {
        state.about = value
    },
    UpdateX(state, value) {
        state.x = value
    },
    UpdateWindow(state, value) {
        state.windows[value.id] = value.chart
    },
    UpdateWindows(state, value) {
        state.windows = value
    },
    UpdateMapModal(state, value) {
        state.mapModal = value
    },

}

const getters = {
    activeTab(state) {
        return state.activeTab
    },
    activeSite(state) {
        return state.activeSite
    },
    dateControl(state) {
        return state.dateControl
    },
    loading(state) {
        return state.loading
    },
    sites(state) {
        return state.sites
    },
    meteo(state) {
        return state.meteo
    },
    activePostComparison(state) {
        return state.activePostComparison
    },
    activeMode(state) {
        return state.activeMode
    },
    profileModal(state) {
        return state.profileModal
    },
    activeTime(state) {
        return state.activeTime
    },
    onBorders(state) {
        return state.onBorders
    },
    onAdiabats(state) {
        return state.onAdiabats
    },
    detailsTermogramm(state) {
        return state.detailsTermogramm
    },
    relayout(state) {
        return state.relayout
    },
    drawer(state) {
        return state.drawer
    },
    about(state) {
        return state.about
    },
    heights(state) {
        return state.heights
    },
    meteoIndicators(state) {
        return state.meteoIndicators
    },
    x(state) {
        return state.x
    },
    windows(state) {
        return state.windows
    },
    mapModal(state) {
        return state.mapModal
    },
    params(state) {
        const dateControl = state.dateControl
        const start = FormatDate(dateControl ? state.dateControl[0] : null)
        const end = FormatDate(dateControl ? state.dateControl[1] : null)
        const timestamp = state.x
        const site = state.activeSite
        const tab = state.activeTab
        const windows = state.windows
        const relayout = JSON.stringify(state.relayout)
        return {
            start,
            end,
            timestamp,
            site,
            tab,
            ...windows,
            relayout
        }
    }
}



export default { state, actions, mutations, getters }