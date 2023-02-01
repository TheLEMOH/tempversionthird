const colorscale = [
    ['0.0', 'rgb(49,54,149)'],
    ['0.111111111111', 'rgb(69,117,180)'],
    ['0.222222222222', 'rgb(116,173,209)'],
    ['0.333333333333', 'rgb(171,217,233)'],
    ['0.444444444444', 'rgb(224,243,248)'],
    ['0.555555555556', 'rgb(254,224,144)'],
    ['0.666666666667', 'rgb(253,174,97)'],
    ['0.777777777778', 'rgb(244,109,67)'],
    ['0.888888888889', 'rgb(215,48,39)'],
    ['1.0', 'rgb(165,0,38)']
]

let settingsScatterTotal = {
    type: "scatter",
    visible: true,
    name: 'Суммарная (°C)',
    yaxis: 'y2',
    line: { width: 2, color: '#ff0000', }
}

const CreateInversion = async (data, heights) => {
    const h = heights.filter(h => h.tag != 'T0' && h.code != 'm-t')
    const x = CreateX(data)
    const y = CreateY(h)
    const z = CreateZ(data, h)

    return Promise.all([x, y, z]).then(values => {
        const scatterFinal = CalculateScatterTotal(values[0], values[2])
        return [scatterFinal, {
            x: values[0],
            y: values[1],
            z: values[2],
            type: 'heatmap',
            name: 'Инверсия',
            hovertemplate: `
            %{x} <br>
            Высота: <b>%{y}м</b> <br>
            Инверсия: <b>%{z}°C</b>
            <extra></extra>`,
            colorscale: colorscale,
            hoverongaps: false,
            zauto: false,
            zmin: 0,
            zmax: 3,
        }]
    });
}

const CreateY = async (heights) => {
    const y = heights.map(h => h.tag)
    return y
}

const CreateX = async (data) => {
    const x = data.filter(d => d.tag == 0).map(d => d.time)
    return x
}

const CreateZ = async (data, heights) => {

    const layers = []

    heights.forEach(height => {
        const array = data.filter(d => d.tag == height.tag)
        if (array.length > 0)
            layers.push(array)
    })

    const z = CalculateInversion(layers)

    return z
}

const CalculateInversion = async (layers) => {
    const layersLength = layers.length

    if (layersLength == 0)
        return []

    const array = []
    for (let i = 1; i < layersLength; i++) {
        const layerLength = layers[i].length
        array.push([])
        for (let j = 0; j < layerLength; j++) {
            const above = layers[i][j]
            const down = layers[i - 1][j]

            if (+above.value > +down.value && above.value != null) {

                const value = (+above.value - +down.value).toFixed(2)

                array[i - 1].push(value)
            } else
                array[i - 1].push(null)
        }
    }

    return array
}

const CalculateScatterTotal = (x, z) => {

    if (z.length == 0)
        return []

    const hl = z[0].length
    const zl = z.length
    const y = []

    for (let j = 0; j < hl; j++) {
        let sum = 0
        for (let i = 0; i < zl; i++) {
            sum += +z[i][j]
        }
        y.push(sum.toFixed(2))
    }

    return {
        y,
        x,
        ...settingsScatterTotal
    }
}



export default CreateInversion