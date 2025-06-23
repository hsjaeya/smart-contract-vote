import "./VoteItem.css";
import { Link } from "react-router-dom";

const VoteItem = ({ number, title, date, id }) => {
  return (
    <Link to={`/vote/${id}`} className="VoteItems">
      <div className="VoteItemNumber">{number}</div>
      <div className="VoteItemTitle">{title}</div>
      <div className="VoteItemDate">{date}까지</div>
    </Link>
  );
};

export default VoteItem;
