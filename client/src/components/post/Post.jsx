import { Link } from "react-router-dom";
import "./post.css";

export default function Post({post}) {
  const PF = "https://suiit-social-app.herokuapp.com/images/";
    return (
      <div className="post">
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
        <div className="postInfo">
          <div className="postCats">
            {post.categories.map((cat) => (
              <span className="postCat">{cat.name}</span>
            ))}
          </div>
          <Link className="link" to={`/post/${post._id}`}>
            <span className="postTitle">{post.title}</span>
          </Link>
          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    );
}
