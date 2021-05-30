const nprogress = require("nprogress");

up.compiler("[up-progress]", () => {
  const show = () => {
    nprogress.start();
  };
  const hide = () => {
    nprogress.done();
  };

  return [up.on("up:request:late", show), up.on("up:request:recover", hide)];
});
