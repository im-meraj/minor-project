import "./header.css";

export default function Header() {
    return (
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">SUIIT</span>
          <span className="headerTitleLg">Blog</span>
        </div>
        <div className="heroContainer">
          <img
            src="https://images.unsplash.com/photo-1639080572734-1380055a656f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            alt=""
            className="headerImg"
          />
          <h2 className="headerText">
            Publish your passions your way. Whether you'd like to share your
            knowledge, experiences or the latest news, create a unique and
            beautiful blog post.
          </h2>
        </div>
      </div>
    );
}
