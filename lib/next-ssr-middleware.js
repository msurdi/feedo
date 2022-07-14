const withSSRMiddleware =
  (apiMiddleware) => (getServerSideProps) => async (context) => {
    const { req, res } = context;

    let passed = false;
    const handler = () => {
      passed = true;
    };

    await apiMiddleware(handler)(req, res);

    if (passed) {
      return getServerSideProps(context);
    }
    return { props: {} };
  };
export default withSSRMiddleware;
