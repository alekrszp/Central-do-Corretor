import "./input.css";
export default function Input({ label, type = "text", placeholder, value, onChange, id, ...props }) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id || label}>{label}</label>}
      <input
        id={id || label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}
