/* Параметры из дива */

const appDiv = document.getElementById("app");
const urlFromDiv = appDiv.getAttribute("url");
const uidFromDiv = appDiv.getAttribute("uid");
const setProfilerFromDiv = appDiv.getAttribute("profiler-set");

/*  */

const FormatDate = (d) => {
  const date = new Date(d);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yy = date.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (yy < 10) yy = "0" + yy;

  return yy + "-" + mm + "-" + dd;
};

const FormatDateWithHour = (d) => {
  const date = new Date(d);
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let hh = date.getHours();
  let min = date.getMinutes();
  let yy = date.getFullYear();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (hh < 10) hh = "0" + hh;
  if (min < 10) min = "0" + min;
  if (yy < 10) yy = "0" + yy;

  return yy + "-" + mm + "-" + dd + " " + hh + ":" + min + ":00";
};

const DownloadDataNewApi = async (options) => {
  const { date, site, indicators, interval, dataType, heightDifference } = options;
  const dateBegin = FormatDate(date[0]);
  const dateEnd = FormatDate(date[1]);
  const URL = `${urlFromDiv}/hub/api/3.0/sets/${setProfilerFromDiv}/data/${dataType}?uid=${uidFromDiv}&sites=${site.id}&time_begin=${dateBegin} 00:00:00&time_end=${dateEnd} 23:59:00&time_interval=${interval}`;
  const fetchData = await fetch(URL);
  const json = await fetchData.json();

  const dataFirst = FindFirstData(json);

  const data = JSONAPI(json, indicators, site, heightDifference);
  return { data, site: site.id, dataFirst };
};

const DownloadSets = async (project) => {
  const URL = `${urlFromDiv}/hub/api/3.0/sets/${project}?uid=${uidFromDiv}`;
  const fetchData = await fetch(URL);
  const json = await fetchData.json();
  const sites = json.data.sites || [];
  const indicators = json.data.indicators || [];
  return { sites, indicators };
};

const DownloadDataWindPm = async (options) => {
  const { date, site, indicators, interval } = options;
  const dateBegin = FormatDate(date[0]);
  const dateEnd = FormatDate(date[1]);
  const URL = `${urlFromDiv}/hub/api/3.0/sets/hpp-meteo/data/archive?uid=${uidFromDiv}&sites=${site.id}&time_begin=${dateBegin} 00:00:00&time_end=${dateEnd} 23:59:00&time_interval=${interval}`;
  const fetchData = await fetch(URL);
  const json = await fetchData.json();
  const data = JSONAPIWIND(json, indicators);
  return { data, site: site.id };
};

const DownloadDataNewApiStatistic = async (options) => {
  const { date } = options;
  const dateBegin = FormatDate(date[0]);
  const dateEnd = FormatDate(date[1]);
  const URL = `${urlFromDiv}/hub/api/3.0/sets/${setProfilerFromDiv}/data/archive-ext?uid=${uidFromDiv}&sites=${4314}&time_begin=${dateBegin} 00:00:00&time_end=${dateEnd} 23:59:00&time_interval=day`;
  const fetchData = await fetch(URL);
  const json = await fetchData.json();
  const avg = Average(json);
  return avg;
};

const Average = (json) => {
  const data = json.data;
  const minArray = [];
  const maxArray = [];

  for (let day in data) {
    for (let i in data[day]) {
      if (data[day][i].min) {
        minArray.push(data[day][i].min);
        maxArray.push(data[day][i].max);
      }
    }
  }

  const min = Math.round(Math.min.apply(null, minArray));
  const max = Math.round(Math.max.apply(null, maxArray));

  return { min, max };
};

const JSONAPI = (json, indicators, site, heightDifference) => {
  const row = [];
  let flag = false;
  json.data.forEach((j) => {
    indicators.forEach((h) => {
      const tag = h.tag != "T0" ? +h.tag - heightDifference[site.id] : "T0";
      if (typeof j[h.code] == "number") {
        flag = true;
        row.push({
          indicator: h.code,
          time: j.time,
          value: j[h.code],
          tag: tag,
          code: h.code,
        });
      } else {
        row.push({
          time: j.time,
          value: null,
          tag: tag,
          code: h.code,
        });
      }
    });
  });

  for (let i = 0, il = row.length; i < il; i++) {
    if (row[i].value != null) {
      row.splice(0, i - 1);
      break;
    }
  }

  for (let i = row.length - 1, il = row.length; i > 0; i--) {
    if (row[i].value != null) {
      row.splice(i + 1, il);
      break;
    }
  }

  if (flag) return row;
  else return [];
};

