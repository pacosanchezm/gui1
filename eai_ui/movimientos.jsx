/* eslint-disable react/react-in-jsx-scope */

/* ----------  External Libraries  ---------- */
//var window = this;

import React from 'react';
//import 'whatwg-fetch';
import WebviewControls from '../messenger-api-helpers/webview-controls';


import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import * as cssfibo from '../css/fibo1';
import { theme1, theme3 } from '../css/themes';
import * as cssx from '../css/css2';

// import Dropbox from 'react-select';
// import 'react-select/dist/react-select.css';


import axios from 'axios';

import moment from 'moment';


let MiInput = glamorous.input()

let MiInput2 = cssx.input2()



let MiTextArea = glamorous.textarea()

let theme = theme1;

import {Button, ButtonArea} from 'react-weui';



// ------------------------------------------------------------

  let Micolor = true;






  const Encabezado = (props) => {
    try {

      const { children } = props

      const Seccion1 = () => {

        return (

          <div>


            <ThemeProvider theme={props.Theme}>
              <div>

                <cssfibo.MyFlex1
                  css={{backgroundColor: props.Theme.backgroundcolor}}
                >

                  <cssfibo.Box1
                    css={{
                      width: 233,
                      backgroundColor: props.Theme.backgroundcolor,
                    }}>



                    <cssfibo.h1
                      text="Consulta tus Movimientos"
                      size= '15'
                      color='White'
                      weight="Normal"
                      style="Normal"
                    />

                  </cssfibo.Box1>



                </cssfibo.MyFlex1>

              </div>
            </ThemeProvider>

          </div>

        )

      }

      return children({
           Seccion1: Seccion1()
      });

    } catch (e) {
      console.error(e);
    }

  }











  const Listado1 = (props) => {

    try {

      const { children } = props

      const Renglon1 = (props) =>{

        let BgColor
          if (props.RenglonColor===false) { BgColor = 'White'}
          if (props.RenglonColor===true) { BgColor = 'WhiteSmoke'}


        let MiHora = moment(props.Row.Fecha).format("lll")
        let TipoSimple ='|'
        if (props.Row.Tipo==='INCREMENTO'){TipoSimple='+'}
        if (props.Row.Tipo==='DECREMENTO'){TipoSimple='-'}







        return (

          <ThemeProvider theme={props.Theme}>
            <div>

              <cssfibo.MyFlex1 css={{backgroundColor: BgColor}}>

                <cssx.box3label css={{width: '105px'}}>
                  <cssx.h3>{MiHora}</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{width: '80px'}}>
                  <cssx.h3>{props.Row.Folio}</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{width: '89px'}}>
                  <cssx.h3>{props.Row.Sucursal}</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{width: '21px'}}>
                  <cssx.h3>{TipoSimple}</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{width: '89px'}}>
                  <cssx.h3>{props.Row.Puntos}</cssx.h3>
                </cssx.box3label>

              </cssfibo.MyFlex1>

            </div>
          </ThemeProvider>

        )

      }


      let MiMapa = props.Registros.map((row) => {

        return(

          <div>

            <Renglon1
              RenglonColor={Micolor}
              Row={row}
              Theme={theme3.renglon}
            >

            </Renglon1>

            {(() => { Micolor = !Micolor;})()}

          </div>

        )
      })

      return <div>{MiMapa}</div>

    } catch (e) {
      console.error(e);
    }
  }









































//--------------------------------------------------------------

export default class Usuario extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {

      orden: "Id",
      statusfiltro: "Status",
      ciudadfiltro: "Ciudad",
      atiendefiltro: "Atiende",


      botonguardar: 'Grey',
      status: [
        { value: '', label: '' }
      ],





      Movimientos:[
        {
          "Folio": "",
          "Fecha": "",
          "Empresa": "",
          "Sucursal": "",
          "Tipo": "",
          "Puntos": "",
          "Concepto": "",
        }
      ],


      DropStatus: [
        { value: 'Contactar', label: 'Contactar' },
        { value: 'Contactado', label: 'Contactado' },
        { value: 'Entregado', label: 'Entregado' },
        { value: 'Activo', label: 'Activo' },
        { value: 'Otros', label: 'Otros' },
      ],


      DropAtiende: [
        { value: '1', label: 'Paco' },
        { value: '2', label: 'Heriberto' },
        { value: '3', label: 'Valeria' },
        { value: '4', label: 'Cristina' },
      ],

    }


  } // ------------------------- Constructor


  componentWillMount() {

   this.getdatos();

  }


  async getdatos() {

    var axdata = await (
      axios({
        url: 'https://smxai.net/graphqleai',
        method: 'post',
        data: {
          query: `
            query Movimientos($Cliente: Float, $Page: Float) {
              Movimientos(Cliente: $Cliente, Page: $Page) {
                Folio
            		Fecha
                Empresa
                Sucursal
                Tipo
                Puntos
                Concepto
              }
            }
          `,

          variables: {
            "Cliente": this.props.usr,
            "Page": this.props.page,
          },
        }
      })
    )

    let data = axdata.data.data.Movimientos

    this.setState({Movimientos: data})

  }








  cerrar() {

    WebviewControls.close();

  }




    // --------------------------------------------------------------------------





  render() {



    return (

      // <cssfibo.MyGridRouter1>
      <div>


        <cssfibo.MyFlex3
          css={{
            gridArea: 'header',
          }}
          >

            <Encabezado
              Theme={theme3.encabezado}
              this={this}

            >

              {({Seccion1}) => (
                <div>

                  <div>{Seccion1}</div>

                </div>
              )}

            </Encabezado>


        </cssfibo.MyFlex3>



        <cssfibo.MyFlex3 css={{gridArea: 'contenido'}}>

          <ThemeProvider theme={theme3.forma}>

            <div>



              <Listado1
                Theme={theme3.encabezado}
                Registros={this.state.Movimientos}
              />



            </div>

          </ThemeProvider>

        </cssfibo.MyFlex3>








        <cssfibo.MyFlexR1 css={{}}>

          <cssfibo.Boton1
            class="noatiende"
            color={'green'}
            onClick={() => {
              this.cerrar()
            }}
          >

            Cerrar

          </cssfibo.Boton1>


        </cssfibo.MyFlexR1>





      </div>

      // </cssfibo.MyGridRouter1>


    );
  }
}
