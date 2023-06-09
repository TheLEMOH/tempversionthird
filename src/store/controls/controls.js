import { DownloadSets, FormatDate } from "../data/download";
/* import CalculateIntervals from "../data/intervals" */
import { ElMessage } from "element-plus";
import initSets from "../data/intiSets";
import InitIndicators from "../data/initIndicators";
import ListOfTrip from "../data/listOfTrip";
const state = {
  activeTab: "rawData",
  sites: [],
  meteo: [],
  heights: [],
  meteoIndicators: [],
  activeSite: "4310",
  activePostComparison: [],
  dateControl: null,
  loading: false,
  profileModal: false,
  activeTime: null,
  onBorders: false,
  onAdiabats: false,
  onManually: false,
  onDirection: false,
  manuallyMinMax: 5,
  detailsTermogramm: false,
  drawer: false,
  about: false,
  listOfTripDisplay: false,
  listOfTrip: [],
  relayout: {},
  x: null,
  mapModal: false,
  onInterpolate: false,
  dataFirst: {},
  INTERPOLATESTEP: 25,
  windows: { profile: null, rawData1: null, rawData2: null, comparison1: null, comparison2: null },
};

const actions = {
  async GetSets(ctx, { date, interpolate }) {
    const onInterpolate = interpolate || ctx.getters.onInterpolate;

    const INTERPOLATESTEP = ctx.getters.INTERPOLATESTEP;

    const profilemerSets = await DownloadSets("hpp-mtp5");
    const meteoSets = await DownloadSets("hpp-meteo");
    const sites = initSets(profilemerSets.sites);

    const heights = profilemerSets.indicators;

    const mT = heights.find((h) => h.code == "m-t");

    mT.tag = "T0";

    let heightsInterpolate = null;

    if (onInterpolate) heightsInterpolate = InitIndicators(INTERPOLATESTEP);
    else heightsInterpolate = JSON.parse(JSON.stringify(heights));

    const meteo = meteoSets.sites;
    const meteoIndicators = meteoSets.indicators;
    const options = { sites, meteo, meteoIndicators, heights, date };

    ctx.commit("UpdateSites", sites);
    ctx.commit("UpdateMeteo", meteo);
    ctx.commit("UpdateHeights", heights);
    ctx.commit("UpdateHeightsInterpolate", heightsInterpolate);
    ctx.commit("UpdateMeteoIndicators", meteoIndicators);
    ctx.commit("UpdateDate", date);

    this.dispatch("Download", options);
    this.dispatch("CreateListOfTrip", sites);
  },

  CreateListOfTrip(ctx, sites) {
    ListOfTrip(sites).then((res) => {
      ctx.commit("UpdateListOfTrip", res);
    });
  },

  UpdateTab(ctx, value) {
    if (value == "comparison") ctx.commit("UpdateSite", "4310");

    ctx.commit("UpdateTab", value);
  },
  UpdateSite(ctx, value) {
    const dataFirst = ctx.getters.dataFirst[value];

    if (dataFirst && Number(value) != 4310 && Number(value) != 1) {
      this.dispatch("UpdateProfile", { date: dataFirst, site: value });
      this.dispatch("UpdateTimestamp", dataFirst);
    }

    ctx.commit("UpdateSite", value);
  },
  UpdateMode(ctx, value) {
    ctx.commit("UpdateMode", value);
  },
  UpdateActivePostComparison(ctx, value) {
    ctx.commit("UpdateActivePostComparison", value);
  },
  UpdateDataExist(сtx, value) {
    сtx.commit("UpdateDataExist", value);
  },
  UpdateDataFirst(ctx, value) {
    ctx.commit("UpdateDataFirst", value);
  },
  UpdateDate(ctx, value) {
    const options = { date: value };

    this.dispatch("Download", options);

    ctx.commit("UpdateRelaout", {});
    ctx.commit("UpdateDate", value);
  },
  ClickUrlTrip(ctx, object) {
    const date = object.date.split(" ")[0];
    const options = {
      date: [date, date],
      link: true,
      linkId: object.site.id,
    };

    const data = ctx.getters.data[object.site.id];
    const requestedDate = data[0] ? new Date(data[0].time.split(" ")[0]) : new Date(date);
    const newDate = new Date(date);

    if (requestedDate.getTime() != newDate.getTime() || !data[0]) {
      this.dispatch("Download", options);
    } else {
      const dataFirst = ctx.getters.dataFirst[object.site.id];

      this.dispatch("UpdateProfile", { date: dataFirst, site: object.site.id });
      this.dispatch("UpdateTimestamp", dataFirst);
    }

    ctx.commit("UpdateTab", "rawData");
    ctx.commit("UpdateRelaout", {});
    ctx.commit("UpdateSite", object.site.id);
    ctx.commit("UpdateDate", [date, date]);
  },
  UpdateLoading(ctx, value) {
    ctx.commit("UpdateLoading", value);
  },
  UpdateProfileModal(ctx, value) {
    ctx.commit("UpdateProfileModal", value);
  },
  UpdateActiveTime(ctx, value) {
    ctx.commit("UpdateActiveTime", value);
  },
  UpdateOnBorders(ctx, value) {
    ctx.commit("UpdateOnBorders", value);
  },
  UpdateOnAdiabats(ctx, value) {
    ctx.commit("UpdateOnAdiabats", value);
  },
  UpdateOnInterpolate(ctx, value) {
    const date = ctx.getters.dateControl;

    ctx.commit("UpdateOnInterpolate", value);

    this.dispatch("DeleteAllData");

    this.dispatch("GetSets", { date, interpolate: value });
  },
  UpdateOnManually(ctx, value) {
    ctx.commit("UpdateOnManually", value);
  },
  UpdateManuallyMinMax(ctx, value) {
    ctx.commit("UpdateManuallyMinMax", value);
  },
  UpdateDetailsTermogramm(ctx, value) {
    ctx.commit("UpdateDetailsTermogramm", value);
  },
  UpdateRelaout(ctx, value) {
    ctx.commit("UpdateRelaout", value);
  },
  UpdateDrawer(ctx, value) {
    ctx.commit("UpdateDrawer", value);
  },
  UpdateAbout(ctx, value) {
    ctx.commit("UpdateAbout", value);
  },
  UpdateListOfTripDisplay(ctx, value) {
    ctx.commit("UpdateListOfTripDisplay", value);
  },
  UpdateX(ctx, value) {
    ctx.commit("UpdateX", value);
  },
  UpdateWindow(ctx, value) {
    ctx.commit("UpdateWindow", value);
  },
  UpdateWindows(ctx, value) {
    ctx.commit("UpdateWindows", value);
  },
  UpdateMapModal(ctx, value) {
    ctx.commit("UpdateMapModal", value);
  },
  UpdateOnDirection(ctx, value) {
    ctx.commit("UpdateOnDirection", value);
  },
  CopyUrl() {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        ElMessage({
          message: "Скопировано",
          type: "success",
        });
      })
      .catch((e) => {
        ElMessage({
          message: e,
          type: "error",
        });
      });
  },
};

