import Button from "./button.jsx";

const FeedItem = ({ feed, onUnsubscribe }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    onUnsubscribe(feed.id);
  };

  return (
    <div className="flex flex-col items-start py-2 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="flex flex-col">
        <div className="font-semibold">{feed.name}</div>
        <div className="text-sm text-gray-500">{feed.url}</div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col">
        <Button type="submit" variant={Button.variants.danger}>
          Unsubscribe
        </Button>
      </form>
    </div>
  );
};

export default FeedItem;
