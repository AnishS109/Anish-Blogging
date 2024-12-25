import React, { useEffect, useState } from 'react'
import SinglePost from './SinglePost'
import { Grid } from '@mui/material'
import {useSearchParams} from "react-router-dom"
import Loader from '../../Layout/Loader'

const Posts = () => {

  const [posts, setPosts] = useState([])
  const [searchParams] = useSearchParams()
  const category = searchParams.get("category")

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(`https://anish-blogging-2.onrender.com/get/post/${category ? category : "All"}`)
      const data = await response.json()
      
      if(response.ok){
        setPosts(data)
      }
    }
    fetchData()
  },[category])

  return (
  <>
    {
      posts && posts.length>0 ? posts.map((post) => (
        <Grid item lg={3} sm={4} xs={12} key={post._id}>
          <SinglePost post={post} key={post._id}/>
        </Grid>
      )): 

      <div className="flex justify-center items-center w-[100%]">
      <h1 className='text-2xl text-stone-500'>
        {<Loader/>}
      </h1>
      </div>  

    }
  </>
  )
}

export default Posts
