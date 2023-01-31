const TemperatureDifference = (profiles) => {
    if (profiles.length != 2)
        return []


    const x = profiles.map(p => p.x)
    const y = profiles[0].y
    const LENGTH = x[0].length
    const difference = []
    for (let i = 0; i < LENGTH; i++) {
        const value = x[1][i] - x[0][i]
        difference.push(value.toFixed(2))
    }

    return [{
        x: difference,
        y,
        name: 'Разница температур',
        line: {
            color: '#f1a340',
        },
        type: 'scatter',
        mode: 'lines+markers',
    }]
}

const CreateGridDifference = async (data, heights) => {
    if (data.length == 0)
        return []

    const result = []
    for (let i = 0, il = heights.length; i < il; i++) {
        const lines = []
        for (let j = 0, jl = data.length; j < jl; j++) {
            const line = data[j].filter(d => d.tag == heights[i].tag)
            lines.push(line)
        }
        const basicLine = lines[0]
        for (let j = 0, jl = basicLine.length; j < jl; j++) {
            const values = []
            for (let k = 0, kl = lines.length; k < kl; k++) {
                const line = lines[k].filter(l => l.time == basicLine[j].time)
                values.push(...line)
            }
            if (values.length > 1) {
                const difference = Difference(values)
                result.push({ tag: basicLine[j].tag, time: basicLine[j].time, value: difference })
            } else {
                result.push({ tag: basicLine[j].tag, time: basicLine[j].time, value: null })
            }

        }

    }

    return result
}

const Difference = (values) => {
    if (values[1].value == null || values[0].value == null) {
        return null
    } else
        return +(+values[1].value - +values[0].value).toFixed(2)
}

export { TemperatureDifference, CreateGridDifference }