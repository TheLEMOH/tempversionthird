const Gradiend = (data) => {
    const length = data.length
    const values = [0]

    for (let i = 1; i < length; i++) {
        const above = data[i]
        const down = data[i - 1]

        const difference = (above - down).toFixed(2)

        values.push(difference)
    }
    return values
}

export default Gradiend