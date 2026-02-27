import { useNavigate } from "react-router-dom";

export const NavButton = ({ to, children, className = "", ...props }) => {
  const navigate = useNavigate();

  return (
    <button type="button" onClick={() => navigate(to)} className={className} {...props}>
      {children}
    </button>
  );
};

