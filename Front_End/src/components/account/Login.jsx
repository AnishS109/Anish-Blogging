import { Box, Button, TextField, Typography } from "@mui/material";
import Logo from "../../assets/Logo.png";
import BackgroundLogin from "../../assets/BackgroundLogin.jpeg";
import { useContext, useReducer, useState } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";
import { DataContext } from "../../Context/DataProvider";

const Login = () => {

  const initialState = {
    error:"",
    successMsg:"",
    loginDetails:{
      username:"",
      password:"",
    }
  }

  const reducer = (state,action) => {
    if(action.type === "SET_FORM"){
      return {
        ...state,
        loginDetails:{
          ...state.loginDetails,
          [action.field]:action.value
        }
      }
    }
    if(action.type === "RESET_FORM"){
      return {
        ...state,
        loginDetails:{username:"",password:""},
        error:""
      }
    }
    if(action.type === "SET_ERROR"){
      return {
        ...state,
        error:action.payload
      }
    }
  }

  const [state,dispatchState] = useReducer(reducer,initialState)
  const navigate = useNavigate()
  const {setAccount, setIsAuthenticated} = useContext(DataContext)

  const handleChange = (e) => {
    const {name,value} = e.target
    dispatchState({type:"SET_FORM",field:name,value})
  } 

  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log(state.loginDetails);

    if(!state.loginDetails.username || !state.loginDetails.password){
      dispatchState({type:"SET_ERROR",payload:"All fields are required!"})
      return;
    }
    
    dispatchState({type:"SET_ERROR" ,payload : ""})

    try {

      const response = await fetch("https://anish-blogging-2.onrender.com/login/user-login", {
        method: "POST",
        headers:{ "Content-Type" : "application/json" },
        body: JSON.stringify(state.loginDetails)
      })

      const data = await response.json()

      if(response.ok){
        // console.log(data)
        sessionStorage.setItem(`accessToken`, `Bearer${data.accessToken}`)
        sessionStorage.setItem(`refreshToken`, `Bearer${data.refreshToken}`)

        setAccount({name:data.name, username:data.username})

        navigate("/home")
        setIsAuthenticated(true)
        
        dispatchState({type:"RESET_FORM"})
        dispatchState({type:"SET_ERROR" ,payload : ""})
      }
      else{
        dispatchState({type:"SET_ERROR", payload:data.message})
      }
      
    } catch (error) {
      console.error("SOMETHING WENT WRONG" , error)
      console.log(data)
    }
  }

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          backgroundImage: `url(${BackgroundLogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          overflow: "hidden",
          color: "#fff",
        }}
      >

        <Box
          sx={{
            width: "100%",
            maxWidth: "400px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)", 
            borderRadius: "15px", 
            padding: "20px 30px",
            textAlign: "center",
            backdropFilter: "blur(10px)", 
          }}
        >

          <Box sx={{ marginBottom: "20px" }}>
            <img
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: "200px",
                margin: "0 auto",
                display: "block",
              }}
            />
          </Box>

          {state.error && (
            <Typography
            variant="body"
            sx={{
              color:"red"
            }}
            >
            {state.error}
            </Typography>
          )}

          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "600",
              marginBottom: "10px",
              color: "#333",
            }}
          >
            Login Here!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "14px",
              marginBottom: "30px",
              color: "#555",
            }}
          >
            Please log in to access your account
          </Typography>

          <TextField
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            fullWidth
            name="username"
            value={state.loginDetails.username}
            onChange={handleChange}
            sx={{
              marginBottom: "20px",
              backgroundColor: "#f9f9f9", 
              borderRadius: "5px",
            }}
          />

          <TextField
            label="Password"
            placeholder="Enter your password"
            variant="outlined"
            type="password"
            name="password"
            fullWidth
            value={state.loginDetails.password}
            onChange={handleChange}
            sx={{
              marginBottom: "30px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
              marginBottom: "20px",
              padding: "10px 0",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "25px",
            }}
          >
            Login
          </Button>

          <Typography sx={{color:"black"}}>
            Don't have an account?
            <NavLink to={"/register"}>
              <Button>Sign up</Button>
            </NavLink>
          </Typography>
          
        </Box>
      </Box>
    </>
  );
};

export default Login;
