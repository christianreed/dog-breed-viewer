import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Breed.module.scss";

/**
 * Displays images of a particular breed.
 */
export default class Breed extends Component {
  constructor(props) {
    super(props);

    this.breed = this.props.match.params.breed;
    this.subBreed = this.props.match.params.subBreed;
    this.displayName =
      this.subBreed !== undefined
        ? `${this.subBreed} ${this.breed}`
        : this.breed;
    this.pathSegment =
      this.subBreed !== undefined
        ? `${this.breed}/${this.subBreed}`
        : this.breed;

    this.state = {
      contain: false,
      imageURL: null,
      isLoading: true
    };
  }

  /**
   * When the component mounts we kick off fetching an image
   */
  componentDidMount() {
    this.fetchNextImage();
  }

  /**
   * Toggles the contain state, which modifies the image display
   */
  containToggle() {
    this.setState({ contain: !this.state.contain });
  }

  /**
   * Orchestrates getting a new random image and putting it in the DOM
   * Alerts on error
   */
  async fetchNextImage() {
    const downloadingImage = new Image();

    this.setState({ isLoading: true });

    try {
      const imageURL = await this.getRandomImage();

      downloadingImage.onload = () => this.updateImageState(imageURL);
      downloadingImage.src = imageURL;
    } catch (e) {
      alert(e.message);
    }
  }

  /**
   * Gets a new random image
   * Tries three times to fetch as well as whether the image is the current
   * image.
   * @returns {string} URL to image
   * @throws Will throw an error if fetch or json method fails
   */
  async getRandomImage() {
    const attempts = 3;
    let lastError = null;

    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fetch(
          `https://dog.ceo/api/breed/${this.pathSegment}/images/random`
        );
        const resJson = await res.json();
        const imageURL = resJson.message;

        if (imageURL === this.state.imageURL && i < attempts - 1) {
          continue;
        }

        return imageURL;
      } catch (e) {
        lastError = e;
      }
    }

    throw lastError;
  }

  /**
   * Updates the state with new image URL and resets isLoading and contain
   * @param {string} imageURL
   */
  updateImageState(imageURL) {
    this.setState({ imageURL, isLoading: false, contain: false });
  }

  /**
   * Renders the image box
   */
  renderImage() {
    return (
      <div
        className={`${styles.picture} ${
          this.state.contain ? styles.contain : ""
        }`}
        style={{ backgroundImage: `url(${this.state.imageURL})` }}
        onClick={this.containToggle.bind(this)}
        role="img"
        aria-label={this.displayName}
      >
        <div className={styles.breedName}>{this.displayName}</div>
      </div>
    );
  }

  /**
   * Renders the loading box
   */
  renderLoading() {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingText}>Much loading</div>
      </div>
    );
  }

  /**
   * Render method
   * - Displays an image if we have one, otherwise shows the loading message
   * - Provides a link to return to the home page
   * - Gives a button to load a new image - this is disabled if we are currently
   *   fetching.
   */
  render() {
    return (
      <div className={styles.breed}>
        {this.state.imageURL ? this.renderImage() : this.renderLoading()}

        <Link to="/" className={styles.home}>
          <span className={styles.homeCentering}>Back to breeds</span>
        </Link>

        <button
          className={styles.next}
          onClick={this.fetchNextImage.bind(this)}
          disabled={this.state.isLoading}
        >
          {this.state.isLoading ? "Fetching" : "New image"}
        </button>
      </div>
    );
  }
}
