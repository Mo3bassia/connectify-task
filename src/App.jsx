import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

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

  console.log(data)

  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button onClick={toggleTheme}>Change theme!</Button>
    </div>
  );
}

export default App;
