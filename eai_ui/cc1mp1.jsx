import React, { useState, useEffect, useContext, createContext } from "react";

/** @jsx jsx */
import { ThemeProvider, jsx, Styled, useThemeUI } from "theme-ui";
import { Flex, Box, Button, Text, Image, Spinner, Grid, Input, Link } from "@theme-ui/components";
import Theme from "../css/cssui/theme";

import MaskedInput from "react-text-mask";

let App;

// -----------------------------------------------------------------------


let Images = {
  logo1: {src: "https://smxai.net/sf/pagos1.jpg"},
  logo2: {src: "https://smxai.net/sf/eglogo1.jpeg"}
};


let CardImages = {
  no: {src: "https://smxai.net/sf/card_no.jpg"},
  vs: {src: "https://smxai.net/sf/card_vs.jpg"},
  mc: {src: "https://smxai.net/sf/card_mc.jpg"},
  am: {src: "https://smxai.net/sf/card_am.jpg"},
}


// ------------------

const StateContext = createContext();
const CtxTheme = createContext(Theme);
const CtxLoading = createContext(false);
const CtxImages = createContext(Images);

const CtxMonto = createContext(0);
const CtxPagado = createContext(0);

const CtxPayStatus = createContext({ Status: "Pagar", Color: "#66cc99" });
const CtxIndica = createContext("Llena  todos los datos");
const CtxDisabled = createContext(false);



// ------------------

const useStateLocal = () => {
  return {
    Theme: useState(useContext(CtxTheme)),
    Loading: useState(useContext(CtxLoading)),
    Images: useState(useContext(CtxImages)),

    Pagado: useState(useContext(CtxPagado)),
    Monto: useState(useContext(CtxMonto)),

    PayStatus: useState(useContext(CtxPayStatus)),
    Indica: useState(useContext(CtxIndica)),
    Disabled: useState(useContext(CtxDisabled)),

  };
};


// ------------------

const ContextProvider = props => {
  return (
    <StateContext.Provider value={useStateLocal()}>
      <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
    </StateContext.Provider>
  );
};

// ------------------


