import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/signup";
import Login from "./pages/login/login";
import Netflix from "./pages/netflix/Netflix";
import Player from "./pages/player/player";
import store from "./store/store";
import { Provider } from "react-redux";
import Movies from "./pages/movie/movies";
import TV from "./pages/tv/tv";
import MyList from "./pages/myList/mylist";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Netflix />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv" element={<TV />} />
            <Route path="/mylist" element={<MyList />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/player" element={<Player />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
