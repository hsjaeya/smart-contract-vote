import Button from "./Button";
import Input from "./Input";
import "./MakeVoteItemList.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef } from "react";

const MakeVoteItemList = ({ setVotes }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [items, setItems] = useState(["", "", ""]);

  const handleAddItem = () => setItems([...items, ""]);

  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  const CustomInput = forwardRef(({ value, onClick, className }, ref) => (
    <button className={`custom-input ${className}`} onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  const handleSubmit = () => {
    const filtered = items.filter((item) => item.trim() !== "");
    if (filtered.length < 2) return alert("2개 이상의 항목이 필요합니다.");

    const newVote = {
      id: Date.now(),
      title: filtered.join(" vs "),
      options: filtered,
      deadline: startDate.toISOString(), // ISO 문자열 저장
      counts: Array(filtered.length).fill(0),
    };

    setVotes((prevVotes) => [...prevVotes, newVote]);
    alert("투표가 생성되었습니다!");
  };

  return (
    <div>
      <div className="board">
        <h2 className="board-title">투표목록 생성</h2>
        {items.map((item, index) => (
          <div key={index} className="input-with-number">
            <span className="item-number">{index + 1}.</span>
            <Input
              content={"항목을 입력하세요"}
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
            />
          </div>
        ))}
        <div onClick={handleAddItem}>
          <Button content={"항목 추가"} />
        </div>
      </div>
      <div className="board">
        <h2 className="board-title">투표 종료시간 설정</h2>
        <div className="date-picker-board">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={10}
            dateFormat="yyyy년 MM월 dd일 HH시mm분"
            customInput={<CustomInput />}
            className="date-picker"
          />
        </div>
      </div>
      <div className="board" onClick={handleSubmit}>
        <Button content={"완료"} className="submit" />
      </div>
    </div>
  );
};

export default MakeVoteItemList;
