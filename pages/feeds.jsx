import { useRouter } from "next/router";
import FeedList from "../components/feed-list";
import Link from "../components/link";
import useApi from "../hooks/use-api";
import useSuccess from "../hooks/use-success";
import { getAllFeeds } from "../lib/core/feeds";
import withSerialize from "../lib/helpers/pages/with-serialize";
import urls from "../lib/urls";

const FeedsPage = ({ feeds }) => {
  const router = useRouter();
  const { del, data } = useApi();

  const onUnsubscribe = async (feedId) => {
    await del(urls.feedItemApi(feedId));
  };

  useSuccess(() => {
    router.replace(router.asPath);
  }, data?.deleted);

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
