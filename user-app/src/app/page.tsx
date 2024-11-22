"use client";
import Image from "next/image";
import "./globals.css";
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
  <div className="meomeo">
      <img src="Rectangle 1072.jpg" className="meomeoImg" width='35px' alt="Button"/>
      
      <div className="nameMail">
      <div className="textBold"> User</div>
      <div className= "textMail"> User@gmail.com </div>
      </div>

      <div className="editButton"> Edit </div>

      </div>
      
        <div className="hang1"> 
          <div className="texthoten ">Họ và tên </div>
          <div className="textsdt ">SĐT </div>
          </div>
        <div className="hang2"> 
        <div className ="hovatenBar">
        <input  className="hovaten-input" placeholder=""/>
        </div >
        <div className ="sdtBar">
        <input  className="sdt-input" placeholder=""/>
        </div >
          </div>

          <div className="hang3"> 
          <div className="textGioitinh ">Giới tính </div>
          <div className="textDate ">Ngày tháng năm sinh </div>
          </div>
          <div className="hang4"> 
        <div className ="gioitinhBar">
        <input  className="gioitinh-input" placeholder=""/>
        </div >
        <div className ="dateBar">
        <input  className="date-input" placeholder=""/>
        </div >
          </div>

          <div className="hang5"> 
          <div className="textEmail ">Email</div>
          <div className="textCountry ">Quốc gia </div>
          </div>
          <div className="hang6 "> 
        <div className ="emailBar">
        <input  className="email-input" placeholder=""/>
        </div >
        <div className ="countryBar">
        <input  className="country-input" placeholder=""/>
        </div >
          </div>

          <div className="hang7"> 
          <div className="textBMI ">Chỉ số BMI</div>
          <div className="textMember ">Thời hạn Membership </div>
          </div>
          <div className="hang8 "> 
        <div className ="bmiBar">
        <input  className="bmi-input" placeholder=""/>
        </div >
        <div className ="memberBar">
        <input  className="member-input" placeholder=""/>
        </div >
          </div>
          </div>
        </div>
</div>
   
  );
}
