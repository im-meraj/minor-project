import axios from 'axios';
import { useContext, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Context } from '../../context/Context';
import './settings.css';

export default function Settings() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [updated, setUpdated] = useState(false);

  const { user, dispatch } = useContext(Context);

  const PF = "http://localhost:4000/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,email,password
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setUpdated(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(error);
    }
  };

    return (
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your Account</span>
            <span className="settingsDeleteTitle">Delete Account</span>
          </div>
          <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : PF + user.profilePic
                }
                alt="DP"
              />
              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle" />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label>Email</label>
            <input
              type="text"
              placeholder={user.email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="settingsSubmit" type="submit">
              Update
            </button>
          </form>
          {updated && (
            <span id="success">Profile has been updated successfully</span>
          )}
        </div>
        <Sidebar />
      </div>
    );
}
