import React, { useEffect } from "react";
import gsap from "gsap";
import lib6Img from "../images/library6.jpg";
import ReactPlayer from "react-player";
import { Wave } from "react-animated-text";
import HomeImageContent from "./HomeImageContent";

function HomePageContent() {
  useEffect(() => {
    gsap.from(".lib6", {
      opacity: 0,
      marginLeft: "-200",
      duration: 1,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <div>
        <img className="lib6" src={lib6Img} alt="Home" />
      </div>
      <div className="homecontentdiv bg-dark">
        <div className="row justify-content-center text-center p-3">
          <Wave className="text-center " text="Welcome To" speed={15} />
        </div>
        <div className="row justify-content-center text-center">
          <Wave className="text-center" text="SUST CSE Library" speed={15} />
        </div>
        <div className="row justify-content-center text-center">
        </div>
        <HomeImageContent />
      </div>
    </div>
  );
}

export default HomePageContent;