import React, { useState } from "react";
import "../../../Css/CreatePaper.css";
import "../../../Css/Common.css";
import BearTag from "../../../Image/Paper/곰.svg";
import RaccoonTag from "../../../Image/Paper/너구리.svg";
import SnowmanTag from "../../../Image/Paper/눈사람.svg";
import DeerTag from "../../../Image/Paper/사슴.svg";
import RabbitTag from "../../../Image/Paper/토끼.svg";
import PenguinTag from "../../../Image/Paper/펭귄.svg";

const CreatePaper = ({ onConfirm }) => {
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

          <button onClick={onConfirm} className="move_button">
            다음
          </button>
        </div>
      </div>
    </div>
  );
};
const Tag = ({ tagId, selected, onClick }) => (
  <div
    className={`paper_tag ${selected ? "selected" : ""}`}
    id={tagId}
    onClick={() => onClick(tagId)}
  >
    {/* 각 태그의 이미지를 동적으로 로드하도록 수정 필요 */}
    <img className="paper" src={BearTag} alt={tagId} />
  </div>
);

export default CreatePaper;
