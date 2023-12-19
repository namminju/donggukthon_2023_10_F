// Popup.js
import React, { useState, useEffect } from 'react';
import '../../Css/QuizPopup.css'; // Import the CSS file

import QuitPopup from './quit_popup';
import QuizEditPopup from './edit_popup';

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
  const [showQuitPopup, setShowQuitPopup] = useState(false);
  const [showQuizEditPopup, setShowQuizEditPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // 단계 1
  const [isAnswerEditMode, setIsAnswerEditMode] = useState(null);
  useEffect(() => {
    // 팝업이 열릴 때마다 API를 호출하여 데이터를 가져옴
    const fetchData = async () => {
      try {
        const response = await axios.get('./quiz.json');

        const quizData = response.data.data;
        console.log(response.data);
        const matchingquizData = quizData.find(quiz => quiz.quizId === Number(quizId));
        console.log(matchingquizData);
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

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode); // 단계 2
    console.log('sd');
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const toggleAnswerEditMode = (index) => {
    setIsAnswerEditMode((prevIndex) => (prevIndex === index ? null : index));
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
    setShowQuizEditPopup(true);
};

  const Quit_Popup = () => {
    setShowQuitPopup(true);
  };

  return (
    <div className="popup-overlay">
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div className="quizpopup">
          <div className='popup_back' onClick={Quit_Popup}>
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

            {isEditMode ? (
              <textarea
              value={quizData.question}
              onChange={(e) => setQuizData({ ...quizData, question: e.target.value })}
              className="font_normal" // Apply the class here
              style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  background: 'none',
                  border: 'none',
                  textAlign: 'center',
                  padding:'8% 8.5%',
                  width: '83%',
                  height: '28%',
                  display: 'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
            />
            ) : (
              <div>{quizData.question}</div>
            )}
            <div style={{ alignItems: 'flex-end', display: 'inline-flex', justifyContent: 'flex-end' }} onClick={toggleEditMode}>
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
                {isAnswerEditMode === index ? (
                  <input
                    type="text"
                    value={option}
                    className='font_answer_edit'
                    onChange={(e) => {
                      const updatedOptions = [...quizData.options];
                      updatedOptions[index] = e.target.value;
                      setQuizData({ ...quizData, options: updatedOptions });

                    
                    }}
                    onBlur={() => toggleAnswerEditMode(index)} // 포커스가 잃어졌을 때 편집 모드 종료
                  />
                ) : (
                  <div>{option}</div>
                )}
                <div style={{ textAlign: 'right' }}>
                  <img src={selectedAnswer === String(index + 1) ? yes_edit_Image : no_edit_Image} alt={`Answer ${index + 1}`} style={{ width: '65%' }}  onClick={() => toggleAnswerEditMode(index)}/>
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
      {showQuitPopup && (
        <QuitPopup // 컴포넌트 이름을 올바르게 수정합니다.
          message={`이 페이지를 벗어나면 마지막 저장 후\n수정된 내용은 저장되지 않아요!`}
          onQuit={() => {
            onConfirm();
          }}
          onConfirm_q={() => {
            setShowQuitPopup(false);
          }}
        />
      )}

      {showQuizEditPopup && (
        <QuizEditPopup // 컴포넌트 이름을 올바르게 수정합니다.
          message={`퀴즈 수정이 완료되었어요!`}
          onConfirm={() => {
            onConfirm();
            
          }}
        />
      )}
    </div>
  );
};

export default QuizPopup;
