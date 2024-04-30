import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate,Link } from "react-router-dom";
import {
  Card,
  Input,
  Button,
  Typography,
  } from "@material-tailwind/react";
  import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.post("http://localhost:3001/auth/register", {
          username,
          password,
        });
        toast.success("Registration Completed! Now login.");
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
    
  <div className='flex items-center justify-center mt-[5rem]'>
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
       Register
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Name" id="username" value={username} onChange={(event) => setUsername(event.target.value) } />
          <Input type="password" size="lg" label="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value) } />
        </div>
        <Button className="mt-6 w-full" type="submit">
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?
          <Link to="/auth/login" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
    <ToastContainer />
</div>
    </>
    );
  };

export default Register;
