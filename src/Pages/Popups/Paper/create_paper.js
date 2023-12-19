import React, { useState } from "react";
import "../../../Css/CreatePaper.css";
import "../../../Css/Common.css";
import BearTag from "../../../Image/Paper/곰.svg";
import RaccoonTag from "../../../Image/Paper/너구리.svg";
import SnowmanTag from "../../../Image/Paper/눈사람.svg";
import DeerTag from "../../../Image/Paper/사슴.svg";
import RabbitTag from "../../../Image/Paper/토끼.svg";
import PenguinTag from "../../../Image/Paper/펭귄.svg";
import ShowPaper from "../../../Pages/Popups/Paper/show_paper.js";

const CreatePaper = ({ onConfirm }) => {
  const [showPaperPopup, setShowPaperPopup] = useState(false);

  const handleShowPaperClick = () => {
    setShowPaperPopup(true);
  };
  return (
    <div className="popup-overlay">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="paper_popup">
          <div className="popup_back">
            <img
              src={require("../../../Image/Ranking/back.png")}
              alt="receipt"
              style={{ width: "5%" }}
            />
            &emsp;이글루로 돌아가기
          </div>

          <div class="text">롤링페이퍼의 디자인을 선택해주세요!</div>

          <div class="paper_container">
            <div class="paper_tag" id="bear" onclick="">
              <img class="paper" src={BearTag} />
            </div>
            <div class="paper_tag" id="raccoon">
              <img class="paper" src={RaccoonTag} />
            </div>
            <div class="paper_tag" id="snowman">
              <img class="paper" src={SnowmanTag} />
            </div>
            <div class="paper_tag" id="deer">
              <img class="paper" src={DeerTag} />
            </div>
            <div class="paper_tag" id="rabbit">
              <img class="paper" src={RabbitTag} />
            </div>
            <div class="paper_tag" id="penguin">
              <img class="paper" src={PenguinTag} />
            </div>
          </div>

          <button onClick={handleShowPaperClick} className="move_button">
            다음
          </button>
        </div>
      </div>
      {showPaperPopup && (
        <ShowPaper
          onConfirm={() => {
            setShowPaperPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default CreatePaper;
