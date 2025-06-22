import React, { useState } from "react";
import { Copy, Trash, MessageSquare, Send } from "lucide-react";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import { sendMessage, submitFeedback } from "../services/chatbotService";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setChat([...chat, { user: userMessage }]);
    setMessage("");
    setIsLoading(true);

    try {
      const res = await sendMessage({ userQuery: userMessage });
      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].bot = res.response;
        return updated;
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to get response from server.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus("Copy"), 2000);
      })
      .catch((err) => {
        Swal.fire({
          title: "Error",
          text: err.message || "Failed to copy text.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        })
    });
  };

  const handleDeleteChat = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the chat history!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        setChat([]);
        Swal.fire("Deleted!", "Your chat history has been deleted.", "success");
      }
    });
  };

  const handleFeedback = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setName("");
    setFeedback("");
    setIsAnonymous(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      nama: isAnonymous ? "Anonim" : name,
      isi_feedback: feedback,
    };

    try {
      await submitFeedback(feedbackData);
      Swal.fire({
        title: "Feedback Submitted!",
        text: "Thank you for your feedback.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        setShowModal(false);
        setName("");
        setFeedback("");
        setIsAnonymous(false);
      });
    } catch (error) {
      Swal.fire({
        title: "Submission Failed",
        text: error.message || "Something went wrong while submitting your feedback.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4 py-6"
      style={{
        backgroundImage: "url('/images/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="w-full max-w-2xl flex flex-col h-[80vh] bg-white rounded-xl shadow-lg">
        <div className="text-center p-6">
          <img
            src="/images/logo.PNG"
            alt="Logo UPN"
            className="mx-auto mb-4 w-96 h-16"
          />
          <p className="text-green-800 mt-2 font-bold border-b border-green-800 pb-2">
            Layanan Informasi Untuk Mahasiswa, Masyarakat, dan Tenaga Kependidikan
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={handleDeleteChat}
              className="flex items-center text-green-700 bg-white hover:bg-green-100 px-4 py-1 rounded-full shadow transition duration-300 text-sm"
            >
              <Trash size={16} className="mr-1" />
              Hapus Chat
            </button>
            <button
              onClick={handleFeedback}
              className="flex items-center text-green-700 bg-white hover:bg-green-100 px-4 py-1 rounded-full shadow transition duration-300 text-sm"
            >
              <MessageSquare size={16} className="mr-1" />
              Feedback
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {chat.length === 0 && (
            <div className="flex justify-start">
              <div className="bg-green-200 text-black p-3 rounded-2xl text-sm max-w-md">
                Selamat datang di Unit Layanan Terpadu! Silakan ajukan pertanyaan Anda.
              </div>
            </div>
          )}

          {chat.map((msg, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-end">
                <div className="bg-gray-200 text-black p-3 rounded-2xl text-sm max-w-md">
                  {msg.user}
                </div>
              </div>

              {msg.bot && (
                <div className="flex justify-start">
                  <div className="ql-snow">
                    <div
                      className="ql-editor bg-green-200 text-black p-3 rounded-2xl text-sm max-w-md"
                      dangerouslySetInnerHTML={{ __html: msg.bot }}
                    ></div>
                  </div>
                </div>
              )}

              {msg.bot && (
                <div className="flex justify-start">
                  <button
                    onClick={() => handleCopy(msg.bot)}
                    className="flex items-center gap-2 text-green-700 hover:text-green-800 text-sm mt-2 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    <Copy size={16} />
                    {copyStatus || "Copy"}
                  </button>
                </div>
              )}

              {!msg.bot && isLoading && index === chat.length - 1 && (
                <div className="flex justify-start">
                  <div className="p-3 rounded-2xl text-sm max-w-md bg-green-200 text-black flex gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t p-4 bg-white flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ketik pesan Anda..."
            className="flex-1 border px-4 py-2 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="text-white bg-green-700 hover:bg-green-800 px-4 py-2 rounded-full shadow transition disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-filter backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Berikan Feedback Anda
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  value={isAnonymous ? "Anonim" : name}
                  onChange={(e) => !isAnonymous && setName(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  placeholder="Nama Anda"
                  disabled={isAnonymous}
                />
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                  />
                  <label htmlFor="anonymous" className="text-sm">
                    Kirim sebagai Anonim
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="feedback"
                  className="block text-sm font-medium text-gray-700"
                >
                  Feedback
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-1 block w-full p-2 border rounded-md"
                  placeholder="Tulis feedback Anda..."
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="px-4 py-2 text-sm text-white bg-red-700 hover:bg-red-800 rounded-md"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm text-white bg-green-700 hover:bg-green-800 rounded-md"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}