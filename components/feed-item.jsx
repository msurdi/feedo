import Button from "./button";

const FeedItem = ({ feed, onUnsubscribe }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    onUnsubscribe(feed.id);
  };

  return (
    <div className="flex flex-col items-start py-2 sm:flex-row sm:justify-between sm:items-baseline">
      {feed.url}
      <form onSubmit={onSubmit} className="flex flex-col">
        <Button type="submit" variant={Button.variants.danger}>
          Unsubscribe
        </Button>
      </form>
    </div>
  );
};

export default FeedItem;
