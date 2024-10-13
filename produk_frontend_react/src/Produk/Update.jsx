import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduk() {
  const { id } = useParams(); // Mendapatkan ID dari URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mendapatkan produk berdasarkan ID
  useEffect(() => {
    async function fetchProduk() {
      try {
        const res = await fetch(`/api/produks/${id}`);
        if (!res.ok) {
          throw new Error("Gagal mengambil post");
        }
        const data = await res.json();
        setFormData({
          nama: data.nama || "",
          harga: data.harga || "",
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduk();
  }, [id]);

  // Handler untuk memperbarui nilai input
  const handleChange = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/produks/${id}`, {
        method: "PUT", // Menggunakan PUT untuk update
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Gagal mengubah data produk");
      }

      // Navigasi kembali ke halaman detail setelah berhasil
      navigate(`/produks/${id}`);
      
    } catch (error) {
      setError(error.message);
    }
  };
  
  // Tampilkan loading jika masih loading
  if (loading) return <p>Loading produk...</p>;

  // Tampilkan error jika ada error
  if (error) return <p>Error: {error}</p>;

  //const UpdateProduk = () => {
    return (
      <>
        <h1 className="title">Update Produk</h1>

        <form onSubmit={handleChange} className="w-1/2 mx-auto space-y-6">
          <div>
            <label className="block mb-2">Nama Produk</label>
            <input
              type="text"
              placeholder="Nama Produk"
              className="border p-2 w-full"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            />
          </div>

          <div>
            <label className="block mb-2">Harga</label>
            <input
              type="text"
              placeholder="Harga Produk"
              className="border p-2 w-full"
              value={formData.harga}
              onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
            />
          </div>

          <button type="submit" className="primary-btn">
            Update
          </button>
        </form>
      </>
    );
  };

