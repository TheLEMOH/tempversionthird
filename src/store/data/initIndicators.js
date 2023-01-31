const InitIndicators = (step) => {
    const res = []

    for (let i = 0; i <= 1000; i += step) {

        const id = `${i}h`
        const tag = i
        const name = `Температура (${i} м)`
        const code = tag + 'h'

        res.push({ id, tag, name, code })
    }

    res.push({ id: 103, code: 'm-t', name: 'Температура воздуха', units: '°С' })

    return res
}

export default InitIndicators