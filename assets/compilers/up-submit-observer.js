up.compiler("[up-submit-observer]", (element) => {
  const {
    submitObserverForm,
    submitObserverMode = "leave-top",
    submitObserverOnce = false,
    submitObserverMargin = "0px",
    submitObserverThreshold = 1,
  } = element.dataset;

  const isSubmitOnce = submitObserverOnce === "true";

  const isLeaveTopMode = submitObserverMode === "leave-top";

  const isEnterBottomMode = submitObserverMode === "enter-bottom";

  const hasBeenShown = false;
  let isSubmitted = false;

  const options = {
    root: document.querySelector("[up-viewport]"),
    rootMargin: submitObserverMargin,
    threshold: submitObserverThreshold,
  };

  const observer = new IntersectionObserver((entries) => {
    const entryElement = entries?.[0];
    const {
      isIntersecting,
      boundingClientRect: { top },
    } = entryElement;

    const submitObserverFormElement =
      document.querySelector(submitObserverForm);

    if (!submitObserverFormElement) {
      return;
    }

    if (isSubmitOnce && isSubmitted) {
      return;
    }

    // Element is leaving the screen from the top
    if (!isIntersecting && top < 0 && isLeaveTopMode) {
      isSubmitted = true;
      up.form.submit(submitObserverForm, { navigate: false });
      return;
    }

    // Element is entering the screen from the bottom
    if (isIntersecting && !hasBeenShown && top > 0 && isEnterBottomMode) {
      isSubmitted = true;
      up.form.submit(submitObserverForm, { navigate: false });
    }
  }, options);

  observer.observe(element);

  return () => observer.disconnect();
});
