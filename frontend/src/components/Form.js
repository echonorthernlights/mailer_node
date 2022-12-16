import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../public/assets/img/spinner.gif";
import logo from "../public/assets/img/logo.svg";

const Form = () => {
  const [mailObject, setMailOject] = useState({
    email: "",
    subject: "",
    content: "",
  });
  const [loader, setLoader] = useState(false);

  const onChange = (e) => {
    setMailOject({ ...mailObject, [e.target.name]: e.target.value });
  };
  // function to POST email object (email, subject, content ) to backend server
  const sendMail = async () => {
    setLoader(true);
    const response = await fetch(`/api/mail/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailObject),
    });
    const { success, error } = await response.json();
    // check server response for success or error
    if (success) {
      toast.success(success, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        hideProgressBar: true,
      });
    } else {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        hideProgressBar: true,
      });
    }
    // reset the state
    setMailOject({
      email: "",
      subject: "",
      content: "",
    });
    setLoader(false);
  };

  // onSubmit
  const onSubmit = (e) => {
    e.preventDefault();
    //test form data (email(validate email regex) and content are required, subject not('No subject' by default ))
    const mailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!mailRegex.test(mailObject.email)) {
      toast.warn("Please provid a valid email !!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        hideProgressBar: true,
      });
    } else if (!mailObject.email || !mailObject.content) {
      toast.error("Please fill in the required fields !!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        hideProgressBar: true,
      });
    } else {
      // Invoke sendMail function
      sendMail();
    }
  };
  return (
    <div className="form-container mt-2">
      <div className="form-body px-4">
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col">
              <img className="logo" src={logo} alt="logo goes here" />
            </div>
            <div className="col col-custom ">
              <div className="heading">
                <h3>MAILER</h3>
                <h6>Send your mail with ease</h6>
              </div>
            </div>
          </div>
        </div>

        <ToastContainer />
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">To : </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter recipient email"
              name="email"
              value={mailObject.email}
              onChange={onChange}
            />
            <sub>* Required</sub>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="subject">Subject : </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter your subject"
              name="subject"
              value={mailObject.subject}
              onChange={onChange}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="content">Message : </label>
            <textarea
              className="form-control"
              id="content"
              placeholder="Message content"
              name="content"
              value={mailObject.content}
              onChange={onChange}
              style={{ resize: "none" }}
            />
            <sub>* Required</sub>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary w-100 mb-4">
              {loader ? (
                <img src={spinner} style={{ height: "20px" }} />
              ) : (
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
