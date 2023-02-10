import "unpoly";
import "./app.css";
import "./compilers/up-disable.js";
import "./compilers/up-submit-observer.js";

up.log.config.banner = false;

if (process.env.NODE_ENV === "development") {
  up.log.enable();
}
