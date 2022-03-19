import Button from "../../components/button";
import Input from "../../components/input";

const NewFeedPage = () => {
  const errors = {};

  return (
    <div className="flex flex-row justify-center my-6">
      <form className="flex flex-col w-full max-w-xl">
        <fieldset className="flex flex-col m-2 md:flex">
          <label className="py-1 text-sm font-bold">
            Feed url
            <Input name="url" placeholder="https://example.com/rss" autoFocus />
          </label>
          {errors.url && <span className="text-danger">{errors.url}</span>}
        </fieldset>
        <div className="flex flex-row justify-end m-2">
          <Button>Add feed</Button>
        </div>
      </form>
    </div>
  );
};

export default NewFeedPage;
