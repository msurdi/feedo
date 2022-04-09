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

  const { clearPreview, fetchPreview, preview } = usePreview();
  const { post, data } = useApi();

  const onSubmit = async (values) => {
    const { response } = await post(urls.feedsApi(), values);
    if (response?.feed) {
      router.push(urls.feeds());
    }
  };

  const onClickPreview = async () => {
    fetchPreview(getValues("url"));
  };

  useServerErrors(setError, data?.errors);

  useEffect(() => {
    clearPreview();
  }, [clearPreview, url]);

  return (
    <div className="my-6 flex flex-col items-center">
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
          {!preview?.ok && (
            <Button onClick={onClickPreview} disabled={!isValid} type="button">
              Preview
            </Button>
          )}
          {preview.ok && (
            <Button disabled={!isValid} type="submit">
              Subscribe
            </Button>
          )}
        </div>
      </form>
      {preview.isLoading && (
        <span className="text-sm text-gray-600">Loading...</span>
      )}
      {preview.ok && (
        <>
          <ArticleList>
            {preview.articles.map((article) => (
              <ArticleItem key={article.id} article={article} />
            ))}
          </ArticleList>
          <div className=" my-4 flex justify-center">
            <Button disabled={!isValid} type="submit">
              Subscribe
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewFeedPage;
