import "../styles/auth.css";

export default function GlobalButton({ children, onClick }) {
  return (
    <button className="auth-button" onClick={onClick}>
      {children}
    </button>
  );
}
