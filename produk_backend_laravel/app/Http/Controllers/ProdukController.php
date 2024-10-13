<?php
namespace App\Http\Controllers;
use App\Models\Produk;
use Illuminate\Http\Request;

class ProdukController extends Controller
{
    public function index()
    {
        return Produk::all();
    }
    public function store(Request $request)
    {
        $fields = $request->validate([
            "nama"=> "required|max:255",
            "harga"=> "required",
        ]);
        $produk = Produk::create($fields);

        return $produk;
    }
    public function show(Produk $produk)
    {
        return $produk;
    }
    public function update(Request $request, Produk $produk)
    {
        $fields = $request->validate([
            "nama"=> "required|max:255",
            "harga"=> "required",
        ]);
        $produk->update($fields);

        return $produk;
    }
    public function destroy(Produk $produk)
    {
        $produk->delete();

        return ["message"=> "Produk telah dihapus"];
    }
}
