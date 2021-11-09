import React from "react";
import {render, screen, waitFor} from '@testing-library/react'
import Display from "../Display";
import fetchShow from "../../api/fetchShow";
import userEvent from "@testing-library/user-event";


jest.mock("../../api/fetchShow");

const testShow = {
    //add in approprate test data structure here.
    name: "The cool show",
    summary: "This show is pretty cool",
    seasons: [
        {
            id:1,
            name: 'season 1',
            episodes:[]
        },
        {
            id:2,
            name: 'season 2',
            episodes:[]
        },
        {
            id:3,
            name: 'season 3',
            episodes:[]
        }
    ]
}

test("renders as is", () => {
    render(<Display />)
})

test("Show will display after clicking fetch button", async () => {
    fetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const proof = await screen.findByTestId("show-container");
    expect(proof).toBeInTheDocument();
})


test('renders correct number of season options',  async() => {
    fetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    
    const seasons = await screen.findAllByTestId('season-option');
    expect(seasons).toHaveLength(3);
    
});

test('displayFunc is called when the fetch button gets pressed', async () => {
    fetchShow.mockResolvedValueOnce(testShow);
    const displayFunc = jest.fn();

    render(<Display displayFunc={displayFunc}/>);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(()=> {
        expect(displayFunc).toHaveBeenCalled();
    })
});








///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.