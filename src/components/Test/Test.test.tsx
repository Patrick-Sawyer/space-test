import { fireEvent, render } from "@testing-library/react";
import Test from "./Test";

describe("Test", () => {
  it("renders cheapest 5 items with correct text on load", () => {
    const { getByRole, getAllByRole } = render(<Test />);
    const list = getByRole("list");
    const button = getByRole("button");
    const items = getAllByRole("listitem");

    expect(button).toHaveTextContent("Show all");

    expect(items).toHaveLength(5);
    expect(list).toHaveTextContent(
      "Item APrice: £125" +
        "Item BPrice: £230" +
        "Item GPrice: £235" +
        "Item DPrice: £245" +
        "Item CPrice: £295"
    );
  });

  it("shows toggles data correctly when you click the button", () => {
    const { getByRole, getAllByRole } = render(<Test />);
    const button = getByRole("button");
    const list = getByRole("list");

    fireEvent.click(button);

    const items = getAllByRole("listitem");

    expect(button).toHaveTextContent("Show cheapest");

    expect(items).toHaveLength(8);
    expect(list).toHaveTextContent(
      "Item APrice: £125" +
        "Item BPrice: £230" +
        "Item GPrice: £235" +
        "Item DPrice: £245" +
        "Item CPrice: £295" +
        "Item HPrice: £400" +
        "Item FPrice: £875" +
        "Item EPrice: £900"
    );

    fireEvent.click(button);
    const newItems = getAllByRole("listitem");

    expect(button).toHaveTextContent("Show all");

    expect(newItems).toHaveLength(5);
    expect(list).toHaveTextContent(
      "Item APrice: £125" +
        "Item BPrice: £230" +
        "Item GPrice: £235" +
        "Item DPrice: £245" +
        "Item CPrice: £295"
    );
  });

  it("filters by name correctly", () => {
    const { getByRole, getAllByRole } = render(<Test />);
    const input = getByRole("textbox");
    const list = getByRole("list");

    fireEvent.change(input, { target: { value: "Item F" } });

    const items = getAllByRole("listitem");

    expect(items).toHaveLength(1);
    expect(list).toHaveTextContent("Item FPrice: £875");

    fireEvent.change(input, { target: { value: "item" } });

    const newItems = getAllByRole("listitem");

    expect(newItems).toHaveLength(5);
  });

  it("shows no data message", async () => {
    const { getByRole, findByRole, getByText } = render(<Test />);
    const input = getByRole("textbox");

    fireEvent.change(input, { target: { value: "Invalid" } });

    const list = await findByRole("list").catch(() => null);

    expect(list).toBeNull();

    const emptyListMessage = getByText("No items found");
    expect(emptyListMessage).toBeInTheDocument();
  });
});
