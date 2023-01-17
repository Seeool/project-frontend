import React from "react";
import {Link} from "react-router-dom";

const Footer = () => {
    console.log("Footer 렌더링됨")
  return (
      <footer className="footer spad">
          <div className="container">
              <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6">
                      <div className="footer__about">
                          <div className="footer__about__logo">
                              <Link href="./index.html"><img src="img/logo.png" alt=""/></Link>
                          </div>
                          <ul>
                              <li>주소 : 부산광역시 부산진구 양정동</li>
                              <li>전화번호: 070-1234-1234</li>
                              <li>Email: Admin@email.com</li>
                          </ul>
                      </div>
                  </div>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                      <div className="footer__copyright">
                          <div className="footer__copyright__text">
                              <p>
                                  Copyright &copy;
                                  <script>
                                      document.write(new Date().getFullYear());
                                  </script>
                                  All rights reserved | This template is made with
                                  <i className="fa fa-heart" aria-hidden="true"></i> by
                                  <Link to="https://colorlib.com" target="_blank">Colorlib</Link>
                              </p>
                          </div>
                          <div className="footer__copyright__payment">
                              <img src="img/payment-item.png" alt=""/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </footer>
  );
};

export default Footer;
