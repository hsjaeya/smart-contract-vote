// src/components/VoteDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVoteContract } from "../ethereum/useContract";
import WalletConnect from "../components/WalletConnect";
import "./VoteDetail.css";

const VoteDetail = ({ votes, setVotes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vote = votes.find((v) => v.id === Number(id));

  const [selected, setSelected] = useState(null);
  const [votedIndex, setVotedIndex] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [address, setAddress] = useState(""); // 여기서 관리

  useEffect(() => {
    if (!vote) {
      navigate("/vote");
      return;
    }
    const stored = localStorage.getItem("voted_" + vote.id);
    if (stored !== null) {
      setVotedIndex(Number(stored));
    }
  }, [vote, navigate]);

  if (!vote) return null;

  const deadline = new Date(vote.deadline);
  const isClosed = !isNaN(deadline) ? new Date() > deadline : false;
  const alreadyVoted = votedIndex !== null;

  const handleVote = async () => {
    if (!address) {
      alert("먼저 지갑을 연결하세요.");
      return;
    }

    if (selected === null) {
      alert("투표할 항목을 선택하세요.");
      return;
    }

    try {
      setIsVoting(true);
      console.log("🔗 스마트 컨트랙트에 연결 시도 중...");

      const contract = await getVoteContract();
      if (!contract) {
        console.error("❌ 컨트랙트 불러오기 실패");
        setIsVoting(false);
        return;
      }

      console.log("✅ 컨트랙트 인스턴스:", contract);
      console.log("🗳️ 투표 실행: voteId =", vote.id, ", 선택 =", selected);

      const tx = await contract.vote(vote.id, selected);
      console.log("📨 트랜잭션 전송 완료:", tx);

      console.log("⏳ 트랜잭션 블록에 포함 대기 중...");
      await tx.wait();
      console.log("⛓️ 트랜잭션 블록에 포함됨:", tx.hash);

      alert("투표 완료!");
      localStorage.setItem("voted_" + vote.id, selected);
      setVotedIndex(selected);

      const updatedVotes = votes.map((v) =>
        v.id === vote.id
          ? {
              ...v,
              counts: v.counts.map((count, i) =>
                i === selected ? count + 1 : count
              ),
            }
          : v
      );
      setVotes(updatedVotes);
    } catch (error) {
      console.error("❌ 트랜잭션 에러:", error);
      alert("투표 중 오류가 발생했습니다.");
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="vote-detail">
      {/* address와 setAddress를 WalletConnect에 넘겨줌 */}
      <WalletConnect address={address} setAddress={setAddress} />
      <h2>{vote.title}</h2>
      <p className="deadline">
        마감일:{" "}
        {!isNaN(deadline) ? deadline.toLocaleString() : "날짜 정보 없음"}{" "}
        {isClosed && "(마감됨)"}
      </p>

      {vote.options.map((opt, idx) => (
        <div key={idx} className="option">
          <label>
            <input
              type="radio"
              name="vote"
              disabled={isClosed || alreadyVoted || isVoting}
              checked={(alreadyVoted ? votedIndex : selected) === idx}
              onChange={() => setSelected(idx)}
            />
            {opt}
          </label>
          {alreadyVoted && votedIndex === idx && (
            <span className="voted-mark"> ✅</span>
          )}
          {isClosed && <span className="result"> ({vote.counts[idx]}표)</span>}
        </div>
      ))}

      {!isClosed && !alreadyVoted && (
        <button
          onClick={handleVote}
          className="vote-button"
          disabled={isVoting}
        >
          {isVoting ? "투표 중..." : "투표하기"}
        </button>
      )}

      {alreadyVoted && !isClosed && (
        <p className="voted-message">이미 이 항목에 투표하셨습니다.</p>
      )}
    </div>
  );
};

export default VoteDetail;
