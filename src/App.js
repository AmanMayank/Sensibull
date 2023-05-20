import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Quotes from "./pages/Quotes";

function App(){

   
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/quotes" element={<Quotes />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;