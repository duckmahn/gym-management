"use client";
import Textbox from  './textboxcreate'
import ClickButton from './buttonsignup'
import ButtonG from './buttonsignupgoogle'
import Image from 'next/image'

    export default function Register() {
  
      return (
        <div>
        <div className="logo-container">
        <span className="colorGym">GYM</span>
        <span className="colorHuflit">HUFLIT.</span>
        
      </div>
        <div className="title">
          <div className="titleText">Create an account</div>
        </div>

        <div className="name">
          <div className="text">Name</div>
        </div>
        <div className="nameBox"> <Textbox/> </div>

        <div className="email"> 
          <div className="text">Email Address</div>
        </div>
        <div className="emailBox">  <Textbox/></div>
        
        <div className="pass"> 
          <div className="text">Password</div>
        </div>

      
        <div className="passBox">  <Textbox /></div>

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
        </div> </div>

        <div className="Login"> <ClickButton label="Sign up" />
        </div>

        <div className="textSmall"> --------- or sign in with---------
        </div>
 
        
        <div className="Google"> <ButtonG label="Continue with Google"/>
        </div>
        <div className="imageGoogle">
        <Image
                src="/gg.jpg" 
                alt=""
                width={20} // Độ rộng hình ảnh
                height={20} // Độ cao hình ảnh
        />
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


