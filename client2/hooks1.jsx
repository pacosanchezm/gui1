import React, { useState, useEffect } from 'react';
import axios from "axios";

import * as css from "../css/css5";
import { ThemeProvider } from "styled-components";
import theme from "../css/themes";

import Dropbox from "react-select";
import { Bar } from "react-chartjs-2";

//--------------------------------------------------------


let Micolor = true;
let MisColores = [
  { Cat: 'Contactar', Color: '#E9967A' }, // darksalmon
  { Cat: 'Contactado', Color: '#006400' }, // darkgreen
  { Cat: 'Entregado', Color: '#CD853F' }, // Peru
  { Cat: 'Otros', Color: '#2F4F4F' },  //DarkSlateGrey
  { Cat: 'Confirmar', Color: 'slategrey' },  //DarkSlateGrey
  { Cat: 'Confirmado', Color: 'green' },  //DarkSlateGrey
  { Cat: 'NoAsistira', Color: 'orange' },  //DarkSlateGrey
  { Cat: 'Default', Color: '#808080' }, //Grey
]



var EsEvento = new EventSource("https://smxai.net/livecanales/eventomz", {
 withCredentials: true
});




// ------------------------------

const Encabezado = props => {
  try {
    return (
      <css.Box bg={props.bg || "SlateGrey"}>
        <css.Titulo color={props.color || "white"}>{props.texto}</css.Titulo>
      </css.Box>
    )
  } catch (e) {console.error(e)}
}

//---------------------------------

const ChartBar1 = props => {
  return (
    <div>
      <Bar
        data={props.chartdata}
        redraw={props.redraw || false}
        getElementsAtEvent={props.onClick}
        options={{
          legend: {
            display: false,
            labels: {
              fontColor: "rgb(255, 99, 132)"
            }
          },
          title: {
            display: true,
            text: props.title,
            fontsize: 21
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true
                }
              }
            ]
          },
          events: ["click"]
        }}
      />
    </div>
  );
};

//---------------------------------

const Listado1 = props => {
  try {
    const Renglon1 = props => {
      let BgColor;
      if (props.RenglonColor === false) { BgColor = "White" }
      if (props.RenglonColor === true) { BgColor = "WhiteSmoke" }

      let MiColorCat = props.ColorCat(props.Row.Status, MisColores)
      //let miurl = "https://smxai.net/suspanel?feed=0&secc=3&opt=2&usr=" + props.Row.FbId

      return (
        <ThemeProvider theme={props.Theme}>
          <css.Flex bg={BgColor}>

            <css.Box width={1 / 15} bg={MiColorCat}/>

            <css.Box width={2 / 8}>
              <css.Text> {props.Row.Nombre + ' ' + props.Row.Apellidos} </css.Text>
            </css.Box>

            <css.Box width={1 / 4}>
              <css.Text > {props.Row.Ciudad + ', ' + props.Row.Estado} </css.Text>
            </css.Box>

            <css.Box width={1 / 4}>
              <css.Text > {props.Row.Obv} </css.Text>
            </css.Box>

          </css.Flex>
        </ThemeProvider>
      );
    };

    let Renglones = props.Registros.map(row => {
      return (
        <div>
          <Renglon1
            key={row.Id}
            RenglonColor={Micolor}
            Row={row}
            Theme={props.Theme}
            ColorCat = {props.ColorCat}
          />
          {(() => { Micolor = !Micolor })()}
        </div>
      );
    });

    return Renglones

  } catch (e) { console.error(e) }
};

// ------------------------------------------------------------------

