import React from "react"
import { useState } from "react"
import axios from "axios"
import { getToken, setToken } from "./localStorage"
import "./landingpage.css"

export default function LandingPage() {
  return (
    <div className="landingpage">
      <div className="first">
        <div className="fivar">
          <img src="/images/first/first1.png" />
        </div>
        <div className="fionce">
          <div className="fitop">HUFLITGYM</div>
          <div className="fibot">Transform Your Body</div>
        </div>
        <div className="fitwo">
          <button>
            <img src="/images/first/first2.png" />
          </button>
        </div>
        <div className="fithree">
          <ul>
            <li>Home</li>
            <li>Program</li>
            <li>Coaching</li>
            <li>Membership</li>
            <li>About us</li>
          </ul>
        </div>
        <div className="fifour">
          <button>Log In</button>
          <button>Sign Up</button>
        </div>
      </div>

      <div className="second">
        <div className="sleft">
          <div className="stop">
            <div className="sfalse">Achive Your</div>
            <div className="strue">FITNESS GOALS</div>
            <div className="sfalse">With FitMaker</div>
          </div>
          <div className="smid">
            "Join The Fitmaker Community And Transform Your Fitness Journey. Our
            Expert Coaches And Personalized Programs Are Designed To Help You
            Achive Your Goals And Exceed Your Expectations. Ready To Make A
            Change?"
          </div>
          <div className="sbot">
            <button>Start Your Journey</button>
            <button>Explore Programs</button>
          </div>
        </div>
        <div className="sright">
          <img src="/images/img1.png" />
        </div>
      </div>

      <div className="third">
        <div className="thzero">
          <div className="thtop">
            <div className="thleft">96% </div>
            <div className="thright">Client Satisfaction</div>
          </div>
          <div className="thbot">
            Our Members Love Their Results And Experience
          </div>
        </div>
        <div className="thzero">
          <div className="thtop">
            <div className="thleft">+5</div>
            <div className="thright"> Years Of Experience</div>
          </div>
          <div className="thbot">
            Trust In Our Proven Track Record Of Transforming
          </div>
        </div>
        <div className="thzero">
          <div className="thtop">
            <div className="thleft">+800</div>
            <div className="thright"> Active Members</div>
          </div>
          <div className="thbot">Join Our Thriving Fitness Community</div>
        </div>
        <div className="thzero">
          <div className="thtop">
            <div className="thleft">24/7</div>
            <div className="thright"> Support Available</div>
          </div>
          <div className="thbot">Expert Assistance Whenever You Need It</div>
        </div>
      </div>

      <div className="four">
        <div className="fotop">
          <div className="foleft">Our</div>
          <div className="foright"> Services</div>
        </div>
        <div className="fomid">
          At This Part You Can Easily Access All Of Our Services. Take A Look At
          Them And Choose Ever You Want.
        </div>
        <div className="fobot">
          <div className="fozero">
            <div className="fobelow">
              <img src="/images/four/four1.png" />
            </div>
            <div className="foabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="fozero">
            <div className="fobelow">
              <img src="/images/four/four2.png" />
            </div>
            <div className="foabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="fozero">
            <div className="fobelow">
              <img src="/images/four/four3.png" />
            </div>
            <div className="foabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="fozero">
            <div className="fobelow">
              <img src="/images/four/four4.png" />
            </div>
            <div className="foabove">
              <a href="#">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <div className="five">
        <div className="fvtop">
          <div className="fvleft">Our</div>
          <div className="fvright"> Plans</div>
        </div>
        <div className="fvmid">
          Select The Plan That Suits Your Fitness Goals And Let Our Expert
          Coaches Guide You Every Step Of The Way
        </div>
        <div className="fvbot">
          <div className="fvzero">
            <div className="fvonce">Package</div>
            <div className="fvtwo">PRO PLAN</div>
            <div className="fvthree">Description</div>
            <div className="fvfour">
              Our Pro Plan Offers Advanced Workouts And Personalized Nutrition
              Coaching To Help You Reach Your Goals Faster. Sign Up Right Now
            </div>
            <div className="fvfive">Features</div>
            <div className="fvsix">
              <ul>
                <li>Access To All Of Our Exercise Videos</li>
                <li>Progress Tracking</li>
                <li>Supportive Online Community</li>
                <li>Advanced, Personalized Workout Plans</li>
                <li>Comprehensive Nutrition Coaching</li>
                <li>Access To Advanced Workout Programs</li>
                <li>Body Composition Analysis</li>
              </ul>
            </div>
            <div className="fvseven">
              <div className="fvleft1">99$</div>
              <div className="fvright1">/USD</div>
            </div>
            <div className="fveight">
              <button>Choose This Plan</button>
            </div>
          </div>
          <div className="fvzero">
            <div className="fvonce">Package</div>
            <div className="fvtwo">PRO PLAN</div>
            <div className="fvthree">Description</div>
            <div className="fvfour">
              Our Pro Plan Offers Advanced Workouts And Personalized Nutrition
              Coaching To Help You Reach Your Goals Faster. Sign Up Right Now
            </div>
            <div className="fvfive">Features</div>
            <div className="fvsix">
              <ul>
                <li>Access To All Of Our Exercise Videos</li>
                <li>Progress Tracking</li>
                <li>Supportive Online Community</li>
                <li>Advanced, Personalized Workout Plans</li>
                <li>Comprehensive Nutrition Coaching</li>
                <li>Access To Advanced Workout Programs</li>
                <li>Body Composition Analysis</li>
              </ul>
            </div>
            <div className="fvseven">
              <div className="fvleft1">99$</div>
              <div className="fvright1">/USD</div>
            </div>
            <div className="fveight">
              <button>Choose This Plan</button>
            </div>
          </div>
          <div className="fvzero">
            <div className="fvonce">Package</div>
            <div className="fvtwo">PRO PLAN</div>
            <div className="fvthree">Description</div>
            <div className="fvfour">
              Our Pro Plan Offers Advanced Workouts And Personalized Nutrition
              Coaching To Help You Reach Your Goals Faster. Sign Up Right Now
            </div>
            <div className="fvfive">Features</div>
            <div className="fvsix">
              <ul>
                <li>Access To All Of Our Exercise Videos</li>
                <li>Progress Tracking</li>
                <li>Supportive Online Community</li>
                <li>Advanced, Personalized Workout Plans</li>
                <li>Comprehensive Nutrition Coaching</li>
                <li>Access To Advanced Workout Programs</li>
                <li>Body Composition Analysis</li>
              </ul>
            </div>
            <div className="fvseven">
              <div className="fvleft1">99$</div>
              <div className="fvright1">/USD</div>
            </div>
            <div className="fveight">
              <button>Choose This Plan</button>
            </div>
          </div>
        </div>
      </div>

      <div className="six">
        <div className="sitop">
          <div className="siroot">
            <div className="sileft">Our Fitness</div>
            <div className="siright"> Tools</div>
          </div>
          <div className="silast">
            <button>Preious</button>
            <button>Next</button>
          </div>
        </div>
        <div className="simid">
          Access A Variety Of Tools To Help You Reach Your Fitness Goals More
          Effectively
        </div>
        <div className="sibot">
          <div className="sizero">
            <div className="sibelow">
              <img src="/images/six/six1.png" />
            </div>
            <div className="siabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="sizero">
            <div className="sibelow">
              <img src="/images/six/six2.png" />
            </div>
            <div className="siabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="sizero">
            <div className="sibelow">
              <img src="/images/six/six3.png" />
            </div>
            <div className="siabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="sizero">
            <div className="sibelow">
              <img src="/images/six/six4.png" />
            </div>
            <div className="siabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="sizero">
            <div className="sibelow">
              <img src="/images/six/six5.png" />
            </div>
            <div className="siabove">
              <a href="#">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <div className="seven">
        <div className="svtop">
          <div className="svleft">What Our</div>
          <div className="svright"> Customers Say</div>
        </div>
        <div className="svmid">
          At This Part You Can See Few Of The Many Positive Reviews Of Our
          Cutomers
        </div>
        <div className="svbot">
          <img src="/images/seven/seven1.png" />
        </div>
      </div>

      <div className="eight">
        <div className="etop">
          <div className="eroot">
            <div className="eleft">Meet Our</div>
            <div className="eright"> Trainers</div>
          </div>
          <div className="elast">
            <button>Preious</button>
            <button>Next</button>
          </div>
        </div>
        <div className="emid">
          At This Part You Can See Few Of The Many Positive Of Our Customer
        </div>
        <div className="ebot">
          <div className="ezero">
            <div className="ebelow">
              <img src="/images/eight/eight1.png" />
            </div>
            <div className="eabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="ezero">
            <div className="ebelow">
              <img src="/images/eight/eight2.png" />
            </div>
            <div className="eabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="ezero">
            <div className="ebelow">
              <img src="/images/eight/eight3.png" />
            </div>
            <div className="eabove">
              <a href="#">Learn More</a>
            </div>
          </div>
          <div className="ezero">
            <div className="ebelow">
              <img src="/images/eight/eight4.png" />
            </div>
            <div className="eabove">
              <a href="#">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      <div className="nine">
        <div className="ntop">
          <div className="nroot">
            <div className="nleft">Fitmaker</div>
            <div className="nright"> Blog posts</div>
          </div>
          <div className="nlast">
            <button>Preious</button>
            <button>Next</button>
          </div>
        </div>
        <div className="nmid">
          Discover Essential Tips To Maximize Your Workout Results And Reach
          Your Fitness Goals Faster.
        </div>
        <div className="nbot">
          <img src="/images/night/night1.png" />
        </div>
      </div>

      <div className="ten">
        <div className="tnleft">
          <div className="tntop">
            <div className="tnleft1">Join Our</div>
            <div className="tnright1"> Fitness Community</div>
          </div>
          <div className="tnmid">
            Sign Up Now To Unlock Exlusive Access To Personalized Workout Plans,
            Expert Coaching, And A Supportive Community That Will Help You
            Achieve Your Fitness Goals
          </div>
          <div className="tnbot">
            <div className="tnzero">
              <div className="tntop1">
                <div className="tnleft2">Personalized</div>
                <div className="tnright2"> Workout Plans</div>
              </div>
              <div className="tnbot1">
                Customized Routines That Match Your Fitness Level And Goals,
                Ensuring You Achieve The Best Results In The Most Efficient Way.
              </div>
            </div>
            <div className="tnzero">
              <div className="tntop1">
                <div className="tnleft2">Expert</div>
                <div className="tnright2"> Coaching</div>
              </div>
              <div className="tnbot1">
                Customized Routines That Match Your Fitness Level And Goals,
                Ensuring You Achieve The Best Results In The Most Efficient Way.
              </div>
            </div>
            <div className="tnzero">
              <div className="tntop1">
                <div className="tnleft2">Community</div>
                <div className="tnright2"> Support</div>
              </div>
              <div className="tnbot1">
                Join A Vibrant Community Of Fitness Enthusiasts Where You Can
                Share Experiences, Get Motivated, And Stay Inspired.
              </div>
            </div>
            <div className="tnzero">
              <div className="tntop1">
                <div className="tnleft2">Exclusive</div>
                <div className="tnright2"> Resources</div>
              </div>
              <div className="tnbot1">
                Access Premium Content, Including Video Tutorials, Nutrition
                Guides, And Member Only Discounts On Fitness Gear.
              </div>
            </div>
          </div>
        </div>
        <div className="tnright">
          <div className="tnleft3">
            <div className="tntop2">Sign Up</div>
            <div className="tnmid1">
              <form>
                <label>Name:</label>
                <br />
                <input type="text" placeholder="Enter Your Name" />
                <br />
                <label>Email:</label>
                <br />
                <input type="text" placeholder="Enter Your Email" />
                <br />
              </form>
            </div>
            <div className="tnbot2">
              <button>Sign Up</button>
              <p>or</p>
              <button>Sign up with Google</button>
            </div>
          </div>
          <div className="tnright3">
            <div className="tntop3">Log In</div>
            <div className="tnmid2">
              <form>
                <label>Name:</label>
                <br />
                <input type="text" placeholder="Enter Your Name" />
                <br />
                <label>Email:</label>
                <br />
                <input type="text" placeholder="Enter Your Email" />
                <br />
              </form>
            </div>
            <div className="tnbot3">
              <button>Log In</button>
              <p>or</p>
              <button>Log in with Google</button>
            </div>
          </div>
        </div>
      </div>

      <div className="twelve">
        <div className="twleft">
          <div className="twtop">
            <div className="twleft1">Fitmaker</div>
            <div className="twright1">Transform Your Body</div>
          </div>
          <div className="twmid">
            Transform Your Body With Fitmaker. Your Trusted Partner In Fitness
            With Over 5 Years Of Experience. We Offer Expert Coaching , Tailored
            Workout Plans, And Comprehensive Nutritional Guidance. Join Out
            Community And Start Your Journey Towards A Healthier , Stronger You
            Ready To Make Change?
          </div>
          <div className="twbot">
            <img src="/images/twelve/twelve1.png" />
          </div>
        </div>
        <div className="twright">
          <div className="twzero">
            <div className="twtop1">Company</div>
            <div className="twbot1">
              <a href="#">About Us</a>
            </div>
            <div className="twbot1">
              <a href="#">Our Services</a>
            </div>
            <div className="twbot1">
              <a href="#">Caceers</a>
            </div>
            <div className="twbot1">
              <a href="#">Blog</a>
            </div>
            <div className="twbot1">
              <a href="#">Testimonial</a>
            </div>
            <div className="twbot1">
              <a href="#">Contact Us</a>
            </div>
          </div>
          <div className="twzero">
            <div className="twtop1">Resources</div>
            <div className="twbot1">
              <a href="#">Fitness Tools</a>
            </div>
            <div className="twbot1">
              <a href="#">Workout Videos</a>
            </div>
            <div className="twbot1">
              <a href="#">Nutrition Guides</a>
            </div>
            <div className="twbot1">
              <a href="#">FAQ</a>
            </div>
            <div className="twbot1">
              <a href="#">Success Stories</a>
            </div>
            <div className="twbot1">
              <a href="#">Membership</a>
            </div>
          </div>
          <div className="twzero">
            <div className="twtop1">Programs</div>
            <div className="twbot1">
              <a href="#">Weight Loss</a>
            </div>
            <div className="twbot1">
              <a href="#">Building Muscles</a>
            </div>
            <div className="twbot1">
              <a href="#">Home Workout</a>
            </div>
            <div className="twbot1">
              <a href="#">Gym Plan</a>
            </div>
            <div className="twbot1">
              <a href="#">Our Plans</a>
            </div>
            <div className="twbot1">
              <a href="#">Fitness Group</a>
            </div>
          </div>
          <div className="twzero">
            <div className="twtop1">Contact Us</div>
            <div className="twbot1">
              <img src="/images/twelve/twelve2.png" />
              <a href="#">USA - Washington DC</a>
            </div>
            <div className="twbot1">
              <img src="/images/twelve/twelve3.png" />
              <a href="#">0392661807</a>
            </div>
            <div className="twbot1">
              <img src="/images/twelve/twelve4.png" />
              <a href="#">fitmaker@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
