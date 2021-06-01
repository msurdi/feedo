import "unpoly";
import "./compilers/up-disable";
import "./compilers/up-progress";

if (process.env.NODE_ENV === "development") {
  up.log.enable();
}
