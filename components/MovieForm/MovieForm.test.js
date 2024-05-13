import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieForm from "./MovieForm";

describe("MovieForm Tests", () => {
  test("renders Movie form with initial values", () => {
    const initialMovieInfo = {
      title: "Test Movie",
      release_date: "2024-07-03",
      poster_path: "test.jpg",
      vote_average: "7.5",
      runtime: "90",
      overview: "Test",
      genres: ["Comedy", "Horror"],
    };

    const onSubmit = jest.fn();

    render(
      <MovieForm initialMovieInfo={initialMovieInfo} onSubmit={onSubmit} />
    );

    expect(screen.getByLabelText("TITLE")).toHaveValue("Test Movie");
    expect(screen.getByLabelText("RELEASE DATE")).toHaveValue("2024-07-03");
    expect(screen.getByLabelText("MOVIE URL")).toHaveValue("test.jpg");
    expect(screen.getByLabelText("RATING")).toHaveValue("7.5");
    expect(screen.getByLabelText("RUNTIME")).toHaveValue("90");
    expect(screen.getByLabelText("GENRE")).toHaveValue("Documentary");
    expect(screen.getByLabelText("OVERVIEW")).toHaveValue("Test");
  });

  test("calls onSubmit function with form data when submitted", async () => {
    const onSubmit = jest.fn();
    render(<MovieForm onSubmit={onSubmit} />);

    await act(
      async () =>
        await userEvent.type(screen.getByLabelText("TITLE"), "New Movie")
    );
    await act(
      async () =>
        await userEvent.type(screen.getByLabelText("MOVIE URL"), "test.jpg")
    );
    await act(async () => await userEvent.click(screen.getByText("SUBMIT")));
    expect(onSubmit).toHaveBeenCalledWith({
      genres: "",
      overview: "",
      poster_path: "test.jpg",
      release_date: "",
      runtime: "",
      title: "New Movie",
      vote_average: "",
    });
  });

  it("resets form when reset is clicked", () => {
    render(<MovieForm />);

    userEvent.type(screen.getByLabelText("MOVIE URL"), "test.jpg");
    userEvent.click(screen.getByText("RESET"));

    expect(screen.getByLabelText("MOVIE URL")).toHaveValue("");
  });
});
