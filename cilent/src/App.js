import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import SavedRecipe from "./pages/SavedRecipe";
import Navbar from "./components/Navbar";
import View from "./pages/View";
import Login from "./components/Login";
import Register from "./components/Register";
import Auth from "./pages/Auth";


function App() {
  return (
    <div className="App">
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/create-recipe" element={<CreateRecipe/>} />
        <Route path="/saved-recipe" element={<SavedRecipe/>} />
        <Route path="/recipes/:id" element={<View/>} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/auth/login" element={<Login/>} />
        <Route path="/auth/register" element={<Register/>} />
      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
