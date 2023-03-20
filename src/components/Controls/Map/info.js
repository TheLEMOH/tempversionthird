import Overlay from "ol/Overlay";
const DrawInfo = (map, data, heights) => {
  const layers = map.getAllLayers();
  const source = layers[1].getSource();
  const features = source.getFeatures();

  const parent = document.getElementById("sites-map-info");

  features.forEach((feature) => {
    const geometry = feature.getGeometry();
    const coordinates = geometry.getCoordinates();

    const name = feature.get("name");
    /*     const site = feature.get("site"); */

    const div = document.createElement("div");
    div.id = name;
    div.innerHTML = name;

    parent.append(div);

    const overlay = new Overlay({
      element: div,
      offset: [20, -10],
      positioning: "left",
    });

    overlay.setPosition(coordinates);

    map.addOverlay(overlay);

    console.log(123);
  });

  console.log(data, heights);
};

export default DrawInfo;
