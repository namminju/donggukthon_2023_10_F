// Popup.js
import React, { useState, useEffect } from 'react';
import '../../Css/RankingPopup.css';
import '../../Css/Common.css';
import axios from 'axios';

const RankingPopup = ({ owner, onBack, onConfirm }) => {
  const [Rankings, setRankings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('./rank.json');
      setRankings(response.data);
      console.log(Rankings.rank);
    } catch (error) {
      console.error('API 오류', error);
    }
  };

  const repeatContent = () => {
    const repeatedContent = [];

    repeatedContent.push(
      <React.Fragment key="top">
        <div className='top'>
          {Rankings.slice(0, 3).map((item, index) => (
            <React.Fragment key={index}>
              <div className='ranking_content_container'>
                <img
                  src={require(`../../Image/Ranking/ranking${index + 1}.png`)}
                  alt="receipt"
                  style={{ width: '50%', justifySelf: 'center' }}
                />
                <div>{item.nickname}</div>
                <div>{item.score}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </React.Fragment>
    );

    for (let i = 3; i < Rankings.length; i++) {
      let rankContent;

      rankContent = (
        <React.Fragment key={i}>
          <div className='ranking_content_container'>
            <div>{i + 1}위</div>
            <div>{Rankings[i].nickname}</div>
            <div>{Rankings[i].score}</div>
          </div>
        </React.Fragment>
      );

      repeatedContent.push(rankContent);
    }

    return repeatedContent;
  };
  return (
    <div className="popup-overlay">
      <div style={{ width: '100%', maxWidth: '420px' }}>
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='ranking_container'>{repeatContent(15)}</div>
          </div>
          <button
            onClick={onConfirm}
            style={{ marginTop: '0' }}
            className='move_button'
          >
            {owner ? '퀴즈 수정하기' : '퀴즈 풀기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankingPopup;
