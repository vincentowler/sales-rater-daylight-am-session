import { render, screen } from "@testing-library/react";
import Input from "./Input";
import { it } from "vitest";

it("should render an accessible label", () => {
  render(<Input id="test" label="Test label" onChange={() => {}} value="" />);
  screen.getByLabelText("Test label");
});
