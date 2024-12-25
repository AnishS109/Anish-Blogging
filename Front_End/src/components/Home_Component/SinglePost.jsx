import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { DataContext } from '../../Context/DataProvider'

import shortCut from "../../assets/shortCut.jpeg"

const SinglePost = ({post}) => {
  
  const setText = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str
  }

  const {setSelected} = useContext(DataContext)

  // console.log(post.picture);  


  const url = "https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?cs=srgb&dl=pexels-pixabay-262508.jpg&fm=jpg"

  return (

    //__________________POST CARD CONTAINER___________
  
    <NavLink to={"/postDetails"}>
  <Box sx={{
    border: "1px solid #d3cede",
    borderRadius:"10px",
    m:"10px",
    height:"400px",
    display:"flex",
    alignItems:"center",
    flexDirection:"column",
    "& > p":{
      padding:"0 5px 5px 5px"
    }
  }}
  onClick={() => setSelected(post.title)}
>


    {/*_________________ IMAGE CONTAINER_____________*/}

    <img src={url} alt="Blog" style={{
      width:"100%",
      borderRadius:"10px 10px 0 0",
      height:230
    }}/>

    
    {/*_________________ CATEGORY CONTAINER_____________*/}

    <Typography sx={{
      color:"#878787",
      fontSize:"12px"
    }}>
      {post.categories}
    </Typography>

    
    {/*_________________ TITLE CONTAINER_____________*/}

    <Typography sx={{
      fontSize:"20px",
      fontWeight:600
    }}>
      {setText(post.title, 15)}
    </Typography>


    {/*_________________ USERNAME CONTAINER_____________*/}

    <Typography sx={{
      color:"#878787",
      fontSize:"12px",
    }}>
      {post.username} 
    </Typography>


    {/*_________________ DESCRIPTION CONTAINER_____________*/}

    <Typography sx={{
      fontSize:"14px",
      wordBreak:"break-word"
    }}>
      {setText(post.description, 100)}
    </Typography>

  </Box>
  </NavLink>
  )
}

export default SinglePost
