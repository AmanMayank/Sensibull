import React from 'react'

function Stocks({stocks}) {

    // console.log(stocks)
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
                        <td>{Symbol}</td>
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