import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RoutesList from "./routes/RoutesList";

function App() {
  return (
    <Router>
      <Navbar />
      <RoutesList />
    </Router>
  );
}

export default App;