const Body = props => {

  const Estilo = useThemeUI().theme.styles
  const [Loading, setLoading] = useContext(StateContext).Loading

  const [Monto, setMonto] = useContext(StateContext).Monto;
  const [Pagado, setPagado] = useContext(StateContext).Pagado;

  const [PayStatus, setPayStatus] = useContext(StateContext).PayStatus
  const [Indica, setIndica] = useContext(StateContext).Indica;
  const [Disabled, setDisabled] = useContext(StateContext).Disabled;


  const {Paid, Pagar} = props

// ------------------

const ccMask1 = [/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/];
const ccMask2 = [/\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/];
const lateMonthMask = [/\d/, /\d/];
const YearMask = [/\d/, /\d/];

const cscMask = [/\d/, /\d/, /\d/];
const cscMaskAm = [/\d/, /\d/, /\d/, /\d/];



const ccNumberRef = React.useRef(undefined);
const ccExpRef = React.useRef(undefined);
const ccExpYRef = React.useRef(undefined);
const ccCSCRef = React.useRef(undefined);

const [ccNumber, setCcNumber] = React.useState("");
const [ccExp, setCcExp] = React.useState("");
const [ccExpY, setCcExpY] = React.useState("");

const [ccCSC, setCcCSC] = React.useState("");
const [isEarlyMonth, setIsLowMonth] = React.useState(false);
const [CardType, setCardType] = React.useState("--");

const [Pagando, setPagando] = React.useState(false);

// ------------------

window.Mercadopago.setPublishableKey("APP_USR-3b74bd22-ef7d-4f1d-95da-fcb5768c77c3");

//console.log(Paid)


function guessPaymentMethod(event) {
  let cardnumber = document.getElementById("cardNumber").value;

  if (cardnumber.length >= 6) {
      //let bin = cardnumber.substring(0,6);
      let bin = cardnumber.substring(0,4) + cardnumber.substring(5,7);
    //console.log(bin)
      window.Mercadopago.getPaymentMethod({
          "bin": bin
      }, setPaymentMethod);
  }
};

function setPaymentMethod(status, response) {
  if (status === 200) {
      let paymentMethodId = response[0].id;
      let element = document.getElementById('payment_method_id');
      element.value = paymentMethodId;
      getInstallments();
  } else {
    //  alert(`payment method info error: ${response}`);
  }
}

function getInstallments(){
  window.Mercadopago.getInstallments({
      "payment_method_id": document.getElementById('payment_method_id').value,
      "amount": parseFloat(document.getElementById('transaction_amount').value)
      
  }, function (status, response) {
      if (status === 200) {
          document.getElementById('installments').options.length = 0;
          response[0].payer_costs.forEach( installment => {
              let opt = document.createElement('option');
              opt.text = installment.recommended_message;
              opt.value = installment.installments;
              document.getElementById('installments').appendChild(opt);
          });
      } else {
        //  alert(`installments method info error: ${response}`);
      }
  });
}    

let doSubmit = false;
//document.querySelector('#pay').addEventListener('submit', doPay);

function doPay(event){

  event.preventDefault();
  if(!doSubmit){ 
      setPagando(true)
      setPayStatus({ Status: "Procesando...", Color: "blue" });

      var $form = document.querySelector('#pay');
      // window.Mercadopago.createToken($form, sdkResponseHandler);
      sdkResponseHandler(200, "xx3") // test
      return false;

  }
};

async function sdkResponseHandler(status, response) {
console.log(response)
  if (status !== 200 && status !== 201) {
     // alert("verify filled data");
     setPagando(false)
  }else{

  let TipoCard = document.getElementById('payment_method_id').value
  let Email = document.getElementById('email').value



  var form = document.querySelector('#pay');
  var card = document.createElement('input');
  card.setAttribute('name', 'token');
  card.setAttribute('type', 'hidden');
  card.setAttribute('value', response.id);
  form.appendChild(card);





    // let PagaMercado = await PayMercado({
    //   token: response, 
    //   TipoCard: TipoCard,
    //   Email: Email
    // })

    //let PagaMercado = 1 // test

    let PagaMercado = await Pagar({
     // token: response, 
      //TipoCard: TipoCard,
      //Email: Email,
      Forma: "Free"
    }) // Pagar free




    if (PagaMercado) {
      setPagando(false)
      setPayStatus({ Status: "Pagado", Color: "green" });
      setIndica(
        "GRACIAS POR TU COMPRA! Si tienes dudas comunícate al 667 716 1800"
      );
      //ccCSCRef.current.inputElement.clear();
      setCcCSC(null)

        Paid()




      } else {
      setPagando(false)
    }

    // doSubmit=true;
      // form.submit();


  }
};    



const ColorBoton = function(props) {
  return "#228B22";
}



const CardImage = function(card) {
if (card==="VS") {return CardImages.vs.src}
if (card==="MC") {return CardImages.mc.src}
if (card==="AM") {return CardImages.am.src}

return CardImages.no.src
};




// --------------------------------------------


  try {
    return (
      <div>
      
          <div>
            <Flex sx={{ width: "100%" }}>
              <Box
                //bg="primary"
                sx={{
                  fontWeight: "normal",
                  fontSize: 1,
                  color: "text",
                  fontFamily: "body",
                  width: "100%"
                }}
              >







      <Flex>
        {Pagado > 0 ? (
          <Flex>
            <Box bg="White" css={{ height: 34 }} />
            <Text>------------</Text>
          </Flex>
        ) : (
          <Flex
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 233
            }}
          >
            {Loading ? (
              <Flex
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: 150
                }}
              >
                <Spinner size={50} />
              </Flex>
            ) : (



              <div>

                <Flex sx={{ height: "34px", width: "100%" }}>


              <form onSubmit={doPay} 
                id="pay" 
                name="pay" 
                method="post"

              >
               



                  <Flex sx={{ width: "100%" }}>                        
                      <label sx={Estilo.cardl1} for="cardNumber">Número de tarjeta</label>
                  </Flex>

                      {/* <input type="text" id="cardNumber" data-checkout="cardNumber" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false"  onDrop="return false" autocomplete="off" 
                        onChange = {(e) => { guessPaymentMethod(e) }}
                      /> */}

                      {/* <Input sx={Estilo.cardi1} type="text" id="cardNumber" data-checkout="cardNumber" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false"  onDrop="return false" autocomplete="off" 
                        onChange = {(e) => { guessPaymentMethod(e) }}
                      /> */}

                  <Flex sx={{width: "100%" }}>
                        
                    <Box sx={{width: "100%" }}>

                      <MaskedInput
                        sx={Estilo.cardi1c}
                        id="cardNumber"
                        data-checkout="cardNumber"
                        ref={ccNumberRef}
                        //value={ccNumber}
                        autocomplete="cc-number"
                        autocorrect="off"
                        spellcheck="false"
                        name="cardnumber"
                        inputMode="numeric"
                        guide={false}
                        className="input cc-number"
                        mask={CardType === "AM" ? ccMask2 : ccMask1}

                        onChange = {(e) => {
                          guessPaymentMethod(e)

                          const value = e.target.value;
                          const shouldContinueToNextField = () => {
                            if (CardType==="AM" && value.length >= 17) {return true}
                            if (value.length >= 19) {return true}

                            return false
                          }
                          setCcNumber(value);

                          setCardType("--")
                          if (value.startsWith("4")) {setCardType("VS")}
                          if (value.startsWith("5") || value.startsWith("56")) {setCardType("MC")}
                          if (value.startsWith("34") || value.startsWith("37")) {setCardType("AM")}

                          if (shouldContinueToNextField()) {
                            ccExpRef.current.inputElement.focus();
                          }

                        }}

                      />

                     
                        <Image sx={{mt: 0, mb:1, ml:2, verticalAlign: "middle" }} src={CardImage(CardType)} />
                     

                    </Box>

                  </Flex>


                  <Box css={{ height: 3 }} />

                  <Flex sx={{ width: "100%", ml: "110px" }}> 

                    <Box sx={{ width: "80px", mt:3 }}>                       
                      <label sx={Estilo.cardl1} for="cardExpirationMonth">Mes</label>
                    </Box>

                    <Box sx={{ width: "70px", mt:3 }}>  
                      <label sx={Estilo.cardl1} for="cardExpirationYear">Año</label>

                    </Box>


                  </Flex>

                  <Flex sx={{ width: "100%" }}>

                      <Box sx={{ width: "80px", mt:3 }}>
                        <label sx={Estilo.cardl1m} for="cardExpirationMonth" >Vencimiento</label>
                      </Box>

                      {/* 
                      <input type="text" id="cardExpirationMonth" data-checkout="cardExpirationMonth" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" /> */}

                    <Box >
                      <MaskedInput
                        sx={Estilo.cardi1m}
                        id="cardExpirationMonth" data-checkout="cardExpirationMonth"
                        ref={ccExpRef}
                        // value={ccExp}
                        autocomplete="cc-exp"
                        autocorrect="off"
                        spellcheck="false"
                        name="exp-date"
                        inputMode="numeric"
                        guide={false}
                        //placeholder="MM / AA"
                        className="input cc-exp"
                        mask={lateMonthMask}
                        onChange={event => {
                          const value = event.target.value;
                          setCcExp(value);

                          // const [monthString] = value.split("/");
                          // const trimmedMonth = monthString.trim();
                          // const month = parseInt(trimmedMonth, 10);
                          // if (month !== 1 && month < 10) {
                          //   setIsLowMonth(true);
                          // }

                          const shouldContinueToNextField = value.length >= 2;

                          if (shouldContinueToNextField) {
                            ccExpYRef.current.inputElement.focus();
                          }
                        }}
                      />
                    </Box>


                    <Box sx={{ width: "80px", ml:"5px" }}>

                      <MaskedInput
                        sx={Estilo.cardi1m}
                        id="cardExpirationYear" data-checkout="cardExpirationYear"
                        ref={ccExpYRef}
                        // value={ccExp}
                        autocomplete="cc-exp"
                        autocorrect="off"
                        spellcheck="false"
                        name="exp-year"
                        inputMode="numeric"
                        guide={false}
                        //placeholder="MM / AA"
                        className="input cc-exp"
                        mask={YearMask}
                        onChange={event => {
                          const value = event.target.value;
                          setCcExpY(value);

                          // const [monthString] = value.split("/");
                          // const trimmedMonth = monthString.trim();
                          // const month = parseInt(trimmedMonth, 10);
                          // if (month !== 1 && month < 10) {
                          //   setIsLowMonth(true);
                          // }

                          const shouldContinueToNextField = value.length >= 2;

                          if (shouldContinueToNextField) {
                           ccCSCRef.current.inputElement.focus();
                          }
                        }}
                      />
                    </Box>




                  </Flex>





                      {/* <input type="text" id="cardExpirationYear" data-checkout="cardExpirationYear" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" /> */}



                      <Box css={{ height: 8 }} />



        

                  <Flex sx={{ width: "100%" }}>

                    <Box sx={{ width: "80px", ml:"0px" }}>
                        <label sx={Estilo.cardl1} for="securityCode">Código de seguridad</label>
                    </Box>
                      {/* <input type="text" id="securityCode" data-checkout="securityCode" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off" /> */}


                      <MaskedInput
                        sx={Estilo.cardi1m}
                       id="securityCode" data-checkout="securityCode"
                        ref={ccCSCRef}
                        // value={ccExp}
                        autocomplete="cc-exp"
                        autocorrect="off"
                        spellcheck="false"
                        name="exp-year"
                        inputMode="numeric"
                        guide={false}
                        //placeholder="MM / AA"
                        className="input cc-exp"
                        mask={CardType === "AM" ? cscMaskAm : cscMask}
                      />



                  </Flex>
                
                  <Box css={{ height: 15 }} />



                  <Flex sx={{ width: "100%" }}>                      
                  
                      <Box sx={{ width: "100%" }}>

                          <Button sx={Estilo.cardbtn1(PayStatus.Color)}
                            width={1}
                            bg={ColorBoton()}
                            Disabled={false}
                          >
                            <Text Disabled={Disabled}>
                              {PayStatus.Status}
                              {Pagando ? <Spinner size={17} ml={3} /> : <div/>}
                            </Text>
                          </Button>

                      </Box>

                  </Flex>


                      <input type="hidden" name="description" id="description" value="Orden" />
                      <input type="hidden" name="transaction_amount" id="transaction_amount" value={Monto}/>

                      <select id="installments" class="form-control" name="installments" style={{display: 'none' }}></select>
                 
                      <select id="docType" data-checkout="docType" style={{display: 'none' }}></select>
                 
                      <input type="hidden" id="docNumber" data-checkout="docNumber"/>
                 
                      <input type="hidden" id="email" name="email" value="test@test.com"/>
                  
                      <input type="hidden" name="payment_method_id" id="payment_method_id"/>

                      <input type="hidden" id="cardholderName" data-checkout="cardholderName" value="test"/>




                  </form>
                </Flex>
              </div>
            )}



          </Flex>
        )}
      </Flex>














              </Box>
            </Flex>

          </div>
       
      </div>
    );
  } catch (e) {
    console.error(e);
  }


};



// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------

export default (App = props => {
  //console.log(props.Paid)
  return (
    <ContextProvider Theme={props.Theme}>
      <Flex sx={{ width: "100%" }}>
        <Box sx={{ width: "100%" }}>

          <Body {...props} texto="Roll" />

        </Box>
      </Flex>
    </ContextProvider>
  );
});

// -------------------------------------------------------------------------------