import React from "react";

export function PasswordRequirements({ password }) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasLength = password.length >= 8;

  const RequirementItem = ({ isValid, text }) => (
    <li 
      className={`
        text-xs font-medium transition-all duration-300 
        ${isValid ? "text-[#7B61FF]" : "text-gray-500"}
      `}
    >
      {isValid ? "✓ " : "• "} {text}
    </li>
  );

  return (
    <div className="mt-3 mb-4 ml-1">
      <p className="text-xs text-gray-300 font-bold mb-2">
        Requisitos mínimos da senha:
      </p>
      <ul className="flex flex-col gap-1">
        <RequirementItem isValid={hasLength} text="8 caracteres" />
        <RequirementItem isValid={hasUpper} text="1 letra maiúscula" />
        <RequirementItem isValid={hasLower} text="1 letra minúscula" />
        <RequirementItem isValid={hasNumber} text="1 número" />
      </ul>
    </div>
  );
}