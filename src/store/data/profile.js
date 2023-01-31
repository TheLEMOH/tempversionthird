const CreateProfile = async (options) => {
    const { data, date, site, disabledProfile, heights } = options
    const layer = data.filter(r => r.tag || r.tag == 0).filter(d => d.time == date)
    const line = CreateLine(layer, site, heights, disabledProfile)
    return line
}

const CreateLine = (layer, site, heights, disabled) => {
    
    const x = layer.map(element => {
        return element.value
    });

    const y = heights.filter(h => h.tag || h.tag == 0).map(h => h.tag)

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