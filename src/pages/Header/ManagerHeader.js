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
import { useNavigate } from 'react-router-dom';


function ManagerHeader() {
  const token = getToken(); 
  const navigate = useNavigate();

  const isLoggedIn = !!token; 
  

  // Handle logout function
  const handleLogout = () => {
    // Perform logout actions (clear token, etc.)
    localStorage.removeItem("token");
    navigate('/login');
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
      <header className="header" >
        <nav>
          <button className="nav-bar" onClick={openSideBar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h2>Empower Her</h2>
          <ul className="reference">
          <li>
          <Link to="/manager">Home</Link>
        </li>
    
        <li>
          <Link to="/managermembership">View Memberships</Link>
        </li>
        <li>
          <Link to="/internship">View internships </Link>
        </li>
          </ul>

          <ul className="icons">
            <li>
              {isLoggedIn ? (
                <>
                <Link to="/profile/true" >
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
          <Link to="/manager">Home</Link>
        </li>
    
        <li>
          <Link to="/managermembership">View Memberships</Link>
        </li>
        <li>
          <Link to="/internship">View internships </Link>
        </li>
      </ul>
    </>
  );
}

export default ManagerHeader;
