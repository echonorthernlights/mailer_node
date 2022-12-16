import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import spinner from "../public/assets/img/spinner.gif";

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

  const sendMail = async () => {
    setLoader(true);
    const response = await fetch(`/api/mail/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailObject),
    });
    const { msg, error } = await response.json();
    if (msg) {
      toast.success(msg, {
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
    setMailOject({
      email: "",
      subject: "",
      content: "",
    });
    setLoader(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    //test form data (email and content are required, subject not)
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
      sendMail();
    }
  };
  return (
    <div className="form-container">
      <div className="form-body px-4">
        <h3 className="text-center">MAILER</h3>
        <h6 className="text-center">Send your mail with ease</h6>
        <ToastContainer />
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">To : </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={mailObject.email}
              onChange={onChange}
            />
            <small>* Required</small>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="subject">Subject : </label>
            <input
              type="text"
              className="form-control"
              id="subject"
              placeholder="Enter your sbject"
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
            <small>* Required</small>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary w-100">
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
