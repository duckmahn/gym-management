"use client";
import "./login.css";

    export default function Register() {
    
      return (
        
        <div>
        <div className="logoContainer">
        <span className="colorGym">GYM</span>
        <span className="colorHuflit">HUFLIT.</span>
      </div>
    
        <div className="email">
          <div className="text">Email Address</div>
          <div className="emailBox"> 
            <input  className="emailInput" placeholder=""/></div>
        </div>
        
       
        <div className="pass">
          <div className="text">Password 
          <span className="passForgot"> Forgot Password ?</span>
            </div>
          <div className="passBox"> 

            <input  type="password"className="passInput" placeholder=""/></div>

          
        </div> 

        <div className="checkbox">
        <label className="checkbox-container">
        <input type="checkbox" className="checkbox-input"/>
        <span className="checkbox-custom"></span>
        Keep me signed in
        </label>
        </div>

        <div className="signup">
        <div className="buttonSignup"> Login</div>
        </div>

        <div className="textSmall"> --------- or sign in with---------
        </div>
 
        
        <div className="Google"> 
        <div className="buttonGoogle">Continue with Google</div>
        </div>

        <div className="create">
        <div className="textQuestion">Create an account <span></span>  
        </div>
            </div>

      </div>
    );
    }


