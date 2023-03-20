import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import proj4 from "proj4";

import { Icon, Style } from "ol/style";

const CreateFeatures = (sites) => {
  const features = [];
  
  if (sites.length > 0)
    sites.forEach((site) => {
      const x = site.geom_x;
      const y = site.geom_y;
      if (x && y) {
        const coord = proj4("EPSG:4326", "EPSG:28416", [x, y]);
        const feature = new Feature({
          geometry: new Point(coord),
          name: site.name,
          site: site.id,
        });

        const style = CreateStyle(site);

        feature.setStyle(style);
        features.push(feature);
      }
    });

  return features;
};

const CreateStyle = (site) => {
  const color = site.color;
  const svg =
    '<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
    '<circle cx="60" cy="30" r="30" stroke-width="0" stroke="' +
    color +
    '" fill="' +
    color +
    '"/>' +
    '<circle cx="60" cy="30" r="20" stroke-width="1" stroke="white" fill="white"/>' +
    '<polygon points="45,55 75,55 60,70" fill="' +
    color +
    '" stroke="' +
    color +
    '" stroke-width="5" />' +
    "</svg>";

  const style = new Style({
    image: new Icon({
      opacity: 1,
      src: "data:image/svg+xml;utf8," + svg,
      scale: 0.5,
      color: color,
    }),
  });

  return style;
};

export default CreateFeatures;
