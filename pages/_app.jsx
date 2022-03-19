import Layout from "../components/layout";
import "../styles/app.css";

const FeedoApp = ({ Component, pageProps }) => {
  const PageLayout = Component.layout || Layout;

  return (
    <PageLayout>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default FeedoApp;
