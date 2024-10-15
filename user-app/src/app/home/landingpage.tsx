import React from "react"
import "./landingpage.css"

export default function LandingPage() {
  return (
    <div className="landingpage">
      <div>
        <div className="tiltle">
          <h2>HUFLITGYM</h2>
          <p>Transform Your Body</p>
        </div>
        <button className="search">Search</button>
        <ul>
          <li>Home</li>
          <li>Program</li>
          <li>Coaching</li>
          <li>Membership</li>
          <li>About us</li>
        </ul>
        <button className="authencation">Login</button>
        <button className="authencation">Sign Up</button>
      </div>
      <div className="second">
        <div className="left">
          <p>Achive Your</p>
          <p className="outstanding">FITNESS GOALS</p>
          <p>With FitMaker</p>
          <div className="describe">
            "Join The Fitmaker Community And Transform Your Fitness Journey. Our
            Expert Coaches And <br />
            Personalized Programs Are Designed To Help You Achive Your Goals And
            Exceed Your <br />
            Expectations. Ready To Make A Change?"
          </div>
          <button>Start Your Journey</button>
          <button>Explore Programs</button>
        </div>
      </div>
    </div>
  )
}
