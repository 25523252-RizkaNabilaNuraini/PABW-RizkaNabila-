import { daftarLagu } from './app.js';

const container = document.querySelector(".galeri");
const pesanKosong = document.querySelector("#pesan-kosong");

function buildCard(lagu) {
  const article = document.createElement("article");
  article.className = "kartu";

  const h3 = document.createElement("h3");
  h3.textContent = lagu.judul;

  const p = document.createElement("p");
  p.textContent = `Penyanyi: ${lagu.penyanyi}`;

  const footerDiv = document.createElement("div");
  footerDiv.className = "kartu__kaki";

  const span = document.createElement("span");
  span.textContent = `Rating: ${lagu.rating}`;

  const button = document.createElement("button");
  button.type = "button";
  button.textContent = "Putar";

  footerDiv.append(span, button);
  article.append(h3, p, footerDiv);

  return article;
}

function render(list) {
  container.textContent = "";

  if (list.length === 0) {
    if (pesanKosong) {
      pesanKosong.hidden = false;
    }
    container.style.display = "none";
    return;
  }

  if (pesanKosong) {
    pesanKosong.hidden = true;
  }
  container.style.display = "grid";

  list.forEach((lagu) => {
    container.append(buildCard(lagu));
  });
}

render(daftarLagu);

const filterRow = document.querySelector("#filter");

if (filterRow) {
  filterRow.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    filterRow.querySelectorAll("button").forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.category;

    if (category === "semua") {
      render(daftarLagu);
    } else {
      const filtered = daftarLagu.filter((lagu) => lagu.kategori === category);
      render(filtered);
    }
  });
}