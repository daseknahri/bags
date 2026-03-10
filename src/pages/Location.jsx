import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Map } from 'lucide-react';
import { api } from '../api';
import './Location.css';

const LocationPage = () => {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        api.getSettings().then(s => {
            if (s?.contactInfo) setContact(s.contactInfo);
        }).catch(() => { });
    }, []);

    const address = contact?.address || '123 Tech Avenue, Silicon District, Casablanca, Morocco';
    const phone1 = contact?.phone1 || '+212 600 123 456';
    const phone2 = contact?.phone2;
    const email1 = contact?.email1 || 'hello@pcparadise.ma';
    const email2 = contact?.email2;
    const hours = contact?.hours || 'Mon - Sat: 9:00 AM - 8:00 PM';
    const mapUrl = contact?.mapUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.5600072049!2d-7.669394541796874!3d33.58988620000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca%2C%20Morocco!5e0!3m2!1sen!2sus!4v1709848512345!5m2!1sen!2sus';

    return (
        <div className="location-page container animate-fade-in">
            <div className="location-hero">
                <h1>Visit <span className="accent">Our Store</span></h1>
                <p>Come experience our premium technology firsthand.</p>
            </div>

            <div className="location-content">
                <div className="contact-info">

                    <div className="info-card glass-panel">
                        <div className="info-icon">
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h3>Address</h3>
                            <p>{address}</p>
                        </div>
                    </div>

                    <div className="info-card glass-panel">
                        <div className="info-icon">
                            <Phone size={24} />
                        </div>
                        <div>
                            <h3>Phone</h3>
                            <p>{phone1} <br /> {phone2 && phone2}</p>
                        </div>
                    </div>

                    <div className="info-card glass-panel">
                        <div className="info-icon">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h3>Email</h3>
                            <p>{email1} <br /> {email2 && email2}</p>
                        </div>
                    </div>

                    <div className="info-card glass-panel">
                        <div className="info-icon">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h3>Hours</h3>
                            <p>{hours}</p>
                        </div>
                    </div>

                </div>

                <div className="map-container glass-panel">
                    {/* Using a generic Google maps embed iframe for visual representation */}
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Store Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default LocationPage;
