import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { addCssClass, removeCssClass } from "../../util/CssUtil";
import { BASE_IMAGE_URL } from "../../config";
import GenreList from "../GenreList/GenreList";
import { MOVIE_API } from "../../config";

class MovieListItem extends Component {
  constructor(props) {
    super(props);
    this.dimmerRef = React.createRef();
    this.imageRef = React.createRef();
  }

  componentDidMount = () => {
    const { poster_path } = this.props.movie;
    const src = poster_path
      ? `${BASE_IMAGE_URL}/w342${poster_path}`
      : "/assets/poster.png";
    this.imageRef.current.src = src;
  };

  style = { color: "white", fontWeight: "bold" };

  // Returns rating div with stars if average votes are greater than 0
  getRating = movie => {
    if (movie.vote_average > 0) {
      return (
        <div className="content">
          <StarRatings
            rating={movie.vote_average / 2}
            starRatedColor="yellow"
            numberOfStars={5}
            starDimension="15px"
            starSpacing="2px"
            name="rating"
          />
          <div className="right floated meta" style={this.style}>{` ${
            movie.vote_average
          } / 10`}</div>
        </div>
      );
    } else {
      return (
        <div className="content">
          <div className="right floated meta" style={this.style}>
            NA
          </div>
        </div>
      );
    }
  };

  // On roll over show dimmer component
  rollOverHandler = () => {
    removeCssClass(this.dimmerRef, "out");
    addCssClass(this.dimmerRef, "active");
    addCssClass(this.dimmerRef, "in");
  };

  // On roll out hide dimmer component
  rollOutHandler = () => {
    removeCssClass(this.dimmerRef, "in");
    addCssClass(this.dimmerRef, "out");
  };

  getOverview() {
    let overview = this.props.movie.overview;
    if (overview.length > 600) {
      overview = overview.substr(0, 600) + "...";
    }
    return overview;
  }

  getTitle() {
    let title = this.props.movie.title;
    if (title.length > 30) {
      title = title.substr(0, 30) + "...";
    }
    return title;
  }

  clickHandler = () => {
    this.props.history.push({
      pathname: MOVIE_API,
      state: { movie: this.props.movie }
    });
  };

  render() {
    const { movie } = this.props;
    return (
      <div
        onMouseOver={this.rollOverHandler}
        id="movie-list-item"
        className="ui card dimmable"
        style={{ cursor: "pointer" }}
        onClick={this.clickHandler}
      >
        {this.getRating(movie)}
        {/* <div class="ui placeholder"> */}
        <div className="ui image">
          <img
            ref={this.imageRef}
            className="movie-item-image"
            alt={movie.title}
            effect="blur"
            src="/assets/poster.png"
          />
        </div>
        {/* </div> */}
        <div className="content" style={this.style}>
          {this.getTitle()} &nbsp;({movie.release_date.split("-")[0]})
        </div>

        <div
          onMouseOut={this.rollOutHandler}
          ref={this.dimmerRef}
          className="ui dimmer transition fade"
        >
          <div className="content" style={this.style}>
            <h2 className="ui inverted header" style={{ color: "#00FF00" }}>
              {movie.title}
            </h2>
            <h4 style={{ color: "#cccccc" }}>{this.getOverview()}</h4>
            <GenreList
              style={{ marginTop: "10px", cursor: "pointer" }}
              genres={movie.genre_ids}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(MovieListItem);
