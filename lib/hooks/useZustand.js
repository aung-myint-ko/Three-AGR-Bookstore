"use client";
import React, { useEffect, useState } from "react";
import { isEqual } from "lodash";

const useZustand = (clientState) => {
  const [severState, setServerState] = useState("");
  useEffect(() => {
    if (!isEqual(clientState, severState)) {
      setServerState(clientState);
    }
  }, [clientState, severState]);

  return severState;
};

export default useZustand;
