import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./sign-in/SignIn";
import BlogHome from "./blog-page/Blog";
import SignUp from "./sign-up/SignUp";
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogHome/>}  />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
