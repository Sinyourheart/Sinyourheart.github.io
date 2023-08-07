import { BrowserRouter, Route, Routes } from "react-router-dom";
import Usage from "./pages/Usage";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Aboutus from "./pages/Aboutus";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="usage" element={<Usage />} />
          <Route path="aboutus" element={<Aboutus />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
