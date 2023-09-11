import React from 'react';
import MenuBar from './menuBar';
import image from '../images/image.jpg';

export default function LandingPage() {
  const inlineStyles = {
    background: `url(${image}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh',
    margin: '0px',
    padding: '0px',
  };

  return (
    <div style={inlineStyles}>
      <div style={{marign: '0px', padding: '0px'}}>
        <MenuBar/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
        <span><h3>Welcome to The Learning Hub</h3></span>
      </div>
    </div>
  );
}
