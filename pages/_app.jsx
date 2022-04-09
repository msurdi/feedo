import Layout from "../components/layout";
import useProgress from "../hooks/use-progress";
import { lazyApp } from "../lib/next-lazy";
import "../styles/app.css";

const FeedoApp = ({ Component, pageProps }) => {
  useProgress();
  const PageLayout = Component.layout || Layout;
  const { key } = pageProps;

  return (
    <PageLayout key={key}>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default lazyApp(FeedoApp);
