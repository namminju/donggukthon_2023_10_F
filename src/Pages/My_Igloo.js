// My_Igloo.js
import React, { useState, useRef } from "react";
import "../Css/My_Igloo.css"; // 스타일 파일 경로
import "../Css/Common.css"; // 스타일 파일 경로
import Popup from "./Popups/edit_popup.js"; // Import your Popup component
import RankingPopup from "./Popups/Ranking_popup.js";
import PaperPopup from "./Popups/Paper/paper_popup.js";
import QuizPopup from "./Popups/quiz_popup.js";
import CopyPopup from "./Popups/edit_popup.js";
function My_Igloo() {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState("");
  const [maxTextLength, setMaxTextLength] = useState(100);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showRankingPopup, setShowRankingPopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [showCopyPopup, setShowCopyPopup] = useState(false);
  const [showPaperPopup, setShowPaperPopup] = useState(false);
  const handleEditClick = () => {
    if (isEditing) {
      setShowEditPopup(true);
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleRankingButtonClick = () => {
    setShowRankingPopup(true);
  };

  const handlePaperButtonClick = () => {
    setShowPaperPopup(true);
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
    const textWithLineBreaks = textValue.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));

    return (
      <div style={{ maxWidth: "100%", overflowWrap: "break-word" }}>
        {textWithLineBreaks}
      </div>
    );
  };
  const textToCopy = "E5BX37"; // 복사할 텍스트
  const textAreaRef = useRef(null);

  const copyToClipboard = async () => {
    try {
      if (textAreaRef.current) {
        await navigator.clipboard.writeText(textAreaRef.current.textContent);
        console.log("Text copied to clipboard");
      } else {
        console.error("textAreaRef is not available");
      }
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  };
  const copyPopup = async () => {
    setShowCopyPopup(true);
  };

  const CopyPopup = () => {
    copyToClipboard();
    copyPopup();
  };

  return (
    <div className="full_container">
      <div className="background">
        <div></div>
        <div>
          <div className="center_container">
            <div className="title_container">
              <div>
                <img
                  src={require("../Image/MyIgloo/igloo.png")}
                  alt="MyIgloo"
                  className="logo"
                />
              </div>
              <div className="title">홍길동의 이글루</div>
              <button
                style={{ background: "transparent", border: "none" }}
                onClick={handleEditClick}
              >
                <img
                  src={require("../Image/MyIgloo/edit2.png")}
                  alt="edit"
                  className="edit"
                />
              </button>
            </div>
          </div>
          <div className="center">
            <div
              className="inline"
              onClick={CopyPopup}
              style={{ cursor: "pointer" }}
            >
              <div ref={textAreaRef} style={{ textDecoration: "underline" }}>
                {textToCopy}
              </div>
              &nbsp;
              <img
                src={require("../Image/MyIgloo/Vector.png")}
                alt="receipt"
                className="vector"
              />
            </div>
          </div>

          <div className="center_container">
            {isEditing ? (
              <div className="textbox">
                <textarea
                  value={textValue}
                  onChange={handleTextAreaChange}
                  style={{
                    width: "82%",
                    aspectRatio: "3 / 1.50",
                    background: "transparent",
                    border: "none",
                    padding: "7% 9%",
                    overflow: "hidden", // 스크롤 제거
                  }}
                  placeholder="여기에 텍스트를 입력하세요"
                  className="input_font"
                  maxLength={maxTextLength}
                />
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "right",
                  }}
                  onClick={handleEditClick}
                >
                  <img
                    src={require("../Image/MyIgloo/edit2.png")}
                    alt="receipt"
                    style={{ width: "7%", padding: "0 4% 4% 0%" }}
                  />
                </button>
              </div>
            ) : (
              <div className="textbox">
                <div
                  style={{
                    padding: "7% 9% 0 9%",
                    maxWidth: "100%",
                    overflowWrap: "break-word",
                    wordBreak: "break-all",
                  }}
                >
                  {renderTextWithLineBreaks()}
                </div>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    textAlign: "right",
                  }}
                  onClick={handleEditClick}
                >
                  <img
                    src={require("../Image/MyIgloo/edit2.png")}
                    alt="receipt"
                    style={{ width: "7%", padding: "0 4% 4% 0%" }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="center_container">
          <div className="last_button_container">
            <button className="button" onClick={handleRankingButtonClick}>
              퀴즈 바로가기
            </button>
            <button className="button" onClick={handlePaperButtonClick}>
              롤링페이퍼
            </button>
          </div>
        </div>
      </div>

      {/* Render the Popup component conditionally */}
      {showEditPopup && (
        <Popup
          message="한줄소개 수정이 완료되었어요!"
          onConfirm={handlePopupConfirm}
        />
      )}

      {showRankingPopup && (
        <RankingPopup
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
          message={"초대코드가 복사되었어요!"}
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
