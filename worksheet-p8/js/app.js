// Data Profil / Identitas Pemilik Halaman
const profil = {
  nama: "Rizka Nabila Nuraini",
  peran: "Mahasiswa informatika yang suka musik",
  jumlahLaguFavorit: 3,
  keahlian: ["HTML", "CSS", "JavaScript"],
};


const daftarLagu = [
  { judul: "Hati-Hati di Jalan", penyanyi: "Tulus", album: "Manusia", rating: "5/5", selesai: true },
  { judul: "Sial", penyanyi: "Mahalini", album: "Fabula", rating: "4/5", selesai: true },
  { judul: "Komang", penyanyi: "Raim Laode", album: "Komang", rating: "5/5", selesai: true }
];

let pilihanAktif = "semua";

const kalimatPerkenalan = `Halo, nama saya ${profil.nama}, seorang ${profil.peran} yang telah mencatat ${daftarLagu.length} lagu populer.`;
console.log(kalimatPerkenalan);

window.profil = profil;
window.daftarLagu = daftarLagu;