const CalculateIntervals = (dates) => {
    const start = typeof dates[0] == 'string' ? new Date(`${dates[0]} 00:00:00`) : new Date(`${dates[0].getFullYear()}-${dates[0].getMonth()+1}-${dates[0].getDate()} 00:00:00`)
    const end = typeof dates[1] == 'string' ? new Date(`${dates[1]} 23:00:00`) : new Date(`${dates[1].getFullYear()}-${dates[1].getMonth()+1}-${dates[1].getDate()} 23:00:00`)
    const TotalDays = (end - start) / 1000 / 60 / 60 / 24
    if (TotalDays >= 0 && TotalDays <= 31) {
        return "hour"
    }

    if (TotalDays > 31) {
        return "day"
    }
}
export default CalculateIntervals