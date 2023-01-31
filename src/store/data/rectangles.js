const settings = {
    type: 'rect',
    xref: 'x',
    fillcolor: '#ccc',
    opacity: 0.3
}

const CreateRectangles = (data, gradient) => {
    const x = data.x
    const y = data.y
    const id = data.id
    const length = data.x.length
    const rects = []

    for (let i = 1; i < length; i++) {
        if (+gradient[i] > 0) {

            const x0 = x[i]
            const x1 = x[i - 1]
            const y0 = y[i]
            const y1 = y[i - 1]

            rects.push(Rectangle(x0, x1, y0, y1, id))
        }
    }

    return rects
}

const Rectangle = (x0, x1, y0, y1, id) => {
    return {
        x0,
        x1,
        y0,
        y1,
        id,
        ...settings
    }
}

export default CreateRectangles