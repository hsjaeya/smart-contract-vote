import Header from "../components/Header";
import VoteList from "../components/VoteList";

const Vote = ({ votes }) => {
  return (
    <div>
      <Header title={"현재 투표소"} />
      {votes.length === 0 ? (
        <p style={{ textAlign: "center" }}>아직 투표가 없습니다.</p>
      ) : (
        votes.map((vote, idx) => (
          <VoteList key={vote.id} vote={vote} number={idx + 1} />
        ))
      )}
    </div>
  );
};

export default Vote;
