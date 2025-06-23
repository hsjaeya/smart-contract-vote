import "./header.css";
const Header = ({ title }) => {
  return (
    <div className="bigheader">
      <div className="header">{title}</div>
    </div>
  );
};

export default Header;
