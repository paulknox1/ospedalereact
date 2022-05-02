import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';  
import { useState, useEffect } from "react";
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const TablePazienti = ({medico}) => {
    const [pazienti, setPazienti] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/ospedale/getAllPazienti`)
        .then(res => {
          const paz = res.data;
          setPazienti(paz); 
      })
    }, [])



    useEffect(() => {
        if(medico != null){ 
          axios.get(`http://localhost:8081/ospedale/getPazientiByNomeMedico/${medico}`)
          .then(res => {
            const paz = res.data;
            setPazienti( paz );
            console.log(medico);
        })
        } else {
          axios.get(`http://localhost:8081/ospedale/getAllPazienti`)
          .then(res => {
            console.log(medico);
            const paz = res.data;
            setPazienti(paz);
        })
        }
    }, [medico])



    return (
        <div className="tablepazienti">
          <h1>Pazienti</h1>
          <TableContainer component={Paper}>
            <Table sx={{ width: 700, 
              position: "sticky",
            left: 0,
            background: "white",
              margin:"auto" }}
            title = {<h1> Pazienti</h1>}
            aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nome</StyledTableCell>
                   <StyledTableCell>Medico</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pazienti.map((row) => (
                  <StyledTableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                       {row.nome}
                     </StyledTableCell>
                     <StyledTableCell >{row.medico.nome}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
    
  }


  export default TablePazienti;