const mutations = {
  UpdateTab(state, value) {
    state.activeTab = value;
  },
  UpdateSites(state, value) {
    state.sites = value;
  },
  UpdateMeteo(state, value) {
    state.meteo = value;
  },
  UpdateHeights(state, value) {
    state.heights = value;
  },
  UpdateHeightsInterpolate(state, value) {
    state.heightsInterpolate = value;
  },
  UpdateMeteoIndicators(state, value) {
    state.meteoIndicators = value;
  },
  UpdateSite(state, value) {
    state.activeSite = +value;
  },
  UpdateMode(state, value) {
    state.activeMode = value;
  },
  UpdateDate(state, value) {
    state.dateControl = value;
  },
  UpdateLoading(state, value) {
    state.loading = value;
  },
  UpdateProfileModal(state, value) {
    state.profileModal = value;
  },
  UpdateDataExist(state, value) {
    const index = state.sites.findIndex((s) => s.id == value.id);
    state.sites[index].data = value.data;
  },
  UpdateDataFirst(state, value) {
    state.dataFirst[value.id] = value.time;
  },
  UpdateOnBorders(state, value) {
    state.onBorders = value;
  },
  UpdateOnAdiabats(state, value) {
    state.onAdiabats = value;
  },
  UpdateOnInterpolate(state, value) {
    state.onInterpolate = value;
  },
  UpdateOnManually(state, value) {
    state.onManually = value;
  },
  UpdateManuallyMinMax(state, value) {
    state.manuallyMinMax = value;
  },
  UpdateDetailsTermogramm(state, value) {
    state.detailsTermogramm = value;
  },
  UpdateRelaout(state, value) {
    state.relayout = value;
  },
  UpdateDrawer(state, value) {
    state.drawer = value;
  },
  UpdateAbout(state, value) {
    state.about = value;
  },
  UpdateListOfTripDisplay(state, value) {
    state.listOfTripDisplay = value;
  },
  UpdateListOfTrip(state, value) {
    state.listOfTrip = value;
  },
  UpdateX(state, value) {
    state.x = value;
  },
  UpdateWindow(state, value) {
    state.windows[value.id] = value.chart;
  },
  UpdateWindows(state, value) {
    state.windows = value;
  },
  UpdateMapModal(state, value) {
    state.mapModal = value;
  },
  UpdateOnDirection(state, value) {
    state.onDirection = value;
  },
};

