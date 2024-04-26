import axios from "axios";

const CORE_API = process.env.CORE_API || `https://core-apidev.digitmoney.in`;
const REPORTING_API =
  process.env.REPORTING_API || `https://report-apidev.digitmoney.in`;
const LOAN_API = process.env.LOAN_API || `https://loan-apidev.digitmoney.in`;
const MESSAGE_API =
  process.env.MESSAGE_API || `https://msg-apidev.digitmoney.in`;
const JASOOS_API = process.env.JASOOS_API || `https://jasoos.digitmoney.in`;
const ALLIANCE_API =
  process.env.ALLIANCE_API || `https://alliance-apidev.digitmoney.in`;

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
        : LOAN_API
    }/api/${endpoint}`,
    method,
    data: body,
    headers,
  }).then((e) => e.data);
}
