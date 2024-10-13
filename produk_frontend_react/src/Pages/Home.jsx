import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getProduk() {
    try {
      const res = await fetch("/api/produks");
      if (!res.ok) {
        throw new Error("Gagal untuk menampilkan produk");
      }
      const data = await res.json();
      setProduk(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduk();
  }, []);

  if (loading) {
    return <p>Loading produk...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">Produk Terbaru</h1>
      <div className="space-y-6">
        {produk.length > 0 ? (
          produk.map((produk) => (
            <div
              key={produk.id}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold mb-2">{produk.nama}</h2>
              <p className="text-sm text-gray-600 mb-4">
                Created by Jon on{" "}
                {new Date(produk.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>
              <p className="text-base text-gray-800">{produk.harga.toString().substring(0, 100)}...</p>
              <Link to={`/produks/${produk.id}`} className="text-blue-500">
                Read More
              </Link>
          </div>
          ))
        ) : (
          <p>Produk tidak tersedia</p>
        )}

      </div>
    </>
  );
}
