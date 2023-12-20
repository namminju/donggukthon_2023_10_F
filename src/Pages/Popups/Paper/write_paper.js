import React, { useState, useEffect } from "react";
import "../../../Css/WritePaper.css";
import "../../../Css/Common.css";
import axios from "axios";
import BearP from "../../../Image/Paper/곰p.png";
import RaccoonP from "../../../Image/Paper/너구리p.png";
import SnowmanP from "../../../Image/Paper/눈사람p.png";
import DeerP from "../../../Image/Paper/사슴p.png";
import RabbitP from "../../../Image/Paper/토끼p.png";
import PenguinP from "../../../Image/Paper/펭귄p.png";
import QuitPopup from "../../../Pages/Popups/quit_popup.js";
import EditPopup from "../../../Pages/Popups/edit_popup.js";

const WritePaper = ({ design, onConfirm }) => {
  const [showQuit, setShowQuit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [text, setText] = useState("");
  const paperDesign = design;
  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSavePaper = () => {
    // 여기서 서버로 데이터를 보내고 저장하는 로직을 추가해야 합니다.
    // 예를 들어 axios를 사용하여 POST 요청을 보낼 수 있습니다.
    axios
      .post("/api/save_paper", { userId: 3, text, design: paperDesign })
      .then((response) => {
        console.log("Paper saved successfully");
      })
      .catch((error) => {
        console.error("Error saving paper:", error);
      });

    // 저장이 완료되면 팝업을 닫습니다.
  };
  //디자인 매칭

  let designURL;
  switch (design) {
    case 1:
      designURL = PenguinP;
      break;
    case 2:
      designURL = BearP;
      break;
    case 3:
      designURL = RabbitP;
      break;
    case 4:
      designURL = DeerP;
      break;
    case 5:
      designURL = SnowmanP;
      break;
    case 6:
      designURL = RaccoonP;
      break;
  }

  const handleDeleteClick = () => {
    // Show quit popup when delete is clicked
    setShowQuit(true);
  };
  return (
    <div className="popup-overlay">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="show_paper">
          <div className="popup_back" onClick={onConfirm}>
            <img
              src={require("../../../Image/Ranking/back.png")}
              alt="receipt"
              style={{ width: "5%" }}
            />
            &emsp;이글루로 돌아가기
          </div>
          <form method="post">
            <div className="container">
              <div
                className="showPaper"
                style={{ backgroundImage: `url(${designURL})` }}
                alt="design"
              >
                <textarea
                  className="paper_content_write"
                  value={text}
                  onChange={handleTextChange}
                  rows="15"
                  cols="50"
                />
              </div>
            </div>

            <div className="button_container">
              <input
                value="삭제"
                type="reset"
                className="button_paperwrite"
                onClick={handleDeleteClick}
              />
              <input
                value="확인"
                type="submit"
                className="button_paperwrite"
                onClick={handleSavePaper}
              />
            </div>
          </form>
          {showQuit && (
            <QuitPopup
              message="이 페이지를 벗어나면 마지막 저장 후
수정된 내용은 저장되지 않아요!"
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

export default WritePaper;
