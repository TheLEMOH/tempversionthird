const CreateShapes = (x) => {
    return [{
        type: "line",
        xref: "x",
        yref: "paper",
        x0: x,
        y0: 0,
        x1: x,
        y1: 1,
        fillcolor: "#d3d3d3",
        opacity: 0.5,
        line: {
            width: 5,
        },
    }, ];
}

const CreateBorders = (x0, x1, fillcolor) => {
    return {
        type: "rect",
        xref: "x",
        yref: "paper",
        x0: x0,
        y0: 1.1,
        x1: x1,
        y1: 1.05,
        fillcolor: fillcolor,
        opacity: 0.3,
        line: {
            color: fillcolor,
            width: 1,
        },
    };
}


export { CreateShapes, CreateBorders }