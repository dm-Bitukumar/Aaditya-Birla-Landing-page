import React from 'react'
import Header from '../../Components/Header/Header'
//import bgImage from "/assets/img/Offer-bg.png"
//import bgImage from "/assets/img/Offer-bg.png"
import './OfferPage.css'

const OfferPage = () => {
  return (
    <div className='main'>
      <div className='main-header'
      style={{backgroundImage : "url('/assets/img/Offer-bg.png')", height:"424px",backgroundPosition:"center", backgroundRepeat:"no repeat",backgroundSize:"cover"}}
 
      >
        
        <Header />
        <div className='offer-hero-heading'>
          <h2> <span> Congratulations!</span> <br/> You're Pre-Approved <br /> for a Personal Loan!</h2>
        </div>

      </div>
      <div className="card-container">
         <img
           src="/assets/icons/abfl-logo.png"
           alt="Aditya Birla Capital"
           className="logo-abfl"
         />
         <div className='hr'> </div>
         <h4 className="pre-approved">Pre-Approved Amount</h4>
   
         <h2 className="amount">₹2,51,635*</h2>
   
         <button type="submit" className="offer-claim-btn">
        <span>Claim Offer Now</span><img src="/assets/icons/Layer_1 (14).png " alt="" height={14} width={14} />
      </button>
   
         
       </div>
       <p className="disclaimer">
           *Annual household income refers to the yearly income of the entire household
       </p>
        <p className="disclaimer1" >
            *These pre-approved offers are subject to change at discretion of Bank / NBFC after receiving all you documents and details. Final offer will be based on risk policy of Bank / NBFC. We do not guarantee that final offer will be same as Pre-approved offer.
        </p>
    </div>
  )
}

export default OfferPage