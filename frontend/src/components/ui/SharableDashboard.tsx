import axios from "axios";
import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import Sidebar from "./Sidebar";


const SharableDashboard = () => {
  const { shareLink } = useParams();
  const [content, setContent] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/brain/${shareLink}`);
        setContent(res.data.content);
        setUsername(res.data.username);
      } catch (err) {
        console.error("Failed to fetch shared content", err);
      }
    };

    if (shareLink) {
      fetchContent();
    }
  }, [shareLink]);

  return (
    <div>
      <Sidebar />
      <div className="ml-72 p-4 bg-gra">
        <h2 className="text-xl font-semibold mb-4">
          Content of: <span className="text-purple-600">{username}</span>
        </h2>
        {/* Content cards */}
        <div className="flex flex-wrap gap-4">
          {content.map(({ _id, title, link, type }) => (
            <Card key={_id} id={_id} title={title} link={link} type={type} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SharableDashboard;
