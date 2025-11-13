// modal.js

function openModal(pictureElem) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");

    // Detecta se o elemento passado é <img> dentro de <picture>
    var imgSrc = pictureElem.src;

    // Verifica se há um <picture> como pai
    var parentPicture = pictureElem.closest('picture');
    if (parentPicture) {
        // Seleciona o <source> que combina com a tela atual
        var sources = parentPicture.querySelectorAll('source');
        for (var i = 0; i < sources.length; i++) {
            var media = sources[i].media;
            if (window.matchMedia(media).matches) {
                imgSrc = sources[i].srcset;
                break;
            }
        }
    }

    modalImg.src = imgSrc;
    modal.style.display = "block";

    // Fecha o modal quando clicar fora da imagem ou no "×"
    modal.onclick = function(e) {
        if (e.target === modal || e.target.className === 'close') {
            closeModal();
        }
    }

    // Fecha o modal com a tecla ESC
    function escClose(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escClose);
        }
    }
    document.addEventListener('keydown', escClose);
}

function closeModal() {
    document.getElementById("imageModal").style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('abbr').forEach(el => {
        el.addEventListener('click', function (event) {
          event.stopPropagation();

          const existing = document.querySelector('.tooltip');
          if (existing) existing.remove();

          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.textContent = el.getAttribute('title');
          document.body.appendChild(tooltip);

          setTimeout(() => tooltip.remove(), 3000);
          document.body.addEventListener('click', e => {
            if (!el.contains(e.target)) tooltip.remove();
          }, { once: true });
        });
      });
    });