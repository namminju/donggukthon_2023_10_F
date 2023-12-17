// Popup.js
import React from 'react';
import '../../Css/EditPopup.css'; // Import the CSS file
import '../../Css/Common.css';
const Popup = ({ message, onConfirm }) => {
  return (

      <div className="popup-overlay">
        <div className='full_container'>
        <div className="popup">
          <img
            src={require('../../Image/MyIgloo/igloo.png')}
            alt="receipt"
            style={{ width: '25%' }}
          />
          <div>{message}</div>
          <button onClick={onConfirm} className='confirm_button'>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
