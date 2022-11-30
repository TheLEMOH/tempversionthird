const data = [{
        "startDate": "2022-05-01 04:00:00",
        "endDate": "2022-05-02 06:00:00",
        "name": "Дивногорск",
        "color": "#6b5b95"
    },
    {
        "startDate": "2022-05-02 07:00:00",
        "endDate": "2022-05-03 06:00:00",
        "name": "Молокова",
        "color": "#feb236"
    },
    {
        "startDate": "2022-05-03 07:00:00",
        "endDate": "2022-05-04 10:00:00",
        "name": "Академгородок",
        "color": "#d64161"
    },
    {
        "startDate": "2022-05-04 11:00:00",
        "endDate": "2022-05-06 06:00:00",
        "name": "Дивногорск",
        "color": "#6b5b95"
    },
    {
        "startDate": "2022-05-06 07:00:00",
        "endDate": "2022-05-10 10:00:00",
        "name": "Молокова",
        "color": "#feb236"
    },
    {
        "startDate": "2022-05-10 11:00:00",
        "endDate": "2022-05-13 10:00:00",
        "name": "Дивногорск",
        "color": "#6b5b95"
    },
]

const CreateGanttChart = async() => {
    const lines = []
    data.forEach(d => {
        const line = CreateLine(d)
        lines.push(line)
    })
    return lines;
}

const CreateLine = (data) => {
    const x = []
    const y = []
    x.push(data.startDate)
    y.push(data.name)
    x.push(data.endDate)
    y.push(data.name)
    return {
        x,
        y,
        line: { width: 15, color: data.color },
        type: 'scatter',
        mode: 'lines'
    }
}

export default CreateGanttChart