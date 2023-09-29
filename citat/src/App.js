import { Route, Routes } from "react-router-dom"
import { Home } from "./Pages/Home"
import { AllQuotes } from "./Pages/AllQuotes"
import { CreateQuote } from "./Pages/CreateQuote"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AllQuotes" element={<AllQuotes />} />
        <Route path="/CreateQuote" element={<CreateQuote />} />
      </Routes>
    </>
  )
}

export default App;
