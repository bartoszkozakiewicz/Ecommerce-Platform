"use client";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

const Chat = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState(["Witaj w naszym chacie!"]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isExpanded) {
      scrollToBottom();
    }
  }, [messages, isExpanded]);

  console.log("process.env.FAST_API", process.env.PUBLIC_FAST_API);
  const sendMessage = async (e: any) => {
    try {
      await axiosInstance.post(`http://127.0.0.1:8000/chat`, {
        message: "message",
      });
      console.log("Response:");
    } catch (err) {
      console.log("gowno");
    }

    e.preventDefault();
    if (!newMessage.trim()) return;
    setMessages([...messages, newMessage]);
    setNewMessage("");
  };
  return (
    <div
      className={`fixed bottom-4 right-4 flex flex-1 flex-col items-end  ${
        isExpanded ? "max-h-screen" : "max-h-16"
      } transition-max-height duration-500 ease-out`}
    >
      {isExpanded && (
        <div className="flex h-[400px] flex-col justify-between rounded-lg bg-white shadow-lg">
          <div className="border-b  border-gray-200 p-4">
            <h2 className="text-lg font-semibold">AI Chat</h2>
          </div>
          <div className="h-[350px] max-h-[350px]  overflow-y-scroll p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mt-2">
                <div className="rounded-lg bg-blue-100 p-2 text-blue-800">
                  {msg}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            onSubmit={sendMessage}
            className="w-[400px] border-t border-gray-200 p-4"
          >
            <input
              disabled={false}
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Napisz wiadomość..."
            />
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white transition-colors duration-150 hover:bg-blue-700"
            >
              Wyślij
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="z-10 mt-2 rounded-full bg-blue-500 py-2 px-4 font-bold text-white transition-colors duration-150 hover:bg-blue-700"
      >
        {isExpanded ? "Zwiń" : "Rozwiń"} chat
      </button>
    </div>
  );
};

export default Chat;
