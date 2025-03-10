import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserCard from "@/components/custom/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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

export const sortOptions = [
  {
    name: "firstName_asc",
    label: "First Name (A-Z)",
    value: "firstName",
    order: "asc",
  },
  {
    name: "firstName_desc",
    label: "First Name (Z-A)",
    value: "firstName",
    order: "desc",
  },
  {
    name: "lastName_asc",
    label: "Last Name (A-Z)",
    value: "lastName",
    order: "asc",
  },
  {
    name: "lastName_desc",
    label: "Last Name (Z-A)",
    value: "lastName",
    order: "desc",
  },
  { name: "age_asc", label: "Age (Low to High)", value: "age", order: "asc" },
  { name: "age_desc", label: "Age (High to Low)", value: "age", order: "desc" },
  { name: "email_asc", label: "Email (A-Z)", value: "email", order: "asc" },
  { name: "email_desc", label: "Email (Z-A)", value: "email", order: "desc" },
  {
    name: "username_asc",
    label: "Username (A-Z)",
    value: "username",
    order: "asc",
  },
  {
    name: "username_desc",
    label: "Username (Z-A)",
    value: "username",
    order: "desc",
  },
  {
    name: "height_asc",
    label: "Height (Low to High)",
    value: "height",
    order: "asc",
  },
  {
    name: "height_desc",
    label: "Height (High to Low)",
    value: "height",
    order: "desc",
  },
  {
    name: "weight_asc",
    label: "Weight (Low to High)",
    value: "weight",
    order: "asc",
  },
  {
    name: "weight_desc",
    label: "Weight (High to Low)",
    value: "weight",
    order: "desc",
  },
];

export default function Home() {
  const { t } = useTranslation();
  const [sortBy, setSortBy] = useState(""); // Default: no sorting

  const {
    data: peopleList,
    isLoading: peopleLoading,
    error: fetchError,
    refetch,
  } = useQuery({
    queryKey: ["peopleDirectory", sortBy],
    queryFn: async () => {
      let url = "https://dummyjson.com/users?limit=0";

      // Add sorting parameters if selected
      if (sortBy) {
        const selectedSort = sortOptions.find(
          (option) => option.name === sortBy
        );
        if (selectedSort) {
          url = `https://dummyjson.com/users?sortBy=${selectedSort.value}&order=${selectedSort.order}&limit=0`;
        }
      }

      return fetch(url)
        .then((res) => res.json())
        .then((data) => data.users);
    },
  });

  const handleSort = (sortName) => {
    setSortBy(sortName);
  };

  // Get the current sort option label
  const getCurrentSortLabel = () => {
    const currentSort = sortOptions.find((option) => option.name === sortBy);
    return currentSort ? currentSort.label : t("sort_default");
  };

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
      <div className="flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">{t("users_directory")}</h1>

        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
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
                  className="size-4"
                >
                  <path d="m3 16 4 4 4-4" />
                  <path d="M7 20V4" />
                  <path d="m21 8-4-4-4 4" />
                  <path d="M17 4v16" />
                </svg>
                {getCurrentSortLabel()}
                <ChevronDown className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => handleSort("")}
                className={!sortBy ? "bg-accent font-medium" : ""}
              >
                {t("sort_default")}
              </DropdownMenuItem>

              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.name}
                  onClick={() => handleSort(option.name)}
                  className={
                    sortBy === option.name ? "bg-accent font-medium" : ""
                  }
                >
                  {t(option.name, option.label)}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
