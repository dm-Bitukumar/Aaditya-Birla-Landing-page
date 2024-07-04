import React from "react";
import MainFooter from "./Homepage/components/MainFooter";
import { Link } from "react-router-dom";
import { setUserClickData } from "../utility/setUserClickData";

const PrivacyPolicy = () => {
  return (
    <div className="bg-black">
      <div className="w-full h-full container mx-auto leading-[26px] text-white ">
        <div className="px-20 ">
          <Link
            to={"/"}
            onClick={() => {
              setUserClickData({
                event_name: "link-to-home-page",
              });
            }}
          >
            <img
              className="pt-5"
              src="/assets/img/Digit-Money-Logo.png"
              alt=""
              width={150}
            />
          </Link>
          <h1 className="pt-5 text-2xl font-semibold">
            PRIVACY AND SECURITY POLICY
          </h1>
          <div className="pt-4 font-medium">
            <h1>1. INTRODUCTION:</h1>
            <p>
              DigitMoney Solutions Private Limited (hereinafter referred to as
              “DigitMoney/ we/ our”) acknowledges the expectations of its
              customers (hereinafter referred to as “customer/ you/ your”)
              regarding privacy, confidentiality and security of personal
              information that resides with the DigitMoney. Keeping personal
              information of customers secure and preventing any misuse thereof,
              is therefore, a top priority of DigitMoney.
            </p>
            <p className="pt-4 font-medium">
              We state that DigitMoney is strongly committed to protect the
              privacy of its customers and has taken all necessary and
              reasonable measures in line with applicable laws and regulations
              as well as the best industry practice to protect the
              confidentiality of your personal information and its transmission
              through our website.
            </p>
            <p className="pt-4 font-medium">
              This Privacy & Security Policy (hereinafter referred to as
              “Policy”) therefore, explains how we protect your personal
              information provided to us on our website i.e. www.digitmoney.in
              (hereinafter referred to as “Website”) and how we use that
              information in connection with the service offered through the
              Website (hereinafter called as "Service") and must be read in
              conjunction with our Terms of Use.
            </p>
            <p className="pt-4 font-medium">
              This Policy is published and shall be construed to be in
              accordance with the provisions of the Information Technology
              (Reasonable Security Practices and Procedures and Sensitive
              Personal Data of Information) Rules, 2011 under the Information
              Technology Act, 2000 and other applicable laws and regulations
              that require publishing of the privacy notice for collection,
              usage, storage, disclosure and transfer of sensitive personal data
              or information.
            </p>
            <div className="pt-4 font-medium ">
              <h1>2. PERSONAL INFORMATION</h1>
              <p>
                Personal Information (“PI”) means any information/ documents/
                details that relates to a natural person, which either directly
                or indirectly in combination with other information available
                with DigitMoney, can identify such person.
              </p>
            </div>
            <div className="pt-4 font-medium ">
              <h1>3. APPLICABILITY:</h1>
              <p>
                (i) This Policy applies to the PI such as details pertaining to
                your name, parentage, marital status, nationality, state/city of
                residence, residential address, e-mail address, date of birth,
                gender, contact number/mobile number, user ids, passwords,
                recent photograph, signature image, income proof, PAN, credit
                score, credit information report, e-KYC through UIDAI, Aadhaar
                based e-Sign and such other Know Your Customer (KYC) documents
                like address proof, identity proof, officially valid
                documents/details (OVDs) accepted for concluding a financial
                transaction, which may be shared/ uploaded by you, as and when
                you avail any products or use the Website and to which
                DigitMoney may become privy to. (ii) By visiting and/or using
                our Website, you agree to this Policy. Further, this policy
                applies to all current and former visitors to the Website. It is
                strongly recommended for you to return to this page periodically
                to review the most current version of the Policy. (iii)
                DigitMoney reserves the right at any time, at its sole
                discretion, to change or otherwise modify the Policy without
                prior notice, and your continued access or use of this Website
                signifies your acceptance of the updated or modified Policy.
                However, if we make any material change to the Policy, we will
                notify you by e-mail (sent to the e-mail address specified in
                your account) or by means of a notice on this Website prior to
                the change becoming effective.
              </p>
            </div>
            <div className="pt-4 font-medium">
              <h1>4. WHAT PERSONAL INFORMATION ABOUT YOU WE GATHER:</h1>
              <p>
                The information we learn from customers helps us personalize and
                continually improve your experience at the Website.
              </p>
            </div>
            <div className="pt-4 font-medium ">
              <h1>Here are the types of information we gather:</h1>
              <p>
                • We receive and store any information you enter on our Website
                or give us in any other way. You can choose not to provide
                certain information but then you might not be able to take
                advantage of many of our services and features.
                <p>
                  • We receive and store certain types of information whenever
                  you interact with us. For example, like, we use "cookies" and
                  we obtain certain types of information when your web browser
                  accesses the Website or advertisements and other content
                  served by or on behalf of the Website on other websites. We
                  may also receive/store information about your location and
                  your mobile device, including a unique identifier for your
                  device.
                </p>
              </p>
              <p>
                • We might receive information about you from other sources and
                add it to our account information.
              </p>
            </div>

            <div className="pt-4 font-medium ">
              <h1>How do We Use The Information:</h1>
              <p>
                DigitMoney collects your information when you register for an
                account, when you use its products or services, visit its
                Website's pages. When you register with the Website and sign in
                you are not anonymous to us. Also, you are asked for your
                contact number and other details during registration and may be
                sent SMS, electronic mails (“e-mails”) , IVR, notifications,
                Whatsapp messages about our services to your wireless device.
              </p>
            </div>
            <div className="pt-4 font-medium ">
              <h1>5. EXPRESS CONSENT:</h1>
              <p>
                (i) By making use of the Website, and furnishing your personal
                and contact details, you hereby agree that you are interested in
                knowing more or availing and/or purchasing various products,
                services, offers, campaigns or other promotional material that
                DigitMoney or any other third party may offer/provide/share/send
                you from time to time through any means including but not
                limited to telephone, SMS (short messaging service), IVR,
                electronic mail (e-mail), Whatsapp or any other messaging
                service/mobile application or any other physical, electronic or
                digital means/mode . You hereby agree that DigitMoney may
                contact you either electronically or through phone, to
                understand your interest in the selected products and Services
                and to fulfil your demand or complete your application. Further
                you also expressly agree and authorize DigitMoney and its
                partners, service providers, vendors and other third parties to
                contact you for the purpose of offering or inviting your
                interest in availing other products or services offered by third
                parties, or for sending other marketing campaigns, offers, or
                any other information either on the Website or through other
                means including but not limited to telephone, SMS (short
                messaging service), IVR, electronic mail (e-mail), Whatsapp or
                any other messaging service/mobile application or any other
                physical, electronic or digital means/mode. You agree and
                authorize DigitMoney to share your information with its group
                companies, vendors, service providers, business partners, agents
                and other third parties, in so far as required for marketing
                purposes/offering/cross-selling various other products and
                services and/or to provide you with various value-added
                services, in relation with the Services selected by you or
                generally otherwise. You agree to receive communications through
                emails, telephone, IVR, Whatsapp, SMS, or any other form of
                messaging/communication service from DigitMoney or such third
                parties. You also agree that DigitMoney reserves the right to
                make your details available to its partner banks/financial
                institutions or any such other third party and that you may be
                contacted by the partners and/or the third party for information
                through email, telephone, IVR, Whatsapp and/or SMS.
              </p>
            </div>
            <p className="pt-4 font-medium ">
              (ii) The usage of the Website may also require you to provide
              consent for keying in your Personal Information (“PI”) (including
              but not limited to any personal data or sensitive personal data as
              defined under applicable law) or to authorize DigitMoney to derive
              your data/information from any other source or public registry, as
              may be necessary to complete your profile or your application on
              the Website, conduct due diligence on you, assessing your
              eligibility for the products/services, undertaking
              know-your-customer (“KYC”) checks by DigitMoney or any other third
              party and/or to process your application through this Website.
              Your PI may also be used or shared with third parties including
              but not limited to our vendors, service providers, credit
              information agencies, analytics and research partners, other banks
              or financial institutions, insurers or intermediaries or any other
              third party with the intent of making your experience on the
              Website better, faster and paperless and frictionless to the
              extent possible. DigitMoney shall adhere to best industry
              practices including information security, data protection and
              privacy law while processing such applications. However,
              DigitMoney shall not be liable to you against any liability or
              claims which may arise out of such transactions as any such PI is
              being collected, used, processed and shared with your explicit
              consent.
            </p>
          </div>
          <p className="pt-4 font-medium ">
            (iii) You hereby authorize and expressly consent us to share your PI
            with third parties including but not limited to Credit Information
            Companies (“CIC”) to do an aggregate check of your credit profile
            for DigitMoney to send you targeted communications and offers.
          </p>
          <p className="pt-4 font-medium ">
            (iv) If you are no longer interested in sharing your PI, please
            e-mail your request at: privacy@DigitMoney.com. Please note that it
            may take about 72 business hours to process your request. In
            furtherance to your usage of the Website, you expressly waive the Do
            Not Call (DNC) / Do Not Disturb (DND) registrations on your
            phone/mobile numbers for contacting you for such purpose and usage.
            Hence, there will be no DNC / DND check required for the number you
            may have left on our Website. Such modes of contacting you may
            include sending SMSs and/ or telephonic calls.
          </p>
          <p className="pt-4 font-medium ">
            (v) DigitMoney reserves the right (and you expressly authorize
            DigitMoney) to share or disclose your PI when DigitMoney determines,
            in its sole discretion, that the disclosure of such information is
            necessary or appropriate under the law for the time being in force
          </p>
          <div className="pt-4 font-medium ">
            <h1>6. CREDIT INFORMATION REPORT:</h1>
            <p>
              (i) Your Credit Information (credit score and credit information
              report) is procured through a 'soft search' of your credit records
              with Credit Information Companies “CICs” and DigitMoney has no
              control over the content or accuracy of information provided in
              your credit information by CICs. DigitMoney gets this information
              from CIC for and on your behalf only when you agree to appoint
              DigitMoney as your lawfully appointed authorized agent/
              representative for collecting your credit information from CICs.
              By consenting to use and avail your credit information report
              through DigitMoney, you agree that DigitMoney and CICs shall be
              entitled to rely on your authorization and consent granted by you
              to DigitMoney.
            </p>
          </div>
          <p className="pt-4 font-medium ">
            (ii) Availing your credit information through DigitMoney is subject
            to your passing of appropriate identity authentication for security
            and privacy purposes. DigitMoney shall not notify you the reasons if
            you are unable to pass such identity authentications and not able to
            view and/or use your credit information.
          </p>
          <p className="pt-4 font-medium ">
            (iii) DigitMoney may analyze and profile your credit information in
            order to assist you in being better informed about, understand and
            manage your credit score/rating, identify and inform you of credit
            products that are likely to be suited to your circumstances, to
            identify whether you may benefit from additional guidance concerning
            your credit score and steps you can take to improve your score and
            credit history etc.
          </p>

          <div className="pt-4 font-medium ">
            <h1>7. OPT-OUT:</h1>
            <p>
              In case you do not want to be disturbed over telephonic calls,
              kindly email us with details of the telephone number(s) on which
              you do not wish to be contacted and submit the same at
              privacy@DigitMoney.in from your email address registered at
              DigitMoney. The details that you provide through the opt-out email
              will remain confidential and once you have submitted the same to
              us, your telephone number(s) will be removed from all our
              telemarketing calling lists within 15 working days. We will make
              every effort to ensure that you do not get any further
              telemarketing calls on such telephone number(s).
            </p>
          </div>
          <div className="pt-4 font-medium ">
            <h1>8. PURPOSE AND USAGE:</h1>
            <p>
              (i) DigitMoney will not sell or rent your PI to anyone for
              commercial purposes to anyone in a way that is contrary to the
              commitments made and/or other than as set forth in this Privacy
              Policy. Notwithstanding the foregoing, we may share your
              information to an affiliate and/or business partner. DigitMoney
              may also share, sell, and/or transfer your personally identifiable
              information to any successor-in-interest as a result of a sale of
              any part of our business or upon the merger, reorganization, or
              consolidation of it with another entity on a basis that it is not
              the surviving entity. As used in this Privacy Policy, the term
              "Person" includes any natural person, corporation, partnership,
              limited liability company, trust, unincorporated association, or
              any other entity). We limit the collection and use of your
              personal information. We may make anonymous or aggregate personal
              information and disclose such data only in a non-personally
              identifiable manner. Such information does not identify you
              individually. Access to your account information and any other
              personal identifiably information is strictly restricted and used
              only in accordance with specific internal procedures, and for the
              purposes set out in this Privacy Policy, in order to operate,
              develop or improve our services. We may use third party service
              providers to enable you to provide with our services. We may also
              share your information, without obtaining your prior written
              consent, with government agencies mandated under the law to obtain
              information for the purpose of verification of identity, or for
              prevention, detection, investigation including cyber incidents,
              prosecution, and punishment of offences, or where disclosure is
              necessary for compliance of a legal obligation. You agree and
              consent for the Website to disclose your information, if so
              required, under applicable law. There are number of
              products/services such as loans, credit cards, mutual funds,
              offered by third Parties on the Website, such as lenders, banks,
              credit card issuers. If you choose to apply for these separate
              products or services, disclose information to these providers,
              then their use of your information is governed by their privacy
              policies in addition to the Privacy Policy of the Website.
              DigitMoney is not responsible for their privacy policies. We
              encourage you to visit and read about the privacy notices and
              procedures adopted by these third parties/providers, when you
              apply for their products or services.
            </p>
          </div>

          <p className="pt-3 font-medium">
            Further DigitMoney may use your information to:
          </p>
          <div className="pt-4 font-medium ">
            <p>
              1. Communicate with you about products, services and promotional
              offers offered by DigitMoney or by its business partners, or other
              third parties
            </p>
            <p>
              2. Assist third parties like our business partners and/or service
              providers in facilitating and delivering products and services to
              you, process payments and your applications
            </p>
            <p>
              3. send you any administrative notices, offer alerts and other
              communications relevant to your use of the Website;
            </p>
            <p>
              4. display tailored product offers to you and enable you to apply
              for certain products and services;
            </p>
            <p>
              Send you information about special promotions or offers offered by
              DigitMoney or any of its business partners. We might also tell you
              about new features or products/services. These might be our own
              offers or products/services, or third-party offers or
              products/services with whom DigitMoney has a tie - up
            </p>

            <p>
              6. carry market research, project planning, troubleshooting
              issues, detecting and protecting against error, fraud or other
              criminal activity;
            </p>
            <p>
              7. improve our Services and manage our customer relationships
              better, and to provide you with location-based services, such as
              advertising, search results, and other personalized content;
            </p>
            <p>8. enforce DigitMoney General Terms of Use;</p>
            <p>9. comply with all applicable laws and regulations.</p>
            <p>
              You also agree and consent to us collecting, storing, processing,
              transferring and sharing information (including sensitive personal
              information) related to you with third parties or service
              providers for the purposes as set out in this Privacy Policy.
            </p>
          </div>
          <p className="pt-4 font-medium ">
            (ii) In the event that you access the Service as brought to you by
            one of our partners either through the Website or on being
            redirected from a co-branded URL or any other website , your name,
            e-mail address, mobile number, date of birth, employment type,
            residency status, income details/proofs, Form 26 AS, PAN, details of
            loan / credit card/ mutual fund applied for and loan, credit card
            and mutual fund status or any other financial product status may be
            provided to that partner when your application is submitted and
            whenever the status of application is updated. DigitMoney has a
            business relationship with these partners and you may not opt-out of
            sharing your information with these partners if you have applied via
            a co-branded URL or any other website or directly through the
            Website as the case may be.
          </p>
          <p className="pt-4 font-medium ">
            (iii) For availing the Service such as applying for credit
            information report, loan, credit card, mutual fund or any other
            financial product we will require you to provide/upload on the
            Website the details such as a your name, parentage, marital status,
            email address, nationality, location, mobile number, PAN, employment
            & income details/proofs, Form 26 AS, recent photograph, signature
            image, other Know Your Customer (KYC) documents like address proof,
            identity proof and personally identifying information about a
            potential co-loan applicant (should you select this option), and to
            participate on our forum boards, you must provide a username for
            yourself.
          </p>
          <p className="pt-4 font-medium ">
            (iv) You may opt out of location-based services at any time by
            editing the setting of your browser.
          </p>
          <p className="pt-4 font-medium ">
            (v) In order to provide your bank statement or pay slip
            electronically along with your loan application, you also must
            provide your third-party account credentials ("Account Credentials")
            to allow DigitMoney to retrieve your account data at those other
            financial institutions ("Account Information") for your use. Your
            Account Credentials are only used once to retrieve your bank
            statements/pay slips, Form 26 AS and are not stored in our system.
            DigitMoney shall not be liable to you against any liability or
            claims which may arise out of such transactions being carried on
            your own accord.
          </p>
          <p className="pt-4 font-medium ">
            (vi) We may also use third party service providers to provide the
            Service to you, such as sending e-mail messages on our behalf or
            hosting and operating a feature or functionality of the Service. Our
            contracts with these third parties outline the appropriate use and
            handling of your information and prohibit them from using any of
            your PI for purposes unrelated to the product or service they're
            providing. We require such third parties to maintain the
            confidentiality of the information provide to them.
          </p>
          <div className="pt-4 font-medium ">
            <h1>9. DISCLOSURE / SHARING:</h1>
            <p>
              (i) DigitMoney does not disclose PI of a customer except as
              directed by law or as consent received from the customer /
              applicant.. No specific information about customer accounts or
              other personally identifiable data is shared with third parties
              unless any one of the following conditions is met:
            </p>
          </div>
          <div className="pt-4 font-medium ">
            <p>1. To help complete a transaction initiated by you;</p>
            <p>
              2. To perform support services through a third-party service
              provider, provided it conforms to the Privacy Policy of the
              DigitMoney;
            </p>
            <p>
              3. You have specifically authorized it by accepting the General
              Terms of Use of the Website or otherwise;
            </p>
            <p>
              4. Where the disclosure is necessary for compliance of a legal
              obligation or as required by law, such as to comply with a
              subpoena, or similar legal process;
            </p>
            <p>
              5. When we believe in good faith that disclosure is necessary to
              protect our rights, protect your safety or the safety of others,
              investigate fraud, or respond to a government request;
            </p>
          </div>
          <p className="pt-4 font-medium ">
            (iii) DigitMoney shall not be held liable for disclosure of the PI
            when used in accordance with this Privacy Policy or in terms of the
            ‘General Terms of Use’ of Website or an agreement, if any, with the
            users of Website .
          </p>
          <div className="pt-4 font-medium ">
            <h1>
              10. INTIMATION BY CUSTOMERS REGARDING CHANGE IN PERSONAL
              INFORMATION:
            </h1>
            <p>
              (i) If your PI provided to us when you had applied for a product
              on our Website changes, you may update it whenever you apply for a
              new product via our Website. To review and update your PI and to
              ensure that the same is accurate while your application is in
              process, you may contact us at hello@digitmoney.in. You will not
              be able to update the information you have provided in an
              application after a decision has already been made on it; however,
              you may create and submit a new application with your updated
              information.
            </p>
          </div>
          <p className="pt-4 font-medium ">
            (ii) Note: We will retain your information for as long as your
            account is active or as needed to provide you services. If you wish
            to cancel your account or request that we no longer use your
            information to provide you services, contact us at
            hello@digitmoney.in. We will respond to your request within a
            reasonable timeframe. However, we will retain and use your
            information as necessary to comply with our legal obligations,
            resolve disputes, and to enforce our agreements.
          </p>
          <div className="pt-4 font-medium">
            <h1>11. RETENTION OF YOUR DATA:</h1>

            <p>
              (i) DigitMoney will retain your information for as long as it is
              necessary for providing you the Services available on the Website
              or your request for termination of your account with DigitMoney,
              whichever is later.
            </p>
          </div>
          <p className="pt-4 font-medium">
            (ii) Post termination of your account, DigitMoney may continue to
            use your anonymized data aggregated or in combination with
            anonymized data of other users. We use this aggregated anonymized
            data for data analysis, profiling and research purposes, for example
            to gain insights about our users and their profiles. We may keep
            your contact information along with your application details (if
            any) for fraud prevention purposes and for the exercise/defense of a
            legal claim or for providing evidence in legal proceeding(s).
          </p>
          <div className="pt-4 font-medium">
            <h1>12. EMAIL & SMS COMMUNICATIONS FROM US AND OUR PARTNERS:</h1>
            <p>
              We provide our registered customers with periodic phone calls,
              IVR, emailers and email/SMS/Whatsapp alerts. We also allow users
              to subscribe to email newsletters and from time to time may
              transmit emails promoting DigitMoney or third-party products.
              Subject to the express consent clause above, DigitMoney’s Website
              subscribers may opt-out of receiving our promotional emails and
              terminate their newsletter subscriptions by following the
              instructions in the emails. Opting out in this manner will not end
              transmission of service-related e-mails/SMS/IVR/Whatsapp, such as
              e-mail/SMS alerts. The above services are also provided by our
              partners.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>13. LOG FILES:</h1>
            <p>
              This information may include internet protocol (IP) addresses,
              browser type, internet service provider (ISP), referring/exit
              pages, operating system, date/time stamp, and/or clickstream data.
              We may use the collected log information about you to improve
              services offered to you, to improve marketing, analytics, or
              Website functionality.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>14. TRACKING TECHNOLOGIES:</h1>
            <p>
              DigitMoney and its partners use cookies or similar technologies to
              analyze trends, administer the website, track users’ movements
              around the website, and to gather demographic information about
              our user base. You can control the use of cookies at the
              individual browser level, but if you choose to disable cookies, it
              may limit your use of certain features or functions on our website
              or service.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>15. BEHAVIOURAL TARGETING / RE-TARGETING:</h1>
            <p>
              We partner with a third-party service provider to either display
              advertising on our Website or to manage our advertising on other
              websites. Our third-party partner may use technologies such as
              cookies to gather information about your activities on this
              Website and other websites in order to provide you advertising
              based upon your browsing activities and interests.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>
              16. THIRD PARTIES WILL NOT BE GIVEN YOUR PERSONAL INFORMATION
              UNLESS YOU GIVE CONSENT TO DIGITMONEY :
            </h1>
            <p>
              There are several products and services, such as credit
              information report, loans, credit cards, mutual fund and other
              financial products being offered by third parties on our Website,
              such as lenders, banks, credit card issuers and mutual funds
              (collectively "Offers"). If you choose to apply for these separate
              products or services, disclose information to the providers, or
              grant them permission to collect information about you, then their
              use of your information is governed by their privacy policies. You
              should evaluate the practices of these external services providers
              before deciding to use their services. DigitMoney is not
              responsible for their privacy practices.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>
              17. TESTIMONIALS, BLOGS AND OTHER FORUMS ON DIGITMONEY WEBSITE:
            </h1>
            <p>
              (i) With your consent DigitMoney may post your testimonial along
              with your name. If you want your testimonial removed, please
              contact DigitMoney at hello@digitmoney.in.
            </p>
            <p>
              (ii) If you use a blog, comments section or other public forum on
              Website, any information you submit there can be read, collected
              or used by other users and could be used to send you messages.
              DigitMoney shall not be held responsible for the PI you choose to
              submit in these forums.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>18. ADDITIONAL POLICY INFORMATION:</h1>
            <p>
              (i) Widgets: Our website includes widgets, which are interactive
              mini-programs that run on our Website to provide specific services
              from another company (e.g. displaying the news, opinions, music,
              etc.). PI, such as your email address, may be collected through
              the widget. Cookies may also be set by the widget to enable it to
              function properly. Information collected by this Widget is
              governed by the privacy policy of the company that created it and
              not by the DigitMoney.
            </p>
            <p>
              (ii) Single Sign-On: You can log in to our Website using sign-in
              services such as Facebook Connect or an Open ID provider. These
              services will authenticate your identity and provide you the
              option to share certain PI with us such as your sign-in
              information, name and email address to link between the sites.
              Social networking media services like Facebook & Twitter give you
              the option to post information about your activities on this
              Website to your profile page to share with others within your
              network.
            </p>
            <p>
              (iii) Like Button: If you use the "Like" button to share something
              that item will appear on your Facebook profile page and on your
              friends’ newsfeed depending on your Facebook privacy settings. You
              may also receive updates in your Facebook newsfeed from this
              Website or item in the future. Facebook also collects information
              such as which pages you have visited on this and other sites that
              have implemented the "Like" button.
            </p>
            <p>
              (iv) Links to 3rd Party Sites: Our Website includes links to other
              websites whose privacy practices may differ from those of
              DigitMoney. If you submit your PI to any of those sites, your
              information is governed by their privacy policies. We encourage
              you to carefully read the privacy policy of any website you visit.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>19. WE KEEP YOUR DATA SECURE:</h1>
            <p>
              (i) We follow generally accepted standards to protect the PI
              submitted to us, both during transmission and once we receive it.
              Since no method of transmission over the Internet, or method of
              electronic storage, is 100% secure, therefore, we cannot guarantee
              its absolute security. If you have any questions about security on
              our Website, you can contact us at hello@DigitMoney.com.
            </p>
            <p>
              (ii) We use a combination of firewalls, encryption techniques and
              authentication procedures, among others, to maintain the security
              of your online session and to protect DigitMoney online accounts
              and systems from unauthorized access.
            </p>
            <p>
              (iii) When you register for the Service, DigitMoney requires a
              password from you for your privacy and security. DigitMoney
              transmits information such as your login credentials for Website
              or Account Credentials securely.
            </p>
            <p>
              (iv) Our servers are in secure facilities where access requires
              multiple levels of authentication, including an identity card and
              biometrics recognition procedures. Security personnel monitor the
              facilities 7 days a week, 24 hours a day.
            </p>
            <p>
              (v) Our databases are protected from general employee access both
              physically and logically. We encrypt your Service password so that
              your password cannot be recovered, even by us. All backup drives
              and tapes also are encrypted.
            </p>
            <p>
              (vi) We enforce physical access controls to our buildings. No
              employee can put PI on any insecure machine (i.e., nothing can be
              taken from the database and put on an insecure laptop). We permit
              only authorized employees who are trained in the proper handling
              of customer information, to have access to aforesaid PI.
            </p>
            <p>
              (vii) DigitMoney has been verified for its use of SSL encryption
              technologies. In addition, However, it is important to understand
              that these precautions apply only to our Website and systems.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>
              20. ALL PRIVATE INFORMATION IS ENCRYPTED AND COMMUNICATED
              SECURELY:
            </h1>
            <p>
              All communications between your computer/mobile and our Website
              that contain any PI are encrypted. This enables client and server
              applications to communicate in a way that is designed to prevent
              eavesdropping, tampering and message forgery.
            </p>
          </div>
          <div className="pt-4 font-medium">
            <h1>
              21. YOU ARE RESPONSIBLE FOR MAINTAINING THE CONFIDENTIALITY OF
              YOUR LOGIN ID AND PASSWORD:
            </h1>
            <p>
              (i) You are responsible for maintaining the security of your login
              ID and Password and must not provide these credentials to any
              third party. If you believe that they have been stolen or been
              made known to others, you must contact us immediately at
              privacy@DigitMoney.com. We are not responsible if someone else
              accesses your account through the login credential they have
              obtained from you or through a violation by you of this Privacy
              and Security Policy or the DigitMoney Terms of Use.
            </p>
            <p>
              (ii) If you have any security related concern, please contact us
              at hello@DigitMoney.com. We will work closely with you to ensure a
              rapid and personal response to your concerns. 22. CONTACT US WITH
              ANY QUESTIONS OR CONCERNS (GRIEVANCE REDRESSAL): If you have
              grievance or complaint, questions, comments, concerns or feedback
              in relation to the processing of information or regarding this
              Privacy and Security Policy or any other privacy or security
              concern, send an e-mail to hello@DigiMoney.in.
            </p>
          </div>
          <p className="pt-4 font-medium">
            Last update: The Privacy Policy was last updated on 28th April 2022.
          </p>
        </div>
        <div className="h-10"></div>
      </div>
      <MainFooter />
    </div>
  );
};

export default PrivacyPolicy;
