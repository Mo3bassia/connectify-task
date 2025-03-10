import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@radix-ui/react-separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Navbar({ toggleTheme, theme }) {
  const [isError, setIsError] = useState(false);
  const [logined, setLogined] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { mutateRefresh } = useMutation({
    mutationKey: ["refresh"],
    mutationFn: () =>
      fetch("https://dummyjson.com/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          refreshToken: `${currentUser?.refreshToken}`,
        }),
      }).then((res) => res.json()),

    onSuccess: (data) => {
      if (data.accessToken) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        setCurrentUser(data);
        setLogined(true);
        setIsError(false);
        console.log("refreshed");
      } else {
        console.log("error");
        setIsError(true);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: mutateLogin, isSuccess } = useMutation({
    mutationKey: ["currentUser"],
    mutationFn: (dataLogin) =>
      fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataLogin),
      }).then((res) => res.json()),
    // staleTime: 1000 * 60 * 60,
    // cacheTime: 1000 * 60 * 60 * 24,
    onSuccess: (data) => {
      if (data.username) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        setCurrentUser(data);
        setLogined(true);
        setIsError(false);
      } else {
        console.log("error");
        setIsError(true);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
      setLogined(true);
    }
  }, []);

  //   function testUser() {
  //     if (currentUser) {
  //       console.log(currentUser);
  //     }
  //   }

  //   useEffect(() => {
  //     if (isSuccess) {
  //       localStorage.setItem("currentUser", JSON.stringify(currentUser));
  //     }
  //   }, [isSuccess]);

  //   const { data: refreshToken } = useQuery({
  //     queryKey: ["refresh"],
  //     queryFn: () =>
  //       fetch("https://dummyjson.com/auth/refresh", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           refreshToken: `${currentUser?.refreshToken}`,
  //           expiresInMins: 30,
  //         }),
  //       }).then((res) => res.json()),
  //     enabled: false,
  //   });

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-8 text-primary"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
          </svg>
          <h1 className="text-xl font-bold">Connectify</h1>
        </div>

        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {theme == "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
              />
            </svg>
          </Button>

          <Separator orientation="vertical" />

          {!currentUser && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className={"cursor-pointer"}>
                  Login
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                  <DialogDescription>
                    Login to your account to access all features.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="col-span-3"
                    />
                  </div>

                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="col-span-3"
                    />
                  </div>
                </div>
                {isError && (
                  <div className="text-destructive text-sm font-medium text-center">
                    Invalid username or password. Please try again.
                  </div>
                )}
                <DialogFooter>
                  <Button
                    className={"cursor-pointer"}
                    onClick={() =>
                      mutateLogin({ username: username, password: password })
                    }
                  >
                    Login
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {currentUser && (
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={currentUser.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h4 className="hidden md:flex">{currentUser.username}</h4>
              <Button
                variant="destructive"
                className="hidden md:flex cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("currentUser");
                  setLogined(false);
                  setCurrentUser(null);
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
