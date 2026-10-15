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

function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));

window.buatPerkenalan = buatPerkenalan;
window.formatKeahlian = formatKeahlian;

console.table(profil.keahlian);
console.table(daftarLagu);


const laguFavorit = daftarLagu.filter((lagu) => lagu.selesai === true);
console.table(laguFavorit);


const cariLagu = daftarLagu.find((lagu) => lagu.judul === "Komang");
console.log("Hasil pencarian find:", cariLagu);


const daftarJudul = daftarLagu.map((lagu) => lagu.judul);
console.log("Hasil map judul lagu:", daftarJudul);


window.daftarLagu = daftarLagu;
window.laguFavorit = laguFavorit;
window.cariLagu = cariLagu;
window.daftarJudul = daftarJudul;