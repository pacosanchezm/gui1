/* eslint-disable react/react-in-jsx-scope */

/* ----------  External Libraries  ---------- */
//var window = this;

import React from 'react';
import WebviewControls from '../messenger-api-helpers/webview-controls';

import glamorous, { ThemeProvider } from "glamorous";
import { css } from "glamor";
import * as cssfibo from '../css/fibo1';
import { theme1, theme3 } from '../css/themes';
import * as cssx from '../css/css2';

import axios from 'axios';
import moment from 'moment';





// ------------------------------------------------------------

  let Micolor = true;


  let MiSaldo = 0



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
                      width: 377,
                      backgroundColor: props.Theme.backgroundcolor,
                    height: 34
                    }}>



                    <cssfibo.h1
                      text="Consulta de Movimientos"
                      size= '18'
                      color='White'
                      weight="Bold"
                      style="Normal"
                    />

                  </cssfibo.Box1>


                </cssfibo.MyFlex1>



                <cssfibo.MyFlex1
                  css={{ backgroundColor: props.Theme.backgroundcolor }}
                >

                <cssx.box3label css={{ width: '123px' }}>
                  <cssx.h3>Fecha / Folio</cssx.h3>
                </cssx.box3label>

                  <cssx.box3label css={{ width: '121px' }}>
                    <cssx.h3>Sucursal</cssx.h3>
                  </cssx.box3label>

                  <cssx.box3label css={{ width: '70px' }}>
                    <cssx.h3>Operación</cssx.h3>
                  </cssx.box3label>


                  <cssx.box3label css={{ width: '30px' }}>
                    <cssx.h3>Saldo</cssx.h3>
                  </cssx.box3label>



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
        let TipoSimpleColor = 'Slategrey'
        if (props.Row.Tipo==='INCREMENTO'){TipoSimple='+'; TipoSimpleColor='green'}


        if (props.Row.Tipo === 'DECREMENTO') { TipoSimple = '-'; TipoSimpleColor = 'red'}





        return (

          <ThemeProvider theme={props.Theme}>
            <div>

              <cssfibo.MyFlex1 css={{backgroundColor: BgColor}}>

                <cssx.box3label css={{width: '110px'}}>
                  <cssx.h3>{MiHora}</cssx.h3> <cssx.h3 css={{ fontSize: 8 }}>{props.Row.Folio}</cssx.h3>
                </cssx.box3label>


                <cssx.box3label css={{width: '144px'}}>
                  <cssx.h3>{props.Row.Sucursal}</cssx.h3>
                </cssx.box3label>

                <cssx.box3label css={{width: '21px', paddingRight:21}}>
                  <cssx.h3 css={{ color: TipoSimpleColor, textAlign:'right' }}>{props.Row.Puntos}</cssx.h3>
                </cssx.box3label>


                <cssx.box3label css={{ width: '21px' }}>
                  <cssx.h3 css={{ textAlign: 'right' }}>{props.Saldo}</cssx.h3>
                </cssx.box3label>



              </cssfibo.MyFlex1>

            </div>
          </ThemeProvider>

        )

      }


      let MiMapa = props.Registros.map((row) => {

        return(



          <div>

            {(() => {
              MiSaldo = MiSaldo + Number(row.Puntos)
            })()}




            <Renglon1
              RenglonColor={Micolor}
              Row={row}
              Theme={theme3.renglon}
              Saldo={MiSaldo}
            >

            </Renglon1>

            {(() => {

              Micolor = !Micolor;


            })()}

          </div>

        )
      })

      return <div>{MiMapa}</div>

    } catch (e) {
      console.error(e);
    }
  }








const LoadingSpinner = () => (
  <div>
    <cssx.h3> Cargando...</cssx.h3>
  </div>
);
































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


      loading: false,


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


    this.setState({ loading: true })

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

    this.setState({ loading: false })


  }








  cerrar() {

    WebviewControls.close();

  }




    // --------------------------------------------------------------------------





  render() {

    const { Movimientos, loading } = this.state;


    return (

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

            {({ Seccion1 }) => (
              <div>

                <div>{Seccion1}</div>

              </div>
            )}

          </Encabezado>


        </cssfibo.MyFlex3>



        <cssfibo.MyFlex3 css={{gridArea: 'contenido'}}>

          <ThemeProvider theme={theme3.forma}>

            <div>

              {loading ? <LoadingSpinner /> :


              <Listado1
                Theme={theme3.encabezado}
                Registros={this.state.Movimientos}
              />

              }



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
