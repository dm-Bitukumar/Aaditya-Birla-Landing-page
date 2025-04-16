import moment from "moment";
import {
  BUSINESS_LOAN,
  BUSINESS_OWNER,
  CASH,
  CHEQUE,
  FEMALE,
  MALE,
  ONLINE_NEFT,
  PERSONAL_LOAN,
  SALARIED,
  SELF_EMPLOYED,
  UNSPECIFIED,
} from "./enum";
const INDIAN_COUNTRY_CODE = "91";

function getProfessionTypeFromEntry(profession) {
  if (profession.toLowerCase() === "salaried") {
    return SALARIED;
  }
  if (
    profession.toLowerCase() === "self employed" ||
    profession.toLowerCase() === "selfemployed" ||
    profession.toLowerCase() === "self_employed" ||
    profession.toLowerCase() === "self-employed"
  ) {
    return SELF_EMPLOYED;
  }
  if (
    profession.toLowerCase() === "business owner" ||
    profession.toLowerCase() === "business_owner" ||
    profession.toLowerCase() === "business-owner" ||
    profession.toLowerCase() === "businessowner"
  ) {
    return BUSINESS_OWNER;
  }
}

function getSalaryModeFromEntry(salary_mode) {
  if (
    salary_mode?.toLowerCase() === "online/neft" ||
    salary_mode?.toLowerCase() === "online neft" ||
    salary_mode?.toLowerCase() === "online|neft" ||
    salary_mode?.toLowerCase() === "online | neft" ||
    salary_mode?.toLowerCase() === "online-neft" ||
    salary_mode?.toLowerCase() === "online_neft"
  ) {
    return ONLINE_NEFT;
  }
  if (salary_mode?.toLowerCase() === "cheque") {
    return CHEQUE;
  }
  if (salary_mode?.toLowerCase() === "cash") {
    return CASH;
  }
}

function getGenderFromEntry(gender) {
  if (gender.toLowerCase() === "male") {
    return MALE;
  }
  if (gender.toLowerCase() === "female") {
    return FEMALE;
  }
  return UNSPECIFIED;
}

export function getAllianceLeadFromMoneyTapInput(alliance_id, lead) {
  let alliance_lead = {};
  alliance_lead.contact_name =
    lead.name ||
    lead.contact_name ||
    `${lead.firstName || ""} ${lead.lastName || ""}`.trim();
  alliance_lead.contact_phone = lead.contact_phone;
  alliance_lead.country_code = INDIAN_COUNTRY_CODE;
  alliance_lead.contact_email = lead.email;
  alliance_lead.work_contact_email = lead.work_email || lead.workEmail || "";
  alliance_lead.dob = moment(lead.dob).add("hours", 6).toISOString();
  alliance_lead.gender = getGenderFromEntry(lead.gender);
  alliance_lead.loan_type = PERSONAL_LOAN;
  alliance_lead.is_company = lead.company_type !== "";
  alliance_lead.address1 = lead.home_address1 || "";
  alliance_lead.address2 = lead.home_address2 || "";
  alliance_lead.work_address1 = lead.work_address1 || "";
  alliance_lead.work_address2 = lead.work_address2 || "";
  alliance_lead.city = "";
  alliance_lead.state = "";
  alliance_lead.company_type = lead.company_type?.toLowerCase() ?? "";
  alliance_lead.gst = lead.gst_no || "";
  alliance_lead.turnover = getBusinessTurnoverFromEntry(lead.turnover);
  alliance_lead.business_vintage = getBusinessVintageFromEntry(
    lead.company_age
  );
  alliance_lead.pincode = lead.pincode;
  alliance_lead.work_pincode = lead.work_pincode || lead.workPinCode || "";
  alliance_lead.profession_type = getProfessionTypeFromEntry(
    lead.profession || lead.professionType || ""
  );
  alliance_lead.monthly_income =
    lead.monthly_income || lead.monthlyIncome || "";
  alliance_lead.annual_income = lead.annual_income || lead.annual_income || 0;
  alliance_lead.pancard = lead.pancard?.toUpperCase() ?? "";
  alliance_lead.salary_mode =
    getSalaryModeFromEntry(lead.salary_mode) || "online/neft";
  alliance_lead.alliance_id = alliance_id;
  alliance_lead.aff_id = lead.aff_id;
  alliance_lead.source = sourceConvert(lead.source);
  alliance_lead.utm_source = lead.utm_source;
  alliance_lead.kyc_consent = lead.mobiletncchecked;
  alliance_lead.kyc_consent_datetime = lead.mobiletnctime;
  return alliance_lead;
}

export function getBusinessVintageFromEntry(age) {
  if (age === "Less Than 1 Year") {
    return 1;
  } else if (age === "1-3 Year") {
    return 3;
  } else if (age === "Above 3 Years") {
    return 5;
  }

  return 1;
}

export function getBusinessTurnoverFromEntry(turnover) {
  if (turnover === "0-25K") {
    return 25000;
  } else if (turnover === "25K-1 Lac") {
    return 100000;
  } else if (turnover === "1-5 Lacs") {
    return 500000;
  } else if (turnover === "5-25 Lacs") {
    return 2500000;
  } else if (turnover === "25 Lacs+") {
    return 2500000;
  }

  return 25000;
}

export function sourceConvert(source) {
  return source === "0"
    ? "SMS"
    : source === "1"
    ? "Whatsapp"
    : source === "2"
    ? "IVR"
    : source === "3"
    ? "RCS"
    : source === "4"
    ? "FB"
    : source === "5"
    ? "GO"
    : "";
}
