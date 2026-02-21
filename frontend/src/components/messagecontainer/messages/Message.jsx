import useConversation from '../../../zustand/userConversation';
import { useAuthContext } from '../../../context/AuthContext';
import { extractTime } from '../../../utils/extractTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  // ✅ Use same avatar logic as sidebar
  const profilePic = fromMe
    ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${authUser.username}`
    : selectedConversation
      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedConversation.username}`
      : "https://via.placeholder.com/40";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img
            src={profilePic}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => { e.target.src = "https://via.placeholder.com/40"; }}
          />
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>

      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;