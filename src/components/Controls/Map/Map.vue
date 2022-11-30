<template>
  <List :items="sites.filter(s=>s.geom_x)" @clickItem="ClickItem"></List>
  <div class="map" id="map" ref="map"></div>
  <div id="tooltip" class="tooltip-map"></div>
</template>

<script>
import List from "./List.vue";

import Map from "ol/Map.js";
import TileLayer from "ol/layer/Tile.js";
import Projection from "ol/proj/Projection";
import TileWMS from "ol/source/TileWMS";
import View from "ol/View.js";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Overlay from "ol/Overlay";

import proj4 from "proj4";

import { mapGetters } from "vuex";
import { addProjection } from "ol/proj";

import CreateFeatures from "./features";

/* Регистрация проекции */
proj4.defs("EPSG:4326");
proj4.defs(
  "EPSG:28416",
  "+proj=tmerc +lat_0=0 +lon_0=93 +k=1 +x_0=16500000 +y_0=0 +ellps=krass +towgs84=23.92,-141.27,-80.9,-0,0.35,0.82,-0.12 +units=m +no_defs"
);

const projSettings = {
  extent: [11385622.915, 2840622.915, 21404377.085, 12859377.085],
  resolutions: [
    39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125,
    2445.9849047851562, 1222.9924523925781, 611.4962261962891,
    305.74811309814453, 152.87405654907226, 76.43702827453613,
    38.218514137268066, 19.109257068634033, 9.554628534317017,
    4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135,
  ],
};

const newProj = new Projection({
  code: "EPSG:28416",
  extent: projSettings.extent,
});

addProjection(newProj);

export default {
  components: {
    List,
  },
  data() {
    return {
      map: null,
      view: null,
    };
  },

  mounted() {
    /* Подсказка */
    const tooltip = document.getElementById("tooltip");
    const overlay = new Overlay({
      element: tooltip,
      offset: [10, 0],
      positioning: "bottom-left",
    });

    /* Подложка Енисей-ГИС */
    const map24 = new TileLayer({
      source: new TileWMS({
        url: "https://map4.24bpd.ru/geowebcache/service/wms",
        params: {
          LAYERS: "egis_gk_light",
          FORMAT: "image/png",
          VERSION: "1.1.1",
        },
        crossOrigin: "anonymous",
        serverType: "geoserver",
      }),
    });

    this.view = new View({
      projection: newProj,
      maxZoom: 12,
      minZoom: 9,
      center: proj4("EPSG:4326", "EPSG:28416", [92.886, 56.038]),
      zoom: 9,
    });

    this.map = new Map({
      target: "map",
      layers: [map24],
      overlays: [overlay],
      view: this.view,
    });

    this.map.on("pointermove", (event) => {
      const feature = this.map.forEachFeatureAtPixel(
        event.pixel,
        function (feature) {
          return feature;
        }
      );

      if (feature) {
        const coordinate = event.coordinate;
        tooltip.innerHTML = feature.get("name");
        overlay.setPosition(coordinate);
      } else {
        overlay.setPosition(undefined);
      }
    });

    this.AddProfilers();
  },

  computed: {
    ...mapGetters(["sites"]),
  },

  methods: {
    AddProfilers() {
      const features = CreateFeatures(this.sites);

      const vectorSource = new VectorSource({
        features: features,
      });

      const vectorLayer = new VectorLayer({
        source: vectorSource,
        zIndex: 1000,
      });

      this.map.addLayer(vectorLayer);

      setTimeout(() => {
        this.map.updateSize();
      }, 100);
    },

    ClickItem(event) {
      const x = event.geom_x;
      const y = event.geom_y;
      const coord = proj4("EPSG:4326", "EPSG:28416", [x, y]);
      this.view.animate({
        center: coord,
        duration: 500,
      });
    },
  },

  watch: {
    sites() {
      this.AddLayer();
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 500px;
}

.tooltip-map {
  color: black;
  padding: 0.5em;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}
</style>