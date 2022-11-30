const CreateLineChart = async(data, heights) => {
    const lines = heights.map(height => {
        const array = data.filter(d => d.indicator == height.code)
        return CreateLine(array, height)
    })
    return lines;
}

const CreateLine = (data, height) => {
    const x = []
    const y = []
    const line = height.code == 'm-t' ? { width: 5, color: '#000000', dash: 'dashdot', shape: 'spline' } : { shape: 'spline' }

    data.forEach(element => {
        x.push(`${element.time}`)
        y.push(element.value)
    });

    return {
        x,
        y,
        line,
        name: typeof height.tag == 'number' ? height.tag : 'T',
        type: 'scatter',

    }
}

export default CreateLineChart