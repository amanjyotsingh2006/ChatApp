import useConversation from '../../../zustand/userConversation';
import { useAuthContext } from '../../../context/AuthContext';
import { extractTime } from '../../../utils/extractTime';
import { BsFileEarmarkPdf, BsFileEarmark, BsDownload } from "react-icons/bs";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBgColor = fromMe
    ? 'bg-gradient-to-br from-blue-600 to-blue-500'
    : 'bg-white/10 border border-white/10';
  const shakeClass = message.shouldShake ? "shake" : "";

  const profilePic = fromMe
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.username}`
    : selectedConversation
      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConversation.username}`
      : "https://via.placeholder.com/40";

  const BASE_URL = "http://localhost:5000" || "http://192.168.1.4:5000"; // match your actual backend port

  const fileFullUrl = message.fileUrl?.startsWith("http")
    ? message.fileUrl
    : `${BASE_URL}${message.fileUrl}`;

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-9 rounded-full ring-1 ring-white/10'>
          <img
            src={profilePic}
            alt="avatar"
            className="w-9 h-9 rounded-full object-cover"
            onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
          />
        </div>
      </div>

      <div className={`chat-bubble text-white text-sm leading-relaxed shadow-sm ${bubbleBgColor} ${shakeClass} ${message.fileUrl ? 'p-1.5' : ''}`}>

        {message.fileUrl && message.fileType === 'image' && (
          <img
            src={fileFullUrl}
            alt={message.fileName}
            className="rounded-lg max-w-[240px] max-h-[300px] object-cover cursor-pointer"
            onClick={() => window.open(fileFullUrl, '_blank')}
          />
        )}

        {message.fileUrl && message.fileType !== 'image' && (

          <a href={fileFullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2 hover:bg-black/30 transition-colors"
          >
            <span className="text-xl text-white/80">
              {message.fileType === 'pdf' ? <BsFileEarmarkPdf /> : <BsFileEarmark />}
            </span>
            <span className="flex-1 min-w-0 truncate text-xs">{message.fileName}</span>
            <BsDownload className="text-sm opacity-70" />
          </a>
        )}

        {message.message && (
          <p className={message.fileUrl ? "px-1.5 pt-1.5 pb-0.5" : ""}>{message.message}</p>
        )}
      </div>

      <div className='chat-footer opacity-50 text-[11px] mt-1 flex gap-1 items-center'>
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;