import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/custom/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const filterOptions = {
  eyeColor: [
    { value: "amber", label: "Amber" },
    { value: "blue", label: "Blue" },
    { value: "brown", label: "Brown" },
    { value: "gray", label: "Gray" },
    { value: "green", label: "Green" },
    { value: "hazel", label: "Hazel" },
  ],

  hairColor: [
    { value: "auburn", label: "Auburn" },
    { value: "black", label: "Black" },
    { value: "blonde", label: "Blonde" },
    { value: "brown", label: "Brown" },
    { value: "chestnut", label: "Chestnut" },
    { value: "gray", label: "Gray" },
    { value: "red", label: "Red" },
    { value: "silver", label: "Silver" },
    { value: "white", label: "White" },
  ],

  hairType: [
    { value: "curly", label: "Curly" },
    { value: "straight", label: "Straight" },
    { value: "strands", label: "Strands" },
    { value: "very curly", label: "Very Curly" },
    { value: "wavy", label: "Wavy" },
  ],

  country: [
    { value: "Australia", label: "Australia" },
    { value: "Canada", label: "Canada" },
    { value: "France", label: "France" },
    { value: "Germany", label: "Germany" },
    { value: "India", label: "India" },
    { value: "Japan", label: "Japan" },
    { value: "United Kingdom", label: "United Kingdom" },
    { value: "United States", label: "United States" },
  ],

  department: [
    { value: "accounting", label: "Accounting" },
    { value: "business development", label: "Business Development" },
    { value: "engineering", label: "Engineering" },
    { value: "human resources", label: "Human Resources" },
    { value: "legal", label: "Legal" },
    { value: "marketing", label: "Marketing" },
    { value: "product management", label: "Product Management" },
    { value: "research and development", label: "Research and Development" },
    { value: "sales", label: "Sales" },
    { value: "services", label: "Services" },
    { value: "support", label: "Support" },
    { value: "training", label: "Training" },
  ],

  role: [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
    { value: "guest", label: "Guest" },
    { value: "moderator", label: "Moderator" },
  ],
};

export default function Home() {
  const { t } = useTranslation();

  const {
    data: peopleList,
    isLoading: peopleLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["peopleDirectory"],
    queryFn: () =>
      fetch("https://dummyjson.com/users?limit=0")
        .then((res) => res.json())
        .then((data) => data.users),
  });

  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-semibold text-red-500">
          {t("error_loading_data")}
        </h2>
        <p className="text-muted-foreground">{fetchError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t("users_directory")}</h1>
        <Link to="/search">
          <Button variant="ghost" className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            {t("search")}
          </Button>
        </Link>
      </div>

      <div
        dir="ltr"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {peopleLoading
          ? Array(8)
              .fill(null)
              .map((_, idx) => (
                <div key={idx} className="rounded-lg border overflow-hidden">
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
          : peopleList?.map((person) => (
              <UserCard key={person.id} user={person} />
            ))}
      </div>
    </div>
  );
}
