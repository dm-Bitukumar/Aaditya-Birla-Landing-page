import {useState} from "react";
import HeadBar from "../../components/Static/HeadBar";
import Form from "./components/Form";

const PreApprovedLoan = () => {
    const [formData, setFormData] = useState({
        utm_campaign: '',
        utm_source: '',
        utm_medium: '',
        utm_content: '',
        click_id: '',
        aff_id: ''
    });

    return (
        <div className={'personal-loan-container'} style={{border: "1px solid #e1e1e1", borderRadius: "5px", maxHeight: "100vh"}}>
            <HeadBar />
            <Form formData={formData} setFormData={setFormData} />
        </div>
    );
}

export default PreApprovedLoan;
