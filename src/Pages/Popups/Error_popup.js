// Popup.js
import React from 'react';
import '../../Css/EditPopup.css'; // Import the CSS file
import '../../Css/Common.css';
const Popup = ({ message, onQuit,  onConfirm_q}) => {
    const renderTextWithLineBreaks = () => {
        // 텍스트에 포함된 '\n'을 '<br>'로 변환
        const textWithLineBreaks =  message.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ));
    
        return (
          <div style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>
            {textWithLineBreaks}
          </div>
        );
      };
  return (

      <div className="popup-overlay">
       
        <div className="Quitpopup">
          <img
            src={require('../../Image/Quit/Warning.png')}
            alt="receipt"
            style={{ width: '20%' }}
          />
          <div style={{textAlign:'center'}}>{renderTextWithLineBreaks()}</div>
          <div className='popup_button_container_3' >
          
          <button onClick={onConfirm_q} className='confirm_button'style={{width:'100%', height:'100%'}}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
