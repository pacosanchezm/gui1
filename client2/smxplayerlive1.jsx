import React from "react";

import WebviewControls from "../messenger-api-helpers/webview-controls";
import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import { theme1, theme3 } from "../css/themes";
import * as cssx from "../css/css2";
import * as cssfibo from '../css/fibo1';



import axios from "axios";
import ReactPlayer from "react-player";

//-----------------------------------------------------

export default class Modulo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",
      Mood: 0,

      Nombre: 'Paquito',
      Origen: 'Celaya',
      Genero: 'Hombre',
      Edad: 42,
      Weight: 2,



      Resultado: [],

      ChartData1: {},

      ChartColores: [
        { Cat: "Enviar", Color: "Grey" },
        { Cat: "Enviado", Color: "Blue" },
        { Cat: "Entregado", Color: "darkgreen" },
        { Cat: "Descartado", Color: "darkRed" },
        { Cat: "Leido", Color: "GoldenRod" },
        { Cat: "Rechazado", Color: "Red" }
      ]
    };
  } // ------------------------- Constructor

  componentWillMount() {
    //  this.getdatoschart1();
  }

  onPlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };

  ref = player => {
    this.player = player;
  };







  async setmood(mood) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation MoodC($Reg: MoodInput) {
            MoodC(Reg: $Reg)
          }
          `,

        variables: {
          Reg: {
            "IdSesion": 1,
            "FbId": 5589,
            "Mood": mood,
            "Weight": 1,
            "Obv": "Gui"
          }
        }
      }
    });

    let resultado = axdatachart.data.data.MoodC;

    this.setState({ Mood: mood });
  }





  async sendmensaje(texto) {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub",
      method: "post",
      data: {
        query: `
          mutation MoodC($Reg: MoodInput) {
            MoodC(Reg: $Reg)
          }
          `,

        variables: {
          Reg: {
            "IdSesion": 1,
            "FbId": 5589,
            "Mood": mood,
            "Weight": 1,
            "Obv": "Gui"
          }
        }
      }
    });

    let resultado = axdatachart.data.data.MoodC;

    this.setState({ Mood: mood });
  }


















  render() {
    return (
      <div>

      Juan Solo - Mis 30


        <ReactPlayer
          ref={this.ref}
          className="react-player"
          url={"https://vimeo.com/" + "200565292"}
          // muted={this.state.muted}
          width="100%"
          height="333px"
        />


    {/*

    */}

        <cssfibo.Box css={{width: '34px',}}>

          <cssfibo.Boton2
            onClick={() => {this.setmood(1);}}
            css={{
              fontSize: 9,
              color: 'White',
              backgroundColor: 'SlateGray',
            }}>
            1
          </cssfibo.Boton2>



        </cssfibo.Box>

        <cssfibo.Box css={{width: '34px',}}>

          <cssfibo.Boton2
            onClick={() => {this.setmood(2);}}
            css={{
              fontSize: 9,
              color: 'White',
              backgroundColor: 'SlateGray',
            }}>
            2
          </cssfibo.Boton2>

        </cssfibo.Box>




        <cssfibo.Box css={{width: '34px',}}>

          <cssfibo.Boton2
            onClick={() => {this.setmood(3);}}
            css={{
              fontSize: 9,
              color: 'White',
              backgroundColor: 'SlateGray',
            }}>
            3
          </cssfibo.Boton2>

        </cssfibo.Box>



        <cssfibo.Box css={{width: '34px',}}>

          <cssfibo.Boton2
            onClick={() => {this.setmood(4);}}
            css={{
              fontSize: 9,
              color: 'White',
              backgroundColor: 'SlateGray',
            }}>
            4
          </cssfibo.Boton2>

        </cssfibo.Box>



        <cssfibo.Box css={{width: '34px',}}>

          <cssfibo.Boton2
            onClick={() => {this.setmood(5);}}
            css={{
              fontSize: 9,
              color: 'White',
              backgroundColor: 'SlateGray',
            }}>
            5
          </cssfibo.Boton2>

        </cssfibo.Box>




        <cssfibo.MyFlex3 css={{ gridArea: 'contenido' }}>

          <ThemeProvider theme={theme3.forma}>

            <div>


        <cssfibo.MyFlexR1>


          <cssx.box3input>
            <cssx.input3
              theme={theme3.forma}
              name='Nombre'
              // value=''
              //    onChange={}
              key="N1"
            />
          </cssx.box3input>



          <cssfibo.Boton1
            class="noatiende"
            color={'grey'}
          //  onClick={() => {this.witquery(this.props.page, this.state.textoquery)}}
          >

            Enviar

          </cssfibo.Boton1>



        </cssfibo.MyFlexR1>



            </div>

          </ThemeProvider>

        </cssfibo.MyFlex3>














      </div>
    );
  }
}
