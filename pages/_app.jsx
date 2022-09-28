import Layout from "../components/layout.jsx";
import useProgress from "../hooks/use-progress.js";
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

export default FeedoApp;
