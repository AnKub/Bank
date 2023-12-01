import "./index.css";

export const List = ({ children, style }: any) => {
  return (
    <div className="list" style={style}>
      {children}
    </div>
  );
};
