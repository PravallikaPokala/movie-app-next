import { render, screen, act, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

afterEach(cleanup);

describe("SearchApp Tests", () => {
  test("renders input with initial value passed in props", () => {
    render(<Search searchQuery="Movie Search" />);
    const input = screen.getByRole("textbox");
    expect(input.value).toBe("Movie Search");
  });

  test("onSearch prop is called with proper value after clicking search button", async () => {
    const handleSearchMock = jest.fn();
    render(<Search onSearch={handleSearchMock} />);
    const input = screen.getByRole("textbox");
    const searchButton = screen.getByText("Search");

    await act(async () => await userEvent.type(input, "Test"));
    expect(input).toHaveValue("Test");
    await act(async () => await userEvent.click(searchButton));

    expect(handleSearchMock).toHaveBeenCalledWith("Test");
  });

  test("onSearch prop is called with proper value after pressing Enter key", async () => {
    const handleSearchMock = jest.fn();
    render(<Search onSearch={handleSearchMock} />);

    const input = screen.getByPlaceholderText("What do you want to watch?");

    await act(async () => await userEvent.type(input, "Enter Key Test{enter}"));
    expect(input).toHaveValue("Enter Key Test");
    expect(handleSearchMock).toHaveBeenCalledWith("Enter Key Test");
  });
});
