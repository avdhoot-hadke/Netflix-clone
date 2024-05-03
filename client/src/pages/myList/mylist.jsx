import "./mylist.css";
import Navbar from "../../Components/Navbar/navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../util/firebase-config";
import { useEffect, useState } from "react";
import { getUserLikedMovies } from "../../store/features";
import Card from "../../Components/Card/Card";
// import CardSlider from "../../Components/CardSlider/cardSlider";
import NotAvailable from "../../Components/NA/notAvail";
// import Slider from "../../Components/Slider/slider";

export default function MyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState(undefined);

  const movies = useSelector((state) => state.netflix.likedMovies);

  console.log("renders");
  console.log("movie", movies);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
        email != undefined && dispatch(getUserLikedMovies({ email }));
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe(); // Cleanup function to unsubscribe when the component is unmounted
  }, [navigate, dispatch, email]);

  return (
    <div className="myList-page">
      <Navbar />
      <div className="myList-cardSlider">
        {movies ? (
          movies.map((movie, index) => {
            return <Card movieData={movie} isLiked={true} key={movie.id} />;
          })
        ) : (
          <NotAvailable />
        )}
      </div>
    </div>
  );
}
