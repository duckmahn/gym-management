"use client";
import "./signup.css";
import Image from 'next/image'

    export default function Register() {
  
      return (
        <div>
        <div className="logoContainer">
        <span className="colorGym">GYM</span>
        <span className="colorHuflit">HUFLIT.</span>
        
      </div>
        <div className="title">
          <div className="titleText">Create an account</div>
        </div>

        <div className="name">
          <div className="text">Name</div>
          <div className="nameBox"> 
            <input  className="nameInput" placeholder=""/></div>
        </div>

        <div className="email">
          <div className="text">Email Address</div>
          <div className="emailBox"> 
            <input  className="emailInput" placeholder=""/></div>
        </div>
        
       
        <div className="pass">
          <div className="text">Password</div>
          <div className="passBox"> 
            <input   type="password" className="passInput" placeholder=""/></div>
        </div> 

        <div className="checkBox">
        <div className="textAgree">By continuing, you agree to our <span></span>
        <a
                onClick={() => alert('')} // Hành động khi nhấp
                style={{
                    cursor: 'pointer', // Hiển thị con trỏ tay khi di chuột
                    color: 'rgb(210, 31, 88)', // Màu chữ
                }}
            >
                terms of service.
            </a>
        </div>
         </div>
        
        <div className="signup">
        <div className="buttonSignup"> Sign up</div>
        </div>

        <div className="textSmall"> --------- or sign in with---------
        </div>
 
        
        <div className="Google"> 
        <div className="buttonGoogle">Continue with Google</div>
        </div>

        <div className="already">
        <div className="textQuestion">Already have an account? <span></span>  
        <a
                onClick={() => alert('')} // Hành động khi nhấp
                style={{
                    cursor: 'pointer', // Hiển thị con trỏ tay khi di chuột
                    color: 'rgb(210, 31, 88)', // Màu chữ
                    
                }}
            >
             
                Sign in here
            </a></div>
            </div>

      </div>
    );
    }


