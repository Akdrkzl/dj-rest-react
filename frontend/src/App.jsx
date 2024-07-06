import { Routes, Route } from "react-router-dom";
//pages
import Home from "./Pages/Home";
import LoginRegister from "./Pages/LoginRegister";
import UserPage from "./Pages/UserPage";

function App(){

  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<LoginRegister/>}/>
        <Route path="/user" element={<UserPage/>}/>
        <Route path="*" element={<p>bşrşaşksd</p>} />
      </Routes>
    </>
  )
}

export default App
