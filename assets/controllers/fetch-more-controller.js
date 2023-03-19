import { Controller } from "@hotwired/stimulus";
import { milliseconds } from "date-fns";
import { throttle } from "lodash-es";
import { useIntersection } from "stimulus-use";

export default class extends Controller {
  /**
   * Id of the current polling setInterval call
   */
  pollIntervalId = null;

  /**
   * Represents the visibility status of the current browser's tab
   */
  isDocumentVisible = true;

  static values = {
    /**
     * This value is used to signal when the backend has more articles to be fetched
     */
    hasMore: {
      type: Boolean,
      default: false,
    },
  };

  connect() {
    useIntersection(this, {
      eventPrefix: false,
      rootMargin: "150px 0px 0px 0px",
    });
  }

  #submit() {
    this.element.requestSubmit();
  }

  #throttledSubmit = throttle(this.#submit, milliseconds({ seconds: 1 }));

  /**
   * Callback triggered when the "Fetch more" DOM element enters the viewport
   */
  appear() {
    if (this.hasMoreValue) {
      this.#throttledSubmit();
    }
    this.#enablePolling();
  }

  /**
   * Callback triggered when the "Fetch more" DOM element leaves the viewport
   */
  disappear() {
    this.firstHidden = true;
    this.#disablePolling();
  }

  /**
   * Callback triggered when the user's switches to or from another tab,
   * or the browser window is hidden in any other way.
   */
  documentVisibilityChanged() {
    if (document.hidden) {
      this.isDocumentVisible = false;
    } else {
      this.isDocumentVisible = true;
      this.#throttledSubmit();
    }
  }

  #enablePolling() {
    if (this.pollIntervalId) {
      return;
    }
    this.pollIntervalId = setInterval(() => {
      if (this.isDocumentVisible) {
        this.#throttledSubmit();
      }
    }, milliseconds({ minutes: 1 }));
  }

  #disablePolling() {
    clearInterval(this.pollIntervalId);
    this.pollIntervalId = null;
  }
}
