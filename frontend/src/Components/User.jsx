import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from './Cards';

function User({userList}){

  return (
    <>
      <div className='row'>
        {
          userList&&
          userList.map((e,i)=>{
            return <Cards username={e.username} key={i} f_name={e.first_name} l_name={e.last_name} email={e.email}/>
            })
        }
      </div>
    </>
  )
}

export default User