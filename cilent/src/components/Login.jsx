import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import {
    Card,
    Input,
    Button,
    Typography,
    } from "@material-tailwind/react";

const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
  
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const result = await axios.post("http://localhost:3001/auth/login", {
          username,
          password,
        });
  
        setCookies("access_token", result.data.token);
        window.localStorage.setItem("userID", result.data.userID);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
    <>
    <div className='flex items-center justify-center mt-[5rem]'>
  <Card color="transparent" shadow={false}>
    <Typography variant="h4" color="blue-gray">
     Login
    </Typography>
    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-6">
        <Input size="lg" label="Name" id="username" value={username} onChange={(event) => setUsername(event.target.value) } />
        <Input type="password" size="lg" label="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value) } />
      </div>
      <Button className="mt-6" fullWidth type="submit">
        Login
      </Button>
      <div className="flex flex-row justify-between">
      <p className="mt-4font-normal">Don't have an account?</p>
      <Link to="/auth/register" className="font-medium text-gray-900">Register</Link>
      </div>
    </form>
  </Card>
</div>
  </>
    );
  };

export default Login;