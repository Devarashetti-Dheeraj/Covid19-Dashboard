import {Route, Routes} from "react-router-dom"
import Homepage from "./Pages/Homepage/Homepage"
import Statespecific from "./Pages/State-specific/Statespecific.jsx"
import NotFound from "./Pages/NotFound/NotFound.jsx"
import About from "./Pages/About/About.jsx"
import "./App.css"

function App() {
  return (
    <div id="Entire-Container">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/state/:stateCode" element={<Statespecific />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
