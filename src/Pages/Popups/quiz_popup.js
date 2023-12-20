// Popup.js
import React, { useState, useEffect , useRef} from 'react';
import '../../Css/QuizPopup.css'; // Import the CSS file

import QuitPopup from './quit_popup';
import QuizEditPopup from './edit_popup';

import '../../Css/Common.css';
import noImage from '../../Image/Quiz/no.png';
import yesImage from '../../Image/Quiz/yes.png';

import no_edit_Image from '../../Image/Quiz/no_edit.png';
import yes_edit_Image from '../../Image/Quiz/yes_edit.png';
import data from './quiz.json';

import axios from 'axios';

const QuizPopup = ({ owner, onConfirm }) => {
  const scoreRef = useRef(0);
  const [quizId, setQuizId] = useState(0);
  const [all, setAll] = useState([]);
  
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showQuitPopup, setShowQuitPopup] = useState(false);
  const [showQuizEditPopup, setShowQuizEditPopup] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isAnswerEditMode, setIsAnswerEditMode] = useState(null);

  owner = 'true';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('./quiz.json');
        const quizData = response.data.data;
        setAll(quizData);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchData();
  }, []);

  const handleRadioChange = (answer) => {
    setSelectedAnswer(answer);
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const toggleAnswerEditMode = (index, option) => {
    console.log(`index : ${index}, option : ${option}`)
    const newAll = all.slice();
    newAll[quizId].options[index] = option;
    setAll(newAll);
    setIsAnswerEditMode((prevIndex) => (prevIndex === index ? null : index));
  };

  const goToNextPopup = () => {
    console.log("제출:" + selectedAnswer);
    console.log("정답:" + all[quizId].correctAnswer);
    console.log("이전 점수: " + scoreRef.current);

    if (selectedAnswer === all[quizId].correctAnswer) {
      scoreRef.current = scoreRef.current + 10;
    }
    
    console.log("이후 점수: " + scoreRef.current);
    console.log("전체 데이터 : " + all);
    setSelectedAnswer(null);
    setIsEditMode(false);

    if(all.length <= quizId) {
      return;
    }

    setQuizId((prevId) => prevId + 1);
    openPopup();
  };

  const goToPreviousPopup = () => {
    // 다음 퀴즈로 이동하기 전에 라디오 버튼 초기화
    setSelectedAnswer(null);

    if(0 >= quizId) {
      return;
    }

    // 다음 퀴즈로 이동하기 위해 quizId를 감소시키고 팝업을 엽니다.
    setQuizId((prevId) => prevId - 1);
    openPopup();
  };


  const SavePopup = () => {
    setShowQuizEditPopup(true);
};

  const Quit_Popup = () => {
    setShowQuitPopup(true);
  };

  if (all.length === 0) {
      return <></>;
  }

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
          <div className='quiz_number_style'>{quizId + 1}/10</div>
          <div className='quiz_container'>
            {isEditMode ? (
              <textarea
                value={all[quizId].question}
                onChange={(e) => {
                  const newAll = all.slice();
                  newAll[quizId].question = e.target.value;
                  setAll(newAll);
                }}
                className="font_normal"
                style={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  background: 'none',
                  border: 'none',
                  textAlign: 'center',
                  padding: '8% 8.5%',
                  width: '83%',
                  height: '28%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            ) : (
              <div>{all[quizId].question}</div>
            )}
            <div style={{ alignItems: 'flex-end', display: 'inline-flex', justifyContent: 'flex-end' }} onClick={toggleEditMode}>
              {owner && (
                <img
                  src={require('../../Image/Quiz/answer_edit.png')}
                  alt="receipt"
                  style={{ width: '7.5%', height: 'auto' }}
                />
              )}
            </div>
          </div>
          <div></div>
          <form className='answer_container'>
            {all[quizId].options && all[quizId].options.map((option, index) => (
              <label key={index} htmlFor={`answer${index + 1}`} className={`answer_box ${selectedAnswer === option ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="answer"
                  value={String(index + 1)}
                  id={`answer${index + 1}`}
                  style={{ display: 'none' }}
                  onChange={() => handleRadioChange(option)} // Set selectedAnswer to option
                />
                <div className="custom-radio">
                  <img src={selectedAnswer === option ? yesImage : noImage} alt={`Answer ${index + 1}`} />
                </div>
                {isAnswerEditMode === index ? (
                  <input
                    type="text"
                    value={all[quizId].options[index]}
                    className='font_answer_edit'
                    onChange={(e) => {
                      const newAll = all.slice();
                      newAll[quizId].options[index] = e.target.value;
                      setAll(newAll);
                    }}
                  />
                ) : (
                  <div>{option}</div>
                )}
                <div style={{ textAlign: 'right' }}>
                  {owner && (
                    <img
                      src={selectedAnswer === option ? yes_edit_Image : no_edit_Image}
                      alt={`Answer ${index + 1}`}
                      style={{ width: '65%' }}
                      onClick={() => toggleAnswerEditMode(index, option)}
                    />
                  )}
                </div>
              </label>
            ))}
          </form>
          <div className='quiz_last_button'>
            {quizId === 0 ? (
              <div></div>
            ) : (
              <img
                src={require('../../Image/Quiz/Previous.png')}
                alt="Previous"
                style={{ width: '50%' }}
                onClick={goToPreviousPopup}
              />
            )}
            {quizId === 9 ? (
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
