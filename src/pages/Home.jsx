import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/custom/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://dummyjson.com/users?limit=0")
        .then((res) => res.json())
        .then((data) => data.users),
  });

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("users_directory")}</h1>
      </div>

      <div
        dir="ltr"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {isLoading
          ? Array(8)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="rounded-lg border overflow-hidden">
                  <Skeleton className="h-24" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <div className="border-t p-4">
                    <Skeleton className="h-9 w-full" />
                  </div>
                </div>
              ))
          : users?.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  );
}
