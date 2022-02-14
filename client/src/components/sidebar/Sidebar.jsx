import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    getCategories();
  }, []);

    return (
      <div className="sidebar">
        <div className="sidebarItem">
          <span className="sidebarTitle">ABOUT SUIIT</span>
          <img
            src="https://res.cloudinary.com/immeraj/image/upload/v1642358582/suiit_1_h5uzvm.jpg"
            alt="pic"
            width="60%"
            height="60%"
          />
          <p>
            Sambalpur University Institute of Information Technology (SUIIT) is
            functioning successfully since the year 2010 as an autonomous
            constituent institute of Sambalpur University in the line of IIITs
            to impart training and to have quality research program relating to
            Information Technology and allied subjects.
          </p>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">CATEGORIES</span>
          <ul className="sidebarList">
            {categories.map((category) => (
              <Link to={`/?category=${category.name}`} className="link">
                <li className="sidebarListItem">{category.name}</li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
            <i className="sidebarIcon fab fa-facebook-square"></i>
            <i className="sidebarIcon fab fa-twitter-square"></i>
            <i className="sidebarIcon fab fa-pinterest-square"></i>
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </div>
        </div>
      </div>
    );
}