const useData = () => {
  const [dataChart, setDataChart] = useState([]);
  const [Opts, setOpts] = useState([]);
  const [Invitaciones, setInvitaciones] = useState([]);

  //-------------------------

  const ColorCat = (Categoria, Colores) => {
    let MiFiltro = Colores.filter((color) => color.Cat === Categoria)
    if (MiFiltro.length != 0) { return MiFiltro[0].Color }
    else { return Colores.filter((color) => color.Cat === "Default")[0].Color }
  }

  //-------------------------

  let ChartDataGenera = (MiArray, Colores) => {
    try {
      let MiColumnas1 = MiArray.map(row => row.X);

      let MiColor = MiArray.map(row => {
        return ColorCat(row.X, MisColores)
      });

      let MiDataSet = () => {
        let MiStatus = "Status";

        return [
          {
            stack: 0,
            label: MiStatus,
            data: MiArray.map(row => row.Cantidad),
            borderWidth: 1,
            backgroundColor: MiColor
          }
        ];
      };

      return {
        labels: MiColumnas1,
        datasets: MiDataSet()
      };
    } catch (e) { console.error(e) }
  };

  //-------------------------

  let getOpts = async () => {
    try {
      var axdata = await axios({
        url: "https://smxai.net/graphqlpub2",
        method: "post",
        data: {
          query: `
            query Eventosmz{
              Eventosmz{
                Eventosmz{Id, Titulo}
              }
            }
          `
        }
      });

      setOpts(axdata.data.data.Eventosmz.Eventosmz.map(v => {
        return {
          value: v.Id,
          label: v.Titulo
        };
      })
      );
    } catch (e) { console.error(e) }
  };

  //-------------------------

  const getDataChart = async (Evento) => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query:
          `
          query EventosInd($Id:Int){
            Eventosmz{
              ResumenEventos(Id:$Id){
                Cat
                X
                Cantidad
              }
            }
          }
      `,
        variables: {
          Id: Evento.value
        }
      }
    });

    let resultado = axdatachart.data.data.Eventosmz.ResumenEventos;
    setDataChart(ChartDataGenera(resultado))
  }

  //-------------------------

  const getInvitaciones = async (Evento, Categoria) => {
    var axdatachart = await axios({
      url: "https://smxai.net/graphqlpub2",
      method: "post",
      data: {
        query:
          `
            query Invitaciones($Evento:Int, $Categoria:String){
              Eventosmz{
                Invitaciones(Categoria:$Categoria, Evento:$Evento){
			            Id, Status, Nombre, Apellidos, Ciudad, Estado, StatusFecha, Obv
                }
              }
            }
      `,
        variables: {
          Evento: Evento.value,
          Categoria: Categoria
        }
      }
    });

    setInvitaciones(axdatachart.data.data.Eventosmz.Invitaciones)
  }

  //-------------------------


  return { dataChart, getDataChart, Opts, getOpts, Invitaciones, getInvitaciones, ColorCat }
}

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const App = () => {

  const [Evento, setEvento] = useState({ value: 99, label: "Evento" });
  const [Cat, setCat] = useState("Todos")
  const [ColoresCat, setColoresCat] = useState([])

  const { dataChart, getDataChart, getOpts, Opts, Invitaciones, getInvitaciones, ColorCat } = useData()

  useEffect(() => { 
    getOpts()
    setColoresCat(MisColores)
  }, []);

  useEffect(() => { getDataChart(Evento) }, [Evento]);

  useEffect(() => { getInvitaciones(Evento, Cat) }, [Evento, Cat]);

  useEffect(() => {
    EsEvento.onmessage = e => {
      getDataChart(Evento)
      getInvitaciones(Evento, Cat)
    };
  });
  //----------------------------------


  //----------------------------------

  const selCategoria = (elems) => {
    if(elems[0]){setCat(elems[0]._model.label)}
    else { setCat("Todos")}
  }

  //----------------------------------

  return (
    <ThemeProvider theme={theme.theme5}>
      <css.Container>

        <Encabezado
          texto="Seguimiento de Invitaciones"
          bg="slategrey"
          color="white"
        />

        <css.Box bg="WhiteSmoke">
          <Dropbox
            name="DropPage"
            value={Evento}
            options={Opts}
            onChange={(e) => setEvento(e)}
          />
        </css.Box>

        <css.Box bg="White">
          <ChartBar1
            title={"Seguimiento de Invitaciones"}
            chartdata={dataChart}
            onClick={selCategoria}
          />
        </css.Box>

        <css.Box bg="White">
          <Listado1
            key={1}
            Theme={theme.theme5.renglon}
            Registros={Invitaciones}
            ColorCat={ColorCat}
          />
        </css.Box>

      </css.Container>
    </ThemeProvider>
  );
}

export default App