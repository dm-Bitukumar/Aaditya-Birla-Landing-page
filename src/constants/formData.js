export const company_type_options = [
    {label: 'Private Limited', value: 'Private Limited'},
    {label: 'Public Limited', value: 'Public Limited'},
    {label: 'Limited liability partnership (LLP)', value: 'Limited liability partnership (LLP)'},
    {label: 'Partnership', value: 'Partnership'},
    {label: 'Proprietorship', value: 'Proprietorship'},
    {label: 'Government', value: 'Government'},
    {label: 'One Person Company', value: 'One Person Company'},
];

export const business_type_options = [
    { label: "Manufacturing", value: "Manufacturing" },
    { label: "Trading", value: "Trading" },
    { label: "Service", value: "Service" },
    { label: "Retailer", value: "Retailer" }
];

export const salary_mode_options = [
    {label: 'Cash', value: 'Cash'},
    {label: 'Cheque', value: 'Cheque'},
    {label: 'Online/NEFT', value: 'Online/NEFT'},
]

export const company_age_options = [
    {label: 'Less Than 1 Year', value: 'Less than 1 Year'},
    {label: '1-3 Year', value: '1-3 Year'},
    {label: 'Above 3 Years', value: 'Above 3 Years'}
];

export const typeOfBusinessOptions = [
    {label: 'Manufacturing', value: 'Manufacturing'},
    {label: 'Trading', value: 'Trading'},
    {label: 'Service', value: 'Service'},
    {label: 'Retailer', value: 'Retailer'}
];

export const turnoverOptions = [
    {label: '0-25K', value: '0-25K'},
    {label: '25K-1 Lac', value: '25K-1 Lac'},
    {label: '1-5 Lacs', value: '1-5 Lacs'},
    {label: '5-25 Lacs', value: '5-25 Lacs'},
    {label: '25 Lacs+', value: '25 Lacs+'}
];

export const gstOptions = [
    {label: 'Yes', value: 'Yes'},
    {label: 'No', value: 'No'},
]

export const pvtLtdProof = [
    {label: "Certificate of Incorporation", value: "Certificate of Incorporation"},
    {
        label: "Certificate of commencement of business (only for limited Companies incorporated under Companies Act 1956)",
        value: "Certificate of commencement of business (only for limited Companies incorporated under Companies Act 1956)"
    },
    {label: "Updated Memorandum & Articles of Association", value: "Updated Memorandum & Articles of Association"},
    {label: "PAN Card", value: "PAN Card"}
]

export const publicLtdProof = [
    { label: "Certificate of Incorporation", value: "Certificate of Incorporation" },
    { label: "Certificate of commencement of business (only for limited Companies incorporated under Companies Act 1956)", value: "Certificate of commencement of business (only for limited Companies incorporated under Companies Act 1956)" },
    { label: "Updated Memorandum & Articles of Association", value: "Updated Memorandum & Articles of Association" },
    { label: "PAN Card", value: "PAN Card" }
]

export const partnershipProof = [
    { label: "Registration Certificate (If the deed is registered)", value: "Registration Certificate (If the deed is registered)" },
    { label: "Partnership Declaration signed by all the partners (all pages should be on the letterhead and should be signed by all the partners)", value: "Partnership Declaration signed by all the partners (all pages should be on the letterhead and should be signed by all the partners)" },
    { label: "PAN Card (Mandatory)", value: "PAN Card (Mandatory)" },
    { label: "List of Partners along with capital/profit percentage (to be signed by all partners)", value: "List of Partners along with capital/profit percentage (to be signed by all partners)" },
    { label: "Certificate issued by registrar of firms, mentioning the name of the firm (If Applicable)", value: "Certificate issued by registrar of firms, mentioning the name of the firm (If Applicable)" }
]

export const llpProof = [
    { label: "LLP Agreement – Written Agreement between the partners or between the LLP and its partners", value: "LLP Agreement – Written Agreement between the partners or between the LLP and its partners" },
    { label: "Certificate of Incorporation issued by the Registrar of Cos", value: "Certificate of Incorporation issued by the Registrar of Cos" },
    { label: "LLP Resolution", value: "LLP Resolution" }
]

