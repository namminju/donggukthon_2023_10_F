import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Start.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로

function Start() {
  const navigate = useNavigate();

  useEffect(() => {
    // 10초 후에 '/your-next-page'로 이동
    const timeoutId = setTimeout(() => {
      navigate('/login');
    }, 5000); // 10000 밀리초 = 10초

    // 컴포넌트가 언마운트되면 타이머를 클리어하여 메모리 누수를 방지
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className='full_container'>
      <div className='intro'>
        <div>
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
      </div>
      </div>
    </div>
  );
}

export default Start;
