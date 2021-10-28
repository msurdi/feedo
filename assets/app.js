import "unpoly";
import "./compilers/up-disable";
import "./compilers/up-submit-observer";

up.log.config.banner = false;

if (process.env.NODE_ENV === "development") {
  up.log.enable();
}
