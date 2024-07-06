import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


function Login({authToken}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const navigate = useNavigate();
    
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
        console.log(token,'LoginComponenet')
        localStorage.setItem('authKey',token)
        // getUser(token)
        authToken(token)
        navigate('/')
        
      }catch(error){
        console.error(error);
      }
    }



    const logout = ()=>{
      localStorage.removeItem('authKey')
      setUser(null)
    }
  return (
    <div className='login-body'>
        <div className={`log-container ${rightPanelActive ? 'right-panel-active' : ''}`} id="container">
          <div className="form-container sign-up-container">
            <form action="#">
              <h1>Bize Katılın!</h1>
              <div className="social-container">
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              </div>
              <span>ya da Google ile giriş yapabilirsiniz</span>
              <input type="text" placeholder="İsim" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Şifre" />
              <button onClick={() => setRightPanelActive(false)}>Kayıt Ol</button>
            </form>
          </div>

          <div className="form-container sign-in-container">
            <form method='post' action='/' onSubmit={handleLogin}>
              <h1>Giriş Yap</h1>
              <div className="social-container">
                {/* <a href="#" className="social"><i className="fab fa-facebook-f"></i></a> */}
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                {/* <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a> */}
              </div>
              <span>ya da Google ile giriş yapabilirsiniz</span>
              <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} />
              <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
              {/* <a href="#">Forgot your password?</a> */}
              <button>Giriş Yap</button>
            </form>
          </div>

          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Sizi Yeniden Görmek Güzel!</h1>
                <p>Bağlantımızı sürdürmek için lütfen kişisel bilgilerinizle giriş yapın.</p>
                <button className="ghost" onClick={() => setRightPanelActive(false)}>Giriş Yap</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>merhabaDünya!</h1>
                <p>Giriş bilgileriniz girin ve bizimle beraber yazılım dünyasını keşfedin!</p>
                <button className="ghost" onClick={() => setRightPanelActive(true)}>Kayıt Ol</button>
              </div>
            </div>
          </div>
        </div>
    </div>

  )
}

export default Login