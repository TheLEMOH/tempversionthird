const state = {
    cards: [{ id: 1, name: null, chartType: null }, { id: 2, name: null, chartType: null }, { id: 3, name: null, chartType: null }],
}

const actions = {
    UpdateCardTypeChart(ctx, options) {
        ctx.commit("UpdateCardTypeChart", options)
    },
}

const mutations = {
    UpdateCardTypeChart(state, options) {
        const { index, chartType } = options
        state.cards[index].chartType = chartType
    },
}

const getters = {
    cards(state) {
        return state.cards
    },
}



export default { state, actions, mutations, getters }