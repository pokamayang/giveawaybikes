import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import StaticPage from "./pages/StaticPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<StaticPage page="about" />} />
            <Route path="/rules" element={<StaticPage page="rules" />} />
            <Route path="/terms" element={<StaticPage page="terms" />} />
            <Route path="/privacy" element={<StaticPage page="privacy" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
