import axios from "axios";

const CORE_API =
  process.env.REACT_APP_CORE_API || `https://core-api.digitmoney.in`;
const REPORTING_API =
  process.env.REACT_APP_REPORTING_API || `https://report-apidev.digitmoney.in`;
const LOAN_API =
  process.env.REACT_APP_LOAN_API || `https://loan-api.digitmoney.in`;
const MESSAGE_API =
  process.env.REACT_APP_MESSAGE_API || `https://msg-apidev.digitmoney.in`;
const JASOOS_API =
  process.env.REACT_APP_JASOOS_API || `https://jasoos.digitmoney.in`;
const ALLIANCE_API =
  process.env.REACT_APP_ALLIANCE_API || `https://alliance-apidev.digitmoney.in`;
const URL_SHORT = process.env.REACT_APP_URL_SHORT || `https://dgtm.co`;

export default async function callApi(
  endpoint,
  method = "post",
  body,
  service = "core",
  token
) {
  let headers = {
    "content-type": "application/json",
  };

  if (token) headers.Authorization = `Bearer ${token}`;

  return await axios({
    url: `${
      service === "core"
        ? CORE_API
        : service === "reporting"
        ? REPORTING_API
        : service === "messaging"
        ? MESSAGE_API
        : service === "alliance"
        ? ALLIANCE_API
        : service === "jasoos"
        ? JASOOS_API
        : service === "url"
        ? URL_SHORT
        : LOAN_API
    }/api/${endpoint}`,
    method,
    data: body,
    headers,
  }).then((e) => e.data);
}
