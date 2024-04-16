import React from 'react';
import { Accordion } from 'react-bootstrap';

const FaqsSection = () => {
    return (
        <section className="faqs" id="faqs">
            <div className="container m-auto">
                <div className="heading">
                    FAQ's
                </div>
                <div className="row" id="accordionExample">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-12">
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey={'0'}>
                                        <Accordion.Header>
                                            What is DigitMoney and how does it work?
                                        </Accordion.Header>
                                        <Accordion.Body eventKey="0">
                                            Coming Soon...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey={'1'}>
                                        <Accordion.Header>
                                            What is Personal Loan and how it works?
                                        </Accordion.Header>
                                        <Accordion.Body eventKey="1">
                                            Coming Soon...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey={'2'}>
                                        <Accordion.Header>
                                            How do I know if I qualify for a loan with DigitMoney?
                                        </Accordion.Header>
                                        <Accordion.Body eventKey="2">
                                            Coming Soon...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-12">
                                <Accordion>
                                    <Accordion.Item eventKey={'0'}>
                                        <Accordion.Header>
                                            What loan products does DigitMoney offer?
                                        </Accordion.Header>
                                        <Accordion.Body eventKey="0">
                                            Coming Soon...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey={'1'}>
                                        <Accordion.Header>
                                            How can I apply for a loan with digitMoney?
                                        </Accordion.Header>
                                        <Accordion.Body eventKey="1">
                                            Coming Soon...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey={'2'}>
                                        <Accordion.Header>
                                            Are you bank of an NBFC?
                                        </Accordion.Header>
                                        <Accordion.Body eventKey="2">
                                            Coming Soon...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey={'3'}>
                                        <Accordion.Header>
                                            I don't own a smartphone. Can I apply?
                                        </Accordion.Header>
                                        <Accordion.Body eventKey="3">
                                            Coming Soon...
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqsSection;
