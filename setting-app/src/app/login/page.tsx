"use client";
import Textbox from  './textbox'
import Checkbox from './checkbox'
import ClickButton from './buttonlogin'
import ButtonG from './buttongoogle'
import Image from 'next/image'

    export default function Register() {
  
      return (
        <div>
        <div className="logo-container">
        <span className="colorGym">GYM</span>
        <span className="colorHuflit">HUFLIT.</span>
        
      </div>
        <div className="email"> 
          <div className="text">Email Address</div>
        </div>
        <div className="emailBox">  <Textbox /></div>
        
        <div className="pass"> 
          <div className="text">Password</div>
        </div>

        <div className="passForgot">
        <div className="colorForgot"><a
                onClick={() => alert('')} // Hành động khi nhấp
                style={{
                    cursor: 'pointer', // Hiển thị con trỏ tay khi di chuột
                    color: 'rgb(210, 31, 88)', // Màu chữ
                    
                }}
            >
                Forgot Password ?
            </a> </div>
        </div>
        <div className="passBox">  <Textbox /></div>

        <div className="checkBox"> <Checkbox/>
        <div className="text">Keep me signed in </div></div>

        <div className="Login"> <ClickButton label="Login" />
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

        <div className="create">
        <a
                onClick={() => alert('')} // Hành động khi nhấp
                style={{
                    cursor: 'pointer', // Hiển thị con trỏ tay khi di chuột
                    color: 'rgb(210, 31, 88)', // Màu chữ
                    
                }}
            >
                Create an account
            </a>
        </div>
      </div>
    );
    }


