import html from "html-string";

const stream = (action, target, content) => html`
  <turbo-stream action="${action}" target="${target}">
    <template>${content}</template>
  </turbo-stream>
`;

const TurboStream = (res) => {
  const streams = [];

  const turboStream = {
    append: (target, content) => {
      streams.push(html.render(stream("append", target, content)));
      return turboStream;
    },
    prepend: (target, content) => {
      streams.push(html.render(stream("prepend", target, content)));
      return turboStream;
    },
    replace: (target, content) => {
      streams.push(html.render(stream("replace", target, content)));
      return turboStream;
    },
    update: (target, content) => {
      streams.push(html.render(stream("update", target, content)));
      return turboStream;
    },
    remove: (target, content) => {
      streams.push(html.render(stream("remove", target, content)));
      return turboStream;
    },
    before: (target, content) => {
      streams.push(html.render(stream("before", target, content)));
      return turboStream;
    },
    after: (target, content) => {
      streams.push(html.render(stream("after", target, content)));
      return turboStream;
    },
    send: () =>
      res.contentType("text/vnd.turbo-stream.html").send(streams.join("")),
  };

  return turboStream;
};

const turboMiddleware = () => (req, res, next) => {
  res.turboStream = TurboStream(res);

  return next();
};

export default turboMiddleware;
