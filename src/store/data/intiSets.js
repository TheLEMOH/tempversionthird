const colors = [
    'rgb(31, 119, 180)',
    'rgb(255, 127, 14)',
    'rgb(44, 160, 44)',
    'rgb(214, 39, 40)',
    'rgb(148, 103, 189)',
    'rgb(140, 86, 75)',
    'rgb(227, 119, 194)',
    'rgb(127, 127, 127)',
    'rgb(188, 189, 34)',
    'rgb(23, 190, 207)'
];

const colorsLength = colors.length

const add = {
    id: 1,
    sensor: 4227,
    name: "#2 - Мобильный",
    code: 'p2',
    data: true,
    query: false
}


const initSets = (sites) => {
    sites.splice(1, 0, add)
    for (let i = 0, length = sites.length; i < length; i++) {
        sites[i].color = colors[i % colorsLength]
        sites[i].profiler = true
        if (sites[i].code.search('p1') != -1) {
            sites[i].sensor = [{ id: 4325, indicators: ['p-pm2'] }, { id: 3833, indicators: ['m-wv'] }]
            sites[i].graphics = {
                termogramma: true,
                atmosphere: true,
                inversion: true,
                windpm: true,
                atmosphereDifference: true
            }
        }
        if (sites[i].code.search('p2') != -1) {
            sites[i].sensor = [{ id: 4227, indicators: ['p-pm2', 'm-wv'] }]
            sites[i].graphics = {
                termogramma: true,
                atmosphere: true,
                inversion: true,
                windpm: true
            }
        }
        if (sites[i].id != 1)
            sites[i].query = true
        if (sites[i].code.split('-')[1])
            sites[i].children = true
    }
    return sites
}

export default initSets