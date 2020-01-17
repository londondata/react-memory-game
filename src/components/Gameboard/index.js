import React from "react";
import Card from "../Card";

function Gameboard() {
  return (
    <>
      <div style={{ padding: "20px" }} className="container">
        <div className="ml-1 row w-100">
          <div className="col-3">
            <Card />
          </div>
          <div className="col-9">
            <div className="row">
              <p>test2</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Gameboard;
