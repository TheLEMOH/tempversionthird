const Interpolate = async (data, timeLine, step) => {
    const result = []
    if (data.length != 0) {
        for (let j = 0, timeLength = timeLine.length; j < timeLength; j++) {
            const oneDay = data.filter(d => d.time == timeLine[j])
            const time = timeLine[j]

            let i = 1
            let height = 0

            while (i < oneDay.length) {

                const startX = oneDay[i - 1].tag
                const endX = oneDay[i].tag

                const startY = oneDay[i - 1].value
                const endY = oneDay[i].value

                const value = (((height - startX) * (endY - startY) / (endX - startX)) + startY).toFixed(3)

                result.push({ time, value: +value, tag: height, indicator: `${height}h` })

                height += step

                if (oneDay[i].tag < height)
                    i++

                if (height > 1000)
                    break

            }
        }
    }

    return result
}

export default Interpolate