import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import {App} from "../App";
import TablePazienti from './TablePazienti';
import axios from 'axios';  

class Combo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          medici : []
        };
        this.handleMedicoChange = this.handleMedicoChange.bind(this);
      }
    
    componentDidMount() {
        axios.get(`http://localhost:8081/ospedale/getAllMedici`)
          .then(res => {
            const medici = res.data;
            this.setState({ medici });//, () => {
                //console.log(this.state.medici)
            //})
        })
    }


    handleMedicoChange = (e, value) => {
        const med = value;
        console.log(value);

        this.props.onMedicoChange(med);

        //this.props.onchange(med);
       // this.setState({ medico : med}, () => {
         //   console.log(this.state.medico)
        //})

    }

    render() { 
        return (
        <div className="combo">
          <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={this.handleMedicoChange}
          options={this.state.medici.map(medico => medico.nome)}
          sx={{ width: 300, padding : 3 }}
          renderInput={(params) => <TextField {...params} label="Seleziona medico" />}
          />
        </div>
        );
    }




}


export default Combo;