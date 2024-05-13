import React, { useState } from "react";
import Dialog from "../Dialog/Dialog";
import MovieForm from "../MovieForm/MovieForm";
import { useRouter } from "next/router";

const AddSearchForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "Moana",
    tagline: "",
    vote_average: 0,
    vote_count: 0,
    release_date: "",
    poster_path: "",
    overview: "",
    budget: 0,
    revenue: 0,
    runtime: 0,
    genres: "",
  });

  const handleClose = () => {
    navToPrevPage();
  };

  const addMovieDetails = async () => {
    try {
      const response = await fetch("http://localhost:4000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      const data = await response.json();
      alert(data.title + " Movie Added Successfully");
      navToPrevPage();
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addMovieDetails();
  };

  const navToPrevPage = () => {
    router.push("/");
  };

  return (
    <div>
      <Dialog title="ADD MOVIE" onClose={handleClose}>
        <MovieForm
          onSubmit={handleSubmit}
          initialMovieInfo={formData}
          onChange={(newFormData) => setFormData(newFormData)}
        />
      </Dialog>
    </div>
  );
};

export default AddSearchForm;
