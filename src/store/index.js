import { createStore } from 'vuex'
import controls from './controls/controls'
import data from "./data/data"
import menu from './menu/menu'
export default createStore({
    actions: {},
    mutations: {},
    state: {},
    getters: {},
    modules: { controls, data, menu }
})