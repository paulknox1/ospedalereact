import './App.css';
import React from "react";
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import Combo from './components/Combo.js';
import TablePazienti from './components/TablePazienti';

const App = () => {
  const [medico, setMedico] = useState(null)

  const handleChange = (med) => {
    setMedico(med); 
  }


  return (
    <div className="App">
      <Combo medico = {medico} onMedicoChange = {handleChange} />
      <TablePazienti medico = {medico} />
    </div>
  );
  
}

export default App;

