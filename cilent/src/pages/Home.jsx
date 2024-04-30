import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserId.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export const Home = () => {
  const [cookies, setCookie] = useCookies(["access_token"]);
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=8;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records = recipes.slice(firstIndex,lastIndex);
  const npage = Math.ceil(recipes.length/recordsPerPage);
  const numbers = [...Array(npage+1).keys()].slice(1);

  const prePage = ()=>{
    if(currentPage!==1){
      setCurrentPage((prev)=>prev-1);
    }
  }
 
  const changeCPage = (number)=>{
    setCurrentPage(number);
  }

  const nextPage = ()=>{
    if(currentPage!==npage){
      setCurrentPage((prev)=>prev+1);
    }
  }

  const userID = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
    fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      if(userID){
        const response = await axios.put("http://localhost:3001/recipes", {
          recipeID,
          userID,
        });
        setSavedRecipes(response.data.savedRecipes);
      }
      else{
        toast.error("Login to save recipes",{theme: "dark"});
      }
   
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div className=" m-1 p-1">
      <h1 className="text-2xl text-blue-900 flex justify-center m-2">Recipes</h1>
      <ul className="flex flex-wrap justify-evenly mt-[50px]">
        {records.map((recipe) => (
          <li key={recipe._id} className=" m-4 rounded-full transition-transform duration-300 transform hover:scale-110">
            <Link to={`/recipes/${recipe._id}`}>
              <h2 className="text-indigo-900 text-xl flex justify-center">{recipe.name.toUpperCase()}</h2>       
              <p className=" flex justify-center">{recipe.Description}</p>   
            <img  className="h-[225px] w-[325px] m-1 object-fill object-center rounded-2xl" src={recipe.imageUrl} alt={recipe.name} />
            </Link> 
            <div className="flex flex-row justify-around items-center">
            <p><span className="text-base">Cooking Time:</span> {recipe.cookingTime} minutes</p>
            <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className="bg-blue-900 text-white p-[6px] rounded-lg cursor-pointer hover:bg-blue-800"
              >
                {(isRecipeSaved(recipe._id))&&(cookies.access_token) ? "Saved" : "Save"}
              </button>
            </div>
              
          </li>
          
        ))}
        
        
      </ul>
      <div className="flex justify-center items-center mt-10">
      <ul className="flex gap-2">
      <li>
        <button onClick={prePage} className="border p-2 rounded-lg bg-slate-200 text-blue-800 cursor-pointer">Prev</button>
      </li>
        {numbers.map((number)=>(
          <li key={number} onClick={()=>changeCPage(number)} className="border p-2 rounded-lg bg-slate-200 text-blue-800 cursor-pointer">{number}</li>
        ))}
        <li>
        <button onClick={nextPage} className="border p-2 rounded-lg bg-slate-200 text-blue-800 cursor-pointer">Next</button>
      </li>
        
      </ul>
      </div>
      <ToastContainer />
    
    </div>
  );
};

export default Home;