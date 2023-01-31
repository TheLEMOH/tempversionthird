const InitIndicators = (step) => {
    const res = []

    for (let i = 0; i <= 1000; i += step) {

        const id = `${i}h`
        const tag = i
        const name = `Температура (${i} м)`


        res.push({ id, tag, name })
    }

    res.push({ id: 103, code: 'm-t', name: 'Температура воздуха', units: '°С' })

    return res
}

export default InitIndicators