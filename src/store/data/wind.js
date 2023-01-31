const settingsWind = {
    name: 'Ветер',
    type: 'scatter',
    yaxis: 'y2',
    line: { width: 2, color: "blue" }
}

const settingsPm = {
    type: 'bar'
}

const pmClasses = [
    { from: 0, to: 25, color: '#009966' },
    { from: 25, to: 35, color: 'rgb(178, 223, 138)' },
    { from: 35, to: 80, color: '#ffde33' },
    { from: 80, to: 120, color: '#ff9933' },
    { from: 120, to: 160, color: 'rgb(251, 154, 153)' },
    { from: 160, to: 300, color: '#ff0033' },
    { from: 300, to: Infinity, color: '#7e0023' }
]

const CreateLineWind = (wv, settings) => {
    const x = []
    const y = []
    wv.forEach(element => {
        x.push(element.time)
        y.push(element.value)
    });
    return {
        x,
        y,
        ...settings
    }
}

const CreateLinePm = (wv, settings) => {
    const classes = {}
    const result = []
    wv.forEach(element => {
        const value = element.value
        pmClasses.forEach(c => {
            const className = `${c.from}-${c.to}`
            if (value >= c.from && value < c.to) {
                if (!classes[className]) {
                    classes[className] = { x: [], y: [], color: [] }
                }
                classes[className].x.push(element.time)
                classes[className].y.push(value)
                classes[className].color.push(c.color)
            }
        })
    });


    for (let i in classes) {
        const line = {
            x: classes[i].x,
            y: classes[i].y,
            name: i,
            marker: {
                color: classes[i].color
            },
            ...settings

        }
        result.push(line)
    }

    return result
}



const InitWindPm = (data) => {
    const wv = data.filter(d => d.indicator == 'm-wv')
    const pm = data.filter(d => d.indicator == 'p-pm2')

    const wind = CreateLineWind(wv, settingsWind)
    const pm2 = CreateLinePm(pm, settingsPm)

    return [wind, ...pm2]
}

export default InitWindPm