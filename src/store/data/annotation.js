const settings = {
    xref: 'x',
    showarrow: true,
    arrowhead: 1,
    arrowsize: 0.1,
    arrowwidth: 0.1,
    ay: 0,
}

const settingsDifference = {
    xref: 'x',
    yref: 'y',
    showarrow: true,
    arrowhead: 1,
    arrowsize: 0.5,
    arrowwidth: 0.5,
    ax: -30,
    ay: -10,
}

const CreateAnnotationDate = (x) => {
    const time = x.split(':')
    return [{
        x: x,
        y: 1,
        xref: "x",
        yref: "paper",
        text: `${time[0]}:${time[1]}`,
        showarrow: true,
        arrowhead: 1,
        ax: 0,
        ay: -7,
    }, ];
}

const CreateAnnotationPoint = (x, text) => {
    return {
        x: x,
        y: 1,
        xref: "x",
        yref: "paper",
        text: text,
        align: 'right',
        showarrow: true,
        arrowhead: 0,
        ax: 0,
        ay: -20,
    };
}


const CreateAnnotationsInverson = (data, gradient, side) => {
    const xD = data.x
    const yD = data.y
    const id = data.id
    const length = data.x.length
    const annotations = []
    for (let i = 0; i < length; i++) {
        if (+gradient[i] > 0) {
            const xanchor = side[i] < 0 ? 'right' : 'left'
            const x = side[i] < 0 ? xD[i - 1] : xD[i]
            let y = yD[i]
            if (y >= 100 && y <= 1000) {
                y = yD[i] - 25
            }
            if (y >= 0 && y < 100) {
                y = yD[i] - 12.5
            }

            const s = { xanchor, id, ax: side[i], ...settings, font: { color: data.color } }
            annotations.push(Annotation(x, y, gradient[i], s))
        }
    }

    return annotations
}

const CreateAnnotationsDifference = (data) => {
    const { x, y, values } = data
    const annotation = []
    const LENGTH = 23
    for (let i = 0; i < LENGTH; i++)
        annotation.push(Annotation(x[i], y[i], values[i], settingsDifference))
    return annotation
}

const Annotation = (x, y, text, settings) => {
    return { x, y, text, ...settings }
}

const Side = (profiles) => {
    const LENGTH = 23
    const x1 = profiles[0].x
    const x2 = profiles[1] ? profiles[1].x : profiles[0].x
    const side1 = []
    const side2 = []

    for (let i = 0; i < LENGTH; i++)
        if (x1[i] - x2[i] > 0) {
            side1.push(10)
            side2.push(-10)
        } else {
            side1.push(-10)
            side2.push(10)
        }

    return [side1, side2]
}


export { CreateAnnotationsInverson, CreateAnnotationDate, CreateAnnotationsDifference, CreateAnnotationPoint, Side }