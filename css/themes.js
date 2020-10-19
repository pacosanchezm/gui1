exports.theme1 = {
  encabezado: {
    backgroundcolor: "SlateGrey"
  },

  renglon: {
    backgroundcolor: "WhiteSmoke"
  },

  box: {
    campo: {
      width: 89,
      padding: 5,
      borderradius: 0,
      flex: "",
      margin: "",
      textalign: ""
    },

    label: {
      width: "",
      padding: "10px 0",
      borderradius: "",
      flex: "1",
      margin: "0 8px 0 34px",
      textalign: "left"
    },

    forma: {
      width: "",
      padding: "10px 0",
      borderradius: "",
      flex: "3",
      margin: "0 8px 0 21px",
      textalign: "left"
    }
  },

  texto: {
    campo: {
      lineheight: 1,
      color: "SlateGrey",
      size: 9,
      weight: "Normal",
      style: "Normal"
    },

    columna: {
      lineheight: 1,
      color: "white",
      size: 12,
      weight: "Bold",
      style: "Normal"
    },

    formalabel: {
      lineheight: 1,
      color: "SlateGrey",
      size: 12,
      weight: "Normal",
      style: "Normal"
    },

    formacampo: {
      lineheight: 1,
      color: "SlateGrey",
      size: 12,
      weight: "Bold",
      style: "Normal"
    },

    formacampo2: {
      lineheight: 1,
      color: "White",
      size: 12,
      weight: "Bold",
      style: "Normal"
    }
  },

  input: {
    campo: {
      lineheight: 1,
      color: "SlateGrey",
      size: 9,
      weight: "Normal",
      style: "Normal"
    },

    forma: {
      lineheight: 1,
      color: "SlateGrey",
      size: 12,
      weight: "Bold",
      style: "Normal",
      flex: "3"
    }
  }
};

exports.theme3 = {
  encabezado: {
    backgroundcolor: "SlateGrey",

    boxlabel: {
      width: "",
      padding: "5px 0",
      borderradius: "",
      flex: "",
      margin: "",
      textalign: "left"
    },

    text: {
      lineheight: 1,
      color: "white",
      size: 12,
      weight: "Bold",
      style: "Normal"
    },

    botontexto: {
      border: "none",
      cursor: "pointer",
      display: "inline-block"
    },

    boxinput: {
      padding: "10px 0",
      borderradius: "",
      flex: "3",
      margin: "0 8px 0 21px",
      textalign: "left"
    }
  },

  renglon: {
    backgroundcolor: "WhiteSmoke",

    boxlabel: {
      padding: "5px",
      borderradius: "",
      flex: "",
      margin: "",
      textalign: "left",
      width: "89px"
    },

    text: {
      fontFamily: "Arial",
      color: "SlateGrey",
      borderradius: "",
      size: 9
    },

    link: {
      target: "_blank",
      size: 9
    }
  },

  forma: {
    box: {},

    boxlabel: {
      padding: "10px 0",
      borderradius: "",
      flex: "1",
      margin: "0 8px 0 34px",
      textalign: "right"
    },

    boxinput: {
      padding: "10px 0",
      borderradius: "",
      flex: "3",
      margin: "0 8px 0 21px",
      textalign: "left"
    },

    text: {
      color: "SlateGrey",
      borderradius: "",
      size: 12
    },

    text2: {
      color: "red",
      borderradius: "",
      size: 12
    },

    input: {
      lineheight: 1,
      color: "SlateGrey",
      size: 12,
      weight: "Bold",
      style: "Normal"
    }
  }
};

exports.theme5 = {
  breakpoints: ["40em", "52em", "64em"],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    blue: "#07c",
    lightgray: "#f6f6ff"
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    sans: "system-ui, sans-serif",
    mono: "Menlo, monospace"
  },
  shadows: {
    small: "0 0 4px rgba(0, 0, 0, .125)",
    large: "0 0 24px rgba(0, 0, 0, .125)"
  },

  buttons: {
    primary: {
      color: "#fff",
      backgroundColor: "green"
    },
    outline: {
      color: "blue",
      backgroundColor: "transparent",
      boxShadow: "inset 0 0 0 2px"
    }
  },

  renglon: {
    backgroundcolor: "WhiteSmoke",

    boxlabel: {
      padding: "5px",
      borderradius: "",
      flex: "",
      margin: "",
      textalign: "left",
      width: "89px"
    },

    Text: {
      fontFamily: "Arial",
      color: "grey",
      fontSize: 12,
      padding: 0
    },

    Box: {
      padding: "5px",
      margin: 10
    },

    Link: {
      target: "_blank",
    },

    Input: {
      fontFamily: "Arial",
      color: "grey",
      fontSize: 12,
      padding: 0,
      border: 1,
      borderColor: 'white'
    },

    Input2: {
      fontFamily: "Arial",
      color: "whitesmoke",
      fontSize: 12,
      padding: 0,
      border: '5px',
      
    },




  },

  head: {
    Box: {
      padding: "5px",
      margin: 10
    },

    Text: {
      fontFamily: "Arial",
      color: "white",
      fontSize: 12,
      padding: 0
    },

    Link: {
      fontFamily: "Arial",
      color: "white",
      fontSize: 12,
      padding: 0
    },

    Input2: {
      fontFamily: "Arial",
      color: "whitesmoke",
      fontSize: 12,
      padding: 0,

    },


  }
};
