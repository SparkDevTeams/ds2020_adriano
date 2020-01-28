import React from 'react';
import { render, fireEvent, act, waitForElement } from '@testing-library/react';
import CrystalBall from "./components/crystal_ball/CrystalBall";
import App from './App';
import axios from "axios"

jest.mock("axios")

test("renders CrystalBall", () => {
  let linkedElement: any =null;

  act(() => {
    const {getByText } = render(<CrystalBall />);
    linkedElement =getByText(/What is your future/i);
  });
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = document.getElementById("app-root");
  expect(linkElement).toBeInTheDocument();
});

test("renders message from backend", async () => {
  axios.get.mockResolvedValue({ data:"message!"})
  act(() => {
    const {getByText} =render(<CrystalBall />);
    fireEvent.click(getByText(/Get my Fortune Told/i));
  });

  const msgElement: any = await waitForElement(() =>
    document.getElementById("msg")
  );
  const text: string = msgElement.innerHTML.valueOf();
})
