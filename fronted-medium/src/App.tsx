import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Signup } from "./Pages/signup.page";
import { Signin } from "./Pages/signin.page";
import { BlogPage } from "./Pages/blog.page";
import { BlogDetail } from "./Pages/blog.in.detail";

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
      <Route path="/blogs" element={<BlogPage />}></Route>
      <Route path="/blog/:id" element={<BlogDetail />}></Route>
    </Routes>
  );
}

export default App;
