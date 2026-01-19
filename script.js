let met = 0;

/*carrega pagina produtos*/
document.getElementById('lista_prod').addEventListener('click', function(e) {
    const link_I = e.target.closest('.pesq');
    
    if (link_I) {
      e.preventDefault();
      const id_prod = e.target.id;
      
      localStorage.setItem('produto', id_prod);
      window.location.href = 'produto.html'
    }
});


function pesquisa_catalogo() {
  const pesquisa_index = document.getElementById('busca_index').value;
  localStorage.setItem('busca', pesquisa_index);
  window.location.href = 'catalogo.html'
}


function carregar_cat() {
  met = 1;
  carregar()
}

function carregar() {
  const novo = document.querySelector(".pop");
  const novo_novo = document.querySelector("#lista_prod");

  fetch("banco.json").then((resposta) => {
    resposta.json().then((dados) => {

      if (met === 1) {
        dados.produtos.map((name) => {
        
        /*populares inicio*/        
        fzr_cards(name, novo_novo);
      })

      met = 0;

      } else {
        dados.produtos.map((name) => {
        
          /*populares inicio*/        
          if (name.pop === true) {
            fzr_cards(name, novo);
          }

        })
      }
    })               
  })
}

/*faz os cards de produtos*/
function fzr_cards(name, novo) {
  if (name.promocao > 0) {
    const promo = name.promocao/100;

    /*prmoção acima de 50%*/
    if (name.promocao >= 50) {
      novo.innerHTML += `<article class="bg-warning col-12 col-md-6 col-lg-4 card">
          <div class="p-3 rounded-2 text-center justify-content-between align-items-center" style="text-overflow: ellipsis;">
          <img src="imagens/produtos/${name.imagem[0]}" class="img_card">
          <a href="produto.html" style="text-decoration: none;" class="pesq" data-nome="${name.uso_tipo}"><h5 id="${name.id}">${name.nome}</h5></a>
          <div>
            <h6 class="text-muted mb-0" style="text-decoration: line-through;">R$${name.preco}</h6>
            <h6 class="text-danger"> -${name.promocao}% off</h6>
          </div>
          <h5 class="text-success preco">R$${(name.preco - name.preco*promo).toFixed(2)}</h5>
          </div>
          </article>`;
    } else { /*prmoção abaixo de 50%*/
      novo.innerHTML += `<article class="bg-info col-12 col-md-6 col-lg-4 card">
          <div class="p-3 rounded-2 text-center justify-content-between align-items-center" style="text-overflow: ellipsis;">
          <img src="imagens/produtos/${name.imagem[0]}" class="img_card">
          <a href="produto.html" style="text-decoration: none;" class="pesq" data-nome="${name.uso_tipo}"><h5 id="${name.id}">${name.nome}</h5></a>
          <div>
            <h6 class="text-muted mb-0" style="text-decoration: line-through;">R$${name.preco}</h6>
            <h6 class="text-danger"> -${name.promocao}% off</h6>
          </div>
          <h5 class="text-success preco">R$${(name.preco - name.preco*promo).toFixed(2)}</h5>
          </div>
          </article>`;
    }
  } else { /*sem promoção*/
    novo.innerHTML += `<article class="col-12 col-md-6 col-lg-4 card">
          <div class="p-3 rounded-2 text-center justify-content-between align-items-center" style="text-overflow: ellipsis;">
          <img src="imagens/produtos/${name.imagem[0]}" class="img_card">
          <a href="produto.html" style="text-decoration: none;" class="pesq" data-nome="${name.uso_tipo}"><h5 id="${name.id}">${name.nome}</h5></a>
          <h5 class="preco" style="margin-top:60px;">R$${name.preco}</h5>
          </div>
          </article>`;
  }
}
