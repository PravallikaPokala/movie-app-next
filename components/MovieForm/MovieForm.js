import React from "react";
import styles from "./MovieForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MovieForm = ({ initialMovieInfo, onSubmit }) => {
  return (
    <Formik
      initialValues={initialMovieInfo}
      onSubmit={async (values, actions) => {
        const updatedValues = {
          ...values,
          tagline: `${values.title}`,
          genres: Array.isArray(values.genres)
            ? values.genres
            : [values.genres],
        };
        //actions.setValues(updatedValues);
        onSubmit(updatedValues);
        actions.setSubmitting(false);
      }}
      validate={(values) => {
        const errors = {};
        if (!values.title) {
          errors.title = "Title is required";
        }
        if (!values.release_date) {
          errors.release_date = "Release date is required";
        }
        if (!values.poster_path) {
          errors.poster_path = "Movie URL is required";
        } else if (!isValidUrl(values.poster_path)) {
          errors.poster_path = "Invalid URL";
        }
        if (!values.overview) {
          errors.overview = "Overview is required";
        }
        if (!/^\d*\.?\d+$/.test(values.vote_average)) {
          errors.vote_average = "Rating must be a number";
        }
        if (!/^\d+$/.test(values.runtime)) {
          errors.runtime = "Runtime must be an integer";
        }
        if (!values.genres) {
          errors.genres = "Genre is required";
        }
        return errors;
      }}
      onReset={(values, actions) => {
        actions.setValues(initialMovieInfo);
      }}
    >
      {() => (
        <Form className={styles["movie-form"]}>
          <div className={styles["form-row"]}>
            <div className={styles["form-left"]}>
              <label>
                TITLE
                <Field type="text" name="title" />
                <ErrorMessage
                  name="title"
                  component="div"
                  className={styles["error"]}
                />
              </label>
            </div>
            <div className={styles["form-right"]}>
              <label>
                RELEASE DATE
                <Field type="date" name="release_date" />
                <ErrorMessage
                  name="release_date"
                  component="div"
                  className={styles["error"]}
                />
              </label>
            </div>
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-left"]}>
              <label>
                MOVIE URL
                <Field type="text" name="poster_path" />
                <ErrorMessage
                  name="poster_path"
                  component="div"
                  className={styles["error"]}
                />
              </label>
            </div>
            <div className={styles["form-right"]}>
              <label>
                RATING
                <Field
                  type="number"
                  name="vote_average"
                  step="any" // Allow any floating-point number
                />
                <ErrorMessage
                  name="vote_average"
                  component="div"
                  className={styles["error"]}
                />
              </label>
            </div>
          </div>
          <div className={styles["form-row"]}>
            <div className={styles["form-left"]}>
              <label>
                GENRE
                <Field as="select" name="genres" required>
                  <option value="" disabled>
                    Select Genre
                  </option>
                  <option value="Documentary">Documentary</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Horror">Horror</option>
                  <option value="Crime">Crime</option>
                </Field>
                <ErrorMessage
                  name="genres"
                  component="div"
                  className={styles["error"]}
                />
              </label>
            </div>
            <div className={styles["form-right"]}>
              <label>
                RUNTIME
                <Field
                  type="number"
                  name="runtime"
                  onKeyPress={(e) => {
                    // Allow only digits (0-9) and backspace
                    const regex = /^[0-9\b]+$/;
                    if (!regex.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <ErrorMessage
                  name="runtime"
                  component="div"
                  className={styles["error"]}
                />
              </label>
            </div>
          </div>
          <div>
            <label className="textAreaLable">
              OVERVIEW
              <div className={styles["form-textarea"]}>
                <Field as="textarea" name="overview" />
                <ErrorMessage
                  name="overview"
                  component="div"
                  className={styles["error"]}
                />
              </div>
            </label>
          </div>
          <div className={styles["button-row"]}>
            <button type="reset" className={styles["button-reset"]}>
              RESET
            </button>
            <button type="submit" className={styles["submit"]}>
              SUBMIT
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export default MovieForm;
