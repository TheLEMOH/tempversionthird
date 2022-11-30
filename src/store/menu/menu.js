const state = {
    chartMenuMain: [
        { id: "termogramma", name: "Термограммы" },
        { id: "atmosphere", name: "Температура атмосферы" },
        { id: "inversion", name: "Температурные инверсии" },
        { id: "atmosphereDifference", name: "Температурная разница" },
        { id: "windpm", name: "PM2.5 и ветер" },
    ],
    chartsAdditional: [
        { id: "termogramma", name: "Термограммы" },
        { id: "atmosphere", name: "Температура атмосферы" },
        { id: "inversion", name: "Температурные инверсии" },
        { id: "windpm", name: "PM2.5 и ветер" },
    ],
    profileMenu: [
        { id: 'profile', name: 'Профиль' }, { id: 'difference', name: 'Разница температур' }
    ]
}

const actions = {

}

const mutations = {

}

const getters = {
    chartMenuMain(state) {
        return state.chartMenuMain
    },
    chartsAdditional(state) {
        return state.chartsAdditional
    },
    profileMenu(state) {
        return state.profileMenu
    },
}



export default { state, actions, mutations, getters }