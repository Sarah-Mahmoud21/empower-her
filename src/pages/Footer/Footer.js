import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import "../Footer/Footer.css";

function Footer() {
    return (
      <footer className="footer">
        <ul className="site-map">
          <li className="head-title"> SITE MAP</li>
          <li>
          <a href="#about">About</a>
          </li>
          <li>
            <Link to="/Support">Support Us</Link>
          </li>
          <li>
            <Link to="/Membership">Membership</Link>
          </li>
          <li>
            <Link to="/Opportunities">Opportunities </Link>
          </li>
        </ul>
        <ul className="follow-us">
          <li className="head-title"> FOLLOW US </li>
          <li>
            <button className="insta">
              <FontAwesomeIcon icon={faFacebook} />
            </button>
          </li>
          <li>
            <button className="insta">
              <FontAwesomeIcon icon={faTwitter} />
            </button>
          </li>
          <li>
            <button className="insta">
              <FontAwesomeIcon icon={faInstagram} />
            </button>
          </li>
        </ul>
        <ul className="contact-us">
          <li className="head-title">CONTACT US</li>
          <li>West Bank,Nablus</li>
          <li> 0569637585</li>
          <li>empower@gmail.com</li>
        </ul>
      </footer>
    );
  }
  export default Footer;