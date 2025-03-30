# DA218A - Assignment 2 - Cinema
A homepage for a cinema's online booking system built as a SPA using:

* React
* React Router
* React Bootstrap

and running on Vite.

## Running the project

To start the application, start a terminal of your choice & navigate to the root folder in which this project is located.
Then run these commands
```
npm install
npm run dev
```

## Structure

It utilizes several React components to function as an SPA, loading them in based on conditionals or which route the client is on.

`App.jsx` fetches movies & screenings from the provided API. There are two routes, the homepage route renders a component showing a list of screenings & the other renders the booking system component. It passes to either of these components the data required in their logic.

In turn these components also render subcomponents. An example is `ScreeningList` which iterates over the fetched screenings & movies from the API, rendering a `Screening` object for each movie screening showing its details, poster & allowing the user to book seats by making each `Screening` also link to the booking system, passing along the `screeningId`.

The booking system is rendered by the component `Booking` using the screening ID passed as a URL parameter based on which `Screening` the user chose. It allows the user to book available auditorium seats, choose which ticket types (Adult, Senior or Child) & confirm the order. Upon confirmation the user is presented with a receipt containing a unique booking number.

The user may choose to change the booked seats, ticket types & numbers, changing the state & re-rendering the components so booking with the new details must be confirmed again. The user is also presente with a link at the top of the page to return to the home page if they wish to.