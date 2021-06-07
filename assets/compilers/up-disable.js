/* eslint-disable no-param-reassign */

up.compiler("[up-disable]", (element) => {
  const { disableWith } = element.dataset;
  up.on(element, "click", () => {
    const originalWidth = element.style.width || element.offsetWidth;
    setTimeout(() => {
      element.disabled = true;
      element.style.width = `${originalWidth}px`;
      element.textContent = disableWith ?? "Saving...";
    }, 0);
  });
});
