import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function Quotes() {

  const [searchParams] = useSearchParams();
  const symbol = searchParams.get("symbol");
  const [symbolData, setSymbolData] = useState([]) 
  const [isAsc, setIsAsc]=useState('') 

  const fetchSymbolData = async(symbol) => {
    try{
            const response = await axios.get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
            if(response.data.success === true){
            const symbolPrice = response.data.payload[`${symbol}`];
            setSymbolData(symbolPrice)
            dataRefresh(symbolPrice)
            }
        }catch(e){
            console.error(e);
    }
  }

  useEffect(()=>{
    const symbol = searchParams.get("symbol");
    fetchSymbolData(symbol)
  }, [])

  const handleSort = () => {
    if(isAsc){
      setIsAsc(false);
      symbolData.sort((a,b) => b.time.localeCompare(a.time))
      setSymbolData(symbolData)
    }else{
      setIsAsc(true);
      symbolData.sort((a,b) => a.time.localeCompare(b.time))
      setSymbolData(symbolData)
    }
  }

  const dataRefresh = (symbolPrice) => {
    symbolPrice.sort((a,b) => a["valid_till"].localeCompare(b["valid_till"]))

    const pad = (n,s=2) => (`${new Array(s).fill(0)}${n}`).slice(-s);
    const d = new Date();
    let x=symbolPrice[0].valid_till
    // let x = "2023-05-20 11:19:42"
    let mainDate= `${pad(d.getFullYear(),4)}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    var date = new Date(mainDate); 
    var date1 = date.getTime();
    var date2ndDate=new Date(x)
    var date2=date2ndDate.getTime()

    if(date2>date1){
      let finalDate=date2-date1
      setTimeout(() => {
        fetchSymbolData(symbol)
     },finalDate)
    }else{
      return
    }      
  }

 
  
  return (

    <>
    <div className='symbol'>{symbol}</div>
    
    <table>

        <thead>
          <tr>
            <th>Price</th>
            <th onClick={handleSort} style={{cursor:'pointer'}}>Time</th>
            <th>Valid Till</th>
          </tr>
        </thead>

        <tbody>
          {symbolData.length > 0 &&
            symbolData.map((symbol)=>{
              let {price, time, valid_till} = symbol
              const roundedPrice = Math.round(price * 100)/100
              return(
                 <tr key={price}>
                    <td>Rs {roundedPrice}</td>
                    <td>{time}</td>
                    <td>{valid_till}</td>
                  </tr>
              )
            })
           
          }  
        </tbody>
    </table>
    </>
  )
}

export default Quotes