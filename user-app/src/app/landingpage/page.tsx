"use client";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "../env";
import { useState } from "react";
import { useEffect } from "react";

export default function LandingPage() {
  interface Membership {
    id: string;
    type: string;
    price: number;
    description: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
    userId: string;
  }

  interface Trainer {
    id: string;
    name: string;
    email: string;
    phone: number;
    specialty: string;
    experience: string;
    avatar: string;
    type: string;
  }

  const image = [
    "/images/seven/image1.png",
    "/images/seven/image2.png",
    "/images/seven/image3.png",
  ];
  const [imageIndex, setImageIndex] = useState(0);

  const summary = [
    "A program for beginners. You want to start exercising but don’t know where to begin? Let our health coaches help you create a workout plan tailored to your needs. Now, exercising will no longer be boring because you’ll be continuously motivated while training with our coaches.",
    "Breakthrough Workout Program. Do you want to maintain your training momentum or conquer more challenging goals? The advanced workout program with professional coaches will bring new inspiration and significantly boost the effectiveness of your training compared to traditional methods.",
    "Program for those with health challenges. Overcome physical barriers caused by injuries or pregnancy with our recovery and overall health improvement program, guided by health coaches at HUFLITGYM.",
  ];
  const [summaryIndex, setSummaryIndex] = useState(0);

  const Next = () => {
    setImageIndex((Index) => (Index + 1) % image.length);
    setSummaryIndex((Index) => (Index + 1) % summary.length);
  };

  const Previous = () => {
    setImageIndex((Index) => (Index - 1 + image.length) % image.length);
    setSummaryIndex((Index) => (Index - 1 + summary.length) % summary.length);
  };

  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const urlMembership = `${NEXT_PUBLIC_API_URL}/api/Membership`;
  const urlTrainer = `${NEXT_PUBLIC_API_URL}/api/Trainers`;

  useEffect(() => {
    const readMembership = async () => {
      const response = await axios.get(urlMembership);
      try {
        if (response.status === 200) {
          setMemberships(response.data);
          setSuccess("OK");
        }
      } catch (error) {
        if (response.status === 401) {
          setError("Unauthorized");
        } else if (response.status === 403) {
          setError("Forbidden");
        }
      }
    };
  }, []);

  useEffect(() => {
    const readTrainer = async () => {
      const response = await axios.get(urlTrainer);
      try {
        if (response.status === 200) {
          setTrainers(response.data);
          setSuccess("OK");
        }
      } catch (error) {
        if (response.status === 401) {
          setError("Unauthorized");
        } else if (response.status === 403) {
          setError("Forbidden");
        }
      }
    };
  }, []);

  return (
    <div className="px-[50px] py-[25px] bg-black">
      <div className="fixed left-0 top-0 w-full bg-black pl-[50px] pt-[25px] flex flex-row">
        <div className="w-[50px] h-[50px] mr-[10px]">
          <img className="w-full h-full" src="/images/logo.png" />
        </div>
        <div className="mx-[10px]">
          <div>
            <p className="font-bold text-[20px] text-orangered">HUFLITGYM</p>
          </div>
          <div>
            <p className="text-white">Transform Your Body</p>
          </div>
        </div>
        <div className="mx-[10px]">
          <ul className="list-none">
            <li className="inline-block mx-[10px] p-[5px] font-medium text-white hover:border-b-[3px] border-b-orangered">
              <a href="#home">Home</a>
            </li>
            <li className="group relative inline-block mx-[10px] p-[5px] font-medium text-white">
              <div>Program</div>
              <div className="hidden absolute w-[150px] h-[300px] bg-grey p-[10px] z-[1] group-hover:block">
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#weightloss"
                >
                  Weight Loss
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#"
                >
                  Building Muscles
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#"
                >
                  Home Workout
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#"
                >
                  Gym Plan
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#ourplans"
                >
                  Our Plans
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#joinourfitnesscommunity"
                >
                  Fitness Group
                </a>
              </div>
            </li>
            <li className="group relative inline-block mx-[10px] p-[5px] font-medium text-white">
              <div>Coaching</div>
              <div className="hidden absolute w-[150px] h-[300px] bg-grey p-[10px] z-[1] group-hover:block">
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#ourservices"
                >
                  Our Services
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#"
                >
                  Caceers
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#fitmakerblogpots"
                >
                  Blog
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#"
                >
                  Testimonial
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#ourfitnesstools"
                >
                  Fitness Tools
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#faq"
                >
                  FAQ
                </a>
                <a
                  className="block p-[5px] text-white cursor-pointer hover:text-orangered"
                  href="#whatourcustomerssay"
                >
                  Success Stories
                </a>
              </div>
            </li>
            <li className="inline-block mx-[10px] p-[5px] font-medium text-white hover:border-b-[3px] border-b-orangered">
              <a href="#ourplans">Membership</a>
            </li>
            <li className="inline-block mx-[10px] p-[5px] font-medium text-white hover:border-b-[3px] border-b-orangered">
              <a href="#aboutus">About us</a>
            </li>
          </ul>
        </div>
        <div className="ml-[10px]">
          <button className="mr-[5px] border border-[1px] border-orangered rounded-[10px] p-[5px] text-orangered hover:bg-orangered text-white">
            <a href="/login">Login</a>
          </button>
          <button className="ml-[5px] border border-[1px] border-orangered rounded-[10px] p-[5px] text-orangered hover:bg-orangered text-white">
            <a href="/signup">Signup</a>
          </button>
        </div>
      </div>

      <div id="home" className="w-full my-[50px] flex flex-row">
        <div className="w-[50%] flex flex-col justify-center items-center">
          <div className="w-full mb-[20px] flex flex-col items-center">
            <div className="font-extrabold text-3xl text-white">
              Achive Your
            </div>
            <div className="my-[10px] font-extrabold text-5xl text-orangered">
              FITNESS GOALS
            </div>
            <div className="font-extrabold text-3xl text-white">
              With FitMaker
            </div>
          </div>
          <div className="mt-[20px] mb-[10px] text-white">
            "Join The Fitmaker Community And Transform Your Fitness Journey. Our
            Expert Coaches And Personalized Programs Are Designed To Help You
            Achive Your Goals And Exceed Your Expectations. Ready To Make A
            Change?"
          </div>
          <div className="w-full mt-[10px] flex flex-row justify-center">
            <button className="w-[49%] bg-orangered mr-[10px] rounded-[20px] py-[5px] font-bold text-2xl text-white hover:opacity-50">
              Start Your Journey
            </button>
            <button className="w-[49%] bg-orangered ml-[10px] rounded-[20px] py-[5px] font-bold text-2xl text-white hover:opacity-50">
              Explore Programs
            </button>
          </div>
        </div>
        <div className="w-[50%]">
          <img className="w-full h-full" src="/images/background.png" />
        </div>
      </div>

      <div
        id="weightloss"
        className="w-full my-[50px] flex flex-row justify-center"
      >
        <div className="w-[24%] border-r border-r-[3px] border-r-orangered px-[10px] flex flex-col items-center">
          <div className="mb-[10px]">
            <div className="inline-block font-extrabold text-3xl text-orangered">
              96%
            </div>
            <div className="inline-block font-medium text-white">
              Client Satisfaction
            </div>
          </div>
          <div className="mt-[10px] text-grey">
            Our Members Love Their Results And Experience
          </div>
        </div>
        <div className="w-[24%] border-r border-r-[3px] border-r-orangered px-[10px] flex flex-col items-center">
          <div className="mb-[10px]">
            <div className="inline-block font-extrabold text-3xl text-orangered">
              +5
            </div>
            <div className="inline-block font-medium text-white">
              Years Of Experience
            </div>
          </div>
          <div className="mt-[10px] text-grey">
            Trust In Our Proven Track Record Of Transforming
          </div>
        </div>
        <div className="w-[24%] border-r border-r-[3px] border-r-orangered px-[10px] flex flex-col items-center">
          <div className="mb-[10px]">
            <div className="inline-block font-extrabold text-3xl text-orangered">
              +800
            </div>
            <div className="inline-block font-medium text-white">
              Active Members
            </div>
          </div>
          <div className="mt-[10px] text-grey">
            Join Our Thriving Fitness Community
          </div>
        </div>
        <div className="w-[24%] border-r border-r-[3px] border-r-orangered px-[10px] flex flex-col items-center">
          <div className="mb-[10px]">
            <div className="inline-block font-extrabold text-3xl text-orangered">
              24/7
            </div>
            <div className="inline-block font-medium text-white">
              Support Available
            </div>
          </div>
          <div className="mt-[10px] text-grey">
            Expert Assistance Whenever You Need It
          </div>
        </div>
      </div>

      <div
        id="ourservices"
        className="w-full my-[50px] flex flex-col items-center"
      >
        <div className="mb-[10px]">
          <div className="inline-block font-[900] text-[30px] text-white">
            Our
          </div>
          <div className="inline-block font-[900] text-[30px] text-orangered">
            Services
          </div>
        </div>
        <div className="mt-[10px] mb-[5px] text-white">
          At This Part You Can Easily Access All Of Our Services. Take A Look At
          Them And Choose Ever You Want.
        </div>
        <div className="w-full mt-[5px] flex flex-wrap">
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/four/image1.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/four/image2.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/four/image3.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/four/image4.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
        </div>
      </div>

      <div
        id="ourplans"
        className="w-full my-[50px] flex flex-col items-center"
      >
        <div className="mb-[10px]">
          <div className="inline-block font-[900] text-[30px] text-white">
            Our
          </div>
          <div className="inline-block font-[900] text-[30px] text-orangered">
            Plans
          </div>
        </div>
        <div className="mt-[10px] mb-[5px] text-white">
          Select The Plan That Suits Your Fitness Goals And Let Our Expert
          Coaches Guide You Every Step Of The Way
        </div>
        <div className="w-full mt-[5px] flex flex-wrap">
          {/*{memberships.map((membership) => (*/}
          <div className="w-[30%] mr-[10px] mb-[10px] border-[3px] border-orangered rounded p-[10px] flex flex-col items-center">
            <div className="mb-[10px] text-orangered">Package</div>
            <div className="mb-[10px] font-extrabold text-[30px] text-white">
              {/*{membership.type}*/}PRO PLAN
            </div>
            <div className="mb-[10px] text-orangered">Description</div>
            <div className="mb-[10px] text-white">
              {/*{membership.description}*/}
              Our Pro Plan Offers Advanced Workouts And Persionalized Nutrition
              Coaching To Help You Reach Your Goals Faster. Sign Up Right Now!
            </div>
            <div className="mb-[10px] text-[10px] text-orangered">Features</div>
            <div className="mb-[10px]">
              <ul className="list-disc">
                <li className="text-white">
                  Access To All Of Our Exercise Videos
                </li>
                <li className="text-white">Progress Tracking</li>
                <li className="text-white">Supportive Online Community</li>
                <li className="text-white">
                  Advanced, Personalized Workout Plans
                </li>
                <li className="text-white">Comprehensive Nutrition Coaching</li>
                <li className="text-white">
                  Access To Advanced Workout Programs
                </li>
                <li className="text-white">Body Composition Analysis</li>
              </ul>
            </div>
            <div className="mb-[10px]">
              <div className="inline-block font-extrabold text-3xl text-white">
                {/*{membership.price}$*/}99$
              </div>
              <div className="inline-block font-light text-grey">/USD</div>
            </div>
            <div className="w-full">
              <button className="w-full bg-orangered rounded-[20px] py-[10px] text-white hover:opacity-50">
                Choose This Plan
              </button>
            </div>
          </div>
          <div className="w-[30%] mr-[10px] mb-[10px] border-[3px] border-orangered rounded p-[10px] flex flex-col items-center">
            <div className="mb-[10px] text-orangered">Package</div>
            <div className="mb-[10px] font-extrabold text-[30px] text-white">
              {/*{membership.type}*/}CUSTOM PLAN
            </div>
            <div className="mb-[10px] text-orangered">Description</div>
            <div className="mb-[10px] text-white">
              {/*{membership.description}*/}
              Exparience A Fully Tailored Fitness Experience With Our Custom
              Plan. Work One-On-One With A Dedicated Trainer To Achieve Your
              Goals
            </div>
            <div className="mb-[10px] text-[10px] text-orangered">Features</div>
            <div className="mb-[10px]">
              <ul className="list-disc">
                <li className="text-white">
                  Access To All Of Our Exercise Videos
                </li>
                <li className="text-white">Progress Tracking</li>
                <li className="text-white">Supportive Online Community</li>
                <li className="text-white">
                  Advanced, Personalized Workout Plans
                </li>
                <li className="text-white">Comprehensive Nutrition Coaching</li>
                <li className="text-white">
                  Access To Advanced Workout Programs
                </li>
                <li className="text-white">Body Composition Analysis</li>
              </ul>
            </div>
            <div className="mb-[10px]">
              <div className="inline-block font-extrabold text-3xl text-white">
                {/*{membership.price}$*/}149$
              </div>
              <div className="inline-block font-light text-grey">/USD</div>
            </div>
            <div className="w-full">
              <button className="w-full bg-orangered rounded-[20px] py-[10px] text-white hover:opacity-50">
                Choose This Plan
              </button>
            </div>
          </div>
          <div className="w-[30%] mr-[10px] mb-[10px] border-[3px] border-orangered rounded p-[10px] flex flex-col items-center">
            <div className="mb-[10px] text-orangered">Package</div>
            <div className="mb-[10px] font-extrabold text-[30px] text-white">
              {/*{membership.type}*/}BEGINNER PLAN
            </div>
            <div className="mb-[10px] text-orangered">Description</div>
            <div className="mb-[10px] text-white">
              {/*{membership.description}*/}
              Start Your Fitness Journey With Our Beginner Plan. Build A Strong
              Foundation With Basic Workouts And Essential Nutrition Guidance.
            </div>
            <div className="mb-[10px] text-[10px] text-orangered">Features</div>
            <div className="mb-[10px]">
              <ul className="list-disc">
                <li className="text-white">
                  Access To All Of Our Exercise Videos
                </li>
                <li className="text-white">Progress Tracking</li>
                <li className="text-white">Supportive Online Community</li>
                <li className="text-white">
                  Advanced, Personalized Workout Plans
                </li>
                <li className="text-white">Comprehensive Nutrition Coaching</li>
                <li className="text-white">
                  Access To Advanced Workout Programs
                </li>
                <li className="text-white">Body Composition Analysis</li>
              </ul>
            </div>
            <div className="mb-[10px]">
              <div className="inline-block font-extrabold text-3xl text-white">
                {/*{membership.price}$*/}49$
              </div>
              <div className="inline-block font-light text-grey">/USD</div>
            </div>
            <div className="w-full">
              <button className="w-full bg-orangered rounded-[20px] py-[10px] text-white hover:opacity-50">
                Choose This Plan
              </button>
            </div>
          </div>
          <div className="w-[30%] mr-[10px] mb-[10px] border-[3px] border-orangered rounded p-[10px] flex flex-col items-center">
            <div className="mb-[10px] text-orangered">Package</div>
            <div className="mb-[10px] font-extrabold text-[30px] text-white">
              {/*{membership.type}*/}
            </div>
            <div className="mb-[10px] text-orangered">Description</div>
            <div className="mb-[10px] text-white">
              {/*{membership.description}*/}
            </div>
            <div className="mb-[10px] text-[10px] text-orangered">Features</div>
            <div className="mb-[10px]">
              <ul className="list-disc">
                <li className="text-white">
                  Access To All Of Our Exercise Videos
                </li>
                <li className="text-white">Progress Tracking</li>
                <li className="text-white">Supportive Online Community</li>
                <li className="text-white">
                  Advanced, Personalized Workout Plans
                </li>
                <li className="text-white">Comprehensive Nutrition Coaching</li>
                <li className="text-white">
                  Access To Advanced Workout Programs
                </li>
                <li className="text-white">Body Composition Analysis</li>
              </ul>
            </div>
            <div className="mb-[10px]">
              <div className="inline-block font-extrabold text-3xl text-white">
                {/*{membership.price}$*/}
              </div>
              <div className="inline-block font-light text-grey">/USD</div>
            </div>
            <div className="w-full">
              <button className="w-full bg-orangered rounded-[20px] py-[10px] text-white hover:opacity-50">
                Choose This Plan
              </button>
            </div>
          </div>
          {/*))}*/}
        </div>
      </div>

      <div
        id="ourfitnesstools"
        className="w-full my-[50px] flex flex-col items-center"
      >
        <div className="w-full mb-[10px]">
          <div className="inline-block font-[900] text-[30px] text-white">
            Our Fitness
          </div>
          <div className="inline-block font-[900] text-[30px] text-orangered">
            Tools
          </div>
        </div>
        <div className="mt-[10px] mb-[5px] text-white">
          Access A Variety Of Tools To Help You Reach Your Fitness Goals More
          Effectively
        </div>
        <div className="w-full mt-[5px] flex flex-wrap">
          <div className="w-[20%] mr-[10px] mb-[10px] rounded">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/six/image1.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px] rounded">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/six/image2.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px] rounded">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/six/image3.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/six/image4.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
        </div>
      </div>

      <div
        id="whatourcustomerssay"
        className="w-full my-[50px] flex flex-col items-center"
      >
        <div className="w-full mb-[10px]">
          <div className="float-left">
            <div className="inline-block font-[900] text-[30px] text-white">
              What Our
            </div>
            <div className="inline-block font-[900] text-[30px] text-orangered">
              Customers Say
            </div>
          </div>
          <div className="float-right">
            <button
              className="bg-orangered mr-[5px] p-[5px] rounded-[10px] text-white hover:opacity-50"
              onClick={Previous}
            >
              Previous
            </button>
            <button
              className="bg-orangered ml-[5px] p-[5px] rounded-[10px] text-white hover:opacity-50"
              onClick={Next}
            >
              Next
            </button>
          </div>
        </div>
        <div className="mt-[10px] mb-[5px] text-white">
          At This Part You Can See Few Of The Many Positive Reviews Of Our
          Cutomers
        </div>
        <div className="w-full mt-[5px]">
          <img
            className="float-left w-[50%] border-r border-r-[3px] border-r-orangered pr-[10px]"
            src={image[imageIndex]}
          />
          <p className="float-right w-[50%] pl-[10px] text-white">
            {summary[summaryIndex]}
          </p>
        </div>
      </div>

      <div className="w-full my-[50px] flex flex-col items-center">
        <div className="w-full mb-[10px]">
          <div className="inline-block font-[900] text-[30px] text-white">
            Meet Our
          </div>
          <div className="inline-block font-[900] text-[30px] text-orangered">
            Trainers
          </div>
        </div>
        <div className="mt-[10px] mb-[5px] text-white">
          At This Part You Can See Few Of The Many Positive Of Our Customer
        </div>
        <div className="w-full mt-[5px] flex flex-wrap">
          {/*{trainers.map((trainer) => (*/}
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/eight/image1.png"
              />
            </div>
            <div className="relative left-[0px] bottom-[0px] flex flex-col">
              <div className="mb-[5px]">
                <p className="font-[700] text-[20px] text-white">
                  {/*{trainer.name}*/}Sam Cole
                </p>
                <p className="text-grey">Personal Trainer</p>
              </div>
              <div className="mt-[5px]">
                <a
                  className="inline-block list-none font-light text-white hover:opacity-50"
                  href="#"
                >
                  Learn More
                </a>
                <img
                  className="inline-block ml-[5px]"
                  src="/images/arrow.png"
                />
              </div>
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/eight/image2.png"
              />
            </div>
            <div className="relative left-[0px] bottom-[0px] flex flex-col">
              <div className="mb-[5px]">
                <p className="font-[700] text-[20px] text-white">
                  {/*{trainer.name}*/}Michael Harris
                </p>
                <p className="text-grey">Personal Trainer</p>
              </div>
              <div className="mt-[5px]">
                <a
                  className="inline-block list-none font-light text-white hover:opacity-50"
                  href="#"
                >
                  Learn More
                </a>
                <img
                  className="inline-block ml-[5px]"
                  src="/images/arrow.png"
                />
              </div>
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/eight/image3.png"
              />
            </div>
            <div className="relative left-[0px] bottom-[0px] flex flex-col">
              <div className="mb-[5px]">
                <p className="font-[700] text-[20px] text-white">
                  {/*{trainer.name}*/}John Anderson
                </p>
                <p className="text-grey">Personal Trainer</p>
              </div>
              <div className="mt-[5px]">
                <a
                  className="inline-block list-none font-light text-white hover:opacity-50"
                  href="#"
                >
                  Learn More
                </a>
                <img
                  className="inline-block ml-[5px]"
                  src="/images/arrow.png"
                />
              </div>
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/eight/image4.png"
              />
            </div>
            <div className="relative left-[0px] bottom-[0px] flex flex-col">
              <div className="mb-[5px]">
                <p className="font-[700] text-[20px] text-white">
                  {/*{trainer.name}*/}Tom Blake
                </p>
                <p className="text-grey">Personal Trainer</p>
              </div>
              <div className="mt-[5px]">
                <a
                  className="inline-block list-none font-light text-white hover:opacity-50"
                  href="#"
                >
                  Learn More
                </a>
                <img
                  className="inline-block ml-[5px]"
                  src="/images/arrow.png"
                />
              </div>
            </div>
          </div>
          {/*))}*/}
        </div>
      </div>

      <div
        id="fitmakerblogpots"
        className="w-full my-[50px] flex flex-col items-center"
      >
        <div className="w-full mb-[10px]">
          <div className="inline-block font-[900] text-[30px] text-white">
            Fitmaker
          </div>
          <div className="inline-block font-[900] text-[30px] text-orangered">
            Blog Posts
          </div>
        </div>
        <div className="mt-[10px] mb-[5px] text-white">
          Discover Essential Tips To Maximize Your Workout Results And Reach
          Your Fitness Goals Faster.
        </div>
        <div className="w-full mt-[5px] flex flex-wrap">
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/nine/image1.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/nine/image2.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/nine/image3.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
          <div className="w-[20%] mr-[10px] mb-[10px]">
            <div className="static">
              <img
                className="w-full h-full rounded-[5px]"
                src="/images/nine/image4.png"
              />
            </div>
            <div className="relative left-[10px] bottom-[30px]">
              <a
                className="inline-block list-none font-light text-white hover:opacity-50"
                href="#"
              >
                Learn More
              </a>
              <img className="inline-block ml-[5px]" src="/images/arrow.png" />
            </div>
          </div>
        </div>
      </div>

      <div
        id="#joinourfitnesscommunity"
        className="w-full my-[50px] flex flex-col items-center"
      >
        <div className="w-full mb-[10px]">
          <div className="inline-block font-[900] text-[30px] text-white">
            Join Our
          </div>
          <div className="inline-block font-[900] text-[30px] text-orangered">
            Fitness Community
          </div>
        </div>
        <div className="mt-[10px] mb-[5px] text-white">
          Sign Up Now To Unlock Exlusive Access To Personalized Workout Plans,
          Expert Coaching, And A Supportive Community That Will Help You Achieve
          Your Fitness Goals
        </div>
        <div className="w-full grid grid-cols-2 gap-[20px] mt-[5px]">
          <div className="w-auto h-auto border-[1px] border-orangered rounded p-[10px] flex flex-col items-center">
            <div className="mb-[10px]">
              <div className="inline-block font-[700] text-[20px] text-white">
                Personalized
              </div>
              <div className="inline-block font-[700] text-[20px] text-orangered">
                Workout Plans
              </div>
            </div>
            <div className="mt-[10px] text-grey">
              Customized Routines That Match Your Fitness Level And Goals,
              Ensuring You Achieve The Best Results In The Most Efficient Way.
            </div>
          </div>
          <div className="w-auto h-auto border border-orangered rounded-[5px] p-[10px] flex flex-col items-center">
            <div className="mb-[10px]">
              <div className="inline-block font-[700] text-[20px] text-white">
                Expert
              </div>
              <div className="inline-block font-[700] text-[20px] text-orangered">
                Coaching
              </div>
            </div>
            <div className="mt-[10px] text-grey">
              Customized Routines That Match Your Fitness Level And Goals,
              Ensuring You Achieve The Best Results In The Most Efficient Way.
            </div>
          </div>
          <div className="w-auto h-auto border border-orangered rounded-[5px] p-[10px] flex flex-col items-center">
            <div className="mb-[10px]">
              <div className="inline-block font-[700] text-[20px] text-white">
                Community
              </div>
              <div className="inline-block font-[700] text-[20px] text-orangered">
                Support
              </div>
            </div>
            <div className="mt-[10px] text-grey">
              Join A Vibrant Community Of Fitness Enthusiasts Where You Can
              Share Experiences, Get Motivated, And Stay Inspired.
            </div>
          </div>
          <div className="w-auto h-auto border border-orangered rounded-[5px] p-[10px] flex flex-col items-center">
            <div className="mb-[10px]">
              <div className="inline-block font-[700] text-[20px] text-white">
                Exclusive
              </div>
              <div className="inline-block font-[700] text-[20px] text-orangered">
                Resources
              </div>
            </div>
            <div className="mt-[10px] text-grey">
              Access Premium Content, Including Video Tutorials, Nutrition
              Guides, And Member Only Discounts On Fitness Gear.
            </div>
          </div>
        </div>
      </div>

      <div id="faq" className="w-full my-[50px] flex flex-col items-center">
        <div className="mb-[10px] font-extrabold text-3xl text-white">FAQ</div>
        <div className="w-full mt-[10px] border border-orangered rounded">
          <div className="w-full mb-[20px] border border-orangered rounded p-[10px] font-medium text-white">
            What Is Fitmaker And How Can It Help Me Reach My Fitness Goal?
          </div>
          <div className="w-full mb-[20px] border border-orangered rounded p-[10px] font-medium text-white">
            How Do I Get Started With A Workout Plan On Maker?
          </div>
          <div className="w-full mb-[20px] border border-orangered rounded p-[10px] font-medium text-white">
            What Is Included In The Custom Plan?
          </div>
          <div className="w-full mb-[20px] border border-orangered rounded p-[10px] font-medium text-white">
            Can I Change My Plan After Signing Up?
          </div>
          <div className="w-full  mb-[20px] border border-orangered rounded p-[10px] font-medium text-white">
            What Kind Of Support Can I Expect From My Trainer?
          </div>
        </div>
      </div>

      <div id="aboutus" className="w-full flex flex-row">
        <div className="w-[50%]">
          <div className="mb-[10px]">
            <div className="font-extrabold text-[30px] text-orangered">
              Fitmaker
            </div>
            <div className="text-white">Transform Your Body</div>
          </div>
          <div className="mt-[10px] mb-[20px] text-grey">
            Transform Your Body With Fitmaker. Your Trusted Partner In Fitness
            With Over 5 Years Of Experience. We Offer Expert Coaching , Tailored
            Workout Plans, And Comprehensive Nutritional Guidance. Join Out
            Community And Start Your Journey Towards A Healthier , Stronger You
            Ready To Make Change?
          </div>
          <div className="w-full">
            <img className="w-full h-full" src="/images/socialmedia.png" />
          </div>
        </div>
        <div className="w-[50%] flex flex-row justify-center">
          <div className="w-[24%] mx-[10px] flex flex-col items-center">
            <div className="mb-[30px] font-bold text-[20px] text-orangered">
              Company
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#aboutus"
              >
                About Us
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#ourservices"
              >
                Our Services
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Caceers
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#fitmakerblogpots"
              >
                Blog
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Testimonial
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#contactus"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="w-[24%] mx-[10px] flex flex-col items-center">
            <div className="mb-[30px] font-bold text-[20px] text-orangered">
              Resources
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#ourfitnesstools"
              >
                Fitness Tools
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Workout Videos
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Nutrition Guides
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#faq"
              >
                FAQ
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Success Stories
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Membership
              </a>
            </div>
          </div>
          <div className="w-[24%] mx-[10px] flex flex-col items-center">
            <div className="mb-[30px] font-bold text-[20px] text-orangered">
              Programs
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#weightloss"
              >
                Weight Loss
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Building Muscles
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Home Workout
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Gym Plan
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#ourplans"
              >
                Our Plans
              </a>
            </div>
            <div className="mb-[10px]">
              <a
                className="inline-block list-none text-grey hover:opacity-50"
                href="#"
              >
                Fitness Group
              </a>
            </div>
          </div>
          <div
            id="#contactus"
            className="w-[24%] mx-[10px] flex flex-col items-center"
          >
            <div className="mb-[30px] font-bold text-[20px] text-orangered">
              Contact Us
            </div>
            <div className="mb-[10px]">
              <p className="inline-block list-none text-grey">
                Location: San Francisco
              </p>
            </div>
            <div className="mb-[10px]">
              <p className="inline-block list-none text-grey">
                Telephone: 0392661807
              </p>
            </div>
            <div className="mb-[10px]">
              <p className="inline-block list-none text-grey">
                Email: Fitmaker@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
