import React  from "react";
import Alert from "react-bootstrap/Alert";

function AlertMessage ( props ){
  // const Capitalize = (word)=>{
  //   const lower = word.toLowerCase();
  //   return lower.charAt(0).toUpperCase() + lower.slice(1);
  // }
    return(
        <>
        <Alert show={props.alert.show} variant={props.alert.type}>
          {props.alert.msg}
        </Alert>
        </>
    )
}

export default AlertMessage;