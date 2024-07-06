import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from './Cards';

function User({authToken}){

  const [user,setUser] = useState();
  const [token,setToken] = useState();

  useEffect(()=>{
    const token = localStorage.getItem('authKey')
    if(token){
      getUser(token)
      console.log('getUser')
    }
    setToken(authToken)
    getUser(token)
    console.log('usercomponenet')
  },[])

  
  const getUser = async (token) =>{
      const response = await axios.get('http://127.0.0.1:8000/api/kullanicilar/',{
        headers:{
          Authorization: `Token ${token}`,
        }
      })
      return setUser(response.data);
  }

  return (
    <>
      <div className='row'>
        {
          user&&
          user.map((e,i)=>{
            return <Cards username={e.username} key={i} f_name={e.first_name} l_name={e.last_name} email={e.email}/>
          })
        }
      </div>
    </>
  )
}

export default User