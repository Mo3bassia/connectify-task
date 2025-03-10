import React from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  ThumbsDown,
  Eye,
  ArrowLeft,
  Mail,
  Phone,
  Building,
  MapPin,
  Briefcase,
  Calendar,
  GraduationCap,
} from "lucide-react";
import Loader from "../components/custom/Loader.jsx";
import i18n from "@/i18n.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["postsForUser", id],
    queryFn: () =>
      fetch(`https://dummyjson.com/posts/user/${id}`).then((res) => res.json()),
  });
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ["userData", id],
    queryFn: () =>
      fetch(`https://dummyjson.com/users/${id}`).then((res) => res.json()),
  });

  if (isLoading || isUserLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="ghost"
        className={`mb-6 flex items-center gap-1 cursor-pointer ${
          i18n.language === "ar" ? "flex-row-reverse" : ""
        }`}
        onClick={() => navigate("/")}
      >
        <ArrowLeft
          size={16}
          className={i18n.language === "ar" ? "rotate-180" : ""}
        />
        <span>{t("back")}</span>
      </Button>
      <div className="mb-10">
        <Card className="border shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start justify-around">
              <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                <AvatarImage
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback className="text-2xl">
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2 text-center md:text-left">
                <div className="space-y-0.5">
                  <h2 className="text-2xl font-bold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {user.role && (
                  <Badge
                    className="mx-auto md:mx-0"
                    variant={user.role === "admin" ? "default" : "outline"}
                  >
                    {user.role === "admin" ? t("admin") : user.role}
                  </Badge>
                )}

                <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-3">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Mail size={14} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <div>
              <h3 className="font-semibold text-lg mb-3">
                {t("personal_info")}
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(user.birthDate).toLocaleDateString()} ({user.age}{" "}
                    {t("years_old")})
                  </span>
                </div>
                {user.bloodGroup && (
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">●</span>
                    <span className="text-sm">
                      {t("blood_group")}: {user.bloodGroup}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{t("height")}:</span>
                  <span className="text-sm">{user.height} cm</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{t("weight")}:</span>
                  <span className="text-sm">{user.weight} kg</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">{t("location")}</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-muted-foreground mt-0.5" />
                  <span className="text-sm">
                    {user.address.address}
                    <br />
                    {user.address.city}, {user.address.state}{" "}
                    {user.address.stateCode}
                    <br />
                    {user.address.postalCode}, {user.address.country}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3">{t("work")}</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Building
                    size={16}
                    className="text-muted-foreground mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-medium">{user.company.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.company.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-muted-foreground" />
                  <span className="text-sm">{user.company.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap size={16} className="text-muted-foreground" />
                  <span className="text-sm">{user.university}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mb-6">
        {i18n.language === "en"
          ? `${user.firstName}'s${t("user_posts_title")}`
          : `منشورات ${user.firstName}`}
      </h2>

      {posts?.posts?.length > 0 ? (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-[Manrope]"
          dir="ltr"
        >
          {posts?.posts?.map((post) => (
            <Link
              to={`/post/${post.id}?userId=${id}`}
              className="no-underline"
              key={post.id}
            >
              <Card className="flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground line-clamp-4">
                    {post.body}
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col items-start pt-4 border-t">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-green-500" />
                        <span>{post.reactions?.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4 text-red-500" />
                        <span>{post.reactions?.dislikes || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views || 0}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4 border rounded-lg">
          <div className="mb-4 p-3 rounded-full bg-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M10 12v4"></path>
              <path d="M8 14h4"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-1">{t("no_posts_found")}</h3>
          <p className="text-muted-foreground text-center max-w-md">
            {i18n.language === "en"
              ? `${user.firstName} ${t("user_has_no_posts")}`
              : `${user.firstName} ${t("user_has_no_posts")}`}
          </p>
        </div>
      )}
    </div>
  );
}
