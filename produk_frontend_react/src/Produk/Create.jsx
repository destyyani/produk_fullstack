import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    harga: "",
  });

  const [errors, setErrors] = useState({});

  async function handleCreate(e) {
    e.preventDefault();

    // Post data to the API
    const res = await fetch("/api/produks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify(formData), 
    });

    // Handle response
    const data = await res.json();

    // Check for errors
    if (res.ok) {
      // No errors, navigate back to home
      navigate("/");
    } else {
      // Set validation errors in the state if available
      setErrors(data.errors || { message: "An unexpected error occurred." });
    }
  }

  return (
    <>
      <h1 className="title">Tambahkan Produk</h1>

      <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
        <div>
          <input
            type="text"
            placeholder="Nama Produk"
            value={formData.nama}
            onChange={(e) =>
              setFormData({ ...formData, nama: e.target.value })
            }
          />
          {/* Display error for the title if it exists */}
          {errors.nama && <p className="text-red-500">{errors.nama[0]}</p>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Harga Produk"
            value={formData.harga}
            onChange={(e) =>
              setFormData({ ...formData, harga: e.target.value })
            }
          />
          {/* Display error for the title if it exists */}
          {errors.harga && <p className="text-red-500">{errors.harga[0]}</p>}
        </div>

        <button className="primary-btn">Tambah</button>

        {/* Display general error message if any */}
        {errors.message && <p className="text-red-500">{errors.message}</p>}
      </form>
    </>
  );
}
