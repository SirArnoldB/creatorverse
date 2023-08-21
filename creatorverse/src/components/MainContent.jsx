import Box from "@mui/material/Box";
import DrawerHeader from "./DrawerHeader";
import Home from "../pages/Home";
import AddCreator from "../pages/AddCreator";
import ShowCreators from "../pages/ShowCreators";
import ViewCreator from "../pages/ViewCreator";
import EditCreator from "../pages/EditCreator";

import Confirmation from "../pages/Confirmation";
import { Routes, Route } from "react-router-dom";

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<AddCreator />} />
        <Route path="/confirmation/:crudOperation" element={<Confirmation />} />
        <Route path="/all">
          <Route index element={<ShowCreators />} />
          <Route path=":creatorId">
            <Route index element={<ViewCreator />} />
            <Route path="edit" element={<EditCreator />} />
            <Route path=":crudOperation" element={<Confirmation />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  );
};

export default MainContent;
