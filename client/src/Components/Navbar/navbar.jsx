import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import signupLogo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../../util/firebase-config";

function Navbar() {
  const [search, setSearch] = useState("");
  const [scrolling, setScrolling] = useState(false);
  const navigate = useNavigate();
  //Search
  function handleSearch(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  //Links
  const links = [
    { name: "Home", link: "/" },
    { name: "TV shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  // Navbar Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const navbarClass = `navbar-div  ${scrolling ? " scrolled" : ""}`;

  //LogOut
  async function handleLogOut(e) {
    e.preventDefault();
    try {
      await signOut(firebaseAuth);
      navigate("/login");
      console.log("Sign Out successful.");
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  return (
    <div className={navbarClass}>
      <div className="navbar-item me-auto ms-5">
        <img className="navbar-logo me-2" src={signupLogo} alt=""></img>

        {links.map(({ name, link }) => {
          return (
            <li key={name}>
              <Link className="navbar-links mx-3" to={link}>
                {name}
              </Link>
            </li>
          );
        })}
      </div>

      <div className="navbar-item ms-auto me-4">
        <div className="collapse collapse-horizontal" id="collapseWidthExample">
          <form className="d-flex" role="search">
            <input
              className="nav-search me-2"
              type="search"
              placeholder="Titles, people, genres"
              aria-label="Search"
              name="search"
              onChange={handleSearch}
              value={search}
            />
          </form>
        </div>
        <a
          href="/"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidthExample"
          aria-expanded="false"
          aria-controls="collapseWidthExample"
        >
          <i className="fa-solid fa-magnifying-glass text-light ms-3 fa-lg"></i>
        </a>
      </div>
      <div className="navbar-item  me-5">
        <a href="/" onClick={handleLogOut}>
          <i className="fa-solid fa-arrow-right-from-bracket fa-lg"></i>{" "}
        </a>
      </div>
    </div>
  );
}

export default Navbar;
