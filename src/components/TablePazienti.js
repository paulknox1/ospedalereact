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
import { useState } from "react";
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



class TablePazienti extends React.Component {


    constructor(props){
      super(props);
      this.state = {
        pazienti : []
      };
      console.log("medico " + this.props.medico);

    }

    componentDidMount() {
      
        axios.get(`http://localhost:8081/ospedale/getAllPazienti`)
        .then(res => {
          const pazienti = res.data;
          console.log(pazienti);
          this.setState({ pazienti }, () => {
              console.log(this.state.pazienti)
          })
      })
       this.props.resetHandler();

    }


    componentDidUpdate() {
      if (this.props.editMedico) {
        if(this.props.medico != null){ 
          axios.get(`http://localhost:8081/ospedale/getPazientiByNomeMedico/${this.props.medico}`)
          .then(res => {
            const pazienti = res.data;
            console.log(pazienti);
            this.setState({ pazienti }, () => {
                console.log(this.state.pazienti)
            })
        })
        this.props.resetHandler();
        } else {
          axios.get(`http://localhost:8081/ospedale/getAllPazienti`)
          .then(res => {
            const pazienti = res.data;
            console.log(pazienti);
            this.setState({ pazienti }, () => {
                console.log(this.state.pazienti)
            })

            
          })
          this.props.resetHandler();
        }
    
      } 
    }


    render() {
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
                {this.state.pazienti.map((row) => (
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
  }


  export default TablePazienti;