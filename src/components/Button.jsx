import "./Button.css";
const MakeVoteAdd = ({ content }) => {
  return (
    <div className="Button">
      <button className="ButtonItem">{content}</button>
    </div>
  );
};

export default MakeVoteAdd;
