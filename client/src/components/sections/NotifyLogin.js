import React from "react";
import { Link } from "react-router-dom";
import Button from "../elements/Button";

const modalFormStyle = {
  maxWidth: "320px",
  margin: "0 auto",
};

const NotifyLogin = () => {
  return (
    <section>
      <div className="center-content">
        <h3 className="mt-16 mb-8">Authentication Required</h3>
        <p className="text-sm">
          Have an account ? Login else Sign up for an annonimous account
        </p>
      </div>
      <div style={modalFormStyle}>
        <div className="mb-12">
          <Link to="/login" className="button button-primary button-block tt-u">
            Login
          </Link>
        </div>
        <Link
          to="/signup"
          className="button button-secondary button-block tt-u"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
};

export default NotifyLogin;
