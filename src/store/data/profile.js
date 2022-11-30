import { heights } from "./heights"

const CreateProfile = async(options) => {
    const { data, date, site, disabledProfile } = options
    const layer = data.filter(r => r.indicator != 'm-t').filter(d => d.time == date)
    const line = CreateLine(layer, site, disabledProfile)
    return line
}

const CreateLine = (layer, site, disabled) => {
    const x = layer.map(element => {
        return element.value
    });
    const y = heights.filter(h => h.name != 'T').map(h => h.name)
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