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
    const list = res.map((r) => {
      return { name: r.site.name, dates: GetDates(r.data) };
    });
    return list;
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

const GetDates = (data) => {
  return data.map((d) => d.time);
};

export default ListOfTrip;
