import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import i18n from "./i18n.js";

import Home from "./pages/Home.jsx";
import User from "./pages/User.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import Post from "./pages/Post.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import Navbar from "./components/custom/Navbar.jsx";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const main = useRef(null);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (main.current) {
      i18n.on("languageChanged", (lng) => {
        if (lng == "en") {
          main.current.className = "font-[Manrope]";
        } else {
          main.current.className = "font-[IBM Plex Sans Arabic]";
        }
      });
    }
  }, [main]);

  return (
    <BrowserRouter>
      <div
        className={`${
          i18n.language == "en"
            ? "font-[Manrope]"
            : "font-[IBM Plex Sans Arabic]"
        } min-h-screen bg-background`}
        ref={main}
      >
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Toaster />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route index element={<Home />} />
            <Route path="user" element={<User />}>
              <Route path=":id" element={<UserDetails />} />
            </Route>
            <Route path="post" element={<Post />}>
              <Route path=":id" element={<PostDetails />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
