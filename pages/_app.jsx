import Layout from "../components/layout.jsx";
import useProgress from "../hooks/use-progress.js";
import { lazyApp } from "../lib/next-lazy.js";
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
