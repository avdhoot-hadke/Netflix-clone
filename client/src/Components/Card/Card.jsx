import React, { useEffect, useState } from "react";
import "./Card.css";
import video from "../../assets/video.mp4";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../util/firebase-config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUserLikedMovies } from "../../store/features";

const Card = React.memo(({ movieData, isLiked = false }) => {
  const [hover, setHover] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe(); // Cleanup function to unsubscribe when the component is unmounted
  }, [navigate]);

  const addToList = async () => {
    try {
      console.log(email, movieData);
      await axios
        .post("https://netflix-clone-api-chi.vercel.app/api/user/add", {
          email,
          data: movieData,
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="card-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img alt="" src={`https://image.tmdb.org/t/p/w500/${movieData.image}`} />
      {hover && (
        <div className="hover-div animate__animated animate__zoomIn ">
          <div className="img-vid-cont">
            <img
              alt=""
              src={`https://image.tmdb.org/t/p/w500/${movieData.image}`}
              onClick={() => navigate("/player")}
            />
            {movieData.video === null ? (
              <video
                src={video}
                autoPlay
                loop
                muted
                onClick={() => navigate("/player")}
              />
            ) : (
              <iframe
                src={`${movieData.video}?autoplay=1&showinfo=0&rel=0&mute=1&controls=0&loop=1`}
                title={movieData.name}
              ></iframe>
            )}
          </div>
          <div className="info-div">
            <h3
              className="info-div-name text-light"
              onClick={() => navigate("/player")}
            >
              {movieData.name}
            </h3>
            <div className="info-icon">
              <div className="control-icon">
                <i
                  className="fa-solid fa-circle-play"
                  style={{ color: "#ffffff" }}
                  onClick={() => navigate(`/player?link=${movieData.video}`)}
                ></i>

                <i
                  className="fa-regular fa-thumbs-up"
                  style={{ color: "#ffffff" }}
                  title="Like"
                  // onClick={addToList}
                ></i>

                <i
                  className="fa-regular fa-thumbs-down"
                  style={{ color: "#ffffff" }}
                  title="Dislike"
                ></i>
                {isLiked ? (
                  <i
                    className="fa-regular fa-circle-check"
                    style={{ color: "#ffffff" }}
                    title="Remove from my List"
                    onClick={() => {
                      console.log("cardID", movieData.id);
                      const movieID = movieData.id;
                      dispatch(removeUserLikedMovies({ email, movieID }));
                    }}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "#ffffff" }}
                    title="Add to my List"
                    onClick={addToList}
                  ></i>
                )}
              </div>
              <div className="icon-info">
                <i
                  className="fa-solid fa-angle-down"
                  title="MoreInfo"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
            </div>
            <div className="genres-div">
              <ul className="genre-ul">
                {movieData.genres.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Card;
