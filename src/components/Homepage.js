import { useEffect, useState } from "react";
import axios from "axios";

import Stocks from "./Stocks";

function Homepage() {

  const [stocks, setStocks] = useState([]);

  const fetchStocks = async()=>{
    try{
      const response = await axios.get('https://prototype.sbulltech.com/api/v2/instruments');
      let JsonData = csvJSON(response.data);
      if(JsonData.length > 0){
        setStocks(JsonData)
        console.log(JsonData.length);
      }
    } catch(e){
      console.error(e);
    }
    
  }

  const csvJSON = (csv)=> {
    const lines = csv.split('\n')
    const result = []
    const headers = lines[0].split(',')

    for (let i = 1; i < lines.length; i++) {        
        if (!lines[i])
            continue
        const obj = {}
        const currentline = lines[i].split(',')

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result;
    // console.log(result)
}

  useEffect(() => {
    fetchStocks()
  }, [])

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
         </thead>

         <tbody>
           <Stocks stocks={stocks} /> 
         </tbody>

      </table>

    </> 
  )
}

export default Homepage