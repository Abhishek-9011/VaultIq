import axios from "axios";
import { useEffect, useState } from "react";

export const useContent = () => {
  const [allContents, setAllContents] = useState([]);
  const [contents, setContents] = useState([]);

  const handleDelete = (deletedId: string) => {
    //@ts-ignore
    setAllContents((prev) => prev.filter((c) => c._id !== deletedId));
    //@ts-ignore
    setContents((prev) => prev.filter((c) => c._id !== deletedId));
  };

  const filterTwitter = () => {
    //@ts-ignore
    setContents(allContents.filter((c) => c.type === "twitter"));
  };

  const filterYoutube = () => {
    //@ts-ignore
    setContents(allContents.filter((c) => c.type === "youtube"));
  };

  const showAll = () => {
    setContents(allContents);
  };

  const refresh = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAllContents(response.data.content);
        setContents(response.data.content);
      });
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10 * 2000);
    return () => clearInterval(interval);
  }, []);

  return {
    contents,
    refresh,
    handleDelete,
    filterTwitter,
    filterYoutube,
    showAll,
  };
};
