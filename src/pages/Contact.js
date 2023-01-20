import React, {useEffect} from 'react';
import HeroSection from "../components/HeroSection/HeroSection";
import Banner from "../components/Banner";
import ContactSection from "../components/Contact/ContactSection";
import Map from "../components/Contact/Map";
import appendScript from "../appendScript";

function Contact(props) {
    return (
        <>

            <ContactSection/>
            <Map/>
        </>
    );
}

export default Contact;