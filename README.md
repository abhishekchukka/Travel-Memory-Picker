

# World Map Memory Marker

This application allows users to interact with a world map, select locations, and add descriptions to mark memories of those places. The application uses Leaflet for map functionality and requires a local JSON server to store data for new markers.

## Features
- Select a location on the map using latitude and longitude.
- Add a description for selected places to mark memories.
- Store new markers (location + description) using a local JSON server.

## Technologies Used
- **React**
- **Leaflet**: For interactive map functionality.
- **JSON Server**: To simulate an API for saving and retrieving markers.

## Prerequisites
- Node.js installed on your local machine.
- JSON Server for handling local data.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```bash
   cd <project-directory>
   ```

3. **Install the necessary dependencies**:
   ```bash
   npm install
   ```

4. **Start the JSON Server**:
   You must have the JSON server running locally to use the full functionality of the application:
   ```bash
   json-server --watch db.json --port 5000
   ```
   This will start the JSON server and watch the `db.json` file for changes.

5. **Run the React Application**:
   Start the application locally:
   ```bash
   npm start
   ```
   The UI will open in your default browser at `http://localhost:3000`.

6. **Access the Full Functionality**:
   The full functionality of the app, including selecting locations and marking memories, will only work if the JSON server is running locally.

## Important Notes
- The application is **not hosted** at this time due to build issues.
- For full functionality, the JSON server must be running in parallel with the React app on your local system.
- The UI will display a basic structure without the functionality if the JSON server is not active.

---
