import React from "react";
import "./ChoiceBar.css";
import { Link } from "react-router-dom";

const ChoiceBar = () => {
  return (
    <div className="choice-bar">
      <div className="choice new">
        <Link to="/vote">
          <div className="overlay"></div>
          <div className="text">투표하기</div>
        </Link>
      </div>
      <div className="choice vote">
        <Link to="/new">
          <div className="overlay"></div>
          <div className="text">투표생성</div>
        </Link>
      </div>
    </div>
  );
};

export default ChoiceBar;
