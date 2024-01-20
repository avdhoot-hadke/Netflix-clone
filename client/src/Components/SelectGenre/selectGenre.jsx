import { useDispatch } from "react-redux";
import "./selectGenre.css";
import { fetchDataByGenre } from "../../store/features";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();

  return (
    <div className="selectGenre-cont">
      <select
        className="select-box"
        onChange={(e) => {
          dispatch(fetchDataByGenre({ genre: e.target.value, type: type }));
        }}
      >
        {genres.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}
