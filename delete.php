<?php


$koneksi = new mysqli('localhost','root','','produk');

$id_produk = $_POST['id_produk'];

$data = mysqli_query($koneksi, "delete from tb_produk where id_produk='$id_produk'");

 if ($data) {
    echo json_encode([
        'pesan' => 'Sukses delete'
    ]);
}else{
    echo json_encode([
        'pesan' => 'Gagal delete'
    ]);
}