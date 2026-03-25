import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import DeletedPage from "./pages/DeletedPage";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deleted" element={<DeletedPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
