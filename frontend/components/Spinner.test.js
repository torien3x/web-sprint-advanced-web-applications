// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
import React from "react"
import { render } from "@testing-library/react" // Import render method
import Spinner from "./Spinner"

test('Spinner is hidden when on prop is false', () => {
  const { queryByTestId } = render(<Spinner on={false} />); // Render the Spinner component
  const spinnerElement = queryByTestId('spinner'); // Get the spinner element

  expect(spinnerElement).toBeNull(); // Assert that spinner element is not found in the DOM
})
