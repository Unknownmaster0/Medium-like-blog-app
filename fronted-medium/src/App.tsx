import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./Pages/signup.page";
import { Signin } from "./Pages/signin.page";

function App() {
  return (
    <BrowserRouter>
      <Mainroutes />
    </BrowserRouter>
  );
}

function Mainroutes() {
  return (
    <Routes>
      <Route path="/" element={<Signup />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
    </Routes>
  );
}

export default App;
