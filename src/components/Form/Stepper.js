import React from 'react';
import '../css/stepper.css';

const Stepper = ({ steps = [], currentStep }) => {
    return (
        <div className="form-header d-flex mb-5 mt-2">
            {steps.map((step, index) => (
                <span key={index} className={`stepIndicator ${index === currentStep ? 'active' : ''}`}>
          {step.split(' ').map((word, wordIndex) => (
              <React.Fragment key={wordIndex}>
                  {word}
                  {wordIndex !== step.split(' ').length - 1 && <br />}
              </React.Fragment>
          ))}
        </span>
            ))}
        </div>
    );
};

export default Stepper;
