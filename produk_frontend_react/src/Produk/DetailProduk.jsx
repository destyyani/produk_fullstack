import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function DetailProduk() {
  const { id } = useParams(); // Mendapatkan ID produk dari URL
  const [produk, setProduk] = useState(null); // State untuk menyimpan produk
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk mengambil produk berdasarkan ID
  async function getProduk() {
    try {
      const res = await fetch(`/api/produks/${id}`); // Ambil produk dari API
      if (!res.ok) {
        throw new Error("Gagal mengambil produk");
      }
      const data = await res.json();
      setProduk(data); // Menyimpan produk ke state
    } catch (error) {
      setError(error.message); // Menyimpan pesan error jika terjadi kesalahan
    } finally {
      setLoading(false); // Set loading ke false setelah selesai
    }
  }

  // useEffect untuk mengambil produk ketika komponen pertama kali di-mount
  useEffect(() => {
    getProduk(); // Panggil fungsi getProduk untuk mengambil data produk
  }, []); // Akan dipanggil lagi ketika `id` berubah

   // Fungsi untuk menghapus post
   const handleDelete = async () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus post ini?");
    if (confirmDelete) {
      try {
        const res = await fetch(`/api/produks/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          // Jika berhasil menghapus, kembali ke halaman utama
          navigate("/");
        } else {
          throw new Error("Gagal menghapus post");
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  // Tampilkan pesan loading jika masih dalam proses loading
  if (loading) {
    return <p>Loading produk...</p>;
  }

  // Tampilkan pesan error jika terjadi kesalahan
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Tampilkan detail produk jika produk tersedia
  return (
    <>
      {produk ? (
        <div
          key={produk.id}
          className="border-2 border-dashed border-gray-300 rounded-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-2">{produk.nama}</h2>
          <p className="text-sm text-gray-600 mb-4">
            Harga: {produk.harga}

            {/* Tombol Update dan Delete setelah detail produk */}
            <div className="flex space-x-4 mt-4">
              <Link to={`/update/${produk.id}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Update
                </button>
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                Delete
              </button>
            </div>
          </p>
        </div>
      ) : (
        <p>Produk tidak ditemukan</p>
      )}
    </>
  );
}
