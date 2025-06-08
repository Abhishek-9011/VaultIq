import axios from "axios";
import DeleteIcon from "../../icons/DeleteIcon";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "twitter" | "youtube";
  sharable?: boolean;
  onDelete?: (id: string) => void;
}

const Card = ({ id, title, link, type, sharable }: CardProps) => {
  const embedYoutubeLink = link.includes("watch")
    ? link.replace("watch?v=", "embed/")
    : link;
  const deleteCard = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        data: { contentId: id }, // Send contentId in the request body
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
    window.location.reload();
  };
  return (
    <div>
      <div className="p-4 bg-white rounded-md border border-gray-200 max-w-72">
        <div className="flex justify-between">
          <div className="flex font-bold items-center text-sm">{title}</div>
          <div className="flex items-center">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="pr-2 text-gray-500"
            ></a>
            {sharable ? (
              ""
            ) : (
              <div className="text-gray-500" onClick={deleteCard}>
                <DeleteIcon />
              </div>
            )}
          </div>
        </div>
        <div className="pt-4">
          {type === "youtube" && (
            <iframe
              className="w-full aspect-video"
              src={embedYoutubeLink}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <blockquote className="twitter-tweet">
              <a
                href={link.replace("x.com", "twitter.com")}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
