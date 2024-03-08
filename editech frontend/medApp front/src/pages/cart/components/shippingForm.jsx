import React, { Children } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCart } from "../../../App";

import "./shippingForm.css";

function DeliveryForm({ total, children }) {
  const { idsInOrder } = useCart();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const ids = idsInOrder().join();
      const response = await fetch("http://localhost:3000/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids, total, ...values }),
      });

      if (response.ok) {
        console.log("Sccess!");

        resetForm();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    setSubmitting(false);
  };

  return (
    <>
      <div className="maindiv">
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Not empty!"),
            email: Yup.string().email("Not valid!").required("Not empty!"),
            phone: Yup.string()
              .matches(/^\d{10}$/, "Not less 10 numbers!")
              .required("Not empty!"),
            address: Yup.string().required("Not empty!"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className="inputs">
            <div className="every-inputs">
              <label htmlFor="name">Name:</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="every-inputs">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="every-inputs">
              <label htmlFor="phone">NUmber:</label>
              <Field type="tel" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <div className="every-inputs">
              <label htmlFor="address">Address:</label>
              <Field as="textarea" id="address" name="address" />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div className="bottomInfo">
              <div>Total price:{total}</div>
              <button type="submit">Send</button>
            </div>
          </Form>
        </Formik>
        {children}
      </div>
    </>
  );
}

export { DeliveryForm };
