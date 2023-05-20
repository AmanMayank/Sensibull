import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Stocks({stocks}) {
    
  const navigate = useNavigate();


  const handleClick = (symbol) => {
    navigate(`./quotes?symbol=${symbol}`);
  }  

    
  return (
    <>
        {
            stocks.map((stock) => {
                let {Symbol, Name, Sector} = stock;
                if(!Symbol){
                Symbol = stock.item.Symbol;
                Name = stock.item.Name;
                Sector = stock.item.Sector;
                }
                return(
                    <tr key={Symbol}>
                        <td onClick={() => handleClick(Symbol)} style={{cursor:'pointer'}}>{Symbol}</td>
                        <td>{Name}</td>
                        <td>{Sector}</td>
                    </tr>
                )
            })
        }
    </>
  )
}

export default Stocks