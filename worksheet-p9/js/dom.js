const container = document.querySelector(".galeri");

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

  list.forEach((lagu) => {
    container.append(buildCard(lagu));
  });
}

render(daftarLagu);