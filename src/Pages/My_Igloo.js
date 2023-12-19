// My_Igloo.js
import React, { useState , useRef, useEffect  } from 'react';
import '../Css/My_Igloo.css'; // 스타일 파일 경로
import '../Css/Common.css'; // 스타일 파일 경로
import Popup from './Popups/edit_popup.js'; // Import your Popup component
import RankingPopup from './Popups/Ranking_popup.js';
import QuizPopup from './Popups/quiz_popup.js';
import PaperPopup from './Popups/Paper/paper_popup.js';
import CopyPopup from "./Popups/edit_popup.js";
import API from '../API/axios';
import axios from 'axios';

function My_Igloo() {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState('');
  const [maxTextLength, setMaxTextLength] = useState(100);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showRankingPopup, setShowRankingPopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [editedTitle, setEditedTitle] = useState("누군가");
  const [showPaperPopup, setShowPaperPopup] = useState(false);
  const [owner, setOwner] = useState(false); // New state for owner
  const [copyCode, setcopyCode] = useState("000000"); // New state for owner

  const handleEditClick = () => {
    // 수정 중일 때와 수정 중이 아닐 때의 토글 로직
    if (isEditing) {
      setShowEditPopup(true);
    } else {
      setIsEditing(!isEditing);
    }

    // TODO: 여기에서 editedTitle 상태를 활용하여 실제로 수정된 내용을 처리할 수 있음
    console.log("수정된 내용:", editedTitle);
  };
  const handleRankingButtonClick = () => {
    setShowRankingPopup(true);
  };

  const handlePopupCancel = () => {
    setShowEditPopup(false);
  };

  const handlePopupConfirm = () => {
    // Save changes or perform other actions
    setIsEditing(false);
    setShowEditPopup(false); // 팝업 닫기
  };
  const handleRankingPopupConfirm = () => {
    // Save changes or perform other actions
    setShowRankingPopup(false); // 팝업 닫기
  };

  const handlePaperPopupClick = () => {
    // Save changes or perform other actions
    setShowPaperPopup(true); // 팝업 닫기
  };

  const handleTextAreaChange = (event) => {
    const newText = event.target.value;
    const newlineCount = (newText.match(/\n/g) || []).length;

    // 최대 허용 줄 수
    const maxNewlines = 2;

    // 최대 허용 줄 수를 초과하면 입력을 막음
    if (newlineCount > maxNewlines) {
      alert("허용X");
      return;
    }

    // 최대 길이 감소
    const minLength = 100;
    const newMaxLength = Math.max(maxTextLength - 30, minLength);

    setMaxTextLength(newMaxLength);
    setTextValue(newText);
  };

  const renderTextWithLineBreaks = () => {
    // 텍스트에 포함된 '\n'을 '<br>'로 변환
    const textWithLineBreaks = textValue.split('\n').map((line, index) => (
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
  const textAreaRef = useRef(null);

  const copyToClipboard = async () => {
    try {
      if (textAreaRef.current) {
        await navigator.clipboard.writeText(textAreaRef.current.textContent);
        console.log('Text copied to clipboard');
      } else {
        console.error('textAreaRef is not available');
      }
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };
  const copyPopup = async () => {
    setShowCopyPopup(true);
  };

  const CopyPopup = () => {
    copyToClipboard();
    copyPopup();
  };

  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const endpoint = "/mainPage.json";
    const access_token = localStorage.getItem('access');
    const code = localStorage.getItem('code'); // code를 가져옴
  
    try {
      const response = await axios.get(endpoint, {
        code: code // code를 데이터로 전달
      }, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      setDatas(response.data);
      setEditedTitle(datas.data.nickname);
      setOwner(datas.data.owner);
      setcopyCode(datas.data.code);
      console.log(datas.data.code);
    } catch (error) {
      datas.nickname = '';
      console.error("API 오류", error);
    }
  };





  return (
    <div className='full_container'>
      <div className='background'>
        
        <div>
          <div className='center_container'>
            <div className='title_container'>
              <div>
                <img
                  src={require('../Image/MyIgloo/igloo.png')}
                  alt="MyIgloo"
                  className='logo'
                />
              </div>

              {isEditing ? (
        <div className='title'>
          <input
            type='text'
            name='id'
            className='input_font_style'
            style={{width:'35%', textAlign:'center', aspectRatio:'1.5/1'}}
            placeholder='변경할 이글루의 이름을 입력하세요!'
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            required
          />의 이글루
        </div>
      ) : (
        <div className='title'>
          {editedTitle}의 이글루
        </div>
      )}
      <button
        style={{ background: 'transparent', border: 'none' }}
        onClick={handleEditClick}
      >
        <img
          src={require('../Image/MyIgloo/edit2.png')}
          alt="edit"
          className='edit'
        />
      </button>
            </div>
          </div>

          <div className='center' >
            <div className='inline' onClick={CopyPopup} style={{ cursor: 'pointer' }}>
            <div ref={textAreaRef} style={{ textDecoration: 'underline' }}>
              {copyCode}
            </div>
            &nbsp;
            <img
              src={require('../Image/MyIgloo/Vector.png')}
              alt="receipt"
              className='vector'
            />
           </div>
          </div>

          <div className='center_container'>
            
          </div>
        </div>




        <div className='center_container'>
          <div className='last_button_container'>
            <button className='button' onClick={handleRankingButtonClick}>
              퀴즈 바로가기
            </button>
            <button className='button' onClick={handlePaperPopupClick}>
              롤링페이퍼
            </button>
          </div>
        </div>
      </div>

      {/* Render the Popup component conditionally */}
      {showEditPopup && (
        <Popup
          message='이글루의 이름이 변경되었어요!'
          onConfirm={handlePopupConfirm}
        />
      )}

    {showRankingPopup && (
        <RankingPopup
          onBack={()=>{
            handleRankingPopupConfirm();

          }}
          onConfirm={() => {
            setShowRankingPopup(false);
            setShowQuizPopup(true);
          }}
        />
      )}

      {showQuizPopup && (
        <QuizPopup
          onConfirm={() => {
            // Handle QuizPopup confirm logic here
            setShowQuizPopup(false);
          }}
        />
      )}

      {showCopyPopup && (
        <Popup
          message={'초대코드가 복사되었어요!'}
          onConfirm={() => {
            // Handle CopyPopup confirm logic here
            
            setShowCopyPopup(false);
          }}
        />
      )}
    {showPaperPopup && (
        <PaperPopup
          onConfirm={() => {
            // Handle QuizPopup confirm logic here
            setShowPaperPopup(false);
          }}
        />
      )}
      
    </div>
  );
}

export default My_Igloo;
