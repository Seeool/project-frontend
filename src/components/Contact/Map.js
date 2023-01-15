import React from 'react';

function Map(props) {
    return (
        <div className="map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d815.3583059295843!2d129.06916965491743!3d35.17075339140611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3568eb57c68af5d9%3A0xb1de1c0e5032b7b3!2z7JaR7KCV7Jet!5e0!3m2!1sko!2skr!4v1673789501995!5m2!1sko!2skr"
                height="500"
                style={{border: '0'}}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
            ></iframe>
            <div className="map-inside">
                <div className="inside-widget">
                    <h4>OGANI</h4>
                    <ul>
                        <li>전화: 070-1234-1234</li>
                        <li>주소: 부산광역시 부산진구 양정동</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Map;