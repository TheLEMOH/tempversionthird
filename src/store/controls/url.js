import { FormatDate } from "../data/download"

const GetParams = () => {
    const url = window.location.href;
    const query = url.split("?")[1];
    const urlParams = new URLSearchParams(query);
    let end = FormatDate(CheckDateEnd(urlParams.get('end')))
    let start = FormatDate(CheckDateStart(urlParams.get('start')))
    const timestamp = CheckTimestamp(urlParams.get('timestamp'))
    const site = urlParams.get('site') || 1
    const tab = CheckTab(urlParams.get('tab'))
    const rawData1 = CheckChart(urlParams.get('rawData1'))
    const rawData2 = CheckChart(urlParams.get('rawData2'))
    const comparison1 = CheckChart(urlParams.get('comparison1'))
    const comparison2 = CheckChart(urlParams.get('comparison2'))
    const relayout = CheckRelayout(urlParams.get('relayout'))
    const params = {
        start,
        end,
        timestamp,
        site,
        tab,
        rawData1,
        rawData2,
        comparison1,
        comparison2,
        relayout
    }

    SetParams(params)

    return params
}

const SetParams = (params) => {
    const string = CreateString(params)
    history.replaceState(params, "", string)
}

const CreateString = (params) => {
    let string = '?'
    for (let key in params) {
        string += `${key}=${params[key]}&`
    }
    return string
}

const CheckTab = (param) => {
    if (param != ' rawData' && param != 'comparison')
        return 'rawData'
    else
        return param
}

const CheckChart = (param) => {
    if (param == 'null' || !param)
        return null
    else
        return param

}

const CheckRelayout = (param) => {
    if (!param || param == 'undefined')
        return {}
    else
        return JSON.parse(param)
}

const CheckDateEnd = (param) => {
    const ms = Date.parse(param)
    if (!isNaN(ms) && ms > 0) {
        return param
    } else
        return new Date()
}

const CheckDateStart = (param) => {
    const ms = Date.parse(param)
    if (!isNaN(ms) && ms > 0) {
        return param
    } else {
        const end = new Date()
        const start = new Date()
        start.setDate(end.getDate() - 1)
        return start
    }

}

const CheckTimestamp = (param) => {
    const ms = Date.parse(param)
    if (!isNaN(ms) && ms > 0) {
        return param
    } else
        return null
}


export { GetParams, SetParams }