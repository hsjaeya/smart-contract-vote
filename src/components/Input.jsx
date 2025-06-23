import "./Input.css";

const Input = ({ content, value, onChange }) => {
  return (
    <div className="Button">
      <input
        className="InputItem"
        placeholder={content}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
