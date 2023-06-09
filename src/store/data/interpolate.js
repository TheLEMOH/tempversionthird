const Interpolate = async (data, timeLine, step) => {
  if (data.length == 0) return [];

  const result = [];

  for (let j = 0, timeLength = timeLine.length; j < timeLength; j++) {
    const oneDay = data.filter((d) => d.time == timeLine[j]);
    const time = timeLine[j];

    let height = 0;

    while (height <= 1000) {
      const start = oneDay.findLast((o) => o.tag <= height && o.code != "m-t");

      const end = oneDay.find((o) => o.tag >= height && o.code != "m-t");

      if (start && end) {
        const startX = start.tag;
        const endX = end.tag;

        const startY = start.value;
        const endY = end.value;

        const value = startY == endY ? +endY : startY + ((height - startX) / (endX - startX)) * (endY - startY);

        result.push({ time, value: +value.toFixed(2), tag: height, indicator: `${height}h` });
      }

      height += step;
    }
  }

  const T0 = data.filter((d) => d.tag == "T0");

  result.push(...T0);

  return result;
};

export default Interpolate;
