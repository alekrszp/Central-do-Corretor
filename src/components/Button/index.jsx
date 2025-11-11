import "./button.css";
export const Button = ({ children, onClick, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`app-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
