import "./App.css";
import SideNav from "./components/SideNav";
import Box from "@mui/material/Box";
import { BrowserRouter } from "react-router-dom";
import MainContent from "./components/MainContent";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Box sx={{ display: "flex" }}>
          <SideNav />
          <MainContent />
        </Box>
      </div>
    </BrowserRouter>
  );
}

export default App;
