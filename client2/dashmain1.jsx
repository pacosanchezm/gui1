// ------- Dashmain


import React from 'react';

import Dash1 from './dash1'


export default class Main extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      page: "777",



    };
  } // ------------------------- Constructor





    componentWillMount() {
     // this.getdatoschart1();
    }





  render() {
    return <div>

      <Dash1/>


    </div>;
  }
}
