import { useState } from "react";
import useConversation from "../zustand/userConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message, file = null) => {
    setLoading(true);
    try {
      let fileData = {};

      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/messages/upload", {
          method: "POST",
          body: formData
        });
        fileData = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(fileData.error || "Upload failed");
      }

      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, ...fileData })
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setMessages([...messages, data]);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;