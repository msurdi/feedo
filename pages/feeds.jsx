import Button from "../components/button";
import Link from "../components/link";
import { getAllFeeds } from "../lib/core/feeds";
import withSerialize from "../lib/helpers/pages/with-serialize";
import urls from "../lib/urls";

const FeedsPage = ({ feeds }) => (
  <div>
    <section className="flex flex-row justify-between">
      <h1 className="py-4 text-lg font-bold"> My feeds</h1>
      <Link variant={Link.variants.button} href={urls.newFeed()}>
        Add feed
      </Link>
    </section>
    <section className="py-4">
      <ul className="divide-y divide-gray-300">
        {feeds.map((feed) => (
          <li key={feed.id}>
            <div className="flex flex-col items-start py-2 sm:flex-row sm:justify-between sm:items-baseline">
              {feed.url}
              <form className="flex flex-col">
                <Button variant={Button.variants.danger}>Unsubscribe</Button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  </div>
);

export const getServerSideProps = withSerialize(async () => {
  const feeds = await getAllFeeds();

  return { props: { feeds } };
});

export default FeedsPage;
