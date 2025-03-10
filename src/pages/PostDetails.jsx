import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ThumbsUp,
  ThumbsDown,
  Eye,
  Clock,
  ArrowLeft,
  User,
} from "lucide-react";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      fetch(`https://dummyjson.com/posts/${id}`).then((res) => res.json()),
  });

  const {
    data: author,
    isLoading: authorLoading,
    error: authorError,
  } = useQuery({
    queryKey: ["user", post?.userId],
    queryFn: () =>
      fetch(`https://dummyjson.com/users/${post?.userId}`).then((res) =>
        res.json()
      ),
    enabled: !!post?.userId,
  });

  // Calculate reading time (rough estimate)
  const getReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text?.split(/\s+/)?.length || 0;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  if (postLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4 mb-6"></div>
          <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (postError) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h3 className="text-red-600 font-medium mb-2">
            {t("error_loading_post")}
          </h3>
          <p className="text-red-500">{postError.message}</p>
          <Button
            variant="outline"
            className="mt-4 cursor-pointer"
            onClick={() => navigate(`/user/${post.userId}`)}
          >
            {t("go_back")}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl ">
      <Button
        variant="ghost"
        className={`mb-6 flex items-center gap-1 `}
        onClick={() => navigate(-1)}
      >
        <ArrowLeft
          size={16}
          className={i18n.language === "ar" ? "rotate-180" : ""}
        />
        <span>{t("back")}</span>
      </Button>

      <Card className="border-2 shadow-sm font-[Manrope]" dir="ltr">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl lg:text-3xl font-bold leading-tight">
            {post.title}
          </CardTitle>

          <div className="flex items-center gap-2 mt-4">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock size={14} />
              <span>
                {getReadingTime(post.body)} {t("min_read")}
              </span>
            </div>

            <Separator orientation="vertical" className="h-4" />

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Eye size={14} />
              <span>
                {post.views.toLocaleString()} {t("views")}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="py-6">
          {!authorLoading && author && (
            <div
              className={`flex items-center gap-3 mb-6 p-3 bg-muted/30 rounded-lg `}
            >
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={author.image} alt={author.firstName} />
                <AvatarFallback>
                  {author.firstName?.charAt(0)}
                  {author.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">
                  {author.firstName} {author.lastName}
                </p>
                <p className="text-xs text-muted-foreground">
                  @{author.username}
                </p>
              </div>
            </div>
          )}

          {authorLoading && (
            <div className="flex items-center gap-3 mb-6">
              <div className="rounded-full h-10 w-10 bg-muted animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-3 w-24 bg-muted rounded animate-pulse"></div>
                <div className="h-2 w-16 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
          )}

          <div className="prose dark:prose-invert max-w-none">
            <p className="whitespace-pre-line text-lg leading-relaxed">
              {post.body}
            </p>
          </div>
        </CardContent>

        <CardFooter
          className={`flex flex-col items-start pt-6 border-t ${
            i18n.language === "ar" ? "items-end" : ""
          }`}
        >
          <div
            className={`flex flex-wrap gap-2 mb-6 ${
              i18n.language === "ar" ? "justify-end w-full" : ""
            }`}
          >
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          <div
            className={`flex items-center justify-between w-full ${
              i18n.language === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`flex items-center gap-4 ${
                i18n.language === "ar" ? "flex-row-reverse" : ""
              }`}
            >
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ThumbsUp className="h-4 w-4 text-green-500" />
                <span>{post.reactions?.likes || 0}</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <ThumbsDown className="h-4 w-4 text-red-500" />
                <span>{post.reactions?.dislikes || 0}</span>
              </Button>
            </div>

            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 ${
                  i18n.language === "ar" ? "flex-row-reverse" : ""
                }`}
                onClick={() => navigate(`/user/${post.userId}`)}
              >
                <User size={14} />
                <span>{t("view_author")}</span>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
