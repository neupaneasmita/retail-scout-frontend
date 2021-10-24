import React from "react";
import { Link } from "react-router-dom";

function JoinRetail() {
  return (
    <>
      <div className="pt-6 pb-10 md:py-20">
        <div className="container-wrapper text-white flex flex-col">
          <div className="heading-2 text-white mx-auto text-center mb-2">
            Join Retail Scout Today
          </div>
          <div className="mx-auto text-center paragraph-body text-white mb-6">
            Try Retail Scout for free today
          </div>
          <div className="mx-auto">
            <Link to="/signup">
              <button className="primary-button">Get Free Trial</button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="border-b border-divider opacity-20"
        style={{ maxWidth: "1184px", margin: "auto" }}
      />
    </>
  );
}

export default JoinRetail;
