import { Controller } from "@hotwired/stimulus";
import { milliseconds } from "date-fns";
import { debounce } from "lodash-es";
import { useIntersection } from "stimulus-use";
import urls from "../../app/urls.js";

const loadReadArticles = () => JSON.parse(localStorage.getItem("readArticles"));

const saveReadArticles = (newReadArticles) =>
  localStorage.setItem("readArticles", JSON.stringify([...newReadArticles]));

const readArticles = new Set(loadReadArticles());

const syncReadArticles = async () => {
  const response = await fetch(urls.api.read(), {
    method: "POST",
    body: JSON.stringify({ articleIds: [...readArticles] }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { markedAsRead } = await response.json();
  markedAsRead.forEach((articleId) => readArticles.delete(articleId));
  saveReadArticles(readArticles);
};

const debouncedSyncReadArticles = debounce(
  syncReadArticles,
  milliseconds({ seconds: 5 })
);

const markAsRead = (articleId) => {
  readArticles.add(articleId);
  saveReadArticles(readArticles);
  debouncedSyncReadArticles();
};

if (readArticles.size > 0) {
  debouncedSyncReadArticles();
}

export default class extends Controller {
  static values = { id: Number };

  static classes = ["read"];

  connect() {
    useIntersection(this, {
      eventPrefix: false,
      rootMargin: "-150px 0px 0px 0px",
    });
    if (readArticles.has(this.idValue)) {
      this.element.classList.add(this.readClass);
    }
  }

  disappear(entry) {
    const { boundingClientRect } = entry;

    if (boundingClientRect.top < 0) {
      this.disappearUp();
    }
  }

  disappearUp() {
    markAsRead(this.idValue);
    this.element.classList.add(this.readClass);
  }
}
