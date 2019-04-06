import React from "react";
import { GENRES } from "../../config";

const GenreList = props => {
  const genres = props.genres.map(genreId => {
    const genre = GENRES[genreId];
    return (
      <label
        key={genreId}
        className="ui medium label"
        style={{ color: "white", backgroundColor: genre.color }}
      >
        {genre.label}
      </label>
    );
  });
  return <div style={props.style}>{genres}</div>;
};

export default GenreList;
