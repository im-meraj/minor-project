import './chatOnline.css';

export default function ChatOnline() {
  return (
    <>
      <div className="chatOnline">
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg"
              src="https://res.cloudinary.com/immeraj/image/upload/v1642276833/dp1_c9iwsd.jpg"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">Temp Name</span>
        </div>
      </div>
    </>
  );
}
