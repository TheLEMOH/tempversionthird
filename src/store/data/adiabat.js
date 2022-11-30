let settings = {
    type: "line",
    mode: "lines",
}

const CreateAdiabat = (profile) => {
    const start = profile.x[0]
    const color = profile.line.color
    const id = profile.id
    const name = `Сухая адиабата ${profile.name}`
    const x = CreateX(start)
    const y = CreateY()

    return {
        x,
        y,
        name,
        id,
        showlegend: true,
        line: { color, width: 2, dash: 'dashdot', },
        ...settings
    }
}

const CreateX = (start) => {
    const x = []
    let j = 0;
    for (let i = 0; i <= 10; i++) {
        x.push(start - j)
        j += 0.98;
    }
    return x
}

const CreateY = () => {
    const y = []
    for (let i = 0; i <= 1000; i += 100) {
        y.push(i)
    }
    return y
}


export default CreateAdiabat