export const proprietorshipProof = [
    { label: "Registration certificate", value: "Registration certificate" },
    { label: "Shops & Establishment License issued by Municipal Authorities", value: "Shops & Establishment License issued by Municipal Authorities" },
    { label: "Municipal Registration", value: "Municipal Registration" },
    { label: "Monthly Sales Tax Returns filed with the Sales Tax Department (not more than 3 months old)", value: "Monthly Sales Tax Returns filed with the Sales Tax Department (not more than 3 months old)" },
    { label: "Certificate/registration document issued by Sales Tax/Service Tax/ProfessionalTax authorities", value: "Certificate/registration document issued by Sales Tax/Service Tax/ProfessionalTax authorities" },
    { label: "License/certificate of practice issued in the name of the proprietary concern by any professional body incorporated under a statute", value: "License/certificate of practice issued in the name of the proprietary concern by any professional body incorporated under a statute" },
    { label: "Complete Income Tax Return (not just the acknowledgement)", value: "Complete Income Tax Return (not just the acknowledgement)" }
]

export const govtProof = [
    { label: "Proprietorship", value: "Proprietorship" }
]

export const opcProof = [
    { label: "Private Limited", value: "Private Limited" },
    { label: "Public Limited", value: "Public Limited" }
]

export const companyTypeOptionsMap = {
    'Private Limited': pvtLtdProof,
    'Public Limited': publicLtdProof,
    'Limited liability partnership (LLP)': partnershipProof,
    'Partnership': llpProof,
    'Proprietorship': proprietorshipProof,
    'Government': govtProof,
    'One Person Company': opcProof,
}

