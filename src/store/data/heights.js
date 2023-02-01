const CreateHeights = (begin, end, step) => {
    const res = []
    for (let i = begin; i <= end; i += step) {
        let code = ''
        if (i >= 0 && i < 10)
            code = `t_h000${i}`
        if (i >= 10 && i < 100)
            code = `t_h00${i}`
        if (i >= 100 && i < 1000)
            code = `t_h0${i}`
        if (i >= 1000)
            code = `t_h${i}`
        res.push({ name: i, code: code })
    }
    return res
}
const temperature = { code: 'm-t', name: "T", tag: 'T0' }
const from0to100 = CreateHeights(0, 100, 25, 374)
const from200to1000 = CreateHeights(150, 1000, 50, 379)
const heights = [...from0to100, ...from200to1000, temperature]

const sitesIndicators = [{
    code: 348,
    name: "Pm2.5",
}, {
    code: 102,
    name: "Pm2.5",
}]


const HeightDifference = (sites, onInterpolate) => {
    const result = {}

    if (onInterpolate)
        sites.forEach(site => {
            result[site.id] = 146 - +site.geom_alt
        });
    else
        sites.forEach(site => {
            result[site.id] = 0
        });

    return result
}

export { heights, sitesIndicators, HeightDifference }