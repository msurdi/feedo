import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useIntersection } from "react-use";
import ArticleItem from "../../components/article-item.jsx";
import ArticleList from "../../components/article-list.jsx";
import Button from "../../components/button.jsx";
import InputField from "../../components/input-field.jsx";
import useApi from "../../hooks/use-api.js";
import usePreview from "../../hooks/use-preview.js";
import useServerErrors from "../../hooks/use-server-errors.js";
import urls from "../../lib/urls.js";

const NewFeedPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const url = watch("url");

  const preview = usePreview();
  const api = useApi();

  const canSubscribe = preview.ok && preview?.data?.articles;

  const onSubmit = async (values) => {
    if (!canSubscribe) {
      preview.get(getValues("url"));
      return;
    }
    const { response } = await api.post(urls.feedsApi(), values);
    if (response?.feed) {
      router.push(urls.feeds());
    }
  };

  useServerErrors(setError, api.data?.errors);
  useServerErrors(setError, preview?.data?.errors);

  const { reset } = preview;
  useEffect(() => {
    reset();
  }, [reset, url]);

  const submitEnabled =
    (isValid && !preview.isLoading && !api.isLoading) ||
    (url && preview?.data?.errors);

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });
  const isScrolling = intersection && intersection.intersectionRatio < 1;

  return (
    <div className="flex flex-col items-center">
      <form
        ref={intersectionRef}
        onSubmit={handleSubmit(onSubmit)}
        className={classNames("sticky -top-1 flex w-full", {
          "max-w-xl flex-col": !isScrolling,
          "justify-between bg-white shadow-sm": isScrolling,
        })}
      >
        <InputField
          label="Feed URL"
          error={errors?.url?.message}
          placeholder="https://example.com/rss"
          autoFocus
          required
          autoComplete="off"
          {...register("url", { required: true })}
        />
        <div className="m-2 flex flex-row items-center justify-end">
          <Button disabled={!submitEnabled} type="submit">
            {canSubscribe ? "Subscribe" : "Preview"}
          </Button>
        </div>
      </form>
      {preview.isLoading && (
        <span className="text-sm text-gray-600">Loading...</span>
      )}
      {canSubscribe && (
        <ArticleList>
          {preview?.data?.articles.map((article) => (
            <ArticleItem key={article.id} article={article} />
          ))}
        </ArticleList>
      )}
    </div>
  );
};

export default NewFeedPage;
