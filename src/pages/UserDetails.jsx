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
import { ThumbsUp, ThumbsDown, Eye, ArrowLeft } from "lucide-react";
import Loader from "../components/custom/Loader.jsx";
import i18n from "@/i18n.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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

  console.log(user);
  console.log(posts);

  if (isLoading || isUserLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {i18n.language === "en"
          ? `${user.firstName}'s${t("user_posts_title")}`
          : `منشورات ${user.firstName}`}
      </h2>
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
          <h3 className="text-lg font-semibold mb-1">No posts found</h3>
          <p className="text-muted-foreground text-center max-w-md">
            {user.firstName} hasn't published any posts yet.
          </p>
        </div>
      )}
    </div>
  );
}
