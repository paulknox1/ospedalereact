import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import {App} from "../App";
import TablePazienti from './TablePazienti';
import axios from 'axios';  

const Combo = ({onMedicoChange}) => {
    const [medici, setMedici] = useState([])
    
    useEffect(() => {
        axios.get(`http://localhost:8081/ospedale/getAllMedici`)
          .then(res => {
            const med = res.data;
            setMedici(med);
        })
    },[])


    const handleMedicoChange = (e, value) => {
        const med = value;
        onMedicoChange(med);
    }

    return (
        <div className="combo">
          <Autocomplete
          disablePortal
          id="combo-box-demo"
          onChange={handleMedicoChange}
          options={medici.map(med => med.nome)}
          sx={{ width: 300, padding : 3 }}
          renderInput={(params) => <TextField {...params} label="Seleziona medico" />}
          />
        </div>
    );
}


export default Combo;