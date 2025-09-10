import React from "react";

const Header = () => {
  return (
    <div className="space-y-2 text-center">
      {" "}
      <h1 className="text-4xl font-bold text-transparent bg-primary bg-clip-text">
        TodoApp
      </h1>
      <p className="text-muted-foreground">Có làm thì mới có ăn</p>
    </div>
  );
};

export default Header;
