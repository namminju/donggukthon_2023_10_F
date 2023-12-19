// Paper_popup.js
import React, { useState } from "react";
import "../../../Css/PaperPopup.css";
import "../../../Css/Common.css";
import BearTag from "../../../Image/Paper/곰.svg";
import RaccoonTag from "../../../Image/Paper/너구리.svg";
import SnowmanTag from "../../../Image/Paper/눈사람.svg";
import DeerTag from "../../../Image/Paper/사슴.svg";
import RabbitTag from "../../../Image/Paper/토끼.svg";
import PenguinTag from "../../../Image/Paper/펭귄.svg";

const PaperPopup = ({ onConfirm }) => {
  let [paperTag, setTag] = useState(12);
  const renderImages = () => {
    const images = [];

    for (let i = 0; i < paperTag; i++) {
      images.push(
        <div class="paper_tag">
          <img key={i} src={BearTag} class="paper" alt={`Bear ${i}`} />
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

          <div class="paper_container">{renderImages()}</div>

          <button onClick={onConfirm} className="move_button">
            롤링페이퍼 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperPopup;
