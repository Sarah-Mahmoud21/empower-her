import  "../Home/Home.css";
import PhotoSlider from "../../helper/Photoslider/PhotoSlider";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header/Header";
import Footer from "../Footer/Footer"
import {
  faBullseye,
  faDiamond,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <>
      <Header />
      <Content/>
      <Footer/> 
    </>
  );
}

function Content() {
  const images = [
    "https://asala-pal.org/cached_uploads/crop2/568/568/2021/04/05/img-7392-30-1617619511.jpeg",
    "https://asala-pal.org/cached_uploads/crop2/568/568/2020/10/18/page-4-jpg-1603022013.jpg",
    "https://asala-pal.org/cached_uploads/crop2/568/568/2020/10/18/119851769-3408722925854895-5818328039559933645-o-1603021973.jpg",
  ];
  return (
    <div className="content">
      <div className="photos">
        <h1>
          Our hand is yours ...
          <br />
          And your hand is life
        </h1>
        <PhotoSlider images={images} />
      </div>
      <div id="about">
      <h3>About Empower Her</h3>
      <p>
        <strong>
          <FontAwesomeIcon icon={faEye} /> Our Vision:{" "}
        </strong>{" "}
        Empowering women around the world by providing resources, support, and
        opportunities for growth and development.
      </p>
      <p>
        <strong>
          <FontAwesomeIcon icon={faBullseye} /> Our Mission:{" "}
        </strong>{" "}
        To create a community where women can thrive, learn, and inspire each
        other to reach their fullest potential.
      </p>
      <p>
        <strong>
          <FontAwesomeIcon icon={faDiamond} /> Our Values:{" "}
        </strong>{" "}
        Empowerment, Inclusivity, Collaboration, Integrity, Growth
      </p>
      </div>
    </div>
  );
}
export default Home;
