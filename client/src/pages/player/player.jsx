import "./player.css";
import video from "../../assets/video.mp4";
import { useLocation, useNavigate } from "react-router-dom";

function Player() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const videoLink = params.get("link");

  return (
    <div className="player">
      <div className="back">
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left fa-xl text-light"></i>
        </button>
      </div>

      <div class="video-div">
        {videoLink === null ? (
          <video
            className="videoEle"
            src={video}
            autoPlay
            loop
            controls
            muted
          ></video>
        ) : (
          <iframe
            className="videoEle"
            src={`${videoLink}?autoplay=1&mute=0&loop=1&rel=0`}
            allowfullscreen
            title={videoLink}
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default Player;
