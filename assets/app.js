import "unpoly";
import "./compilers/up-disable";

up.log.config.banner = false;

if (process.env.NODE_ENV === "development") {
  up.log.enable();
}
