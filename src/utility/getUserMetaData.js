import callApi from "./apiCaller";

const obj = {};

export async function getUserMetaData(data) {
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
      ipAddress = data.ip;
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
    return navigator.userAgent.match(toMatchItem);
  });

  const res = await callApi("", "post", {
    browser_name: browser,
    user_device: userDevice,
    ip_address: ipAddress,
    user_id: data?.user_id,
    event: data?.event,
    event_category: data?.event_category,
  });
  if (res && res.status === "Success") {
  }
}
