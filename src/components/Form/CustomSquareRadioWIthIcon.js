import React, { useState } from 'react';

const CustomSquareRadioWithIcon = ({ onChange }) => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        if (onChange) {
            onChange(option);
        }
    };

    return (
        <div className="d-flex justify-content-between">
            <div className={`radio-shadow d-flex align-items-center px-4 ${selectedOption === 'yes' ? 'active' : ''}`} style={{width: "48%", cursor: "pointer"}} onClick={() => handleOptionChange('yes')}>
                    <input hidden type="radio" id="yes_val" value="yes" name="is_gst" required="" checked={selectedOption === 'yes'} onChange={() => {}} />
                    <p className="text-center" style={{textAlign: "center", width: "90%", fontSize: '14px'}}>Yes</p>
                    {selectedOption === 'yes' && <img src="/assets/icons/tick.png" id="yes_img" alt="Tick" style={{height: '16px', position: 'relative', right: '0px'}}/>}
            </div>
            <div className={`radio-shadow d-flex align-items-center px-4 ${selectedOption === 'no' ? 'active' : ''}`} style={{width: "48%", cursor: "pointer"}} onClick={() => handleOptionChange('no')}>
                    <input hidden type="radio" id="no_val" value="no" name="is_gst" required="" checked={selectedOption === 'no'} onChange={() => {}} />
                    <p className="text-center" style={{textAlign: "center", width: "90%", fontSize: '14px'}}>No</p>
                    {selectedOption === 'no' && <img src="/assets/icons/tick.png" id="no_img" alt="Tick" style={{height: '16px', position: 'relative', right: '0px'}}/>}
            </div>
        </div>
    );
};

export default CustomSquareRadioWithIcon;
