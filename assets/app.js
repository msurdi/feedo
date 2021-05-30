import "unpoly";
import "unpoly/unpoly.css";
import "./app.css";
import "./compilers/up-disable";
import "./compilers/up-progress";

if (process.env.NODE_ENV === "development") {
  up.log.enable();
}
