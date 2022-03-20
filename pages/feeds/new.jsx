import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "../../components/button";
import Input from "../../components/input";
import useApi from "../../hooks/use-api";
import useErrors from "../../hooks/use-errors";
import useSuccess from "../../hooks/use-success";
import urls from "../../lib/urls";

const NewFeedPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const { post, data } = useApi();

  const onSubmit = async (values) => {
    await clearErrors();
    await post(urls.feedsApi(), values);
  };

  useSuccess(() => {
    router.push(urls.feeds());
  }, data?.feed);

  useErrors(setError, data?.errors);

  return (
    <div className="flex flex-row justify-center my-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full max-w-xl"
      >
        <fieldset className="flex flex-col m-2 md:flex">
          <label className="py-1 text-sm font-bold">
            Feed url
            <Input
              placeholder="https://example.com/rss"
              autoFocus
              required
              {...register("url", { required: true })}
            />
          </label>
          {errors.url && (
            <span className="text-sm text-danger">{errors?.url?.message}</span>
          )}
        </fieldset>
        <div className="flex flex-row justify-end m-2">
          <Button type="submit">Add feed</Button>
        </div>
      </form>
    </div>
  );
};

export default NewFeedPage;
