import { Controller } from "@hotwired/stimulus";
import { useIntersection } from "stimulus-use";

export default class extends Controller {
  isVisible = false;

  connect() {
    useIntersection(this, {
      eventPrefix: false,
      rootMargin: "150px 0px 0px 0px",
    });
    this.isVisible = this.element.checkVisibility();
  }

  submit() {
    this.element.requestSubmit();
  }

  appear() {
    this.isVisible = true;
    this.submit();
  }

  disappearUp() {
    this.isVisible = false;
  }
}
