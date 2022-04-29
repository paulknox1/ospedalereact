import logo from './logo.svg';
import './App.css';
import React from "react";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import Combo from './components/Combo.js';
import TablePazienti from './components/TablePazienti';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {medico : null, edit : false};
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange = (med) => {
    this.setState({medico : med, edit : true}); 
  }


  reset(){
    this.setState({edit : false});
  }

  render() { 
    return (
    <div className="App">
      <Combo medico = {this.state.medico} onMedicoChange = {this.handleChange} />
      <TablePazienti medico =  {this.state.medico} editMedico = {this.state.edit} resetHandler = {this.reset}/>

    </div>
    );
  }
}

export default App;
