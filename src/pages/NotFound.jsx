import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="relative">
        <h1 className="text-9xl font-extrabold tracking-tight text-primary/20">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </div>
      </div>

      <h2 className="mt-8 text-2xl font-bold tracking-tight md:text-3xl">
        {t("page_not_found")}
      </h2>
      <p className="mt-4 text-muted-foreground max-w-lg">
        {t("page_not_found_message")}
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className={`gap-2 ${
            i18n.language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <ArrowLeft
            size={16}
            className={i18n.language === "ar" ? "rotate-180" : ""}
          />
          {t("go_back")}
        </Button>
        <Button
          onClick={() => navigate("/")}
          className={`gap-2 ${
            i18n.language === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <Home size={16} />
          {t("back_to_home")}
        </Button>
      </div>
    </div>
  );
}