const getters = {
  activeTab(state) {
    return state.activeTab;
  },
  activeSite(state) {
    return state.activeSite;
  },
  dateControl(state) {
    if (!state.dateControl) return state.dateControl;

    let start = state.dateControl[0];
    let end = state.dateControl[1];

    if (typeof state.dateControl[0] != "string") {
      start = FormatDate(start);
      end = FormatDate(end);
    }

    return [start, end];
  },
  dataFirst(state) {
    return state.dataFirst;
  },
  loading(state) {
    return state.loading;
  },
  sites(state) {
    return state.sites;
  },
  meteo(state) {
    return state.meteo;
  },
  activePostComparison(state) {
    return state.activePostComparison;
  },
  activeMode(state) {
    return state.activeMode;
  },
  profileModal(state) {
    return state.profileModal;
  },
  activeTime(state) {
    return state.activeTime;
  },
  onBorders(state) {
    return state.onBorders;
  },
  onAdiabats(state) {
    return state.onAdiabats;
  },
  onManually(state) {
    return state.onManually;
  },
  manuallyMinMax(state) {
    return state.manuallyMinMax;
  },
  detailsTermogramm(state) {
    return state.detailsTermogramm;
  },
  relayout(state) {
    return state.relayout;
  },
  drawer(state) {
    return state.drawer;
  },
  about(state) {
    return state.about;
  },
  listOfTripDisplay(state) {
    return state.listOfTripDisplay;
  },
  listOfTrip(state) {
    return state.listOfTrip;
  },
  heights(state) {
    return state.heights;
  },
  heightsInterpolate(state) {
    return state.heightsInterpolate;
  },
  meteoIndicators(state) {
    return state.meteoIndicators;
  },
  x(state) {
    return state.x;
  },
  windows(state) {
    return state.windows;
  },
  mapModal(state) {
    return state.mapModal;
  },
  onDirection(state) {
    return state.onDirection;
  },
  params(state) {
    const dateControl = state.dateControl;
    const start = FormatDate(dateControl ? state.dateControl[0] : null);
    const end = FormatDate(dateControl ? state.dateControl[1] : null);
    const timestamp = state.x;
    const site = state.activeSite;
    const tab = state.activeTab;
    const windows = state.windows;
    const relayout = JSON.stringify(state.relayout);
    return {
      start,
      end,
      timestamp,
      site,
      tab,
      ...windows,
      relayout,
    };
  },

  onInterpolate(state) {
    return state.onInterpolate;
  },

  INTERPOLATESTEP(state) {
    return state.INTERPOLATESTEP;
  },
};

export default { state, actions, mutations, getters };
