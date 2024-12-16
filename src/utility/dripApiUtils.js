import callApi from "./apiCaller";

export const triggerDripApi = (data) => {
  return callApi(
    "v1/drip_trigger/track",
    "post",
    { 
        drip_trigger: data 
    },
    "core"
  ).catch((err) => {
    console.error("Failed to trigger drip API:", err);
  });
};
