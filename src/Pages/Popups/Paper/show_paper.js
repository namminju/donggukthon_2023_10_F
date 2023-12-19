import React, { useState } from "react";
import "../../../Css/ShowPaper.css";
import "../../../Css/Common.css";
import BearP from "../../../Image/Paper/곰p.png";
import RaccoonP from "../../../Image/Paper/너구리p.png";
import SnowmanP from "../../../Image/Paper/눈사람p.png";
import DeerP from "../../../Image/Paper/사슴p.png";
import RabbitP from "../../../Image/Paper/토끼p.png";
import PenguinP from "../../../Image/Paper/펭귄p.png";
import QuitPopup from "../../../Pages/Popups/quit_popup.js";
import EditPopup from "../../../Pages/Popups/edit_popup.js";

const ShowPaper = ({ onConfirm }) => {
  const [showQuit, setShowQuit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleBackClick = () => {
    // Implement how the back click should behave
    if (onConfirm) {
      onConfirm();
    }
  };

  const handleDeleteClick = () => {
    // Show quit popup when delete is clicked
    setShowQuit(true);
  };

  const handleConfirmlick = () => {
    // Show quit popup when delete is clicked
    setShowConfirm(true);
  };

  return (
    <div className="popup-overlay">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="show_paper">
          <div className="popup_back" onClick={handleBackClick}>
            <img
              src={require("../../../Image/Ranking/back.png")}
              alt="receipt"
              style={{ width: "5%" }}
            />
            &emsp;이글루로 돌아가기
          </div>

          <div className="container">
            <div
              className="paper"
              style={{ backgroundImage: `url(${BearP})` }}
              alt="design"
            >
              <div className="paper_content">하이</div>
            </div>
          </div>

          <div className="button_container">
            <div className="button_papershow" onClick={handleDeleteClick}>
              삭제
            </div>
            <div className="button_papershow" onClick={handleBackClick}>
              확인
            </div>
          </div>

          {showQuit && (
            <QuitPopup
              message="이 롤링페이퍼를 삭제하시겠어요? 한 번 삭제한 롤링페이퍼는 복구할 수 없어요."
              onQuit={() => {
                setShowQuit(false);
                setShowConfirm(true); // 이 부분에서 EditPopup을 나오게 설정
              }}
              onConfirm_q={() => {
                setShowQuit(false);
              }}
            />
          )}

          {showConfirm && (
            <EditPopup
              message="롤링페이퍼 삭제가 완료되었어요. 😥"
              onConfirm={() => {
                // 추가적인 동작이 필요한 경우 작성
                setShowConfirm(false);
              }}
              onCancel={() => {
                setShowConfirm(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowPaper;
