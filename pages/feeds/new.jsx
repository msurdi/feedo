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

const FormActions = ({ submitEnabled, canSubscribe }) => (
  <div className="m-2 flex flex-row items-center justify-end">
    <Button disabled={!submitEnabled} type="submit">
      {canSubscribe ? "Subscribe" : "Preview"}
    </Button>
  </div>
);

const NewFeedPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange", shouldUnregister: true });

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

  useEffect(() => {
    if (preview?.data?.name) {
      setValue("name", preview.data.name, { shouldValidate: true });
    }
  }, [preview?.data?.name, setValue]);

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
    threshold: 0,
  });
  const isScrolling = intersection && intersection.intersectionRatio === 0;

  return (
    <div className="flex h-full flex-col items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full max-w-xl flex-col"
      >
        <InputField
          label="Feed URL"
          error={errors?.url?.message}
          placeholder="https://example.com/rss"
          autoFocus
          autoComplete="off"
          {...register("url", { required: true })}
        />
        {canSubscribe && (
          <InputField
            label="Feed Name"
            error={errors?.name?.message}
            required
            autoComplete="off"
            {...register("name", { required: canSubscribe })}
          />
        )}
        <FormActions
          canSubscribe={canSubscribe}
          submitEnabled={submitEnabled}
        />
      </form>

      {isScrolling && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sticky top-0 flex w-full justify-between bg-white shadow-sm"
        >
          {canSubscribe && (
            <InputField
              className="w-full"
              labelClassName="hidden"
              label="Feed Name"
              error={errors?.name?.message}
              required
              autoComplete="off"
              {...register("name", { required: canSubscribe })}
            />
          )}
          <FormActions
            canSubscribe={canSubscribe}
            submitEnabled={submitEnabled}
          />
        </form>
      )}

      <div className="overflow-y-scroll">
        <div ref={intersectionRef} />
        {preview.isLoading && (
          <span className="text-sm text-gray-600">Loading...</span>
        )}
        {canSubscribe && (
          <ArticleList>
            {preview?.data?.articles.map((article) => (
              <ArticleItem key={article.guid} article={article} />
            ))}
          </ArticleList>
        )}
      </div>
    </div>
  );
};

export default NewFeedPage;
