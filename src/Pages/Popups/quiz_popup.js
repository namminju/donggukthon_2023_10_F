// Popup.js
import React, { useState, useEffect } from 'react';
import '../../Css/QuizPopup.css'; // Import the CSS file
import '../../Css/Common.css';
import noImage from '../../Image/Quiz/no.png';
import yesImage from '../../Image/Quiz/yes.png';

import no_edit_Image from '../../Image/Quiz/no_edit.png';
import yes_edit_Image from '../../Image/Quiz/yes_edit.png';

import axios from 'axios';

const QuizPopup = ({ onConfirm }) => {
  const [quizId, setQuizId] = useState(1);
  const [quizData, setQuizData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 팝업이 열릴 때마다 API를 호출하여 데이터를 가져옴
    const fetchData = async () => {
      try {
        const response = await axios.get('./quiz.json');
        const matchingquizData = response.data.find(quiz => quiz.id === Number(quizId));

        if (matchingquizData) {
          setQuizData(matchingquizData);
        } else {
          console.log('에러');
          // 상품을 찾을 수 없을 때의 처리 추가
        }
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, [isOpen, quizId]);

  const handleRadioChange = (answer) => {
    setSelectedAnswer(answer);
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const goToNextPopup = () => {
    // 다음 퀴즈로 이동하기 위해 quizId를 증가시키고 팝업을 다시 엽니다.
    setQuizId(prevId => prevId + 1);
    openPopup();
  };

  const goToPreviousPopup = () => {
    // 다음 퀴즈로 이동하기 위해 quizId를 증가시키고 팝업을 다시 엽니다.
    setQuizId(prevId => prevId - 1);
    openPopup();
  };
  const SavePopup = () => {
    // 다음 퀴즈로 이동하기 위해 quizId를 증가시키고 팝업을 다시 엽니다.
      onConfirm();
  };
  return (
    <div className="popup-overlay">
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="quizpopup">
          <div className='popup_back'>
            <img
              src={require('../../Image/Quiz/back.png')}
              alt="receipt"
              style={{ width: '5%' }}
            />
            &emsp;퀴즈 나가기
          </div>
          <div></div>
          <div className='quiz_number_style'>{quizId}/10</div>
          <div className='quiz_container'>
            <div>{quizData.question}</div>
            <div style={{ alignItems: 'flex-end', display: 'inline-flex', justifyContent: 'flex-end' }}>
              <img
                src={require('../../Image/Quiz/answer_edit.png')}
                alt="receipt"
                style={{ width: '7.5%', height: 'auto' }}
              />
            </div>
          </div>
          <div></div>
          <form className='answer_container'>
            {quizData.options && quizData.options.map((option, index) => (
              <label key={index} htmlFor={`answer${index + 1}`} className={`answer_box ${selectedAnswer === String(index + 1) ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="answer"
                  value={String(index + 1)}
                  id={`answer${index + 1}`}
                  style={{ display: 'none' }}
                  onChange={() => handleRadioChange(String(index + 1))}
                />
                <div className="custom-radio">
                  <img src={selectedAnswer === String(index + 1) ? yesImage : noImage} alt={`Answer ${index + 1}`} />
                </div>
                <div>{option}</div>
                <div style={{ textAlign: 'right' }}>
                  <img src={selectedAnswer === String(index + 1) ? yes_edit_Image : no_edit_Image} alt={`Answer ${index + 1}`} style={{ width: '65%' }} />
                </div>
              </label>
            ))}
          </form>
          <div className='quiz_last_button'>
            {quizId === 1 ? (
              <div></div>
            ) : (
              <img
                src={require('../../Image/Quiz/Previous.png')}
                alt="Previous"
                style={{ width: '50%' }}
                onClick={goToPreviousPopup}
              />
            )}
            {quizId === 10 ? (
              <img
                src={require('../../Image/Quiz/save.png')}
                alt="exit"
                style={{ width: '50%' }}
                onClick={SavePopup}
              />
            ) : (
              <img
                src={require('../../Image/Quiz/next.png')}
                alt="next"
                style={{ width: '50%' }}
                onClick={goToNextPopup}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPopup;
