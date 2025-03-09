import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login.jsx";
import User from "./pages/User.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import Post from "./pages/Post.jsx";
import PostDetails from "./pages/PostDetails.jsx";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
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

  const { data } = useQuery({
    queryKey: ["test"],
    queryFn: () =>
      fetch("https://dummyjson.com/users?limit=0").then((res) => res.json()),
  });

  console.log(data);

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route index element={<div>Home</div>} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<User />}>
            <Route path=":id" element={<UserDetails />} />
          </Route>
          <Route path="post" element={<Post />}>
            <Route path=":id" element={<PostDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Button onClick={toggleTheme}>Change theme!</Button>
    </div>
  );
}

export default App;
