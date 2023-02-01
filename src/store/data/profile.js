const CreateProfile = async (options) => {
    const { data, date, site, disabledProfile } = options
    const layer = data.filter(r => r.tag != 'T0').filter(d => d.time == date)
    const line = CreateLine(layer, site, disabledProfile)

    return line
}

const CreateLine = (layer, site, disabled) => {

    const x = layer.map(element => {
        return element.value
    });

    const y = layer.map(l => l.tag)


    const visible = site.id == disabled ? 'legendonly' : true

    return {
        x,
        y,
        name: site.name.split('-')[0],
        id: site.id,
        visible,
        color: site.color,
        type: 'scatter',
        mode: 'lines+markers',
        line: { shape: 'spline', color: site.color },
    }
}

export default CreateProfile