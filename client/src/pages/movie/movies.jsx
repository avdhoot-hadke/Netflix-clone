import React, { useEffect } from "react";
import "./movies.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../../store/features";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../util/firebase-config";
import Navbar from "../../Components/Navbar/navbar";
import Slider from "../../Components/Slider/slider";
import NotAvailable from "../../Components/NA/notAvail";
import SelectGenre from "../../Components/SelectGenre/selectGenre";

export default function Movies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);

  useEffect(() => {
    const checkLogin = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      }
    });

    return () => checkLogin(); // Cleanup function to unsubscribe when the component is unmounted
  }, [navigate]);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "movie" }));
    }
    // console.log("new movies", movies);
  }, [genresLoaded, dispatch]);
  return (
    <div className="movie-page">
      <Navbar />
      <SelectGenre genres={genres} type="movie" />
      <div className="movie-cont">
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
}
