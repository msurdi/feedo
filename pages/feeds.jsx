import FeedList from "../components/feed-list.jsx";
import Link from "../components/link.jsx";
import useApi from "../hooks/use-api.js";
import { getAllFeeds } from "../lib/core/feeds.js";
import withDefault from "../lib/helpers/pages/with-default.js";
import { useLazyRefresh } from "../lib/next-lazy.js";
import urls from "../lib/urls.js";

const FeedsPage = ({ feeds }) => {
  const refresh = useLazyRefresh();
  const { del } = useApi();

  const onUnsubscribe = async (feedId) => {
    const { response } = await del(urls.feedApi(feedId));
    if (response?.deleted) {
      refresh();
    }
  };

  return (
    <div>
      <section className="flex flex-row justify-between">
        <h1 className="py-4 text-lg font-bold"> My feeds</h1>
        <Link variant={Link.variants.button} href={urls.newFeed()}>
          Add feed
        </Link>
      </section>
      <section className="py-4">
        <FeedList onUnsubscribe={onUnsubscribe} feeds={feeds} />
      </section>
    </div>
  );
};

export const serverSideProps = async () => {
  const feeds = await getAllFeeds();

  return { props: { feeds } };
};

export const getServerSideProps = withDefault(serverSideProps);

export default FeedsPage;
