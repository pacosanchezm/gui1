// const config = require('config');
// let knex = require('knex')(require('../knexfile')['dev']);
// import axios from 'axios';
// import colors from 'colors';
// import utilerias from '../utilerias';
// import moment from 'moment';
import React, { useState, useEffect, useContext, createContext, Suspense } from "react";

// -------------------------------------------------------------

// import witaiclass2 from '../db/witaiclass2';
// import sendApi from '../messenger-api-helpers/send';
// import sendApiEdu from '../messenger-api-helpers/sendedu';
// import witai from '../db/witai'

// -------------------------------------------------------------

export default function (StateContextM) {





    const Delay = (seconds) => new Promise(resolve => setTimeout(resolve, seconds * 1000))

  return {

    Iterator: function() {

      return {
        BatchSimple : (q, Puller) => {
          try {
            let loop = 0

            return {
              [Symbol.asyncIterator]: async function* () {
      
                while (true) {
                  q.Offset = loop * q.Limit
                  console.log('loop: ' + loop)
                  let Iterable = await Puller(q)
                  yield Iterable
                  loop = loop + 1
                }
              }
            }
          } catch (e) {console.error(e)}
        },


        BatchOne : (q, Puller) => {
          try {
            let loop = 1

            return {
              [Symbol.asyncIterator]: async function* () {
      
                while (true) {
                  q.Offset = loop * q.Limit
                  console.log('loop: ' + loop)
                  let Iterable = await Puller(q)

                  if (Iterable.length>0){
                    for await (const registro of Iterable) {
                      yield registro
                    }
                  } else {break}

                  loop = loop + 1
                }
              }
            }
          } catch (e) {console.error(e)}
        },

        StepSimple : (q, Puller) => {
          try {
            return {
              [Symbol.asyncIterator]: async function* () {
                while (true) {
                  let Iterable = await Puller(q)
                  console.log('Iterable: ' + Iterable)
                  yield Iterable
                }
              }
            }
          } catch (e) {console.error(e)}
        },

      }
    },


    Generador: function() {
      return {
        Simple : (Mapa) => async function* (Iterador) {
          try {
            for await (const registro of Iterador) {
              yield Mapa(registro);
            }
          } catch (e) {console.error(e)}
        },
      }
    },



    Iterar: function() {

      const [Location, setLocation] = useContext(StateContextM).Location;

      return {
        Simple : (Info) => async Generador => {
          let Accionar
          let Logic = 1

          try {
            for await (const registro of Generador) {
              // ------------ Acciones
                Accionar = await Info.Acciones(registro)

              // ------------ Logic
                Logic = await Info.Logic(Accionar, Location)

              // ------------- Delay
                await Delay(Info.Delay)

              // ------------- Revisión
                if (Logic===0){break}
            }
            return 1
          } catch (e) {console.error(e)}
        },


        Promesas : (Info) => async Generador => {
          let Accionar
          let Logic = 1

          try {
            for await (const registro of Generador) {
              // ------------ Acciones

              let PromesasAll = await Promise.all(registro.map( async (reg) => {

                Accionar = await Info.Acciones(reg)

              }))

              // ------------ Logic
                Logic = await Info.Logic(registro.length)

              // ------------- Delay
                await Delay(Info.Delay)

              // ------------- Revisión
                if (Logic===0){break}
            }
            return 1
          } catch (e) {console.error(e)}
        },


        StepSimple : () => async Generador => {
          let Valores
          let Inputs
          let Logic = 1
          let Next = 0
          let StepNew

          try {
            for await (const registro of Generador) {
                Valores = await registro.Valores()
                Inputs = await registro.Acciones(Valores)
                Logic = await registro.Logic(Inputs)
                Next = await registro.Next(Logic)

                console.log ('Next: ' + JSON.stringify(Next))


                if (Next.Promise===2){
                  let PromiseBack = await registro.PromiseBack(Next)
                } else{
                  StepNew = await registro.StepNew(Next.Next)
                  if (Next.Promise===1){await registro.PromiseOri(StepNew)}

                  // ------------- Breaks
                  if (Next.Next===0) {break}
                  if (Next.Wait===1) {break}
                } 

              // ------------- Delay
               // await Delay(3)
            }
            return 1
          } catch (e) {console.error(e)}
        },

      }
    },
  }
}

