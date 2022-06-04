import FeedItem from "./feed-item.jsx";

const FeedList = ({ feeds, onUnsubscribe }) => (
  <ul className="divide-y divide-gray-300">
    {feeds.map((feed) => (
      <li key={feed.id}>
        <FeedItem onUnsubscribe={() => onUnsubscribe(feed.id)} feed={feed} />
      </li>
    ))}
  </ul>
);

export default FeedList;
