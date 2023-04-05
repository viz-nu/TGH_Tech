import './App.css';
import { Route, Routes } from "react-router-dom"
import PrivatesRoutes from "./utils/PrivateRoutes"
import Auth from "./Pages/Auth"
import Tasks from "./Pages/Tasks"
function App() {
  return (
    <Routes>
      <Route path='/' element={<Auth />}></Route>
      <Route element={<PrivatesRoutes />}>
        <Route path='/tasks' element={<Tasks />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
