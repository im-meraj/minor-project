import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Context } from '../../context/Context';
import './singlePost.css';

export const SinglePost = () => {
  const PF = "https://suiit-social-app.herokuapp.com/images/";

  const { user } = useContext(Context);

  const location = useLocation();
  const postId = location.pathname.split('/')[2];

  const [post, setPost] = useState([]);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/posts/${postId}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log(res);
    }
    getPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {data: {username: user.username}});
      window.location.replace('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {title, desc, username: user.username});
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  }

    return (
      <div className="singlePost">
        <div className="singlePostWrapper">
          {post.photo ? (
            <img
              src={PF + post.photo}
              alt="postCoverImg"
              className="singlePostImg"
            />
          ) : (
            <img
              src="https://images.pexels.com/photos/2825384/pexels-photo-2825384.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt=""
              className="singlePostImg"
            />
          )}
          {updateMode ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="singlePostTitleInput"
              autoFocus={true}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {post.username === user?.username && (
                <div className="singlePostEdit">
                  <i
                    class="singlePostIcon far fa-edit"
                    onClick={() => {
                      setUpdateMode(true);
                    }}
                  ></i>
                  <i
                    class="singlePostIcon far fa-trash-alt"
                    onClick={handleDelete}
                  ></i>
                </div>
              )}
            </h1>
          )}
          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <Link to={`/?user=${post.username}`} className="link">
                <b>{post.username}</b>
              </Link>
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {updateMode ? (
            <textarea
              className="singlePostDescInput"
              value={desc}
              rows="6"
              onChange={(e) => setDesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updateMode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
    );
}