export const categoryOptions = [
    {
        "label": "Advisory services (legal, business, educational, psychological etc.)",
        "value": "Advisory services (legal, business, educational, psychological etc.)",
        "labelKey": "Advisory services (legal, business, educational, psychological etc.)"
    },
    {
        "label": "Aircel distributor / R-com distributor",
        "value": "Aircel distributor / R-com distributor",
        "labelKey": "Aircel distributor / R-com distributor"
    },
    {
        "label": "Apparel, Readymade garments",
        "value": "Apparel, Readymade garments",
        "labelKey": "Apparel, Readymade garments"
    },
    {
        "label": "Arms and ammunition dealers",
        "value": "Arms and ammunition dealers",
        "labelKey": "Arms and ammunition dealers"
    },
    {
        "label": "Arts, design and other creative services",
        "value": "Arts, design and other creative services",
        "labelKey": "Arts, design and other creative services"
    },
    {
        "label": "Automobile accessories / service centre",
        "value": "Automobile accessories / service centre",
        "labelKey": "Automobile accessories / service centre"
    },
    {
        "label": "Automotive parts",
        "value": "Automotive parts",
        "labelKey": "Automotive parts"
    },
    {
        "label": "BPO/KPO & facility management",
        "value": "BPO/KPO & facility management",
        "labelKey": "BPO/KPO & facility management"
    },
    {
        "label": "Bar / Liquor",
        "value": "Bar / Liquor",
        "labelKey": "Bar / Liquor"
    },
    {
        "label": "CSC, photocopying and other documents and ID (Aadhar, PAN) related services, Kisan seva kendra",
        "value": "CSC, photocopying and other documents and ID (Aadhar, PAN) related services, Kisan seva kendra",
        "labelKey": "CSC, photocopying and other documents and ID (Aadhar, PAN) related services, Kisan seva kendra"
    },
    {
        "label": "Cab Services",
        "value": "Cab Services",
        "labelKey": "Cab Services"
    },
    {
        "label": "Camera, CCTV and related accessories",
        "value": "Camera, CCTV and related accessories",
        "labelKey": "Camera, CCTV and related accessories"
    },
    {
        "label": "Cargo and retail transport service",
        "value": "Cargo and retail transport service",
        "labelKey": "Cargo and retail transport service"
    },
    {
        "label": "Chain restaurant / verified income",
        "value": "Chain restaurant / verified income",
        "labelKey": "Chain restaurant / verified income"
    },
    {
        "label": "Chemist, Retail health accessories, medicines and supplements",
        "value": "Chemist, Retail health accessories, medicines and supplements",
        "labelKey": "Chemist, Retail health accessories, medicines and supplements"
    },
    {
        "label": "Clinics, hospital,nursing home, lab, gym, pet clinic etc.",
        "value": "Clinics, hospital,nursing home, lab, gym, pet clinic etc.",
        "labelKey": "Clinics, hospital,nursing home, lab, gym, pet clinic etc."
    },
    {
        "label": "Computer, Mobile and related accessories",
        "value": "Computer, Mobile and related accessories",
        "labelKey": "Computer, Mobile and related accessories"
    },
    {
        "label": "Computer, mobile and camera repairing service",
        "value": "Computer, mobile and camera repairing service",
        "labelKey": "Computer, mobile and camera repairing service"
    },
    {
        "label": "Construction equipment including building, road, sewage etc.",
        "value": "Construction equipment including building, road, sewage etc.",
        "labelKey": "Construction equipment including building, road, sewage etc."
    },
    {
        "label": "Construction material like cement, bricks, sand etc",
        "value": "Construction material like cement, bricks, sand etc",
        "labelKey": "Construction material like cement, bricks, sand etc"
    },
    {
        "label": "Corporate services / Corporate bookings",
        "value": "Corporate services / Corporate bookings",
        "labelKey": "Corporate services / Corporate bookings"
    },
    {
        "label": "Cotton bales, Textile manufacturing",
        "value": "Cotton bales, Textile manufacturing",
        "labelKey": "Cotton bales, Textile manufacturing"
    },
    {
        "label": "Countdown Timers, Electronic Scoreboards and Digital Clocks",
        "value": "Countdown Timers, Electronic Scoreboards and Digital Clocks",
        "labelKey": "Countdown Timers, Electronic Scoreboards and Digital Clocks"
    },
    {
        "label": "Courier,  \"Design, Fabrication & Painting Services\"",
        "value": "Courier,  \"Design, Fabrication & Painting Services\"",
        "labelKey": "Courier,  \"Design, Fabrication & Painting Services\""
    },
    {
        "label": "Distributor of cooking/commercial Gas",
        "value": "Distributor of cooking/commercial Gas",
        "labelKey": "Distributor of cooking/commercial Gas"
    },
    {
        "label": "Eco-friendly solutions for industry (solar, greenhouse, biomass, recycling, etc.)",
        "value": "Eco-friendly solutions for industry (solar, greenhouse, biomass, recycling, etc.)",
        "labelKey": "Eco-friendly solutions for industry (solar, greenhouse, biomass, recycling, etc.)"
    },
    {
        "label": "Edible Oil business",
        "value": "Edible Oil business",
        "labelKey": "Edible Oil business"
    },
    {
        "label": "Educational Institute (Pre-school, school, college, coaching center, library etc.)",
        "value": "Educational Institute (Pre-school, school, college, coaching center, library etc.)",
        "labelKey": "Educational Institute (Pre-school, school, college, coaching center, library etc.)"
    },
    {
        "label": "Educational products (books, educational toys, stationeries, e-learning etc.)",
        "value": "Educational products (books, educational toys, stationeries, e-learning etc.)",
        "labelKey": "Educational products (books, educational toys, stationeries, e-learning etc.)"
    },
    {
        "label": "Electronic sensors, devices",
        "value": "Electronic sensors, devices",
        "labelKey": "Electronic sensors, devices"
    },
    {
        "label": "Entertainment Event",
        "value": "Entertainment Event",
        "labelKey": "Entertainment Event"
    },
    {
        "label": "Equipment used in agriculture",
        "value": "Equipment used in agriculture",
        "labelKey": "Equipment used in agriculture"
    },
    {
        "label": "Event Management",
        "value": "Event Management",
        "labelKey": "Event Management"
    },
    {
        "label": "Fabric (woven and non-woven) & textiles",
        "value": "Fabric (woven and non-woven) & textiles",
        "labelKey": "Fabric (woven and non-woven) & textiles"
    },
    {
        "label": "Facility Management Services",
        "value": "Facility Management Services",
        "labelKey": "Facility Management Services"
    },
    {
        "label": "Fibres, threads, buttons and other raw materials supplier to textile industry",
        "value": "Fibres, threads, buttons and other raw materials supplier to textile industry",
        "labelKey": "Fibres, threads, buttons and other raw materials supplier to textile industry"
    },
    {
        "label": "Film Producer",
        "value": "Film Producer",
        "labelKey": "Film Producer"
    },
    {
        "label": "Financial service providers (Chit funds/ small finance companies/Stock broking Companies)",
        "value": "Financial service providers (Chit funds/ small finance companies/Stock broking Companies)",
        "labelKey": "Financial service providers (Chit funds/ small finance companies/Stock broking Companies)"
    },
    {
        "label": "Financial service providers (DSA,agents and other intermediators)",
        "value": "Financial service providers (DSA,agents and other intermediators)",
        "labelKey": "Financial service providers (DSA,agents and other intermediators)"
    },
    {
        "label": "Financial service providers (NBFCs/ Other money lending companies)",
        "value": "Financial service providers (NBFCs/ Other money lending companies)",
        "labelKey": "Financial service providers (NBFCs/ Other money lending companies)"
    },
    {
        "label": "Fire fighting equipment, safety materials",
        "value": "Fire fighting equipment, safety materials",
        "labelKey": "Fire fighting equipment, safety materials"
    },
    {
        "label": "Footwear, bags, cosmetics and other fashion accessories",
        "value": "Footwear, bags, cosmetics and other fashion accessories",
        "labelKey": "Footwear, bags, cosmetics and other fashion accessories"
    },
    {
        "label": "Freight forwarding services",
        "value": "Freight forwarding services",
        "labelKey": "Freight forwarding services"
    },
    {
        "label": "Furniture & Fixtures (including on rent)",
        "value": "Furniture & Fixtures (including on rent)",
        "labelKey": "Furniture & Fixtures (including on rent)"
    },
    {
        "label": "Grocery/ Kirana store / Departmental Store",
        "value": "Grocery/ Kirana store / Departmental Store",
        "labelKey": "Grocery/ Kirana store / Departmental Store"
    },
    {
        "label": "Hardware & Fittings (ceramics, tiles, cables, lights etc.)",
        "value": "Hardware & Fittings (ceramics, tiles, cables, lights etc.)",
        "labelKey": "Hardware & Fittings (ceramics, tiles, cables, lights etc.)"
    },
    {
        "label": "Hardware provider to telecom industry",
        "value": "Hardware provider to telecom industry",
        "labelKey": "Hardware provider to telecom industry"
    },
    {
        "label": "Heavy machineries & Robotics",
        "value": "Heavy machineries & Robotics",
        "labelKey": "Heavy machineries & Robotics"
    },
    {
        "label": "Home & Kitchen Appliances",
        "value": "Home & Kitchen Appliances",
        "labelKey": "Home & Kitchen Appliances"
    },
    {
        "label": "Home Decor, interior items, kitchen accessories, toys, gift articles",
        "value": "Home Decor, interior items, kitchen accessories, toys, gift articles",
        "labelKey": "Home Decor, interior items, kitchen accessories, toys, gift articles"
    },
    {
        "label": "Hotels, resorts and club",
        "value": "Hotels, resorts and club",
        "labelKey": "Hotels, resorts and club"
    },
    {
        "label": "Housekeeping products",
        "value": "Housekeeping products",
        "labelKey": "Housekeeping products"
    },
    {
        "label": "Housekeeping, security & industrial labour supply",
        "value": "Housekeeping, security & industrial labour supply",
        "labelKey": "Housekeeping, security & industrial labour supply"
    },
    {
        "label": "Imitation jewellery",
        "value": "Imitation jewellery",
        "labelKey": "Imitation jewellery"
    },
    {
        "label": "Industrial and customized software, applications and ITES",
        "value": "Industrial and customized software, applications and ITES",
        "labelKey": "Industrial and customized software, applications and ITES"
    },
    {
        "label": "Installation and repair services for telecom products",
        "value": "Installation and repair services for telecom products",
        "labelKey": "Installation and repair services for telecom products"
    },
    {
        "label": "Intelligence Agencies/ Private Security Firms",
        "value": "Intelligence Agencies/ Private Security Firms",
        "labelKey": "Intelligence Agencies/ Private Security Firms"
    },
    {
        "label": "Interior Designers",
        "value": "Interior Designers",
        "labelKey": "Interior Designers"
    },
    {
        "label": "Jewellery, precious metals and stones",
        "value": "Jewellery, precious metals and stones",
        "labelKey": "Jewellery, precious metals and stones"
    },
    {
        "label": "Law services, astrological services, etc.",
        "value": "Law services, astrological services, etc.",
        "labelKey": "Law services, astrological services, etc."
    },
    {
        "label": "Leather Trading,  \"Live Stock Trading\"",
        "value": "Leather Trading,  \"Live Stock Trading\"",
        "labelKey": "Leather Trading,  \"Live Stock Trading\""
    },
    {
        "label": "Material handling service provider",
        "value": "Material handling service provider",
        "labelKey": "Material handling service provider"
    },
    {
        "label": "Medical, non-medical & wellness equipments",
        "value": "Medical, non-medical & wellness equipments",
        "labelKey": "Medical, non-medical & wellness equipments"
    },
    {
        "label": "Mining & Mining Products",
        "value": "Mining & Mining Products",
        "labelKey": "Mining & Mining Products"
    },
    {
        "label": "Mobile and related accessories",
        "value": "Mobile and related accessories",
        "labelKey": "Mobile and related accessories"
    },
    {
        "label": "Mobile recharge, Telecom, DTH, data service provider (telephone, internet,broadband, ISP, leased line etc.)",
        "value": "Mobile recharge, Telecom, DTH, data service provider (telephone, internet,broadband, ISP, leased line etc.)",
        "labelKey": "Mobile recharge, Telecom, DTH, data service provider (telephone, internet,broadband, ISP, leased line etc.)"
    },
    {
        "label": "Musical Instruments, bulbs, tubelights",
        "value": "Musical Instruments, bulbs, tubelights",
        "labelKey": "Musical Instruments, bulbs, tubelights"
    },
    {
        "label": "Networking, storage, data management and other support services",
        "value": "Networking, storage, data management and other support services",
        "labelKey": "Networking, storage, data management and other support services"
    },
    {
        "label": "Non-metal products like wood, paper, plastic, glass, etc",
        "value": "Non-metal products like wood, paper, plastic, glass, etc",
        "labelKey": "Non-metal products like wood, paper, plastic, glass, etc"
    },
    {
        "label": "Oils, Paint, Chemicals and petroleum products",
        "value": "Oils, Paint, Chemicals and petroleum products",
        "labelKey": "Oils, Paint, Chemicals and petroleum products"
    },
    {
        "label": "Other metals, alloys, minerals and their scraps",
        "value": "Other metals, alloys, minerals and their scraps",
        "labelKey": "Other metals, alloys, minerals and their scraps"
    },
    {
        "label": "Others",
        "value": "Others",
        "labelKey": "Others"
    },
    {
        "label": "Outdoor furniture (swings etc.)",
        "value": "Outdoor furniture (swings etc.)",
        "labelKey": "Outdoor furniture (swings etc.)"
    },
    {
        "label": "Outsourced consultancy (recruitment, research, placement, transcription, visa etc.)",
        "value": "Outsourced consultancy (recruitment, research, placement, transcription, visa etc.)",
        "labelKey": "Outsourced consultancy (recruitment, research, placement, transcription, visa etc.)"
    },
    {
        "label": "Pet Shop, Pet Clinic & Pet Grooming Parlour",
        "value": "Pet Shop, Pet Clinic & Pet Grooming Parlour",
        "labelKey": "Pet Shop, Pet Clinic & Pet Grooming Parlour"
    },
    {
        "label": "Petrol pump & Gas station,  \"Power\"",
        "value": "Petrol pump & Gas station,  \"Power\"",
        "labelKey": "Petrol pump & Gas station,  \"Power\""
    },
    {
        "label": "Professional services (branding, media, architecture, saloon, beauty parlour etc.)",
        "value": "Professional services (branding, media, architecture, saloon, beauty parlour etc.)",
        "labelKey": "Professional services (branding, media, architecture, saloon, beauty parlour etc.)"
    },
    {
        "label": "Property dealing & management (Rent, lease or Sell)",
        "value": "Property dealing & management (Rent, lease or Sell)",
        "labelKey": "Property dealing & management (Rent, lease or Sell)"
    },
    {
        "label": "Raw materials and parts used for manufacturing",
        "value": "Raw materials and parts used for manufacturing",
        "labelKey": "Raw materials and parts used for manufacturing"
    },
    {
        "label": "Real estate developer, Civil contractor",
        "value": "Real estate developer, Civil contractor",
        "labelKey": "Real estate developer, Civil contractor"
    },
    {
        "label": "Renewal (other than Via)",
        "value": "Renewal (other than Via)",
        "labelKey": "Renewal (other than Via)"
    },
    {
        "label": "Repair and maintenance services",
        "value": "Repair and maintenance services",
        "labelKey": "Repair and maintenance services"
    },
    {
        "label": "Repair and servicing of household appliances",
        "value": "Repair and servicing of household appliances",
        "labelKey": "Repair and servicing of household appliances"
    },
    {
        "label": "Restaurants, Cafes, food outlets & catering",
        "value": "Restaurants, Cafes, food outlets & catering",
        "labelKey": "Restaurants, Cafes, food outlets & catering"
    },
    {
        "label": "Retail and standard softwares, applications and ITES",
        "value": "Retail and standard softwares, applications and ITES",
        "labelKey": "Retail and standard softwares, applications and ITES"
    },
    {
        "label": "Seeds, Fertilizer, Pesticides, Cattle feeds and agricultural products",
        "value": "Seeds, Fertilizer, Pesticides, Cattle feeds and agricultural products",
        "labelKey": "Seeds, Fertilizer, Pesticides, Cattle feeds and agricultural products"
    },
    {
        "label": "Shares/Bitcoins/Old coins trading or Other speculative activities",
        "value": "Shares/Bitcoins/Old coins trading or Other speculative activities",
        "labelKey": "Shares/Bitcoins/Old coins trading or Other speculative activities"
    },
    {
        "label": "Shipping Services",
        "value": "Shipping Services",
        "labelKey": "Shipping Services"
    },
    {
        "label": "Supplier for switches,cables etc",
        "value": "Supplier for switches,cables etc",
        "labelKey": "Supplier for switches,cables etc"
    },
    {
        "label": "Support services (facilitators, intermediators, agents, etc.)",
        "value": "Support services (facilitators, intermediators, agents, etc.)",
        "labelKey": "Support services (facilitators, intermediators, agents, etc.)"
    },
    {
        "label": "Support services to industries like industrial design, warehousing, testing, repairing etc.",
        "value": "Support services to industries like industrial design, warehousing, testing, repairing etc.",
        "labelKey": "Support services to industries like industrial design, warehousing, testing, repairing etc."
    },
    {
        "label": "Tax planners / Auditors",
        "value": "Tax planners / Auditors",
        "labelKey": "Tax planners / Auditors"
    },
    {
        "label": "Tea / coffee vending machine & Tea / Coffee powder to Government / corporates",
        "value": "Tea / coffee vending machine & Tea / Coffee powder to Government / corporates",
        "labelKey": "Tea / coffee vending machine & Tea / Coffee powder to Government / corporates"
    },
    {
        "label": "Ticket, Travel & Tour Packages",
        "value": "Ticket, Travel & Tour Packages",
        "labelKey": "Ticket, Travel & Tour Packages"
    },
    {
        "label": "Tobacco Products",
        "value": "Tobacco Products",
        "labelKey": "Tobacco Products"
    },
    {
        "label": "Tools and equipments including electricals,transformers, inverters and batteries",
        "value": "Tools and equipments including electricals,transformers, inverters and batteries",
        "labelKey": "Tools and equipments including electricals,transformers, inverters and batteries"
    },
    {
        "label": "Vegetables, Fruits, Milk and other dairy products, Spices, Sea-food and food-processing",
        "value": "Vegetables, Fruits, Milk and other dairy products, Spices, Sea-food and food-processing",
        "labelKey": "Vegetables, Fruits, Milk and other dairy products, Spices, Sea-food and food-processing"
    },
    {
        "label": "Vehicles (New/second hand)",
        "value": "Vehicles (New/second hand)",
        "labelKey": "Vehicles (New/second hand)"
    }
];

