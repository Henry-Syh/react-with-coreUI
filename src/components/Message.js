import { CAlert } from "@coreui/react";
import { useState } from "react";

export const ErrorMessage = (props) => {

  return (
    <CAlert
      color="danger"
      dismissible
      // visible={props.visible}
      // onClose={() => setVisible(false)}
    >
      {props.msg}
    </CAlert>
  );
};

export const ErrorMessage_new = (props) => {

  return (
    <CAlert
      color="danger"
      dismissible
      visible={props.visible}
      onClose={() => props.setVisible(false)}
    >
      {props.msg}
    </CAlert>
  );
};