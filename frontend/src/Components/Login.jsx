import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import User from './User';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState();

    
    const handleLogin = async (e) =>{
      e.preventDefault();
      try{
        const response = await axios.post('http://127.0.0.1:8000/api/dj-rest-auth/login/',{
          email:email,
          password:password
        },{
          headers:{
            'Content-Type': 'application/json'
          },
        });
        const token = response.data.key
        console.log(token)
        localStorage.setItem('authKey',token)
        getUser(token)
        
      }catch(error){
        console.error(error);
      }
    }

    useEffect(()=>{
      const token = localStorage.getItem('authKey')
      if(token){
        getUser(token)
        console.log('getUser')
      }
    },[])

    
    const getUser = async (token) =>{
        const response = await axios.get('http://127.0.0.1:8000/api/kullanicilar/',{
          headers:{
            Authorization: `Token ${token}`,
          }
        })
        return setUser(response.data);
    }

    const logout = ()=>{
      localStorage.removeItem('authKey')
      setUser(null)
    }

  return (

    <>
    {!user&&
      <Form className='container col-md-6' onSubmit={handleLogin}>
        <Form.Group className="mb-3 w-50" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(e)=> setEmail(e.target.value)}/>
          <Form.Text className="text-muted">
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 w-50" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    }
      {
      user&&
        <Button variant="primary" onClick={logout}>
          Logout
        </Button>
      }
    <User userList={user}/>
    </>

  )
}

export default Login