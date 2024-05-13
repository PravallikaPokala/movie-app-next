import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MovieTile from "./MovieTile";

afterEach(cleanup);

jest.mock("../Dialog/Dialog", () => ({ children }) => (
  <div data-testid="mock-dialog">{children}</div>
));

const movie = {
  id: 337167,
  title: "Fifty Shades Freed",
  tagline: "Don't miss the climax",
  vote_average: 6.1,
  vote_count: 1195,
  release_date: "2018-02-07",
  poster_path:
    "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
  overview:
    "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
  budget: 55000000,
  revenue: 136906000,
  genres: ["Drama", "Romance"],
  runtime: 106,
};

describe("MovieTile Tests", () => {
  test("renders movie information", () => {
    render(<MovieTile movie={movie} />);
    const name = screen.getByAltText(movie.title);
    expect(name).toBeInTheDocument();
    expect(screen.getByText(movie.genres.join(", "))).toBeInTheDocument();
  });

  test("calls handleClick when clicked", async () => {
    const handleClick = jest.fn();
    render(<MovieTile movie={movie} onClick={handleClick} />);
    const name = screen.getByAltText(movie.title);

    await act(async () => await userEvent.click(name));

    expect(handleClick).toHaveBeenCalledWith(movie);
  });

  test("calls editClick when clicked", async () => {
    const editClick = jest.fn();
    render(<MovieTile movie={movie} onEdit={editClick} />);
    const dots = screen.getByText("⋮");
    await act(async () => await userEvent.click(dots));
    const button = screen.getByText("Edit");

    await act(async () => await userEvent.click(button));

    const mockDialog = screen.getByTestId("mock-dialog");
    expect(mockDialog).toBeInTheDocument();
    expect(mockDialog).toContainHTML("<MovieForm");
  });

  test("calls deleteClick when clicked", async () => {
    const deleteClick = jest.fn();
    render(<MovieTile movie={movie} onDelete={deleteClick} />);
    const dots = screen.getByText("⋮");
    await act(async () => await userEvent.click(dots));
    const button = screen.getByText("Delete");

    await act(async () => await userEvent.click(button));

    const mockDialog = screen.getByTestId("mock-dialog");
    expect(mockDialog).toBeInTheDocument();
  });
});
