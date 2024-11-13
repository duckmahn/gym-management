"use client";
import Image from "next/image";
import "./courses.css";
export default function Setting() {
  return (
    
    <div className ="bg">

 
      <div className="menu">
      
      <button className ="image-button1">
  <img src="element-4.jpg" alt="Button Image" />
</button>

      <div>
      <button className ="image-button2">
  <img src="graph.jpg" alt="Button Image" />
      </button>
      </div>

      <div>
      <button className ="image-button3">
  <img src="medal-star.jpg" alt="Button Image" />
      </button>
      </div>

      <div>
      <button className ="image-button4">
  <img src="messages2.jpg" alt="Button Image" />
      </button>
      </div>

      <div>
      <button className ="image-button5">
  <img src="setting-2.jpg" alt="Button Image" />
      </button>
      </div>
      </div>
      <div className="background-full">
          <div className="textHead">Welcome, User</div>
          <div>
          </div>

          <div className="head"> 
          <div className="textDay">24/10/2024</div>
 
            <div className ="searchBar">
        <input  src= "search-normal.jpg"  className="search-input" placeholder="Search"/>
             </div >

             <button className="noticeButton ">
          <img src="notification-bing.jpg" width='35px' alt="Button"/>
        </button>

        <button className="meomeoButton ">
          <img src="Rectangle 1072.jpg" width='35px' alt="Button"/>
        </button>
      </div>
     <div className="red"></div>
     <div className="background-small">
      
        <div className="textkhoahoc">Các khóa học</div>
        <div className="yogaBox">
         <div className="textTitle">Yoga</div>
          <div className="yogaImage">
            <div className="yogaImageTrai">
              <div className="textBold">3 tháng</div>
              <div className="textsmall">Thời gian</div>
              <div className="textBold">1.200.000đ</div>
              <div className="textsmall">Chi phí</div>
            </div>
            <div className="yogaImagePhai">
              <img src='Rectangle 1072.jpg'/>
            </div>
          </div>
          <div className="thongtinBox">Thông tin  </div>
        
        </div>
        <div className="buttonRight">
        <img src="ArrowRight.jpg" width='30px'/>
        </div>

      </div>
      
        </div>
        
        
</div>
   
  );
}
