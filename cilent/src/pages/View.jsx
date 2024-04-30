import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";


import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";




const View = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await axios.get(`http://localhost:3001/recipes/${id}`);
        setPost(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[]);

  
  return (
    <>
      <div className="lg:flex lg:flex-row bg-slate-200 md:flex md:flex-col sm:flex sm:flex-col  ">
        <div className=" lg:w-[100%] md:w-[100%] sm:w-[100%] flex flex-col ">
            <h2 className="font-bold text-3xl m-4">
              {post.name}
            </h2>
            <p className="text-[17px] w-full m-1">{post.Description}</p>
          <div className="xl:w-[85%] lg:w-[85%] md:w-[90%] sm:w-[80%] bg-white flex flex-col items-center m-5">
            <img
              src={post.imageUrl}
              alt={post.name}
              className=" w-[80%] h-[100%] object-contain "
            />
          </div>
            <div className="flex flex-col justify-items-center  sm:flex sm:flex-col  lg:flex lg:flex-row md:flex md:flex-row  ">
            <div className=" m-4 w-[35%]">
                <h2 className="font-bold text-2xl text-center m-4 ">Ingredients</h2>
                <ul className="text-[17px] m-5 ">
                    {post.ingredients &&
                    post.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>
            <div className="m-4 w-[55%] lg:w-[520px] md:w-[500px] xl:w-[400px] 2xl:w-[1000px] ">
              <p className="text-[17px] w-full m-5">{post.instructions}</p>
            </div>
            </div>
        </div>
        <div className=" lg:w-[25%] flex flex-col  justify-stretch items-center p-5 ">
          <div className="w-[93%] h-[400px]   bg-white flex flex-col justify-center items-center  mt-[20px]">
            <p> <span className="text-md font-semibold">Cooking Time:</span> {post.cookingTime}minutes</p>
            {/* <p><span className="text-md font-semibold">Author :</span> {post.author}</p> */}
          
          </div>
     
     
        </div>
      </div>
    </>
  );
};

export default View;
