import React, { useState } from "react";
import "../../../Css/CreatePaper.css";
import "../../../Css/Common.css";
import BearTag from "../../../Image/Paper/곰.svg";
import RaccoonTag from "../../../Image/Paper/너구리.svg";
import SnowmanTag from "../../../Image/Paper/눈사람.svg";
import DeerTag from "../../../Image/Paper/사슴.svg";
import RabbitTag from "../../../Image/Paper/토끼.svg";
import PenguinTag from "../../../Image/Paper/펭귄.svg";
import WritePaper from "../../../Pages/Popups/Paper/write_paper.js";

const CreatePaper = ({ onConfirm }) => {
  const [showPaperPopup, setShowPaperPopup] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(0);

  const handleShowPaperClick = () => {
    setShowPaperPopup(true);
  };

  const handleSelectDesign = (design) => {
    if (selected !== null) {
      setSelected(null);
      setSelected(design);
      setSelectedDesign(design);
    } else {
      setSelected(design);
      setSelectedDesign(design);
    }
  };
  const renderImages = () => {
    const isSelected = selected;
    return (
      <div className="paper_container">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div
            key={index}
            className={`paper_tag ${isSelected === index ? "selected" : ""}`}
          >
            <img
              src={
                index === 1
                  ? PenguinTag
                  : index === 2
                  ? BearTag
                  : index === 3
                  ? RabbitTag
                  : index === 4
                  ? DeerTag
                  : index === 5
                  ? SnowmanTag
                  : RaccoonTag
              }
              className="papertag"
              onClick={() => handleSelectDesign(index)}
              alt={`Design ${index}`}
            />
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="popup-overlay">
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div className="create_popup">
          <div className="popup_back" onClick={onConfirm}>
            <img
              src={require("../../../Image/Ranking/back.png")}
              alt="receipt"
              style={{ width: "5%" }}
            />
            &emsp;이글루로 돌아가기
          </div>

          <div class="text">롤링페이퍼의 디자인을 선택해주세요!</div>

          <div>{renderImages()}</div>

          <button onClick={handleShowPaperClick} className="move_button">
            다음
          </button>
        </div>
      </div>
      {showPaperPopup && (
        <WritePaper
          design={selectedDesign}
          onConfirm={() => {
            setShowPaperPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default CreatePaper;
