import FeedList from "../components/feed-list";
import Link from "../components/link";
import useApi from "../hooks/use-api";
import useRefresh from "../hooks/use-refresh";
import { getAllFeeds } from "../lib/core/feeds";
import withSerialize from "../lib/helpers/pages/with-serialize";
import urls from "../lib/urls";

const FeedsPage = ({ feeds }) => {
  const refresh = useRefresh();
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

export const getServerSideProps = withSerialize(async () => {
  const feeds = await getAllFeeds();

  return { props: { feeds } };
});

export default FeedsPage;
