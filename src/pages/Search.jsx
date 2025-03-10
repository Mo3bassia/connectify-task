import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import Loader from "../components/custom/Loader";
import UserCard from "@/components/custom/UserCard";

export default function Search() {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const {
    data: users,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch(`https://dummyjson.com/users/search?q=${query}&limit=0`).then(
        (res) => res.json()
      ),
    enabled: false,
  });
  const handleSearch = (value) => {
    refetch();
    setQuery(value);
    console.log(users);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold text-red-500">
          {t("error_loading_data")}
        </h2>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <Input
        type="text"
        placeholder={`${t("search")}..`}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        autoFocus
      />
      {isLoading || isFetching ? <Loader /> : null}
      <div
        dir="ltr"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {!isLoading &&
          !isFetching &&
          users?.users?.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}
