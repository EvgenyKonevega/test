import React from 'react';
import Header from './components/Header';
import Content from './components/Content';

import './Page.css';

const Page = () => {
  return (
    <div className="app">
      <Header />
      <Content />
    </div>
  );
};

export default Page;
