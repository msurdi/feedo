import { Controller } from "@hotwired/stimulus";
import { milliseconds } from "date-fns";
import { debounce } from "lodash-es";
import { useIntersection } from "stimulus-use";

const readItemsMap = {};

export default class extends Controller {
  static values = { id: Number, key: String, url: String };

  static classes = ["read"];

  get readItems() {
    return readItemsMap[this.keyValue];
  }

  #loadReadItems() {
    return JSON.parse(localStorage.getItem(this.keyValue));
  }

  #saveReadItems(newReadItems) {
    localStorage.setItem(this.keyValue, JSON.stringify([...newReadItems]));
  }

  #markAsRead(itemId) {
    this.readItems.add(itemId);
    this.#saveReadItems(this.readItems);
    this.#debouncedSyncItems();
  }

  async #syncItems() {
    if (this.readItems.size === 0) {
      return;
    }
    const response = await fetch(this.urlValue, {
      method: "POST",
      body: JSON.stringify([...this.readItems]),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { read } = await response.json();
    read.forEach((itemId) => this.readItems.delete(itemId));
    this.#saveReadItems(this.readItems);
  }

  #debouncedSyncItems = debounce(this.#syncItems, milliseconds({ seconds: 5 }));

  disappear(entry) {
    const { boundingClientRect } = entry;

    if (boundingClientRect.top < 0) {
      this.#disappearUp();
    }
  }

  #disappearUp() {
    this.#markAsRead(this.idValue);
    this.element.classList.add(this.readClass);
  }

  connect() {
    if (!readItemsMap[this.keyValue]) {
      readItemsMap[this.keyValue] = new Set(this.#loadReadItems());
      if (this.readItems.size > 0) {
        this.#debouncedSyncItems();
      }
    }

    useIntersection(this, {
      eventPrefix: false,
      rootMargin: "0px 0px 0px 0px",
    });

    if (this.readItems.has(this.idValue)) {
      this.element.classList.add(this.readClass);
    }
  }
}
