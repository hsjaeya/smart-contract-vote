import Header from "../components/Header";
import MakeVoteItemList from "../components/MakeVoteItemList";

const New = ({ setVotes }) => {
  return (
    <div>
      <Header title={"투표 생성하기"} />
      <MakeVoteItemList setVotes={setVotes} />
    </div>
  );
};

export default New;
