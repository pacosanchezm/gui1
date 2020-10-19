import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";
import moment from "moment";

import { useRoutes, A, navigate, useRedirect, setBasepath } from "hookrouter";


// -----------------------------------------------------------------------------











let usedata = function(StateContextM) {



   let graphqlserver = "https://8t8jt.sse.codesandbox.io/gql"
  // let graphqlserver = "https://smxai.net/graphqleai2"

  const [Loading, setLoading] = useContext(StateContextM).Loading;
  const [LoadingDet, setLoadingDet] = useContext(StateContextM).LoadingDet;

  const [LoadingSecc1, setLoadingSecc1] = useContext(StateContextM).LoadingSecc1;

  const [Registros, setRegistros] = useContext(StateContextM).Registros;
  
  const [Detalle, setDetalle] = useContext(StateContextM).Detalle;
  const [Pedido, setPedido] = useContext(StateContextM).Pedido;
  const [FiltroFecha] = useContext(StateContextM).FiltroFecha;

  
  const [Empresa, setEmpresa] = useContext(StateContextM).Empresa
  const [Sucursal, setSucursal] = useContext(StateContextM).Sucursal


  const [Editado, setEditado] = useContext(StateContextM).Editado;
  const [Productos, setProductos] = useContext(StateContextM).Productos;
  const [Cuenta, setCuenta] = useContext(StateContextM).Cuenta;
  const [ExtrasDet, setExtrasDet] = useContext(StateContextM).ExtrasDet;
  const [ConsumosExtras, setConsumosExtras] = useContext(StateContextM).ConsumosExtras;



  // const [Indica, setIndica] = useContext(StateContextM).Indica;

  const [Cliente,  setCliente] = useContext(StateContextM).Cliente;

  const [Nombre, setNombre] = useContext(StateContextM).Nombre;
  const [NumCuenta, setNumCuenta] = useContext(StateContextM).NumCuenta;
  const [Fecha, setFecha] = useContext(StateContextM).Fecha;
  const [Obv, setObv] = useContext(StateContextM).Obv;
  const [Monto, setMonto] = useContext(StateContextM).Monto;

  const [Pagado, setPagado] = useContext(StateContextM).Pagado;
  const [TipoEntrega, setTipoEntrega] = useContext(StateContextM).TipoEntrega;

  const [Sucursales, setSucursales] = useContext(StateContextM).Sucursales;

  const DetalleVacio = useContext(StateContextM).DetalleVacio;

  const [Meetings, setMeetings] = useContext(StateContextM).Meetings;

  const [Activos, setActivos] = useContext(StateContextM).Activos;
  //const [HayActivos, setHayActivos] = useContext(StateContextM).HayActivos;


  const [Filtro1, setFiltro1] = useContext(StateContextM).Filtro1;
  const [Filtro2, setFiltro2] = useContext(StateContextM).Filtro2;
  const [Filtro3, setFiltro3] = useContext(StateContextM).Filtro3;
  const [Filtro4, setFiltro4] = useContext(StateContextM).Filtro4;
  const [Filtro5, setFiltro5] = useContext(StateContextM).Filtro5;

  const [DataOpcion1, setDataOpcion1] = useContext(StateContextM).DataOpcion1;

  const [Data1, setData1] = useContext(StateContextM).Data1;
  const [Data2, setData2] = useContext(StateContextM).Data2;
  const [Data3, setData3] = useContext(StateContextM).Data3;
  const [Data5, setData5] = useContext(StateContextM).Data5;


  const [Cupon, setCupon] = useContext(StateContextM).Cupon;

  const [Participante, setParticipante] = useContext(StateContextM).Participante;




// -------------------------------------

  
  return {

    Sucursales: function() {

      return {

        get: async function(props) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Sucursales ($Sucursal: SucursalInput) {
                  Pedidos {
                    Consultas {
                      Sucursales (Query: $Sucursal) {
                        Id
                        Descripcion
                      }
                    }
                  }
                }
                `,
              variables: {
                Sucursal: { Empresa: Empresa }
              }
            }
          });
          await setSucursales(
            axdata.data.data.Pedidos.Consultas.Sucursales.map(v => {
              return {
                value: v.Id,
                label: v.Descripcion
              };
            })
          );
        },


      };
    }, // ------- Sucursales








    Clientes: function() {

      return {


        get: async function(props) {
          //setLoading(true);
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query getClientes($Query: ClienteInput) {
                  Pedidos {
                    Consultas {
                      Clientes(Query: $Query) {
                        Id
                        Nombre
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: props.Id
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Pedidos.Consultas.Clientes;
              console.log(axdataRes)

          if (axdataRes) {
            return axdataRes
          } else {return 0}
        },














        up : async function(props) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation upCliente ($Query: ClienteBono ) {
                  PedidosM {
                    Registro {
                      UpdateCliente (Query: $Query) 
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: Detalle.Cliente,
                  Telefono: Detalle.Telefono,
                  Nombre: Detalle.Nombre,
                  ApellidoPat: Detalle.Apellido
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.PedidosM.Registro.UpdateCliente;
          console.log(axdataRes);
          if (axdataRes === 1) {
            console.log("Updated:" + axdataRes);
          }


        },


        pull: async function(props) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation PullCliente ($Query: ClienteInput ) {
                  PedidosM {
                    Pull {
                      Cliente (Query: $Query)  {
                        Id
                        Nombre
                        ApellidoPat
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Telefono: Detalle.Telefono
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosM.Pull.Cliente;
          console.log(axdataRes);
          if (axdataRes) {
            console.log("Pulled:" + axdataRes.Id);
    
            await setDetalle({
              ...Detalle,
              Cliente: axdataRes.Id,
              Nombre: axdataRes.Nombre,
              Apellido: axdataRes.ApellidoPat
            });
    
            setEditado(true);
          }
        },



        pull2: async function(props) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation PullCliente ($Query: ClienteInput ) {
                  PedidosM {
                    Pull {
                      Cliente (Query: $Query)  {
                        Id
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Telefono: String(Detalle.Telefono),
                  Nombre: String(Detalle.Nombre),
                  ApellidoPat: String(Detalle.Apellido),
                  Email: String(Detalle.Email),
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosM.Pull.Cliente;
          console.log(axdataRes);
          if (axdataRes) {
            console.log("Pulled:" + axdataRes.Id);


            return axdataRes

          }
        },


        pull3: async function(props) {
          console.log(Detalle.Id)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation PullCliente ($Query: ClienteInput ) {
                  PedidosM {
                    Pull {
                      Cliente (Query: $Query)  {
                        Id
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: Number(Detalle.Cliente),
                  Nombre: String(Detalle.Nombre),
                  ApellidoPat: String(Detalle.Apellido),
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.PedidosM.Pull.Cliente;
          console.log(axdataRes);
          if (axdataRes) {
            console.log("Pulled:" + axdataRes.Id);


            return axdataRes

          }
        },












      };
    }, // ------- Clientes






    Pedidos: function() {

      return {

        get : async function(props) {
          setLoading(true);
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                  query pedidos ($Query: PedidoInput){
                    Pedidos{
                      Consultas{
                        PedidoCom(Query: $Query){
                          Id,
                          Codigo,
                          Sucursal,
                          Cliente,
                          Telefono,
                          TipoEntrega,
                          Nombre,
                          Apellido,
                          Comanda,
                          Cuenta,
                          Fecha,
                          Monto,
                          Pagado,
                          Obv
                        }
                      }
                    }
                  }
                `,
              variables: {
                Query: { Codigo: String(props.id) }
              }
            }
          });
        
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoCom[0];
          //console.log(axdataRes);
          setPedido(axdataRes.Id);
          setSucursal(axdataRes.Sucursal);
          setCliente(axdataRes.Cliente);
          setNombre(axdataRes.Nombre);
          setNumCuenta(axdataRes.Cuenta);
          setMonto(axdataRes.Monto);
          setTipoEntrega(Number(axdataRes.TipoEntrega));
          setFecha(axdataRes.Fecha);
          setObv(axdataRes.Obv);
          setPagado(axdataRes.Pagado);
        
          setLoading(false);
        },


        

        getQ : async function(props) {
          setLoading(true);
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                  query pedidos ($Query: PedidoInput){
                    Pedidos{
                      Consultas{
                        PedidoCom(Query: $Query){
                          Id,
                          Codigo,
                          Sucursal,
                          Cliente,
                          Telefono,
                          TipoEntrega,
                          Nombre,
                          Apellido,
                          Comanda,
                          Cuenta,
                          Fecha,
                          Monto,
                          Pagado,
                          Obv
                        }
                      }
                    }
                  }
                `,
              variables: {
                Query: { Codigo: String(props.id) }
              }
            }
          });
        
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoCom[0];
          //console.log(axdataRes);
          setPedido(axdataRes.Id);
          setSucursal(axdataRes.Sucursal);
          setCliente(axdataRes.Cliente);
          setNumCuenta(axdataRes.Cuenta);
          setMonto(axdataRes.Monto);
          setTipoEntrega(Number(axdataRes.TipoEntrega));
          setFecha(axdataRes.Fecha);
          setObv(axdataRes.Obv);
          setPagado(axdataRes.Pagado);
          console.log(axdataRes.Cliente)
          if (axdataRes.Cliente===props.token){
            setNombre(axdataRes.Nombre)
          } else {
            let Cliente = await this.Clientes().get({Id: props.token})
            setNombre(Cliente[0].Nombre)
          }
          




          setLoading(false);
        }.bind(this),










        getLista : async function(props) {
          setLoading(true);
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query pedidos ($Query: PedidoInput){
                  Pedidos{
                    Consultas{
                      PedidoCom(Query: $Query){
                        Id,
                        Codigo,
                        Dia,
                        Mes,
                        Ano,
                        Sucursal,
                        Cliente,
                        Telefono,
                        Nombre,
                        Apellido,
                        Comanda,
                        Cuenta,
                        Fecha,
                        TipoEntrega,
                        Monto,
                        Pagado,
                        Confirmado,
                        Atendido,
                        Enviado,
                        Entregado,
                        Usuario,
                        Obv
                      }
                    }
                  }
                }
              `,
              variables: {
                Query: { 
                  Sucursal: Sucursal.value,
                    Ano: Number(moment(FiltroFecha).format("YYYY")),
                    Mes: Number(moment(FiltroFecha).format("MM")),
                    Dia: Number(moment(FiltroFecha).format("DD")),
                }
              }
            }
          });
        
          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoCom
          //console.log(axdataRes);
          await setRegistros(axdataRes)
        
          setLoading(false);
        },

        getDetalle : async function(props) {
          setLoadingDet(true);

          await setDetalle(DetalleVacio)

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                  query pedidos ($Query: PedidoInput){
                    Pedidos{
                      Consultas{
                        PedidoCom(Query: $Query){
                          Id,
                          Codigo,
                          Dia,
                          Mes,
                          Ano,
                          Sucursal,
                          Cliente,
                          Telefono,
                          Nombre,
                          Apellido,
                          Comanda,
                          Cuenta,
                          Fecha,
                          TipoEntrega,
                          Monto,
                          Pagado,
                          Confirmado,
                          Atendido,
                          Enviado,
                          Entregado,
                          Usuario,
                          Obv
                        }
                      }
                    }
                  }
                `,
              variables: {
                Query: { Id: Pedido }
              }
            }
          });

          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidoCom[0]
          //console.log(axdataRes);
          await setDetalle(axdataRes)
          setLoadingDet(false);

        },




        getActivos : async function(e) {
         // setLoadingDet(true);

          //await setDetalle(DetalleVacio)

          // console.log(e)


          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query PedidosActivos($Query: PedidoInput) {
                  Pedidos {
                    Consultas{
                      PedidosProcesos1(Query: $Query){
                        Id
                        Codigo
                        Sucursal
                        Cliente
                        Nombre
                        Apellido
                        ConsumosId
                        ConsumosProducto
                        ConsumosMeetingsId
                        ConsumosMeetingsStatus
                        ConsumosMeetingsFechaIni
                        ConsumosMeetingsFechaFin
                      }
                    }
                  }
                }
                `,
              variables: {
                Query: {
                  Producto: e.Producto,
                  FechaFiltro: String(moment.utc().format("YYYY-MM-DD HH:mm"))
                }
              }
            }
          });

          let axdataRes = axdata.data.data.Pedidos.Consultas.PedidosProcesos1
         // console.log(axdataRes);
         let MisActivos = 0

          if (axdataRes.length === 0) {
            MisActivos = [
              {
                Id: 0,
                Nombre: "",
                Apellido: "",
              }
            ]
          }


          if (axdataRes.length > 0) {
            MisActivos = axdataRes.map((e) => (
              {
                Id: e.Cliente,
                Codigo: e.Codigo,
                Nombre: e.Nombre,
                Apellido: e.Apellido,  
              }
            ))
          }

          return MisActivos

        },





          up : async function(props) {
            //await setLoadingDet(true);
            //console.log(Detalle);
      
            // console.log("voy a actualizar:" + Detalle.Cliente);
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation upPedido ($Query: PedidoInput ) {
                    PedidosM {
                      Registro {
                        UpdatePedido (Query: $Query)
                      }
                    }
                  }
                `,
                variables: {
                  Query: {
                    Id: Detalle.Id,
                    Cliente: Detalle.Cliente,
                    Cuenta: Detalle.Cuenta,
                    Monto: Number(Detalle.Monto),
                    Obv: Detalle.Obv
                  }
                }
              }
            });
      
            if (axdata.data) {
              console.log("Guardado");
              await this.Clientes().up();
              setEditado(false);
              this.Pedidos().getLista();
            }
      
            //setLoadingDet(false);
          }.bind(this),






          upProceso : async function(e) {

            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation upPedido ($Query: PedidoInput ) {
                    PedidosM {
                      Registro {
                        UpdateProceso (Query: $Query)
                      }
                    }
                  }
                `,
                variables: {
                  Query: {
                    Id: Number(e.Id),
                    Proceso: e.Proceso,
                    ProcesoObv: e.ProcesoObv
                  }
                }
              }
            });
      
            if (axdata.data) {return 1} else return 0
      
          },













          confirma : async function(MiMonto) {
            //await setLoadingDet(true);
            //console.log(Detalle);
      
            // console.log("voy a actualizar:" + Detalle.Cliente);
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation upPedido ($Query: PedidoInput ) {
                    PedidosM {
                      Registro {
                        ConfirmaPedido (Query: $Query)
                      }
                    }
                  }
                `,
                variables: {
                  Query: {
                    Id: Pedido,
                    Sucursal: Sucursal,
                    Monto: MiMonto,
                    Obv: Obv
                  }
                }
              }
            });
            console.log(axdata.data)
            if (axdata.data.data.PedidosM.Registro.ConfirmaPedido===1) {
              setMonto(MiMonto)
              
            }
      
            //setLoadingDet(false);
          },








          add: async function(props) {
            await setLoadingDet(true);

            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation AddPedido ($Query: PedidoInput ) {
                    PedidosM {
                      Registro {
                        InsertPedido (Query: $Query)
                      }
                    }
                  }
                 `,
                variables: {
                  Query: {
                    Sucursal: Sucursal.value,
                    Cliente: props.Cliente ? props.Cliente : null,
                    Referido: props.Referido ? props.Referido : null,
                  }
                }
              }
            });
      
            if (axdata.data.data.PedidosM.Registro.InsertPedido) {
              console.log(
                "Agregado:" + axdata.data.data.PedidosM.Registro.InsertPedido
              );
              setPedido(axdata.data.data.PedidosM.Registro.InsertPedido);
              //navigate("/det");
             // this.Pedidos().getLista();
            }
      
            setLoadingDet(false);

            return axdata.data.data.PedidosM.Registro.InsertPedido


          }.bind(this),





          addQ2: async function(props) {
            await setLoadingDet(true);

            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation AddPedido ($Query: PedidoInput ) {
                    PedidosM {
                      Registro {
                        InsertPedidoQ2 (Query: $Query) {
                          Id
                          Codigo
                        }
                      }
                    }
                  }
                 `,
                variables: {
                  Query: {
                    Sucursal: Sucursal.value,
                    Cliente: props.Cliente ? props.Cliente : null,
                    Referido: props.Referido ? props.Referido : null,
                  }
                }
              }
            });
      
            if (axdata.data.data.PedidosM.Registro.InsertPedidoQ2) {
              console.log(axdata.data.data.PedidosM.Registro.InsertPedidoQ2);
              setPedido(axdata.data.data.PedidosM.Registro.InsertPedidoQ2.Id);
              //navigate("/det");
             // this.Pedidos().getLista();
            }
      
            setLoadingDet(false);

            return axdata.data.data.PedidosM.Registro.InsertPedidoQ2


          },










          sendSms: async function(props) {
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation sendsms ($Query: PedidoInput ) {
                    PedidosM {
                      Envios {
                        Sms (Query: $Query)
                      }
                    }
                  }
                 `,
                variables: {
                  Query: {
                    Telefono: Detalle.Telefono,
                    Nombre: Detalle.Nombre,
                    Codigo: Detalle.Codigo,
                    Sucursal: Detalle.Sucursal
                  }
                }
              }
            });
      
            let axdataRes = axdata.data.data.PedidosM.Envios.Sms;
            console.log(axdataRes);
            if (axdataRes) {
              console.log("Mandado:" + axdataRes);
              return 1;
            } else {
              return 0;
            }
          },
      
          sendSms2: async function(props) {
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation sendsms ($Query: PedidoInput ) {
                    PedidosM {
                      Envios {
                        Sms2 (Query: $Query)
                      }
                    }
                  }
                 `,
                variables: {
                  Query: {
                    Telefono: Detalle.Telefono,
                    Nombre: Detalle.Nombre,
                    Codigo: Detalle.Codigo,
                    Sucursal: Detalle.Sucursal
                  }
                }
              }
            });
      
            let axdataRes = axdata.data.data.PedidosM.Envios.Sms2;
            console.log(axdataRes);
            if (axdataRes) {
              console.log("Mandado:" + axdataRes);
              return 1;
            } else {
              return 0;
            }
          },

          sendSms3: async function(props) {
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  mutation sendsms ($Query: PedidoInput ) {
                    PedidosM {
                      Envios {
                        Sms3 (Query: $Query)
                      }
                    }
                  }
                 `,
                variables: {
                  Query: {
                    Telefono: Detalle.Telefono,
                    Nombre: Detalle.Nombre,
                    Codigo: Detalle.Codigo,
                    Sucursal: Detalle.Sucursal
                  }
                }
              }
            });
      
            let axdataRes = axdata.data.data.PedidosM.Envios.Sms3;
            console.log(axdataRes);
            if (axdataRes) {
              console.log("Mandado:" + axdataRes);
              return 1;
            } else {
              return 0;
            }
          },











          sumPagado: Registros.reduce((a, b) => a + Number((b.Pagado)), 0),

      

          getData1: async props => {
           
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  query PedidosResAno($Query: PedidoInput) {
                    Pedidos {
                      Consultas {
                        ResAno(Query: $Query) {
                          Mes
                          Cuenta
                          Monto
                        }
                      }
                    }
                  }
                  `,
                variables: {
                  Query: {
                    Ano: Filtro1.value,
                    Sucursal: Filtro5.value
                  }
                }
              }
            });

            let axres = axdata.data.data.Pedidos.Consultas.ResAno
            var x = 0;
            var len = axres.length
            while(x < len){ 
              axres[x].Monto = parseFloat(axres[x].Monto.toFixed(0))
                x++
            }
            await setData1(axres);
          },


          getData2: async props => {
           
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                query PedidosResMes($Query: PedidoInput) {
                  Pedidos {
                    Consultas {
                      ResMes(Query: $Query) {
                        Dia
                        Cuenta
                        Monto
                      }
                    }
                  }
                }
                  `,
                variables: {
                  Query: {
                    Ano: Filtro1.value,
                    Mes: Filtro2.value,
                    Sucursal: Filtro5.value
                  }
                }
              }
            });

            let axres = axdata.data.data.Pedidos.Consultas.ResMes
            var x = 0;
            var len = axres.length
            while(x < len){ 
              axres[x].Monto = parseFloat(axres[x].Monto.toFixed(0))
                x++
            }
            await setData2(axres);
          },



          getData5: async props => {
           
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                query PedidosResSuc($Query: PedidoInput) {
                  Pedidos {
                    Consultas {
                      ResSuc(Query: $Query) {
                        Clave
                        Cuenta
                        Monto
                      }
                    }
                  }
                }
                  `,
                variables: {
                  Query: {
                    Ano: Filtro1.value,
                    Mes: Filtro2.value,
                   // Sucursal: Filtro5.value
                  }
                }
              }
            });

            let axres = axdata.data.data.Pedidos.Consultas.ResSuc
            var x = 0;
            var len = axres.length
            while(x < len){ 
              axres[x].Monto = parseFloat(axres[x].Monto.toFixed(0))
                x++
            }


             setData5(axres);
          },









      };
    }, // ------- Pedidos







    Catalogos: function() {

      return {

        get: async function(e) {
         // setLoadingSecc1(true);
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query CatalogoProducto ($Query: CatalogoProductoInput) {
                  CatalogosProductos {
                    Consultas {
                      Meetings1 (Query: $Query) {

                        Empresa
                        EmpresasTitulo
                        EmpresasLogo
                        EmpresasLogo2
                        Sucursal
                        CatalogoTipo

                        Id
                        Producto
                        ProductosTitulo
                        Status
                        Precio
                        Obv
                        ProductosFoto
                        ProductosFoto2
                        MeetingsId
                        MeetingId
                        MeetingsObv
                        MeetingsFecha
                        MeetingsLugar
                        MeetingsTemplate
                      }
                    }
                  }
                }     
               `,
              variables: {
                Query: {
                  Clave: String(e.id)
                }
              }
            }
          });
     
          let axdataRes = axdata.data.data.CatalogosProductos.Consultas.Meetings1[0];

          if (axdataRes) {
            //console.log(axdataRes)
            return axdataRes

          } else {
            //setLoadingSecc1(false)
            return 0}
        },

      };
    }, // ------- Catalogos















    Productos: function() {

      return {

        get: async function(props) {
          setLoading(true);
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Menu($Query: MenuInput) {
                  Menus {
                    Consultas {
                      Amplia1(Query: $Query) {
                        Id
                        Sucursal
                        CategoriasTitulo
                        CategoriasDescripcion
                        Producto
                        ProductosTitulo
                        ProductosDescripcion
                        ProductosIcon
                        ProductosFoto
                        ProductosFoto2
                        ProductosFoto3
                        Precio
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Sucursal: Sucursal
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Menus.Consultas.Amplia1;
    
          if (axdataRes) {
            setProductos(axdataRes)
            setLoading(false);
          } else {}
        },
     

        getDetalle: async function(MenuId) {
          setLoadingDet(true)
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Menu($Query: MenuInput) {
                  Menus {
                    Consultas {
                      Amplia1(Query: $Query) {
                        Id
                        Precio
                        PrecioObv
                        Precio2
                        PrecioObv2
                        Precio3
                        PrecioObv3                      
                        Producto
                        ProductosTitulo
                        ProductosDescripcion
                        ProductosIcon
                        ProductosFoto
                        ProductosFoto2
                        ProductosFoto3
                        ProductosVideo
                        ProductosObv
                      

                        CategoriasTitulo
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: MenuId
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Menus.Consultas.Amplia1[0];
    
          if (axdataRes) {
    
            let MiDetalle = {...axdataRes,
            "ProductosId": axdataRes.Producto,
            "ConsumosPrecio": axdataRes.Precio,
            "ConsumosPrecioObv": axdataRes.PrecioObv,
            "ConsumosDescuento": [""],
            "ConsumosCantidad": 1,
            "ConsumosImporte": axdataRes.Precio,
            "ConsumosObv": "",
            "CategoriasTitulo": axdataRes.CategoriasTitulo,
            }
    
            setDetalle(MiDetalle);
            this.Extras().get(axdataRes.Producto)
            setLoadingDet(false)
          } else {}
        }.bind(this),

      };
    }, // ------- Pedidos


    Consumos: function() {

      return {

        get: async function(q) {
          try {
            setLoading(true)
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  query ConsumosResumen($Query: ConsumoInput) {
                    Consumos {
                      Consultas {
                        Resumen1(Query: $Query){
                          Pedido
                          Id
                          Fecha
                          Producto
                          ProductosTitulo
                          ProductosFoto
                          Precio
                          PrecioObv
                          Descuento
                          Cantidad
                          Importe
                          ConsumosExtrasImporte
                          ConsumoTotal
                          Obv
                          Proceso
                          ProcesoObv
                        }
                      }
                    }
                  }
                  `,
                variables: {
                  Query: { Pedido: Pedido }
                }
              }
            });
            await setRegistros(axdata.data.data.Consumos.Consultas.Resumen1)
            setLoading(false);
            console.log(axdata.data.data.Consumos.Consultas.Resumen1)
          } catch (e) {console.error(e)}
        }, // ----get



        getPart: async function(q) {
          try {
            setLoading(true)
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  query ConsumosResumen($Query: ConsumoInput) {
                    Consumos {
                      Consultas {
                        Resumen1Part(Query: $Query){
                          Pedido
                          Id
                          Fecha
                          Producto
                          ProductosTitulo
                          ProductosFoto
                          Precio
                          PrecioObv
                          Descuento
                          Cantidad
                          Importe
                          ConsumosExtrasImporte
                          ConsumoTotal
                          Obv
                          Proceso
                          ProcesoObv
                          ClienteNombre
                        }
                      }
                    }
                  }
                  `,
                variables: {
                  Query: { Pedido: Pedido }
                }
              }
            });
            await setRegistros(axdata.data.data.Consumos.Consultas.Resumen1Part)
            setLoading(false);
            console.log(axdata.data.data.Consumos.Consultas.Resumen1Part)
          } catch (e) {console.error(e)}
        }, // ----get






        get2: async function(MiPedido) {
          try {
           // setLoading(true)
            var axdata = await axios({
              url: graphqlserver,
              method: "post",
              data: {
                query: `
                  query ConsumosResumen($Query: ConsumoInput) {
                    Consumos {
                      Consultas {
                        Resumen1(Query: $Query){
                          Pedido
                          Id
                          Fecha
                          Producto
                          ProductosTitulo
                          ProductosFoto
                          Precio
                          PrecioObv
                          Descuento
                          Cantidad
                          Importe
                          ConsumosExtrasImporte
                          ConsumoTotal
                          Obv
                          Proceso
                          ProcesoObv
                        }
                      }
                    }
                  }
                  `,
                variables: {
                  Query: { Pedido: MiPedido }
                }
              }
            });
            await setRegistros(axdata.data.data.Consumos.Consultas.Resumen1)
            // setLoading(false);
            console.log(axdata.data.data.Consumos.Consultas.Resumen1)
          } catch (e) {console.error(e)}
        }, // ----get









        getDetalle: async function(Id) {
          setLoadingDet(true)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Consumos($Query: ConsumoInput) {
                  Consumos {
                    Consultas {
                      Amplia2(Query: $Query) {
                        Id
                        Pedido
                        Producto
                        Importe
                        Cantidad
                        Fecha
                        Precio
                        PrecioObv
                        Descuento
                        Importe
                        Obv
                        ProductosTitulo
                        ProductosDescripcion
                        ProductosFoto
                        ProductosFoto2
                        ProductosFoto3
                        ProductosVideo
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: Id
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Consumos.Consultas.Amplia2[0];
    
          if (axdataRes) {
    
            let MiDetalle = {...axdataRes,
            "ConsumosId": axdataRes.Id,
            "ConsumosFecha": axdataRes.Fecha,
            "ConsumosPrecio": axdataRes.Precio,
            "ConsumosPrecioObv": axdataRes.PrecioObv,
            "ConsumosDescuento": 0,
            "ConsumosCantidad": axdataRes.Cantidad,
            "ConsumosImporte": axdataRes.Importe,
            "ConsumosObv": axdataRes.Obv
            }
    
            setDetalle(MiDetalle);
            this.ConsumosExtras().get(axdataRes.Id)
            setLoadingDet(false)
          } else {}
        }.bind(this),


        getDetalleC: async function(Id) {
          setLoadingDet(true)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Consumos($Query: ConsumoInput) {
                  Consumos {
                    Consultas {
                      Amplia2(Query: $Query) {
                        Id
                        Pedido
                        Producto
                        Importe
                        Cantidad
                        Fecha
                        Precio
                        Descuento
                        Importe
                        Obv
                        ProductosTitulo
                        ProductosDescripcion
                        ProductosFoto
                        ProductosFoto2
                        ProductosFoto3
                        ProductosVideo
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: Id
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Consumos.Consultas.Amplia2[0];
    
          if (axdataRes) {
    
            let MiDetalle = {...axdataRes,
            "ConsumosId": axdataRes.Id,
            "ConsumosFecha": axdataRes.Fecha,
            "ConsumosPrecio": axdataRes.Precio,
            "ConsumosDescuento": 0,
            "ConsumosCantidad": axdataRes.Cantidad,
            "ConsumosImporte": axdataRes.Importe,
            "ConsumosObv": axdataRes.Obv
            }
    
            setDetalle(MiDetalle);
            this.ConsumosExtras().getC(axdataRes.Id)
            setLoadingDet(false)
          } else {}
        }.bind(this),


        getCuenta: async function(props) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query PedidosSuma($Query: PedidoInput) {
                  Pedidos {
                    Consultas {
                      Suma1(Query: $Query) {
                        Pedido
                        Cuenta
                        Monto
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Id: Pedido
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.Pedidos.Consultas.Suma1;
    
          if (axdataRes.length>0) {
            setCuenta(axdataRes[0]);
          } else {
            setCuenta({Pedido: Pedido, Cuenta: 0, Monto: 0})
          }
        },

        
        add: async function(props) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation InsertConsumo ($Query: ConsumoInput) {
                  ConsumosM {
                    Registro {
                      Insert (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  "Pedido": Pedido,
                  "Producto": Detalle.ProductosId,
                  "Precio": Detalle.ConsumosPrecio,
                  "PrecioObv": Detalle.ConsumosPrecioObv,
                  "Descuento": 0,
                  "Cantidad": Detalle.ConsumosCantidad,
                  "Importe": Detalle.ConsumosCantidad * (Detalle.ConsumosPrecio + this.Extras().sum),
                  Obv: Detalle.ConsumosObv,
                  Proceso: "Confirmar",
                  Participante: Participante
                }
              }
            }
          });
    
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Insert
          if (axdataRes) {
            this.ConsumosExtras().add(axdataRes)
            navigate("/");        
            this.Consumos().getPart();
          }
        }.bind(this),




        add2: async function(props) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation InsertConsumo ($Query: ConsumoInput) {
                  ConsumosM {
                    Registro {
                      Insert (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  "Pedido": props.Pedido,
                  "Producto": props.Producto,
                  "Precio": props.Precio,
                  "PrecioObv": props.PrecioObv,
                  "Descuento": 0,
                  "Cantidad": props.Cantidad,
                  "Importe": props.Importe,
                  Obv: props.Obv
                }
              }
            }
          });
    
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Insert
          if (axdataRes) {     
            this.Consumos().get2(props.Pedido)
            return axdataRes
          }
        }.bind(this),






















        up: async function(props) {    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation UpdateConsumo ($Query: ConsumoInput) {
                  ConsumosM {
                    Registro {
                      Update (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  "Id": Detalle.ConsumosId,
                  "Precio": Detalle.ConsumosPrecio,
                  "Descuento": 0,
                  "Cantidad": Detalle.ConsumosCantidad,
                  "Importe": Detalle.ConsumosCantidad * (Detalle.ConsumosPrecio + this.Extras().sum),
                  Obv: Detalle.ConsumosObv
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Update
          if (axdataRes) {
            this.Consumos().getPart()

            ExtrasDet.map((row, i) => {
              if(row.Id===ConsumosExtras[i].Id) {
                if(row.ExtrasDetCantidad!==ConsumosExtras[i].ExtrasDetCantidad) {
                 this.ConsumosExtras().up(row.Id, row.ExtrasDetCantidad)
                }
              }
              return 1
            })
          }
          return 1
        }.bind(this),


        del: async function(ConsumoId) {
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation DeleteConsumo ($Query: ConsumoInput) {
                  ConsumosM {
                    Registro {
                      Delete (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  "Id": ConsumoId,
                }
              }
            }
          });
    
          let axdataRes = axdata.data.data.ConsumosM.Registro.Delete
    
          if (axdataRes) {
            this.Consumos().get();
          }
        }.bind(this),







      };
    }, // ------- Consumos



    Extras: function() {

      return {
        sum: ExtrasDet.reduce((a, b) => a + Number((b.ExtrasDetCantidad * b.ExtrasDetPrecio)), 0),

        get : async function(Producto) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Extras ($Query: ExtraInput) {
                  Extras {
                    Consultas {
                      Amplia1 (Query: $Query) {
                        Producto
                        Id
                        Titulo
                        Descripcion
                        ExtrasDetId
                        ExtrasDetTitulo
                        ExtrasDetPrecio
                      }
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Producto: Producto
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.Extras.Consultas.Amplia1;
      
          if (axdataRes) {
            let MiExtras = axdataRes.map(row => {
              return (
                {...row,
                  "ExtrasDetCantidad": 0,
                  "ExtrasDetImporte": 0,
                }
              )
            })
      
            setExtrasDet(MiExtras);
            
          } else {}
        },


      };
    }, // ------- Extras


    ConsumosExtras: function() {
      return {
        get : async function(Consumo) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query ConsumosExtras ($Query: ConsumoExtraInput) {
                  ConsumosExtras {
                    Consultas {
                      Amplia1 (Query: $Query) {
                        Id
                        Importe
                        Consumo
                        ExtraDet
                        Precio
                        Descuento
                        Cantidad
                        Importe
                        ExtrasDetExtra
                        ExtrasDetTitulo
                        ExtrasDetDescripcion
                      }
                    }
                  }
                }        
               `,
              variables: {
                Query: {
                  Consumo: Consumo
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosExtras.Consultas.Amplia1;
      
          if (axdataRes) {
            let MiExtras = axdataRes.map(row => {
              return (
                {
                  Producto: 1,
                  Id: row.Id,
                  Titulo: "Ingredientes Extra",
                  "Descripcion": "Agrega los ingredientes de tu preferencia",
                  "ExtrasDetId": row.ExtraDet,
                  "ExtrasDetTitulo": row.ExtrasDetTitulo,
                  "ExtrasDetPrecio": row.Precio,
                  "ExtrasDetCantidad": row.Cantidad,
                  "ExtrasDetImporte": row.Importe,
                }
              )
            })      
            setConsumosExtras(MiExtras)
            setExtrasDet(MiExtras);
          } else {}
        },


        getC : async function(Consumo) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query ConsumosExtras ($Query: ConsumoExtraInput) {
                  ConsumosExtras {
                    Consultas {
                      Amplia1 (Query: $Query) {
                        Id
                        Importe
                        Consumo
                        ExtraDet
                        Precio
                        Descuento
                        Cantidad
                        Importe
                        ExtrasDetExtra
                        ExtrasDetTitulo
                        ExtrasDetDescripcion
                      }
                    }
                  }
                }        
               `,
              variables: {
                Query: {
                  Consumo: Consumo
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosExtras.Consultas.Amplia1;
      
          if (axdataRes) {
            let MiExtras = axdataRes.map(row => {
              return (
                {
                  Producto: 1,
                  Id: row.Id,
                  Titulo: "Canciones",
                  "Descripcion": "",
                  "ExtrasDetId": row.ExtraDet,
                  "ExtrasDetTitulo": row.ExtrasDetTitulo,
                  "ExtrasDetPrecio": row.Precio,
                  "ExtrasDetCantidad": row.Cantidad,
                  "ExtrasDetImporte": row.Importe,
                }
              )
            })      
            setConsumosExtras(MiExtras)
            setExtrasDet(MiExtras);
          } else {}
        },


        add : async function(Consumo) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation InsertConsumosExtra ($Query: ConsumoExtraInput) {
                  ConsumosExtrasM {
                    Registro {
                      InsertSerie (Query: $Query)
                    }
                  }
                }
               `,
              variables: {
                Query: {
                  Consumo: Consumo,
                  Serie: JSON.stringify(ExtrasDet)
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosExtrasM.Registro.Amplia1;
      
          if (axdataRes) {} else {}
        },
      

        up : async function(Id, Cantidad) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation InsertConsumosExtra ($Query: ConsumoExtraInput) {
                  ConsumosExtrasM {
                    Registro {
                      UpdateMin (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Id,
                  Cantidad: Cantidad
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosExtrasM.Registro.UpdateMin;
      
          if (axdataRes) {} else {}
        },


      };
    }, // ------- ConsumosExtras





    ConsumosMeetings: function() {
      return {


        get : async function(q) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query ConsumosMeetings($Query: ConsumoInput) {
                  Consumos {
                    Consultas {
                      Meetings1(Query: $Query){
                        Pedido
                        Id
                        ConsumosMeetingsId
                        ConsumosMeetingsIngresoUrl
                      }
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Pedido: Pedido
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.Consumos.Consultas.Meetings1;
      
          if (axdataRes) {
            setMeetings(axdataRes)
            return axdataRes
          } else { return 0}
        },












        insert : async function(q) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation Inscribir ($Query: ConsumoMeetingInput ) {
                  ConsumosMeetingsM {
                    Registro {
                      Insert (Query: $Query)
                    }
                  }
                } 
              `,
              variables: {
                Query: {
                  Consumo: q.Consumo,




                  // Host: q.Host,
                  // MeetingId: q.MeetingId,
                  // Email: q.Email,
                  // Nombre: q.Nombre,
                  // ApellidoPat: q.ApellidoPat,
                  // Telefono: q.Telefono,
                  // Cupon: q.Cupon,
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosMeetingsM.Registro.Insert;
      
          if (axdataRes) {} else {}
        },










        inscribir : async function(q) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation Inscribir ($Query: InscribirMeetingInput ) {
                  ConsumosMeetingsM {
                    Registro {
                      Inscribir (Query: $Query)
                    }
                  }
                } 
              `,
              variables: {
                Query: {
                  Consumo: q.Consumo,
                  Host: q.Host,
                  MeetingId: q.MeetingId,
                  Email: q.Email,
                  Nombre: q.Nombre,
                  ApellidoPat: q.ApellidoPat,
                  Telefono: q.Telefono,
                  Cupon: q.Cupon,
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosMeetingsM.Registro.Inscribir;
      
          if (axdataRes) {return 1} else {return 0}
        },



       
        MandarMail : async function(q) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation MandarMail ($Query: EnviarMeetingInput ) {
                  ConsumosMeetingsM {
                    Entregas {
                      Mail (Query: $Query)
                    }
                  }
                } 
              `,
              variables: {
                Query: {

                  Email: String(Detalle.Email),
                  Nombre: String(Detalle.Nombre),
                  Titulo: String(Productos.ProductosTitulo),
                  Foto: String(Productos.ProductosFoto2),
                  Url: String(Meetings[0].ConsumosMeetingsIngresoUrl),
                  UrlInvita: "https://smxai.net/eventos?id=empb1",
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosMeetingsM.Entregas.Mail;
      
          if (axdataRes) {return 1} else {return 0}
        },


        MandarMailNode : async function(q) {
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation MandarMail ($Query: EnviarMeetingInput ) {
                  ConsumosMeetingsM {
                    Entregas {
                      MailNode (Query: $Query)
                    }
                  }
                } 
              `,
              variables: {
                Query: {

                  Email: String(Detalle.Email),
                  Nombre: String(Detalle.Nombre),
                  Titulo: String(Productos.ProductosTitulo),
                  Foto: String(Productos.ProductosFoto2),
                  Url: String(q[0].ConsumosMeetingsIngresoUrl),
                  UrlInvita: "https://smxai.net/eventos?id=juansolo1&token=" + String(Detalle.Cliente),
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ConsumosMeetingsM.Entregas.MailNode;
      
          if (axdataRes) {return 1} else {return 0}
        },










      };
    }, // ------- ConsumosMeetings








    Cupones: function() {
      return {

        get : async function(Codigo) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                query Cupon($Query: CuponInput){
                  Cupones{
                    Consultas{
                      Base(Query: $Query){
                        Id
                        Tipo
                        Catalogo
                        Producto
                        Pedido
                        Consumo
                        Codigo
                        Sponsor
                        Aplicado
                        Titulo
                        DescuentoPct
                        DescuentoCant
                      }
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Codigo: String(Codigo),
                  Status: "Activo"
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.Cupones.Consultas.Base[0];
      
          if (axdataRes) {
            return axdataRes
          } else { return 0}
        },

        aplicar : async function(Id) {

          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
                mutation AplicarCupon ($Query: CuponInput ) {
                  CuponesM {
                    Registro {
                      Update (Query: $Query)
                    }
                  }
                }
              `,
              variables: {
                Query: {
                  Id: Number(Id),
                  Pedido: Pedido
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.CuponesM.Registro.Update      
          return axdataRes

        },



      };
    }, // ------- Cupones






    Sponsors: function() {
      return {


        get : async function(e) {
          console.log(e)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              query Sponsors($Query: SponsorInput) {
                Sponsors {
                  Consultas {
                    Base(Query: $Query) {
                      Id
                      Logo
                      Link
                      Titulo
                    }
                  }
                }
              }
              `,
              variables: {
                Query: {
                  Id: Number(e.Sponsor),
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.Sponsors.Consultas.Base;
      
          if (axdataRes) {
            return axdataRes
          } else { return 0}
        },










        getMeeting : async function(e) {
          //console.log(e)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              query MeetingsSponsors($Query: ProductoMeetingSponsorInput) {
                ProductosMeetingsSponsors {
                  Consultas {
                    Amplia1(Query: $Query) {
                      Id
                      Meeting
                      Sponsor
                      SponsorsTitulo
                      SponsorsLogo
                      SponsorsLink
                    }
                  }
                }
              }
              `,
              variables: {
                Query: {
                  Meeting: Number(e.MeetingsId),
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.ProductosMeetingsSponsors.Consultas.Amplia1;
      
          if (axdataRes) {
            return axdataRes
          } else { return 0}



        },




      };
    }, // ------- Sponsors









    Pagos: function() {
      return {

        Stripe: async (token, Monto, Servicio) => {
          console.log("PayStripe: " + JSON.stringify(token));
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation PagoToken ($PayIntent: StripePaymentIntent) {
                PagosM  {
                  Registro {
                    Pagar (Query: $PayIntent)
                  }
                }
              }
            `,
              variables: {
                PayIntent: {
                  Id: Number(Pedido),
                  Cart: Sucursal,
                  Token: 1234,
                  SToken: token.token.id,
                  Amount: Number(Monto) * 100,
                  Descripcion: "Pedido Suc " + Sucursal + " # " + Pedido,
                  Ip: token.token.client_ip,
                  Servicio: Number(Servicio),
                  Obv: Obv
                }
              }
            }
          });
    
          console.log(axdata.data);
          if (axdata.data.data.PagosM.Registro.Pagar === 1) {
            // setPayStatus({ Status: "Pagado", Color: "green" });
            return 1;
          } else {
           // setPayStatus({ Status: "Pago No Procesado", Color: "red" });
            return 0;
          }
        },

        Stripe2: async (token, Monto, Servicio) => {
          console.log("PayStripe: " + JSON.stringify(token));
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation PagoToken ($PayIntent: StripePaymentIntent) {
                PagosM  {
                  Registro {
                    Pagar (Query: $PayIntent)
                  }
                }
              }
            `,
              variables: {
                PayIntent: {
                  Id: Number(Pedido),
                  Cart: Sucursal.value,
                  Token: 1234,
                  SToken: token.token.id,
                  Amount: Number(Monto) * 100,
                  Descripcion: "Pedido Suc " + Sucursal.value + " # " + Pedido,
                  Ip: token.token.client_ip,
                  Servicio: Number(Servicio),
                  Obv: Obv
                }
              }
            }
          });
    
          console.log(axdata.data);
          if (axdata.data.data.PagosM.Registro.Pagar === 1) {
            // setPayStatus({ Status: "Pagado", Color: "green" });
            return 1;
          } else {
           // setPayStatus({ Status: "Pago No Procesado", Color: "red" });
            return 0;
          }
        },

        Free: async (e) => {
          //console.log("PayStripe: " + JSON.stringify(token));
    
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation PagoFree ($Query: MercadoPPaymentIntent) {
                PagosM  {
                  Registro {
                    PagarFree (Query: $Query)
                  }
                }
              }
            `,
              variables: {
                Query: {
                  Id: Number(Pedido),
                  Cart: Sucursal.value,
                  Token: 1234,
                  //SToken: token.token.id,
                  Amount: Number(100),
                  Descripcion: "Pedido Suc " + Sucursal.value + " # " + Pedido,
                  //Ip: token.token.client_ip,
                  Forma: e.Forma,
                  Servicio: 0,
                  Obv: Obv
                }
              }
            }
          });
    
          



          console.log("update: " + axdata.data.data.PagosM.Registro.PagarFree);
          if (axdata.data.data.PagosM.Registro.PagarFree === 1) {
            // setPayStatus({ Status: "Pagado", Color: "green" });
            return 1;
          } else {
           // setPayStatus({ Status: "Pago No Procesado", Color: "red" });
            return 0;
          }
        },



      };
    }, // ------- Pagos





    Location: function() {
      return {




        

        insert : async function(e) {
          console.log(e)
          var axdata = await axios({
            url: graphqlserver,
            method: "post",
            data: {
              query: `
              mutation LocationInsert ($Query: PedidoLocationInput ) {
                PedidosLocationsM {
                  Registro {
                    Insert (Query: $Query)
                  }
                }
              }         
              `,
              variables: {
                Query: {
                  "Pedido": Number(e.Pedido),
                  "LocLat": Number(e.LocLat),
                  "LocLong": Number(e.LocLong),
                  "Accuracy": Number(e.Accuracy),
                  Marca: e.Marca,
                  Color: e.Color,
                  Obv: e.Obv
                 // Fecha: e.Fecha,
                }
              }
            }
          });
      
          let axdataRes = axdata.data.data.PedidosLocationsM.Registro.Insert;
      
          if (axdataRes) {
            return axdataRes
          } else { return 0}
        },



      };
    }, // ------- Location






  };
};


export default usedata