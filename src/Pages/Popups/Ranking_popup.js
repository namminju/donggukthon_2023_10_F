// Popup.js
import React from 'react';
import '../../Css/RankingPopup.css'; // Import the CSS file
import '../../Css/Common.css';
const RankingPopup = ({ onBack, onConfirm }) => {
  const repeatContent = (count) => {
    const repeatedContent = [];
  
    repeatedContent.push(
      <React.Fragment>
        <div className='top'>
          {Array.from({ length: 3 }, (_, i) => (
            <React.Fragment key={i} className="top-ranking">
              <div className='ranking_content_container'>
                <img
                  src={require(`../../Image/Ranking/ranking${i + 1}.png`)}
                  alt="receipt"
                  style={{ width: '50%', justifySelf: 'center' }}
                />
                <div>홍길동</div>
                <div>80</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );
  
    for (let i = 3; i < count; i++) {
      let rankContent;
  
      rankContent = (
        <React.Fragment key={i}>
          <div className='ranking_content_container'>
            <div>{i + 1}위</div>
            <div>홍길동</div>
            <div>80</div>
          </div>
        </React.Fragment>
      );
  
      repeatedContent.push(rankContent);
    }
  
    return repeatedContent;
  };
  


  return (
      <div className="popup-overlay">
      <div style={{ width:'100%',maxWidth: '420px' }}>
        <div className="rankingpopup">
          <div className='popup_back' onClick={onBack}>
            <img
              src={require('../../Image/Ranking/back.png')}
              alt="receipt"
              style={{ width: '5%' }}
            />
            &emsp;이글루로 돌아가기
          </div>
          
          <div></div>
          <div className='ranking_title_container'>
              <div className='ranking_title'>순위</div>
              <div className='ranking_title'>이름</div>
              <div className='ranking_title'>점수</div>
          </div>
          <div style={{display:'flex', justifyContent:'center'}}>
            <div className='ranking_container'>
            {repeatContent(15)}
            </div>
          </div>
          <button onClick={onConfirm} style={{marginTop:'0'}} className='move_button'>퀴즈 수정하기</button>
        </div>
      </div>
    </div>
  );
};

export default RankingPopup;
