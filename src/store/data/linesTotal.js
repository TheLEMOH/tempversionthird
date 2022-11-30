 const settings = {
     type: 'line',
     yref: 'y',
 }

 const settingsAnnotations = {
     showarrow: true,
     arrowhead: 1,
     arrowsize: 0.1,
     arrowwidth: 0.1,
     ax: 0,
     ay: -10,
     align: "left",
 }

 const CreateTotalLines = (profile) => {
     const shapes = []
     const annotations = []
     const ys = []
     const x0 = profile.id == 4310 ? MAXvalue(profile.x) + 5 : MINvalue(profile.x) - 5
     const x1 = x0

     let isLine = false
     let lineY = []
     let sum = 0

     for (let j = 1, jl = profile.x.length; j < jl; j++) {
         const value = (+profile.x[j]) - (+profile.x[j - 1])
         const y = [profile.y[j - 1], profile.y[j], value]
         if (value > 0) {
             ys.push(y)
         } else {
             ys.push([null, null, null])
         }
     }

     for (let i = 0, il = ys.length - 1; i <= il; i++) {
         if (ys[i][0] != null) {
             lineY.push(ys[i])
             isLine = true
             sum += ys[i][2]
         }

         if ((ys[i][0] == null || i == il) && isLine) {
             const y0 = lineY[0][0]
             const y1 = lineY[lineY.length - 1][1]
             shapes.push(Line(x0, x1, y0, y1, profile))
             annotations.push(Annotation(x0, y1, sum.toFixed(2), profile))
             isLine = false
             sum = 0
             lineY = []
         }


     }

     return { shapes, annotations }
 }

 const Line = (x0, x1, y0, y1, profile) => {
     return {
         x0,
         x1,
         y0,
         y1,
         id: profile.id,
         line: {
             width: 5,
             color: profile.color
         },
         ...settings
     }
 }

 const Annotation = (x, y, text, profile) => {
     return { x, y, text, id: profile.id, font: { color: profile.color }, ...settingsAnnotations }
 }

 const MAXvalue = (data) => {
     const length = data.length
     let res = data[0]
     for (let i = 0; i < length; i++) {
         if (Number(data[i]) > Number(res)) {
             res = data[i]
         }
     }
     return res
 }

 const MINvalue = (data) => {
     const length = data.length
     let res = data[0]
     for (let i = 0; i < length; i++) {
         if (Number(data[i]) < Number(res)) {
             res = data[i]
         }
     }
     return res
 }

 export default CreateTotalLines