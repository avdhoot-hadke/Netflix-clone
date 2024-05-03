import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  try {
    const {
      data: { genres },
    } = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return genres;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
});

const getVideo = async (type, id) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );

    if (response.status === 200) {
      const { results } = response.data;

      if (results && Array.isArray(results) && results.length > 0) {
        const [data] = results;
        const link = `https://www.youtube.com/embed/${data.key}`;
        // console.log(link);
        return link;
      } else {
        console.error("No valid video data found");
        return null;
      }
    } else {
      console.error(`Error: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching video:", error.message);
    return null;
  }
};

// const createArrayFromRawData = async (array, moviesArray, genres) => {
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genre) => {
//       const name = genres.find(({ id }) => id === genre);
//       if (name) movieGenres.push(name.name);
//     });
//     const video = getVideo(movie.media_type, movie.id);
//     // console.log(video);
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         name: movie?.original_name ? movie.original_name : movie.original_title,
//         image: movie.backdrop_path,
//         type: movie.media_type,
//         genres: movieGenres.slice(0, 3),
//         video: video,
//       });
//   });
// };

// const getRawData = async (api, genres) => {
//   const moviesArray = [];
//   for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
//     const {
//       data: { results },
//     } = await axios.get(`${api}`);
//     // console.log("movie raw", results);

//     createArrayFromRawData(results, moviesArray, genres);
//   }
//   return moviesArray;
// };

const createArrayFromRawData = async (
  array,
  moviesArray,
  genres,
  typeGiven
) => {
  const videoPromises = array.map(async (movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    let type = "";
    if (movie.media_type) {
      type = movie.media_type;
    } else {
      type = typeGiven;
    }
    const video = await getVideo(type, movie.id);

    if (movie.backdrop_path && video) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        type: movie.media_type,
        genres: movieGenres.slice(0, 3),
        video: video,
      });
    }
  });

  // Wait for all video promises to resolve
  await Promise.all(videoPromises);
  console.log("movie created array", moviesArray);

  // Now moviesArray is populated with complete data
};

const getRawData = async (api, genres, type) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(api);
    console.log(results);

    await createArrayFromRawData(results, moviesArray, genres, type);
  }
  return moviesArray;
};
////////////////////???##########$$$$$$$$$$$?/////////
export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    return await getRawData(
      `https://api.themoviedb.org/3/trending/${type}/week?api_key=${process.env.REACT_APP_API_KEY}`,
      genres,
      type
    );
  }
);

export const fetchDataByGenre = createAsyncThunk(
  "netflix/moviesByGenres",
  async ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    console.log("GIVEN TYPE ***************==>", type);

    return await getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}`,
      genres,
      type
    );
  }
);
export const getUserLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async ({ email }) => {
    if (email== undefined) {
      console.log("email", email)
      throw new Error("Email is required.");
    }
    try {
      const {
        data: { movies },
      } = await axios.get(
        `https://netflix-clone-api-chi.vercel.app/api/user/liked/${email}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      console.log("email", email);
      console.log("FEAT", movies);
      return movies;
    } catch (error) {
      console.error("Error fetching liked movies:", error);
      throw error; // Rethrow the error to be caught by the rejected action
    }
  }
);
export const removeUserLikedMovies = createAsyncThunk(
  "netflix/deleteLiked",
  async ({ email, movieID }) => {
    try {
      const {
        data: { movies },
      } = await axios.put(
        `https://netflix-clone-api-chi.vercel.app/api/user/delete`,
        {
          email,
          movieID,
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      console.log("FEAT", movies);
      return movies;
    } catch (error) {
      console.error("Error fetching liked movies:", error);
      throw error; // Rethrow the error to be caught by the rejected action
    }
  }
);

export const netflixSlice = createSlice({
  name: "netflix",
  initialState: {
    movies: [],
    genresLoaded: false,
    genres: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(removeUserLikedMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      console.log("UPDATED", state.movies);
    });
  },
});

export default netflixSlice.reducer;
