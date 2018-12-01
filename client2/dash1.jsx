import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css3";

import axios from "axios";

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",

      Resultado: [],

      ChartData1: {},
      Columnas1: [1, 2, 3, 4],
      Datos1: [4, 3, 6, 1],
      Dataset1: [],

      ChartColores: [
        { Cat: "Contactar", Color: "#E9967A" }, // darksalmon
        { Cat: "Contactado", Color: "#006400	" }, // darkgreen
        { Cat: "Entregado", Color: "#CD853F	" }, // Peru
        { Cat: "Otros", Color: "#2F4F4F	" }, //DarkSlateGrey
        { Cat: "Default", Color: "#808080	" } //Grey
      ]
    };
  } // ------------------------- Constructor

  componentWillMount() {
    this.getdatoschart1();
  }

  async getdatoschart1(date) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          query mailstatus($Campana: Int) {
            IndMailStatusX(Campana: $Campana) {
              Cat
              Cantidad
            }
          }
          `,

        variables: {
          Campana: 4
        }
      }
    });

    let resultado = axdatachart.data.data.IndMailStatusX;

    this.setState({ Resultado: resultado });

    let Labels = [];

    //this.setState({ ChartData1: Charts.ChartData1(resultado, this.state.ChartColores, Labels) })
  }

  render() {
    return <div>hola</div>;
  }
}
