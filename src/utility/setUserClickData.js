import callApi from "./apiCaller";
import { SESSION_ID, TRACK_ID } from "./enum";

const obj = {};

export async function saveMetaData() {
  const trackId = localStorage.getItem(TRACK_ID);
  const sessionId = sessionStorage.getItem(SESSION_ID);
  let browserInfo = navigator.userAgent;
  let browser;
  let userDevice;
  let ipAddress;
  if (browserInfo.includes("Opera") || browserInfo.includes("Opr")) {
    browser = "Opera";
  } else if (browserInfo.includes("Edg")) {
    browser = "Edge";
  } else if (browserInfo.includes("Chrome")) {
    browser = "Chrome";
  } else if (browserInfo.includes("Safari")) {
    browser = "Safari";
  } else if (browserInfo.includes("Firefox")) {
    browser = "Firefox";
  } else {
    browser = "unknown";
  }

  await fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      ipAddress = data?.ip;
      console.log(data.ip);
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  userDevice = toMatch.some((toMatchItem) => {
    return navigator.userAgent?.match(toMatchItem);
  });

  await callApi(
    "v1/metadata/save-metadata",
    "post",
    {
      metadata: {
        browser: browser,
        user_device: userDevice,
        userIP: ipAddress,
        tracking_id: trackId,
        session_id: sessionId,
      },
    },
    "jasoos"
  );
}

export async function setUserClickData(data) {
  const trackId = localStorage.getItem(TRACK_ID);
  const sessionId = sessionStorage.getItem(SESSION_ID);
  await callApi(
    "v1/clicks/add-custom-event",
    "post",
    {
      click: {
        tracking_id: trackId,
        session_id: sessionId,
        event_name: data?.event_name,
      },
    },
    "jasoos"
  );
}
