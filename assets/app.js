import "./app.css";
import Stimulus from "./lib/stimulus.js";
import Turbo from "./lib/turbo.js";

Stimulus.debug = process.env.NODE_ENV === "development";

window.Turbo = Turbo;
window.Stimulus = Stimulus;
