import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";  // Ensure this is correct
import Layout from "./Pages/Layout";
import Home from "./Pages/Home";
import Create from "./Produk/Create";
import DetailProduk from "./Produk/DetailProduk";
import Update from "./Produk/Update";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="produks/:id" element={<DetailProduk />} />
          <Route path="/update/:id" element={<Update />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
