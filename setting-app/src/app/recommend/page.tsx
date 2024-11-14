"use client";
import Image from "next/image";
import "./recommend.css";
import Calendar from "./calendar";
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
      
      <div className="textkhoahoc">Bài tập đề xuất</div>
      <div className="hang1">
      <div className="jumpBox">
        
        <div className="textTitle">Jump Squat</div>
        <div className="squatImage">
          <div className="squatImageTrai">
            <div className="textBold">Squat</div>
            <div className="textsmall">Loại bài tập</div>
            <div className="textBold">25p</div>
            <div className="textsmall">Thời gian</div>
          </div>
          <div className="squatImagePhai">
            <img src='Rectangle 1072.jpg' />
          </div>
        </div>
        <div className="tapBox">Tập  </div>
      </div>

      <div className="frontBox">
        
        <div className="textTitle">Front Squat</div>
        <div className="squatImage">
          <div className="squatImageTrai">
            <div className="textBold">Squat</div>
            <div className="textsmall">Loại bài tập</div>
            <div className="textBold">30p</div>
            <div className="textsmall">Thời gian</div>
          </div>
          <div className="squatImagePhai">
            <img src='Rectangle 1072.jpg' />
          </div>
        </div>
        <div className="tapBox">Tập  </div>
        
      </div>
      <div className="buttonRight"> <img src="ArrowRight.jpg" width='30px'/></div>
      <div className="calendar">
      <Calendar />
      </div>
      </div>

      <div className="textmonan">Món ăn đề xuất</div>
      <div className="hang2">
        <div className="jumpBox">
        
          <div className="textTitle">Salad Rau Củ Và Ức Gà</div>
          <div className="squatImage">
          <div className="squatImageTrai">
            <div className="textBold">Đạm Và Xơ</div>
            <div className="textsmall">Loại món ăn</div>
            <div className="textBold">225-275</div>
            <div className="textsmall">Calories</div>
            </div>
            <div className="squatImagePhai">
              <img src='Rectangle 1072.jpg' />
            </div>
          </div>
          <div className="huongdanBox">Hướng Dẫn  </div>
        </div>
        <div className="buttonRight1"> <img src="ArrowRight.jpg" width='30px'/></div>

        <div className="suckhoe">
         <div className="chayBox"> 
          <div className="chayFull">
           <div className="chay1"> <img src="run.jpg" width='30px'/></div>
           <div className="chay2">  <div className="chay">Chạy</div></div>
           <div className="chay3">  <div className="text24">24 Oct 24</div></div>
         </div>
          <div className="km">
            <div className="km1"> <div className="textkm">9070m</div></div>
            <div className="km2"> <div className="textkm">55:24 min</div></div>
         </div>
          </div>
          <div className="healthBox">
              <div className="timBox">
                <div className="tim">
                  <div className="tim1"> <img src="tim.jpg" width='30px'/></div>
                  <div className="tim2"> <div className="textkm">119</div>  <div className="textsmall">bpm</div></div>
                </div>
                  <div className="day"> <img src="day.jpg" width='100px'/> </div>
              </div>
              <div className="cobapBox">
                  <div className="textcobap">
                    <div className="textkm">19.3</div> 
                    <div className="textsmall">BMI</div>
                  </div>
                  <div className="ta"> <img src="ta.jpg" width='60px'/> </div>
              </div>
          </div>
        </div>

      </div>
    </div>
  </div>
        
</div>
   
  );
}
