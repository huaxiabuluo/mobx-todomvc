import React   from 'react';
import Header  from './header';
import MainSection from './main-section';
import Footer from './footer';
import { observer } from 'mobx-react';

export default () => (
    <>
        <Header />
        <MainSection />
        <Footer />
    </>
);
