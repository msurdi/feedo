import Layout from "../components/layout";
import "../styles/app.css";

const FeedoApp = ({ Component, pageProps }) => {
  const PageLayout = Component.layout || Layout;
  const { key } = pageProps;

  return (
    <PageLayout key={key}>
      <Component {...pageProps} />
    </PageLayout>
  );
};

export default FeedoApp;
