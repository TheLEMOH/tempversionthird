const CreateAnnotationWind = (posts, sites) => {
    const whereWind = {}
    const directionAnnotations = {}

    sites.forEach(site => {
        site.sensor.forEach(sensor => {
            sensor.indicators.forEach(indicator => {
                if (indicator == 'm-wv') {
                    whereWind[site.id] = sensor.id
                }
            })
        })
    });

    for (let i in whereWind) {
        const post = posts.find(p => p.site == whereWind[i])
        const directions = post.data.filter(d => d.indicator == "m-wd")
        const speed = post.data.filter(d => d.indicator == "m-wv")
        const annotations = directions.map((d, index) => {
            return Annotation(d.time, speed[index].value, d.value)
        })
        directionAnnotations[i] = annotations
    }

    return directionAnnotations
}



const Annotation = (x, y, value) => {
    return {
        x: x,
        y: y,
        xref: 'x',
        yref: 'y2',
        text: DirectionToText(value),
        showarrow: true,
        arrowhead: 0,
        arrowsize: 0.1,
        arrowwidth: 1,
        ax: 0,
        font: {
            size: 10,
        },
    }
}

function DirectionToText(value) {
    if (value >= 0 && value < 11.25)
        return "С"
    if (value >= 11.25 && value < 33.75)
        return "ССВ"
    if (value >= 33.75 && value < 56.25)
        return "СВ"
    if (value >= 56.25 && value < 78.75)
        return "ВСВ"
    if (value >= 78.75 && value < 101.25)
        return "В"
    if (value >= 101.25 && value < 123.75)
        return "ВЮВ"
    if (value >= 123.75 && value < 146.25)
        return "ЮВ"
    if (value >= 146.25 && value < 168.75)
        return "ЮЮВ"
    if (value >= 168.75 && value < 191.25)
        return "Ю"
    if (value >= 191.25 && value < 213.75)
        return "ЮЮЗ"
    if (value >= 213.75 && value < 236.25)
        return "ЮЗ"
    if (value >= 236.25 && value < 258.75)
        return "ЗЮЗ"
    if (value >= 258.75 && value < 281.25)
        return "З"
    if (value >= 281.25 && value < 303.75)
        return "ЗСЗ"
    if (value >= 303.75 && value < 326.25)
        return "СЗ"
    if (value >= 326.25 && value < 348.75)
        return "ССЗ"
    if (value >= 348.75)
        return "С"
}

export default CreateAnnotationWind