import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Css/Start.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로

function Start() {
  return (
    <div className='full_container'>
      <div className='intro'>
        <div style={{display:'grid', gridTemplateRows:' 2fr 0.5fr 0.5fr 0.5fr 2fr'}}>
        <div></div>
        <div className='igloo_intro'>
          <div>이글루 소개</div>
          <div>둘줄 정도로다가 짜란</div>
        </div>
        <div className='igloo_intro_sub'>
          <div>이글루를 통해 이룰 수 있는 것</div>
          <div>내용 짧게 짜라란</div>
        </div>
        <div className='animal_freiends'>
          <img
            src={require('../Image/Start/펭.png')}
            alt="receipt"
            style={{ width: '90%', height: 'auto' }}
          />
          <img
            src={require('../Image/Start/사슴.png')}
            alt="receipt"
            style={{ width: '90%', height: 'auto' }}
          />
          <img
            src={require('../Image/Start/곰.png')}
            alt="receipt"
            style={{ width: '90%', height: 'auto' }}
          />
          <img
            src={require('../Image/Start/토끼.png')}
            alt="receipt"
            style={{ width: '90%', height: 'auto' }}
          />
          <img
            src={require('../Image/Start/너구리.png')}
            alt="receipt"
            style={{ width: '90%', height: 'auto' }}
          />
        </div>
        <div></div>
        <div>
          <Link to='/myigloo'  style={{display:'flex', justifyContent:'center'}}>
              <button className='google_button_80'>
                <img
                src={require('../Image/Login/google.png')}
                alt="receipt"
                id='logo'
                />
                구글로 시작하기
              </button>
              </Link>
              </div>
      </div>
      
      </div>

    </div>
  );
}

export default Start;
