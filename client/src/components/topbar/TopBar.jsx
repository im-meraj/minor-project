import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css';

function TopBar() {
    const { user, dispatch } = useContext(Context);

    const PF = "https://suiit-social-app.herokuapp.com/images/";

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
    }

    return (
      <div className="top">
        <div className="topLeft">
          <img id="logoImg" src="https://img.icons8.com/clouds/100/000000/chat.png" alt="logo" />
          <h1 id="logoText">SUIIT Social</h1>
        </div>
        <div className="topCenter">
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/about">
                ABOUT
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/write">
                WRITE A POST
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/messenger">
                CHAT
              </Link>
            </li>
          </ul>
        </div>
        <div className="topRight">
          {user ? (
            <>
              <Link className="link" to="/settings">
                <img
                  className="topImage"
                  src={
                    user.profilePic
                      ? PF + user.profilePic
                      : "https://res.cloudinary.com/immeraj/image/upload/v1642276822/avatar_y2fae7.jpg"
                  }
                  //src={user.profilePic}
                  alt="DP"
                />
              </Link>
              <ul className="topList">
              <Link className="link" to="/">
                <li className="topListItem logout" onClick={handleLogout}>
                  {user && "LOGOUT"}
                </li>
              </Link>
              </ul>
            </>
          ) : (
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>

              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          )}

          {/* <i className="topSearchIcon fas fa-search"></i> */}
        </div>
      </div>
    );
}

export default TopBar
