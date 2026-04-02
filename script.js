const img      = document.getElementById('cat-img');
const skeleton = document.getElementById('skeleton');
const errorMsg = document.getElementById('error-msg');
const btn      = document.getElementById('reload-btn');

// Ativa ou desativa o estado de carregamento
function setLoading(on) {
  btn.disabled = on;

  if (on) {
    btn.classList.add('loading');
  } else {
    btn.classList.remove('loading');
  }

  skeleton.classList.toggle('hidden', !on);

  if (on) {
    img.classList.remove('visible');
    errorMsg.classList.remove('visible');
  }
}

// Exibe mensagem de erro amigável
function showError() {
  skeleton.classList.add('hidden');
  errorMsg.classList.add('visible');
  btn.disabled = false;
  btn.classList.remove('loading');
}

// Busca uma imagem aleatória de gatinho na API
async function fetchCat() {
  setLoading(true);

  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    // data é um array; o link da imagem está em data[0].url
    const imageUrl = data[0].url;

    // Pré-carrega a imagem antes de exibir
    const tempImg = new Image();

    tempImg.onload = () => {
      img.src = imageUrl;
      img.classList.add('visible');
      skeleton.classList.add('hidden');
      setLoading(false);
    };

    tempImg.onerror = showError;
    tempImg.src = imageUrl;

  } catch (err) {
    console.error('Erro ao buscar imagem:', err);
    showError();
  }
}

// Evento do botão
btn.addEventListener('click', fetchCat);

// Carrega automaticamente ao abrir a página
fetchCat();
