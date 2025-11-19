export const Button = ({ 
  children, 
  onClick, 
  type = "button", 
  className = "", 
  size = "default", 
  ...props 
}) => {
  
  const baseStyles = "inline-block w-full border-none rounded-[14px] py-3 px-9 bg-gradient-to-b from-[#7B61FF] to-[#A391FF] text-white font-bold text-base shadow-[0_8px_18px_rgba(111,76,255,0.18)] cursor-pointer transition-all duration-[120ms] ease-out text-center hover:-translate-y-[2px] active:translate-y-0 active:shadow-[0_4px_10px_rgba(111,76,255,0.12)]";

  const smallStyles = size === "small" 
    ? "py-2 px-[18px] rounded-[10px] text-sm w-auto" 
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${smallStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
