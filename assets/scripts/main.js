// Initialize
window.addEventListener("load", initialize);

function initialize() {
  console.log("Welcome! 👋");
  activateStickyScrollPadding();
  getContactEmail();
  getNetworkStatus();
}

// Scrolling
function activateStickyScrollPadding() {
  const navItem = document.querySelector(".navbar");
  if (navItem) {
    const navItemHeight = navItem.offsetHeight;

    document.documentElement.style.setProperty(
      "--scroll-padding",
      `${navItemHeight}px`
    );
  }
}

let menu = document.querySelector("button#menu");
if (menu) {
  menu.addEventListener("click", getOverlay);
}

function getOverlay() {
  let overlayItem = document.querySelector("#info[data-open]");

  if (overlayItem.getAttribute("data-open") == "false") {
    overlayItem.setAttribute("data-open", "true");
    overlayItem.previousElementSibling.setAttribute("data-open", "false");
    menu.textContent = "Close Info";
  } else {
    overlayItem.setAttribute("data-open", "false");
    overlayItem.previousElementSibling.setAttribute("data-open", "true");
    menu.textContent = "Info";
  }
}

// Email
function getContactEmail() {
  let contactItems = document.querySelectorAll("[data-email]");
  let contactArray = Array.from(contactItems);

  contactArray.forEach((contact) => {
    document.addEventListener("click", (event) => {
      getContactEvent(event);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        getContactEvent(event);
      }
    });

    function getContactEvent(event) {
      if (contact.id == event.target.id) {
        let emailData = "helloATfebreroDOTinfo";
        emailData = emailData.replace(/AT/, "@").replace(/DOT/, ".");
        contact.setAttribute("data-email", "true");
        contact.setAttribute("href", `mailto:${emailData}`);
      } else {
        contact.setAttribute("data-email", "false");
        contact.removeAttribute("data-value");
        contact.removeAttribute("href");
        contact.removeAttribute("rel");
        contact.removeAttribute("target");
      }
    }
  });
}

// Network
function getNetworkStatus() {
  const status = document.querySelector("#status");
  const online = document.querySelector("#online");
  const offline = document.querySelector("#offline");

  function updateNetworkStatus() {
    let condition = navigator.onLine ? "online" : "offline";

    if (condition === "offline") {
      status.setAttribute("data-open", "true");
      offline.setAttribute("data-open", "true");
      online.setAttribute("data-open", "false");
    } else {
      status.setAttribute("data-open", "true");
      online.setAttribute("data-open", "true");
      offline.setAttribute("data-open", "false");

      setTimeout(() => {
        online.setAttribute("data-open", "false");
        status.setAttribute("data-open", "false");
      }, 5800);
    }
  }

  window.addEventListener("online", updateNetworkStatus);
  window.addEventListener("offline", updateNetworkStatus);
}

// Sort Unique Data
function uniqueData(value, index, self) {
  return self.indexOf(value) === index;
}

// List
function setTextAreaPlaceHolderText() {
  const textArea = document.querySelector("#links");

  if (textArea) {
    textArea.setAttribute(
      "placeholder",
      `Paste links here, each separated by a new line. 
Any link or ID works! 
For example: 
https://www.youtube.com/watch?v=YClS7pfdaoQ
https://www.youtube.com/watch?v=JOyeCgzJUPk 
https://www.youtube.com/watch?v=guigxQ8SNS8&amp;t=4s 
https://youtu.be/D7CK5o4s_BE 
https://youtu.be/B9vkM8SeScY?t=41 
W_OGQoRDpE4
ffh0ojPU27k`
    );
  }
}
setTextAreaPlaceHolderText();

function getTextAreaTextValue() {
  const textArea = document.querySelector("#links");

  if (textArea) {
    const generateButton = document.querySelector("#generate");

    if (generateButton) {
      generateButton.addEventListener("click", () => {
        if (textArea.value !== "") {
          let linksValue = textArea.value;

          let linksArray = [];
          linksArray = linksValue.split("\n");

          let idsArray = linksArray.map((link) => {
            let linkSplit;
            let linkId;

            if (link.includes("?v=")) {
              let linkSplit = link.split("?v=")[1];

              if (linkSplit.includes("&")) {
                linkId = linkSplit.split("&")[0];
              } else {
                linkId = linkSplit;
              }

              return linkId.replace(/\s/g, "");
            } else if (link.includes(".be/")) {
              let linkSplit = link.split(".be/")[1];

              if (linkSplit.includes("?")) {
                linkId = linkSplit.split("?")[0];
              } else {
                linkId = linkSplit;
              }

              return linkId.replace(/\s/g, "");
            } else {
              linkId = link;

              return linkId.replace(/\s/g, "");
            }
          });

          getPlaylist(idsArray);
        }
      });
    }
  }
}
getTextAreaTextValue();

function getPlaylist(idsArray) {
  const viewPlaylist = document.querySelector("#generate");

  if (viewPlaylist) {
    const playList = document.querySelector("#playlist");

    if (playList) {
      playList.remove();
    }

    let hyperlink = document.createElement("a");

    hyperlink.setAttribute("id", "playlist");
    hyperlink.setAttribute("rel", "noopener noreferer");
    hyperlink.text = "Click to view your YouTube Playlist";
    hyperlink.className = "form__download";
    hyperlink.target = "_blank";
    hyperlink.href = `https://www.youtube.com/watch_videos?video_ids=${idsArray}`;

    viewPlaylist.after(hyperlink);
  }
}
