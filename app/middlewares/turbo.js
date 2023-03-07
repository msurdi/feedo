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
      streams.push(stream("append", target, content).render());
      return turboStream;
    },
    prepend: (target, content) => {
      streams.push(stream("prepend", target, content).render());
      return turboStream;
    },
    replace: (target, content) => {
      streams.push(stream("replace", target, content).render());
      return turboStream;
    },
    update: (target, content) => {
      streams.push(stream("update", target, content).render());
      return turboStream;
    },
    remove: (target, content) => {
      streams.push(stream("remove", target, content).render());
      return turboStream;
    },
    before: (target, content) => {
      streams.push(stream("before", target, content).render());
      return turboStream;
    },
    after: (target, content) => {
      streams.push(stream("after", target, content).render());
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
