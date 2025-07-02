import React from 'react';
import HeroSection from '../../components/HeroSection/HeroSection';
import styles from './HomePage.module.css';
import Portfolio from '../../components/Portfolio/Portfolio';
import QuickStart from '../../components/QuickStart/QuickStart';
import ContactForm from '../../components/ContactForm/ContactForm';
import AboutUs from '../../components/AboutUs/AboutUs';
import Blog from '../../components/Blog/Blog';

const HomePage: React.FC = () => {
    return (
        <div className={styles.homePage}>
           <HeroSection />
           <Portfolio />
           <AboutUs />
           <QuickStart />
           <Blog />
           <ContactForm />
        </div>
    );
};

export default HomePage;
