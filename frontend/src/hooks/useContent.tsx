import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useContent = () => {
  const [contents, setContent] = useState([]);
  const handleDelete = (deletedId: string) => {
    //@ts-ignore
    setContent(prev => prev.filter(content => content._id !== deletedId));
    window.location.reload();
  };
    const refresh = () => {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContent(response.data.content);
      });
  };
  useEffect(() => {
    refresh();
    let interval = setInterval(refresh, 10 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  
  return {contents, refresh, handleDelete};
};
