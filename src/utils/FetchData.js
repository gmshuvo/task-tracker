import { useEffect, useState } from "react";

async function FetchData(url, options = {}) {
  return await fetch(url, options).then((response) => {
    return response.json();
  }
  ).then((data) => {
    return { data , error: false };
  }).catch((error) => {
    return { data: null, error: error.message  };
  });
}

export default FetchData;