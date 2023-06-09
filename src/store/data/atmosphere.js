const colorscale = [
  ["0.0", "rgb(49,54,149)"],
  ["0.111111111111", "rgb(69,117,180)"],
  ["0.222222222222", "rgb(116,173,209)"],
  ["0.333333333333", "rgb(171,217,233)"],
  ["0.444444444444", "rgb(224,243,248)"],
  ["0.555555555556", "rgb(254,224,144)"],
  ["0.666666666667", "rgb(253,174,97)"],
  ["0.777777777778", "rgb(244,109,67)"],
  ["0.888888888889", "rgb(215,48,39)"],
  ["1.0", "rgb(165,0,38)"],
];

const CreateAtmosphere = async (data, heights, contour = { avgMin: 0, avgMax: 0 }, autocontour = true) => {
  if (data.length == 0) return [];

  const x = data.filter((d) => d.tag == 0).map((d) => d.time);
  const y = heights.filter((h) => h.tag != "T0" && h.code != "m-t").map((h) => h.tag);
  const z = heights
    .filter((h) => h.tag != "T0" && h.code != "m-t")
    .map((height) => {
      const layer = data.filter((d) => d.tag == height.tag);
      return CreateZ(layer);
    });

  const heatmap = [
    {
      x,
      y,
      z,
      autocontour: autocontour,
      colorscale: colorscale,
      type: "contour",
      hoverinfo: "z",
      hovertemplate: `
        %{x} <br>
        Высота: <b>%{y}м</b> <br>
        Температура: <b>%{z}°C</b>
        <extra></extra>`,
      showlegend: false,
      contours: {
        start: contour.min,
        end: contour.max,
        size: 1,
      },
    },
  ];

  return heatmap;
};

const CreateZ = (layer) => {
  const z = layer.map((l) => l.value);
  return z;
};

export default CreateAtmosphere;
