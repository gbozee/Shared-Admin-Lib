import React from "react";

const Application = ({}) => {
  function loadApp(url) {
    var exampleSocket = new WebSocket(url);
    exampleSocket.onopen = function(event) {
      exampleSocket.send(JSON.stringify({ status: "Connect" }));
    };
    exampleSocket.onmessage = function(event) {
      console.log(event.data);
    };
  }
  React.useEffect(()=>{
      loadApp()
  },[])
  return (
    <>
      <div>Start</div>
    </>
  );
};

export default Application;
