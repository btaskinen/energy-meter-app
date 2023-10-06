# Flow Meter App

This app was created for the [Gambit challenge](https://github.com/gambit-labs/challenge). Option 2 was selected from the challenge.

## App Description

With the Flow Meter App, the user can monitor the flow rate of a fluid in a pipe system. For the design of the app, it was assumed that the flow meter would collect data to monitor the flow of a cooling liquid during a manufactoring process.

The [frontend](https://github.com/btaskinen/flow-meter-app/tree/main/frontend) is a TypeScript React app that was build with Vite. Routing between different views is handlred by React Router.

![screenshot of login page](/screenshots/Screenshot%202023-10-06%20at%2014.08.12.png)

Ideally, the app would have access to a REST API as outlined in option 1. As this REST API was not available, the app works by connecting to a [Node.js Express server](https://github.com/btaskinen/flow-meter-app/tree/main/backend) that contains dummy data for the flow meter (The server was written in JavaScript, as figuring out the correct configuration for TypeScript took too long time). JEST was used to create tests to test the server.

We assume that the server has access to the converted data from the flow meter. Could access it from a database. The data contains the follwing readings from the flow meter:

- flow rate
- energy flow rate
- velocity
- fluid sound speed
- inlet temperature
- outlet temperature
- date

The user needs to authenticate to access the data. Authorization is handelt with JSON Web Token.

### "Latest Reading" View

The default view after logging in is the latest data point from the flow meter. From the dummy data, it is accessed, assuming that the newest mesurement point would always be the last item in the data array.

![screenshot of "Latest Reading! view](/screenshots/Screenshot%202023-10-06%20at%2014.19.54.png)

### "Flow History" View

From the "Flow History" view, the user can observe the time dipendend fluctuation of the different measured values by selecting the respective category. The charts are drawn using Material UI Line Chart component.

![screenshot of "Flow History" view](/screenshots/Screenshot%202023-10-06%20at%2014.20.20.png)

### "Settings" View

Not yet implemented.

## Features to be implemented

### "Latest Reading" View

- **Automatice data fetching at given interval**: Depending on how often the flow meter collectes a new data set, the app could automatically fetch the latest data at given time intervals. Alternatively a websocket connection could be established.

### "Flow History" View

- **Stying of the line chart**: Styling of the MUI Line Chart component tured out to not be quite straight forward and will need some work to display the axis labels properly.

- **Addition of date picker**: The idea is that the user would be able to select a specific time interval for the data they want to see. Releated to this is the question whether the filtering of the selcted data would be handled on the frontend (meaning always getting all the data from the server) or on server side. Since we expect big amount of data to be collected by the flow meter, the data filtering would then need to be shifted to the backend.

### "Settings" View

The idea for the settings view is, that the user could specify value ranges for the different properties. In the case the values would be outside of the specified range, the user would be notified, by push notification, email or text message, and be able to make adjustments to the system to avoid failure.

### General

- **Frontend testing**: No tests have yet been created to test the frontend. The plan is to use end-to-end testing with Cypress.

- **Connection to database**: Saving the user data on the server is not optimal and was chosen here due to time constrains. Optimally, the users would be saved to a database. This would the also allow for easy storage and retrival of the user specified value ranges in Settings. Maybe for this data, a NoSQL database like MongoDB would be suitable.

- **Optimization for mobile view**: While the layout is fairly responsive, some optimization, especially in the display of the menu options, could be included to make the user experience better on a mobile device.

- **Deployment**

## App Demo

![demo video of app](/screenshots/flow-meter-app-gif.gif)
