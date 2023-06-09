import { FormatDate } from "./download";

const ListOfTrip = async (sites) => {
  const mobileSites = sites.filter((s) => s.children && s.code != "p2-b" && s.code != "p2-a");
  const dateEnd = new Date();
  const dateBegin = new Date();
  const promises = [];

  dateBegin.setFullYear(dateEnd.getFullYear() - 2);

  mobileSites.forEach((site) => {
    promises.push(GetData({ site, dateBegin, dateEnd }));
  });

  return Promise.all(promises).then((res) => {
    const dates = GetDates(res);
    const uniqueDates = dates.filter(OnlyUnique);
    const sitesByDay = GetSitesByData(res, uniqueDates);

    sites.forEach((site) => {
      sitesByDay.forEach((sitebyDay) => {
        const index = sitebyDay.findIndex((s) => s == site.id);
        if (index != -1) sitebyDay[index] = site;
      });
    });

    const sortedAsc = new Map([...sitesByDay].sort());

    return sortedAsc;
  });
};

const GetData = async (options) => {
  const { site, dateBegin, dateEnd } = options;

  const db = FormatDate(dateBegin);
  const de = FormatDate(dateEnd);

  const URL = `https://sensor.krasn.ru/hub/api/3.0/sets/hpp-mtp5/data/archive?uid=85hpwm81fqhnqk8n&sites=${site.id}&time_begin=${db} 00:00:00&time_end=${de} 23:59:00`;

  const fetchData = await fetch(URL);
  const json = await fetchData.json();

  return { site, data: json.data };
};

const GetDates = (array) => {
  const dates = [];
  array.forEach((r) => {
    const data = r.data;
    data.forEach((d) => dates.push(d.time));
  });

  return dates;
};

const OnlyUnique = (value, index, array) => {
  return array.indexOf(value) === index;
};

const GetSitesByData = (sites, dates) => {
  const res = new Map();
  dates.forEach((date) => {
    const ar = [];
    sites.forEach((site) => {
      const data = site.data;
      data.forEach((d) => {
        if (d.time == date) ar.push(d.site);
      });
    });

    res.set(date, ar);
  });

  return res;
};

export default ListOfTrip;
