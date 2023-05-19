import React from 'react'

function Stocks({stocks}) {

    console.log(stocks)
  return (
    <>
        {
            stocks.map((stock) => {
                const {Symbol, Name, Sector} = stock;
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