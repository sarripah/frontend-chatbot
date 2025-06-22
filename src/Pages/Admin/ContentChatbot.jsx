import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import {
  getContentChatbots,
  createContentChatbots,
  updateContentChatbots,
  deleteContentChatbots,
} from "../../services/admin/contentChatbotService";

export default function ContentChatbot() {
  const [contentChatbots, setContentChatbots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      judul: "",
      konten: "",
    },
  });

  // Fetch ContentChatbots
  const fetchContentChatbots = async () => {
    try {
      setIsLoading(true);
      const data = await getContentChatbots();
      // Filter out invalid entries
      const validData = Array.isArray(data)
        ? data.filter((item) => item.id && item.judul && item.konten)
        : [];
      setContentChatbots(validData);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message || "Failed to fetch ContentChatbots.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContentChatbots();
  }, []);

  const openCreateModal = () => {
    reset();
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (contentChatbot) => {
    setValue("judul", contentChatbot.judul || "");
    setValue("konten", contentChatbot.konten || "");
    setEditData(contentChatbot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setEditData(null);
  };

  const onSubmit = async (data) => {
    try {
      if (editData) {
        await updateContentChatbots(editData.id, data);
        setContentChatbots((prev) =>
          prev.map((k) => (k.id === editData.id ? { ...k, ...data } : k))
        );
        Swal.fire("Berhasil!", "Data berhasil diperbarui!", "success");
      } else {
        const newContentChatbot = await createContentChatbots(data);
        // Validate response
        if (
          !newContentChatbot ||
          !newContentChatbot.id ||
          !newContentChatbot.judul ||
          !newContentChatbot.konten
        ) {
          // Workaround for incomplete response: include submitted data
          const fallbackContentChatbot = {
            id: newContentChatbot?.id || Date.now(), // Fallback ID
            judul: data.judul,
            konten: data.konten,
          };
          setContentChatbots((prev) => [...prev, fallbackContentChatbot]);
        } else {
          setContentChatbots((prev) => [...prev, newContentChatbot]);
        }
        Swal.fire("Berhasil!", "Data berhasil ditambahkan!", "success");
      }
      closeModal();
    } catch (error) {
      Swal.fire(
        "Gagal!",
        error.message || "Terjadi kesalahan saat menyimpan data.",
        "error"
      );
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteContentChatbots(id)
          .then(() => {
            setContentChatbots((prev) => prev.filter((k) => k.id !== id));
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          })
          .catch((error) => {
            Swal.fire(
              "Gagal!",
              error.message || "Terjadi kesalahan saat menghapus data.",
              "error"
            );
          });
      }
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const filteredContentChatbots = contentChatbots.filter((k) =>
    (k.judul || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginate = (data, currentPage, itemsPerPage) => {
    const offset = (currentPage - 1) * itemsPerPage;
    return data.slice(offset, offset + itemsPerPage);
  };

  const totalPages = Math.ceil(filteredContentChatbots.length / itemsPerPage);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">
            Manajemen ContentChatbot
          </h1>
          <div className="flex gap-4">
            <button
              onClick={openCreateModal}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition-all"
            >
              Tambah Data
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition-all"
            >
              Kembali
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Cari Judul..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm mb-4 focus:ring-indigo-500 focus:outline-none"
        />

        {isLoading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : filteredContentChatbots.length === 0 ? (
          <p className="text-gray-500 text-lg">Tidak ada data yang ditemukan.</p>
        ) : (
          <div className="space-y-4">
            {paginate(filteredContentChatbots, currentPage, itemsPerPage).map((k) => (
              <div
                key={k.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex justify-between items-start shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-full">
                  <p className="font-semibold text-gray-800 text-xl mb-2">
                    {k.judul || "No Title"}
                  </p>
                  <div className="ql-snow">
                    <div
                      className="ql-editor text-gray-600 text-base"
                      dangerouslySetInnerHTML={{ __html: k.konten || "" }}
                    ></div>
                  </div>
                </div>
                <div className="flex gap-4 ml-4 mt-1 whitespace-nowrap">
                  <button
                    onClick={() => openEditModal(k)}
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(k.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600 text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-6">
              {editData ? "Edit Data" : "Tambah Data"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Judul"
                  {...register("judul", { required: "Judul is required" })}
                  className={`w-full px-5 py-3 border ${
                    errors.judul ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-indigo-500 focus:outline-none`}
                />
                {errors.judul && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.judul.message}
                  </p>
                )}
              </div>

              <div>
                <ReactQuill
                  theme="snow"
                  value={editData?.konten || ""}
                  onChange={(value) => setValue("konten", value)}
                  className="bg-white"
                />
                {errors.konten && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.konten.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Menyimpan..."
                    : editData
                    ? "Perbarui"
                    : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}