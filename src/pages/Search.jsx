import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import UserCard from "@/components/custom/UserCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Search() {
  const { t, i18n } = useTranslation();
  const [keyword, setKeyword] = useState("");
  const [gender, setGender] = useState("all");
  const [processedKeyword, setProcessedKeyword] = useState("");

  // Debounce search input
  useEffect(() => {
    const waitTimer = setTimeout(() => {
      setProcessedKeyword(keyword);
    }, 300);

    return () => clearTimeout(waitTimer);
  }, [keyword]);

  const {
    data: searchResult,
    isLoading: isSearching,
    error: searchError,
  } = useQuery({
    queryKey: ["findUsers", processedKeyword, gender],
    queryFn: () =>
      fetch("https://dummyjson.com/users/search?q=" + processedKeyword)
        .then((res) => res.json())
        .then((data) => {
          // Apply gender filter if needed
          if (gender !== "all") {
            return {
              ...data,
              users: data.users.filter((user) => user.gender === gender),
            };
          }
          return data;
        }),
    enabled: processedKeyword.length > 0,
  });

  const matchedUsers = searchResult?.users || [];

  const resetSearch = () => {
    setKeyword("");
    setGender("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{t("search")}</h1>
        <p className="text-muted-foreground">
          {t(
            "search_users_description",
            "Find users in our directory with our search tools"
          )}
        </p>
      </div>

      <div className="rounded-lg border bg-card shadow-sm p-6">
        <div className="space-y-4" dir={i18n.language == "ar" ? "rtl" : "ltr"}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <Input
                className={i18n.language == "en" ? "pl-10" : "pr-10"}
                placeholder={t(
                  "search_users_placeholder",
                  "Search by name, email, username..."
                )}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              {keyword && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={resetSearch}
                  aria-label={t("clear")}
                >
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
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              )}
            </div>

            <Select
              dir={i18n.language == "ar" ? "rtl" : "ltr"}
              value={gender}
              onValueChange={setGender}
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t("filter_by_gender")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("all_genders")}</SelectItem>
                <SelectItem value="male">{t("male")}</SelectItem>
                <SelectItem value="female">{t("female")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-6">
            {processedKeyword ? (
              <>
                {isSearching ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                      <p className="text-sm text-muted-foreground">
                        {t("searching")}
                      </p>
                    </div>
                  </div>
                ) : searchError ? (
                  <div className="text-center py-10">
                    <div className="text-destructive mb-2">
                      {t("error_searching")}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {searchError.message}
                    </p>
                  </div>
                ) : matchedUsers.length === 0 ? (
                  <div className="text-center py-10">
                    <div className="inline-flex items-center justify-center bg-muted rounded-full p-4 mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-muted-foreground"
                      >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium">
                      {t("no_results_found")}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {t(
                        "try_different_search",
                        "Try different keywords or filters"
                      )}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-muted-foreground">
                        {t("showing_results", "Showing {{count}} results", {
                          count: matchedUsers.length,
                        })}
                      </p>
                      <Button variant="outline" size="sm" onClick={resetSearch}>
                        {t("clear_filters")}
                      </Button>
                    </div>
                    <div
                      dir="ltr"
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                      {matchedUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center bg-muted/50 rounded-full p-6 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium">{t("start_searching")}</h3>
                <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                  {t(
                    "search_instructions",
                    "Enter keywords above to search for users by name, email, or username"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
