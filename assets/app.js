import "unpoly";
import "./compilers/up-disable";
import "./compilers/up-progress";

up.log.config.banner = false;

if (process.env.NODE_ENV === "development") {
  up.log.enable();
}
