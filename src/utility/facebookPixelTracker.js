export function FacebookPixelTracker({ pixelId }) {
  if (!window.fbq) {
    // Create fbq function
    window.fbq = function () {
      window.fbq.callMethod
        ? window.fbq.callMethod(...arguments)
        : window.fbq.queue.push(arguments);
    };
    window.fbq.queue = [];
    window.fbq.loaded = true;
    window.fbq.version = "2.0";

    // Initialize queue for fbq
    window.fbq.push = window.fbq;

    // Load the Facebook Pixel script
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    // Initialize Facebook Pixel
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
  }
}
