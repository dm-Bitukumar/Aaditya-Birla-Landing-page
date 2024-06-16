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
} from "./enum";
const INDIAN_COUNTRY_CODE = "91";

export function getProfessionTypeFromEntry(profession) {
  profession = profession.split(", ");

  let professionTypes = [];

  if (profession.includes("Salaried")) {
    professionTypes.push(SALARIED);
  }
  if (profession.includes("self employed")) {
    professionTypes.push(SELF_EMPLOYED);
  }
  if (profession.includes("business owner")) {
    professionTypes.push(BUSINESS_OWNER);
  }

  return professionTypes;
}

export function getSalaryModeFromEntry(salary_mode) {
  salary_mode = salary_mode.split(", ");
  let salaryModes = [];

  if (salary_mode.includes("Online/NEFT")) {
    salaryModes.push(ONLINE_NEFT);
  }
  if (salary_mode.includes("Cheque")) {
    salaryModes.push(CHEQUE);
  }
  if (salary_mode.includes("Cash")) {
    salaryModes.push(CASH);
  }

  return salaryModes;
}

export function getAllianceLeadFromMoneyTapInput(alliance_id, lead) {
  let alliance_lead = {};
  alliance_lead.contact_name = lead.name;
  alliance_lead.contact_phone = lead.contact_phone;
  alliance_lead.country_code = INDIAN_COUNTRY_CODE;
  alliance_lead.contact_email = lead.email;
  alliance_lead.dob = moment(lead.dob).toISOString();
  alliance_lead.gender = lead.gender === "Male" ? MALE : FEMALE;
  alliance_lead.loan_type =
    lead.company_type !== "" ? BUSINESS_LOAN : PERSONAL_LOAN;
  alliance_lead.is_company = lead.company_type !== "";
  alliance_lead.address1 = "";
  alliance_lead.address2 = "";
  alliance_lead.city = "";
  alliance_lead.state = "";
  alliance_lead.company_type = lead.company_type?.toLowerCase() ?? "";
  alliance_lead.gst = lead.gst_no;
  alliance_lead.turnover = getBusinessTurnoverFromEntry(lead.turnover);
  alliance_lead.business_vintage = getBusinessVintageFromEntry(
    lead.company_age
  );
  alliance_lead.pincode = lead.pincode;
  alliance_lead.profession_type = getProfessionTypeFromEntry(lead.profession);
  alliance_lead.monthly_income = lead.monthly_income;
  alliance_lead.annual_income = 0;
  alliance_lead.pancard = lead.pancard;
  alliance_lead.salary_mode = getSalaryModeFromEntry(lead.salary_mode);
  alliance_lead.alliance_id = alliance_id;
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
    return 10000000;
  }

  return 25000;
}
