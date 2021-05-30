import "unpoly";
import "unpoly/unpoly.css";
import "./app.css";
import "./compilers/up-disable";

if (process.env.NODE_ENV === "development") {
  up.log.enable();
}
