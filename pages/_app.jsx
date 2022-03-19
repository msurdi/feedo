import Layout from "../components/layout";
import "../styles/app.css";

const FeedoApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
};

export default FeedoApp;
