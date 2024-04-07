import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getToken } from "../tokenUtils"; // Import getToken utility function
import {
  faBars,
  faClose,
  faPerson,
  faSearch,
  faShoppingBasket,
  faUser,
  faUserCircle,
  faUserMinus,
  faImagePortrait
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const token = getToken(); 
  const isLoggedIn = !!token; 

  // Handle logout function
  const handleLogout = () => {
    // Perform logout actions (clear token, etc.)
    localStorage.removeItem("token");
  };

  const openSideBar = () => {
    const sideBar = document.getElementById("side-bar");
    const body = document.querySelector("body");
    sideBar.style.display = "block";
    body.style.overflow = "hidden"; // Disable scrolling
  };

  return (
    <>
      <Bar showBar={openSideBar} />
      <header className="header">
        <nav>
          <button className="nav-bar" onClick={openSideBar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h2>Empower Her</h2>
          <ul className="reference">
            <li>
              <Link to="/">Home</Link>
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

          <ul className="icons">
            <li>
              {isLoggedIn ? (
                <>
                <Link to="/profile" >
                <FontAwesomeIcon icon={faImagePortrait} />
              </Link>
                <button onClick={handleLogout} title="logout">
                  <FontAwesomeIcon icon={faUserMinus} />
                </button>
                
              </>
                
              ) : (
                <Link to="/login">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              )}
            </li>
            <li>
              <button className="search">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </li>
            <li>
              <button className="shopping">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

function Bar() {
  const closeSideBar = () => {
    const body = document.querySelector("body");
    const sideBar = document.getElementById("side-bar");
    sideBar.style.display = "none";
    body.style.overflow = "scroll";
  };

  return (
    <>
      <ul className="side-bar" id="side-bar">
        <li>
          <button className="close" onClick={closeSideBar}>
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </button>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/support">Support Us</Link>
        </li>
        <li>
          <Link to="/membership">Membership</Link>
        </li>
        <li>
          <Link to="/opportunities">Opportunities </Link>
        </li>
      </ul>
    </>
  );
}

export default Header;
