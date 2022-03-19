const withSerialize = (handler) => async (context) => {
  const response = await handler(context);
  if (response.props) {
    response.props = JSON.parse(JSON.stringify(response.props));
  }
  return response;
};
export default withSerialize;
