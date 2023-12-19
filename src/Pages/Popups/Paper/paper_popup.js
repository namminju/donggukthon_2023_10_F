// Paper_popup.js
import React, { useState, useEffect } from "react";
import "../../../Css/PaperPopup.css";
import "../../../Css/Common.css";
import axios from "axios";

import BearTag from "../../../Image/Paper/곰.svg";
import RaccoonTag from "../../../Image/Paper/너구리.svg";
import SnowmanTag from "../../../Image/Paper/눈사람.svg";
import DeerTag from "../../../Image/Paper/사슴.svg";
import RabbitTag from "../../../Image/Paper/토끼.svg";
import PenguinTag from "../../../Image/Paper/펭귄.svg";
import ShowPaper from "./show_paper.js";

const PaperPopup = ({ onConfirm }) => {
  
  const [selected, setSelected] = useState(null); // 기본값은 null로 설정
  const [showPaper, setShowPaper] = useState(false);
  const [paperTag, setTag] = useState(12);

  const handleShowPaperClick = () => {
    setShowPaper(true);
  };

  const handlePaperTagClick = (tagIndex) => {
    // 기존에 선택된 태그가 있다면 선택 해제
    if (selected !== null) {
      setSelected(null);
    }
    setSelected(tagIndex);
  };

  const renderImages = () => {
    const images = [];

    for (let i = 0; i < paperTag; i++) {
      const isSelected = selected === i;

      images.push(
        <div className={`paper_tag ${isSelected ? "selected" : ""}`} key={i}>
          <img
            src={BearTag}
            className="papertag"
            onClick={() => handlePaperTagClick(i)}
            alt={`Bear ${i}`}
          />
        </div>
      );
    }

    return images;
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

          <div className="paper_container">{renderImages()}</div>

          <button onClick={handleShowPaperClick} className="move_button">
            열람하기
          </button>

          {showPaper && (
            <ShowPaper
              onConfirm={() => {
                setShowPaper(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperPopup;
