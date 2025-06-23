import VoteItem from "./VoteItem";

const VoteList = ({ vote, number }) => {
  return (
    <div>
      <VoteItem
        number={number}
        title={vote.title}
        date={new Date(vote.deadline).toLocaleString()}
        id={vote.id}
      />
    </div>
  );
};

export default VoteList;
