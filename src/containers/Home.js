import React, { Component } from "react";
import { Link } from "react-router-dom";

import styles from "./Home.module.scss";

/**
 * Home page comment that displays a list of dog breeds.
 */
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      breeds: []
    };
  }

  /**
   * Orchestrates making the request, manipulating the data, and setting the state.
   */
  async componentDidMount() {
    try {
      const breedObj = await this.getBreedsObj();
      const breeds = this.configureBreedsArray(breedObj);

      /** Sort breeds alphabetically */
      breeds.sort((b1, b2) => (b1.displayName > b2.displayName ? 1 : -1));

      if (breeds.length === 0) {
        throw new Error("No breeds");
      }

      this.setState({ breeds, isLoading: false });
    } catch (e) {
      alert(e.message);
    }
  }

  /**
   * Make three attempts at fetching the breeds list
   * @return {obj} Object of breeds
   * @throws Throws an error if the fetch doesn't return or the json method fails
   */
  async getBreedsObj() {
    const attempts = 3;
    let lastError = null;

    for (let i = 0; i < attempts; i++) {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        const resJson = await res.json();

        return resJson.message;
      } catch (e) {
        lastError = e;
      }

      throw lastError;
    }
  }

  /**
   * Takes the object returned from the API, sorts out the sub breeds.
   * @param {obj} breedsObj
   * @return {Array} Unsorted array of breed objects.
   */
  configureBreedsArray(breedsObj) {
    const breeds = [];

    for (let breed in breedsObj) {
      const subBreeds = breedsObj[breed];

      if (subBreeds.length > 0) {
        for (let subBreed of subBreeds) {
          /** skip if the shape of the data is off */
          if (typeof subBreed !== "string") {
            continue;
          }

          const displayName = `${subBreed} ${breed}`;
          const path = `${breed}/${subBreed}`;

          breeds.push(this.createBreedObj(displayName, path));
        }
      } else {
        breeds.push(this.createBreedObj(breed, breed));
      }
    }

    return breeds;
  }

  /**
   * Takes in a display name and path, and returns a breed object for the
   * breeds array
   * @param {string} displayName How we'd like to display the name of the breed
   * @param {string} path The path to the breed
   * @return {Array} Unsorted array of breed objects.
   */
  createBreedObj(displayName, path) {
    return { displayName, path };
  }

  /**
   * Render method
   * - Displays the loading state if we're lacking breeds
   * - Loops the breeds array to create our links
   */
  render() {
    return this.state.isLoading ? (
      <div className={styles.loading}>Dogz not out yet</div>
    ) : (
      <nav>
        <ul className={styles.list}>
          {this.state.breeds.map((breed, i) => (
            <li className={styles.listItem} key={i}>
              <Link to={`/${breed.path}`} className={styles.link}>
                {breed.displayName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
