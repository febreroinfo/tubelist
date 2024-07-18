// Simulate Click
document.addEventListener("keydown", (event) => {
  const element = event.target;
  //   console.log(element)
  if (event.key === "Enter") {
    if (element.classList.contains("skip")) {
      simulateClick(element);

      if (history.pushState) {
        history.pushState("", document.title, window.location.pathname);
      } else {
        location = "/";
      }
    }
  }
});

function simulateClick(element) {
  // Create our event (with options)
  const eventOptions = new window.MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  // If cancelled, don't dispatch our event
  const cancelled = !element.dispatchEvent(eventOptions);

  if (cancelled) {
    // A handler called preventDefault.
    // console.log('cancelled')
  } else {
    // None of the handlers called preventDefault.
    // console.log('not cancelled')
  }
}