const JSONAPIWIND = (json, indicators) => {
  const row = [];
  let flag = false;
  json.data.forEach((j) => {
    indicators.forEach((h) => {
      if (typeof j[h.code] == "number") {
        flag = true;
        row.push({
          indicator: h.code,
          time: j.time,
          value: j[h.code],
          tag: h.tag,
        });
      } else {
        row.push({
          indicator: h.code,
          time: j.time,
          value: null,
          tag: h.tag,
        });
      }
    });
  });

  for (let i = 0, il = row.length; i < il; i++) {
    if (row[i].value != null) {
      row.splice(0, i - 1);
      break;
    }
  }

  for (let i = row.length - 1, il = row.length; i > 0; i--) {
    if (row[i].value != null) {
      row.splice(i + 1, il);
      break;
    }
  }

  if (flag) return row;
  else return [];
};

const CreateTimeGrid = (dates, heights) => {
  const start = typeof dates[0] == "string" ? new Date(`${dates[0]} 00:00:00`) : new Date(`${dates[0].getFullYear()}-${dates[0].getMonth() + 1}-${dates[0].getDate()} 00:00:00`);
  const end = typeof dates[1] == "string" ? new Date(`${dates[1]} 23:55:00`) : new Date(`${dates[1].getFullYear()}-${dates[1].getMonth() + 1}-${dates[1].getDate()} 23:55:00`);
  const interval = Intervals([start, end]);
  const grid = [];

  while (start.getTime() <= end.getTime()) {
    for (let i = 0, length = heights.length; i < length; i++) {
      grid.push({
        tag: heights[i].tag,
        code: heights[i].code,
        time: FormatDateWithHour(start),
        value: null,
      });
    }

    if (interval == "minute") start.setMinutes(start.getMinutes() + 5);

    if (interval == "hour") start.setHours(start.getHours() + 1);

    if (interval == "day") start.setDate(start.getDate() + 1);
  }

  return grid;
};

const CreateTimeLine = (dates) => {
  const start = typeof dates[0] == "string" ? new Date(`${dates[0]} 00:00:00`) : new Date(`${dates[0].getFullYear()}-${dates[0].getMonth() + 1}-${dates[0].getDate()} 00:00:00`);
  const end = typeof dates[1] == "string" ? new Date(`${dates[1]} 23:55:00`) : new Date(`${dates[1].getFullYear()}-${dates[1].getMonth() + 1}-${dates[1].getDate()} 23:55:00`);
  const interval = Intervals([start, end]);
  const line = [];
  while (start.getTime() <= end.getTime()) {
    line.push(FormatDateWithHour(start));

    if (interval == "minute") start.setMinutes(start.getMinutes() + 5);

    if (interval == "hour") start.setHours(start.getHours() + 1);

    if (interval == "day") start.setDate(start.getDate() + 1);
  }

  return line;
};

const Cut = (values, grid) => {
  let flag = true;
  for (let i = 0, il = values.length; i < il; i++) {
    for (let j = 0, jl = values[i].data.length; j < jl; j++) {
      if (values[i].data[j].value != null) {
        const gridIndex = grid.findIndex((p) => p.tag == values[i].data[j].tag && p.time == values[i].data[j].time);
        if (gridIndex != -1) {
          grid[gridIndex].value = values[i].data[j].value;
        } /* else {
          grid.unshift(values[i].data[j]);
        } */
      }
    }
  }

  for (let i = grid.length - 1, il = grid.length; i > 0; i--) {
    if (grid[i].value != null) {
      grid.splice(i + 1, il);
      flag = false;
      break;
    }
  }

  /*   const g = SortByTime(grid); */

  if (flag) return [];
  return grid;
};

/* const SortByTime = (array) => {
  array.sort((one, two) => new Date(one.time) - new Date(two.time));

  return array;
};
 */
const Intervals = (dates) => {
  const start = typeof dates[0] == "string" ? new Date(`${dates[0]} 00:00:00`) : new Date(`${dates[0].getFullYear()}-${dates[0].getMonth() + 1}-${dates[0].getDate()} 00:00:00`);
  const end = typeof dates[1] == "string" ? new Date(`${dates[1]} 23:00:00`) : new Date(`${dates[1].getFullYear()}-${dates[1].getMonth() + 1}-${dates[1].getDate()} 23:00:00`);
  const TotalDays = (end - start) / 1000 / 60 / 60 / 24;

  if (TotalDays >= 0 && TotalDays <= 1) {
    return "minute";
  }

  if (TotalDays >= 0 && TotalDays <= 31) {
    return "hour";
  }

  if (TotalDays > 31) {
    return "day";
  }
};

const FindFirstData = (json) => {
  const data = json.data;
  for (let i = 0, length = data.length; i < length; i++) {
    const time = data[i].time;
    const minute = time.split(" ")[1].split(":")[1];
    const second = time.split(" ")[1].split(":")[2];
    if (minute % 5 == 0 && second % 5 == 0) return time;
  }

  return false;
};

export { FormatDateWithHour, FormatDate, DownloadDataNewApi, DownloadDataNewApiStatistic, DownloadSets, Cut, DownloadDataWindPm, CreateTimeGrid, CreateTimeLine };
