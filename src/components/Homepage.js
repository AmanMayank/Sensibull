import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import SearchBar from "./SearchBar";


import Stocks from "./Stocks";

function Homepage() {

  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState([]);
  
  
  const fetchStocks = async()=>{
    try{
      const response = await axios.get('https://prototype.sbulltech.com/api/v2/instruments');
      let JsonData = csvJSON(response.data);
      if(JsonData.length > 0){
        setStocks(JsonData)
        // console.log(JsonData.length);
      }
    } catch(e){
      console.error(e);
    }
    
  }

  const onSubmit = (term) => {
    console.log("aman==", term, term.length)
    if(term.length===1){
      setStocks(stocks);
      setSearch([])
      return
    }
    // console.log(term)
    const fuse = new Fuse(stocks, {
      keys : [
        'Symbol',
        'Name',
        'Sector'
      ],
      shouldSort:true,
      includeScore:true
    })
    const results = fuse.search(term);
    setSearch(results)
    console.log(results);
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

      <SearchBar onSubmit={onSubmit}/>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
         </thead>

         <tbody>
           {search.length > 0 ? <Stocks stocks={search}/>  : <Stocks stocks={stocks} /> }
         </tbody>

      </table>

    </> 
  )
}

export default Homepage