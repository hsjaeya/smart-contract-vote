import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./pages/Home";
import New from "./pages/New";
import Vote from "./pages/Vote";
import VoteDetail from "./pages/VoteDetail";

function App() {
  // 로컬스토리지에서 투표 리스트 불러오기
  const [votes, setVotes] = useState(() => {
    const saved = localStorage.getItem("votes");
    return saved ? JSON.parse(saved) : [];
  });

  // votes가 변경될 때 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votes));
  }, [votes]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New setVotes={setVotes} />} />
      <Route path="/vote" element={<Vote votes={votes} />} />
      <Route
        path="/vote/:id"
        element={<VoteDetail votes={votes} setVotes={setVotes} />}
      />
    </Routes>
  );
}

export default App;
