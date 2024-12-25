import { Box, Button, TextField, Typography } from "@mui/material";
import Logo from "../../assets/Logo.png";
import BackgroundLogin from "../../assets/BackgroundLogin.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";

const Register = () => {
  
  const initialState = {
    error:"",
    successfulMsg:"",
    registerDetails:{
      name:"",
      username:"",
      password:""
    }
  }

  const reducer = (state,action) => {
    if(action.type === "SET_FIELD"){
      return {...state,
        registerDetails:{
          ...state.registerDetails,
          [action.field]:action.value
        }}
    }
    if(action.type === "SET_ERROR"){
      return {
        ...state,
        error:action.payload,
      }
    }
    if (action.type === "SET_SUCCESS"){
      return {
        ...state,
        successfulMsg:action.payload,
      }
    }
    if (action.type === "RESET_FORM"){
      return {
        ...state,
        registerDetails: { name: "", username: "", password: "" },
        error: ""
      }
    }
    return state
  }

  const [state,dispatcState] = useReducer(reducer,initialState)

  const navigate = useNavigate()

  const handleChange = (e) => {
    const {name,value} = e.target
    dispatcState({type:"SET_FIELD",field:name,value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    // console.log(state.registerDetails);

    if(!state.registerDetails.name || !state.registerDetails.username || !state.registerDetails.password){
      dispatcState({type:"SET_ERROR",payload:"All fields are required"})
      return;
    }

    if(state.registerDetails.username.length < 8){
      dispatcState({type:"SET_ERROR",payload:"Username must be at least 8 characters long."})
      return
    }

    if(state.registerDetails.password.length < 8){
      dispatcState({type:"SET_ERROR",payload:"Password must be at least 8 characters long."})
      return
    }

    dispatcState({type:"SET_ERROR",payload:""})

    try {
      const response = await fetch("http://localhost:5000/register/user-register",{
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body:JSON.stringify(state.registerDetails)
      })
      if(response.ok){
        dispatcState({type:"SET_SUCCESS",payload:"Registered Successfully"})
        setTimeout (() => {
          navigate("/")
        },1000)
      }
      const datas = await response.json()
      if(datas.message == "Username already exists"){
        dispatcState({type:"SET_ERROR",payload:datas.message})
      }
    } catch (error) {
      console.error("Error while resitering",error)
    }

    dispatcState({type:"RESET_FORM"})
  }

  return (

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
            padding: "10px 30px",
            textAlign: "center",
            backdropFilter: "blur(10px)", 
          }}
        >

          <Box sx={{ marginBottom: "10px" }}>
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

          {state.successfulMsg && (
            <Typography
            variant="body"
            sx={{
              color:"green"
            }}
            >
            {state.successfulMsg}
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
            Register Here!
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "14px",
              marginBottom: "30px",
              color: "#555",
            }}
          >
          Please fill in the details below to complete your registration.
          </Typography>

          <TextField
            label="Name"
            placeholder="Enter your name"
            variant="outlined"
            fullWidth
            required
            name="name"
            value={state.registerDetails.name}
            onChange={handleChange}
            sx={{
              marginBottom: "20px",
              backgroundColor: "#f9f9f9", 
              borderRadius: "5px",
            }}
          />

          <TextField
            label="Username"
            placeholder="Enter your username"
            variant="outlined"
            fullWidth
            required
            name="username"
            value={state.registerDetails.username}
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
            required
            value={state.registerDetails.password}
            onChange={handleChange}
            fullWidth
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
              marginBottom: "10px",
              padding: "10px 0",
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
              borderRadius: "25px",
            }}
          >
            Submit
          </Button>

          <Typography sx={{color:"black"}}>
            Already have an account?
            <NavLink to={"/"}>
              <Button>Sign in</Button>
            </NavLink>
          </Typography>
          
        </Box>
      </Box>
    
  )
}

export default Register;