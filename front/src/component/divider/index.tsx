import "./index.css";

export const Divider = ({ color }: { color?: string }) => {
  color = "red";
  return <hr className="divider" style={{ color: color }} />;
};
