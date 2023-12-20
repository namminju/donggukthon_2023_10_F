import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/Login.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로

function Quiz_edit() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([
    { id: 1, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 2, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 3, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 4, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 5, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 6, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 7, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 8, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 9, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    { id: 10, question: '', options: ['', '', '', ''], correctAnswer: 1 },
    // ... (나머지 9개의 문제)
  ]);

  const handleQuestionChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = Number(e.target.value);
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    // 저장 로직 추가
    // 저장 로직을 작성하고 저장이 완료되면 다음 페이지로 이동하도록 설정
    navigate('/다음페이지'); // 다음 페이지로 이동하는 코드로 변경
  };

  return (
    <div className='full_container'>
      {questions.map((question, index) => (
        <div key={index} className='question_container'>
          <label htmlFor={`question${index + 1}`} className='question_label'>
            문제 {index + 1}
          </label>
          <textarea
            id={`question${index + 1}`}
            value={question.question}
            onChange={(e) => handleQuestionChange(index, e)}
          />
          <div className='options_container'>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className='option_container'>
                <label htmlFor={`option${index + 1}_${optionIndex + 1}`} className='option_label'>
                  보기 {optionIndex + 1}
                </label>
                <input
                  type='text'
                  id={`option${index + 1}_${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e)}
                />
              </div>
            ))}
          </div>
          <div className='correct_answer_container'>
            <label htmlFor={`correctAnswer${index + 1}`} className='correct_answer_label'>
              정답
            </label>
            <select
              id={`correctAnswer${index + 1}`}
              value={question.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(index, e)}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
          </div>
        </div>
      ))}
      <button onClick={handleSave}>저장</button>
    </div>
  );
}

export default Quiz_edit;
