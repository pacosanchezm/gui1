

import React from 'react';
import axios from 'axios';

import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import * as cssfibo from '../css/fibo1';

import * as cssx from '../css/css2';

import _ from 'lodash';
  import chain from 'lodash/chain';
  import find from 'lodash/find';
  import get from 'lodash/get';
  import map from 'lodash/map';
  import groupBy from 'lodash/groupBy';



import {Bar} from 'react-chartjs-2';

import {Pie} from 'react-chartjs-2';



// -----------------------------------------------------------


exports.ChartData1 = (MiArray, ChartColores, Labels) => {
  try {

      console.log('Labels: ' + JSON.stringify(Labels))

      let MiLabel = (Categoria, Labels) => {
        let MiFiltro = Labels.filter((label) => label.value == Categoria)

        if(MiFiltro.length !=0){return MiFiltro[0].label }
        else {return Categoria}

      }

    let MiColumnas1 = _.chain(MiArray).groupBy("X").map(function(v, i) {

      // let MiColumna = _.get(_.find(v, 'X'), 'X')

      let MiColumna2 = MiLabel(_.get(_.find(v, 'X'), 'X'), Labels)





      return MiColumna2

    }).value();


    let result = _.chain(MiArray).groupBy("Cat").map(function(v, i) {

      let MiStatus = _.get(_.find(v, 'Cat'), 'Cat')

      let MiColor = (Categoria, Colores) => {
        let MiFiltro = Colores.filter((color) => color.Cat == Categoria)

        if(MiFiltro.length !=0){return MiFiltro[0].Color }
        else {return '#808080	'}

      }


      return {
        stack: '1',
        label: MiStatus,

        data: MiColumnas1.map((row) => {
          let MiFiltro = MiArray.filter((rama) =>
            MiLabel(rama.X, Labels) == row
            && rama.Cat == MiStatus
          )

          if(MiFiltro.length !=0){return MiFiltro[0].Cantidad }
          else{return 0}

        }),
          borderWidth: 1,
          backgroundColor: MiColor(MiStatus, ChartColores),
      }
    }).value();


    return ({
      labels: MiColumnas1,
      datasets: result,
    })

  } catch (e) {console.error(e)}
}



exports.ChartData2 = (MiArray, ChartColores, Labels) => {
  try {

      //console.log('Labels: ' + JSON.stringify(Labels))

      let MiLabel = (Categoria, Labels) => {
        let MiFiltro = Labels.filter((label) => label.value == Categoria)

        if(MiFiltro.length !=0){return MiFiltro[0].label }
        else {return Categoria}

      }

    let MiColumnas1 = MiArray.map(row => {

      // let MiColumna = _.get(_.find(v, 'X'), 'X')

      // let MiColumna2 = MiLabel(_.get(_.find(v, 'X'), 'X'), Labels)


      return row.X

    });


    let result = () => {

      let MiStatus = 'Agentes'

      let MiColor = (Categoria, Colores) => {
        let MiFiltro = Colores.filter((color) => color.Cat == Categoria)

        if(MiFiltro.length !=0){return MiFiltro[0].Color }
        else {return '#808080	'}

      }


      return ([{
        stack: '1',
        label: MiStatus,

        // data: [],



        data: MiArray.map((row) => {return row.Cantidad}),
        borderWidth: 1,
        backgroundColor: MiColor(MiStatus, ChartColores),
      }])
    }


    return ({
      labels: MiColumnas1,
      datasets: result(),
    })


    console.log(JSON.stringify(result))


  } catch (e) {console.error(e)}
}















exports.ChartData3 = (MiArray, ChartColores, Labels) => {
  try {

      //console.log('Labels: ' + JSON.stringify(Labels))

      let MiLabel = (Categoria, Labels) => {
        let MiFiltro = Labels.filter((label) => label.value == Categoria)

        if(MiFiltro.length !=0){return MiFiltro[0].label }
        else {return Categoria}

      }

    let MiColumnas1 = MiArray.map(row => {

       //let MiColumna = _.get(_.find(v, 'X'), 'X')

       let MiColumna2 = MiLabel(row.Cat, Labels)


      return MiColumna2

    });


    let result = () => {

      let MiStatus = 'Fotos'

      let MiColor = (Categoria, Colores) => {
        let MiFiltro = Colores.filter((color) => color.Cat == Categoria)

        if(MiFiltro.length !=0){return MiFiltro[0].Color }
        else {return '#808080	'}

      }


      return ([{
        stack: '1',
        label: MiStatus,

        // data: [],



        data: MiArray.map((row) => {return row.Cantidad}),
        borderWidth: 1,
        backgroundColor: 'DarkRed',
      }])
    }


    return ({
      labels: MiColumnas1,
      datasets: result(),
    })


    console.log(JSON.stringify(result()))


  } catch (e) {console.error(e)}
}
































exports.ChartBar1 = (props) => {

  return (

    <div>

      <Bar
        data={props.chartdata}
        redraw={props.redraw || false}

        options={{
          title:{
            display:true,
            text: `${props.title}`,
            fontsize:21,
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero:true
              }
            }]
          }
        }}
      />

    </div>

  );
}





exports.ChartPie1 = (props) => {

  return (

    <div>

      <Pie
        data={props.chartdata}
        redraw={props.redraw || false}

        options={{
          title:{
            display:true,
            text: `${props.title}`,
            fontsize:21,
          },

        }}
      />

    </div>

  );
}
















//
//
// exports.ChartBar1 = ({title, image, chartdata}) => {
//
//   const titulo = String(title);
//   const redraw = false
//
//   return (
//
//     <div>
//
//       <Bar
//         data={chartdata}
//         redraw={redraw}
//
//         options={{
//           title:{
//             display:true,
//             text: `${title}`,
//             fontsize:21,
//           },
//           scales: {
//             yAxes: [{
//               ticks: {
//                 beginAtZero:true
//               }
//             }]
//           }
//         }}
//       />
//
//     </div>
//
//   );
// }
