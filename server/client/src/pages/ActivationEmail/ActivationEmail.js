import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Helmet } from "react-helmet";
import { BASE_URL } from "../../config";

const ActivationEmail = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { addToast } = useToasts();
  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${BASE_URL}/api/active`, {
            activation_token,
          });
          setSuccess(res.data.message);
          setError("");
        } catch (error) {
          setSuccess("");
          error.response &&
            setError(
              error.response.data.message
                ? error.response.data.message
                : error.message
            );
        }
      };
      activationEmail();
    }
  }, [activation_token, error.response, error.message]);

  useEffect(() => {
    if (error) {
      addToast(error, { appearance: "error", autoDismiss: true });
    } else if (success) {
      addToast(success, {
        appearance: "success",
        autoDismiss: true,
      });
    }
  }, [success, error, addToast]);
  return (
    <div className="activation section">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Actiation - Email</title>
      </Helmet>
      <div>
        <h1 className="activation__error">{error && error}</h1>
        <h1 className="activation__success">{success && success}</h1>

        <div>
          <Link to="/login">
            {" "}
            <button className="button-primary">Back to Login Page</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivationEmail;
