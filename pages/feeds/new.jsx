import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import ArticleItem from "../../components/article-item";
import ArticleList from "../../components/article-list";
import Button from "../../components/button";
import Input from "../../components/input";
import useApi from "../../hooks/use-api";
import usePreview from "../../hooks/use-preview";
import useServerErrors from "../../hooks/use-server-errors";
import urls from "../../lib/urls";

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

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col"
      >
        <fieldset className="m-2 flex flex-col md:flex">
          <label className="py-1 text-sm font-bold">
            Feed url
            <Input
              placeholder="https://example.com/rss"
              autoFocus
              required
              autoComplete="off"
              {...register("url", { required: true })}
            />
          </label>
          {errors.url && (
            <span className="text-sm text-danger">{errors?.url?.message}</span>
          )}
        </fieldset>
        <div className="m-2 flex flex-row justify-end">
          <Button disabled={!submitEnabled} type="submit">
            {canSubscribe ? "Subscribe" : "Preview"}
          </Button>
        </div>
      </form>
      {preview.isLoading && (
        <span className="text-sm text-gray-600">Loading...</span>
      )}
      {canSubscribe && (
        <>
          <ArticleList>
            {preview?.data?.articles.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </ArticleList>
          <div className=" my-4 flex justify-center">
            <Button disabled={!submitEnabled} type="submit">
              Subscribe
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewFeedPage;
