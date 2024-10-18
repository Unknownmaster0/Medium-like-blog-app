import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HeaderComponent } from "./Components/Header";

function App() {
  return (
    <BrowserRouter>
      {/* <Mainroutes /> */}
      <HeaderComponent text="Create your account" />
    </BrowserRouter>
  );
}

function Mainroutes() {
  return <Routes>{/* <Route path="/" element={}></Route> */}</Routes>;
}

export default App;
