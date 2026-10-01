if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(function () {
          console.log("PWA service worker registered.");
        })
        .catch(function (error) {
          console.error(
            "Service worker registration failed:",
            error
          );
        });
    });
  }