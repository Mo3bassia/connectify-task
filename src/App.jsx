import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import i18n from "./i18n.js";

import User from "./pages/User.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import Post from "./pages/Post.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import Navbar from "./components/custom/Navbar.jsx";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const main = useRef(null);
  // const [currentUser, setCurrentUser] = useLocalStorage("currentUser", {});
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

  const { data: users } = useQuery({
    queryKey: ["test"],
    queryFn: () =>
      fetch("https://dummyjson.com/users?limit=0").then((res) => res.json()),
  });

  console.log(users);

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
    <div
      className={`${
        i18n.language == "en" ? "font-[Manrope]" : "font-[IBM Plex Sans Arabic]"
      }`}
      ref={main}
    >
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route index element={<div>Home</div>} />
          <Route path="user" element={<User />}>
            <Route path=":id" element={<UserDetails />} />
          </Route>
          <Route path="post" element={<Post />}>
            <Route path=":id" element={<PostDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
