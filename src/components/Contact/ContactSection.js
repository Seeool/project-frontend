import React from 'react';

function ContactSection(props) {
    return (
        <section className="contact spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                        <div className="contact__widget">
                            <span className="icon_phone"></span>
                            <h4>전화문의</h4>
                            <p>070-1234-1234</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                        <div className="contact__widget">
                            <span className="icon_pin_alt"></span>
                            <h4>주소</h4>
                            <p>부산광역시 부산진구 양정동</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                        <div className="contact__widget">
                            <span className="icon_clock_alt"></span>
                            <h4>영업 시간</h4>
                            <p>오전 09시 - 오후 5시</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                        <div className="contact__widget">
                            <span className="icon_mail_alt"></span>
                            <h4>Email</h4>
                            <p>Admin@email.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;