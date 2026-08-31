import React, { useState, useRef } from 'react'
import { BsSend, BsPaperclip, BsX, BsFileEarmarkPdf, BsFileEarmark } from "react-icons/bs"
import useSendMessage from '../../../hooks/useSendMessage';

const MessageInput = () => {
  const [suggestions, setSuggestions] = useState([])
  const [loadingAI, setLoadingAI] = useState(false)
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef();
  const { loading, sendMessage } = useSendMessage()

  const getAISuggestions = async () => {
    if (!message.trim()) return;
    try {
      setLoadingAI(true);
      const response = await fetch("/api/ai/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error:", response.status, errorText);
        throw new Error(`Server returned ${response.status}`);
      }
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setLoadingAI(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert("File too large (max 15MB)");
      return;
    }
    setSelectedFile(file);
    if (file.type.startsWith("image/")) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !selectedFile) return;
    await sendMessage(message, selectedFile);
    setMessage("");
    clearFile();
  }

  return (
    <form className="px-4 py-3 border-t border-white/10 shrink-0" onSubmit={handleSubmit}>

      {/* File preview before sending */}
      {selectedFile && (
        <div className="mb-2 flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-2 pr-3">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" className="w-12 h-12 object-cover rounded-md" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-md text-blue-400 text-xl">
              {selectedFile.name.endsWith(".pdf") ? <BsFileEarmarkPdf /> : <BsFileEarmark />}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(0)} KB</p>
          </div>
          <button type="button" onClick={clearFile} className="text-gray-400 hover:text-red-400">
            <BsX className="text-xl" />
          </button>
        </div>
      )}

      {/* AI Suggestions */}
      {suggestions.length > 0 && (
        <div className="mb-2 space-y-1.5">
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <span>✨</span> AI Suggestions
          </p>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => { setMessage(suggestion); setSuggestions([]); }}
              className="block w-full text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input + buttons */}
      <div className="w-full relative flex items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
          accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="absolute left-3 text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Attach file"
        >
          <BsPaperclip className="text-lg" />
        </button>

        <input
          type="text"
          className="text-sm rounded-full block w-full h-12 pl-10 pr-24 bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          placeholder={selectedFile ? "Add a caption (optional)" : "Send a message"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="button"
          onClick={getAISuggestions}
          disabled={!message.trim() || loadingAI}
          className="absolute right-12 flex items-center px-2 cursor-pointer disabled:opacity-40 text-lg"
          aria-label="Get AI suggestions"
        >
          {loadingAI ? "⏳" : "✨"}
        </button>

        <button
          type="submit"
          className="absolute right-1 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all active:scale-95"
          aria-label="Send message"
        >
          {loading ? (
            <div className="loading loading-spinner loading-xs text-white"></div>
          ) : (
            <BsSend className="text-white text-sm" />
          )}
        </button>
      </div>
    </form>
  )
}

export default MessageInput