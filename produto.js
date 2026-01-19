fetch("banco.json").then((resposta) => {
    resposta.json().then((dados) => {
        dados.produtos.map((name) => {

        pagina(name);
        })
    })               
})
let prod_atual;

function pagina(name) {
    prod_atual = localStorage.getItem('produto');

    /*verifica o produto*/
    if (prod_atual == name.id) {
        /*nome*/
        document.getElementById('titulo').textContent = `${name.nome}`

        /*parte do preço*/
        if (name.promocao > 0) {
            const promo = name.promocao/100;
            
            document.getElementById('preco_total').innerHTML = `<h5 class="py-3 mt-5 mb-0 text-danger" style="text-align: left; text-decoration: line-through; padding-bottom: 0px !important;">R$${name.preco}</h5>
                                                    <h4 class="py-3 mt-0 text-success" style="text-align: left; padding-top: 0px !important">R$${(name.preco - name.preco*promo).toFixed(2)}</h4>`

        } else {            
            document.getElementById('preco_total').innerHTML = `<h4 class="py-3 mt-5" style="text-align: left;">R$${name.preco}</h4>`
        }

        /*carroseu*/
        name.imagem.forEach((item, pos) => {
            document.getElementById(`foto_${pos + 1}`).src = `imagens/produtos/${item}`;
            document.getElementById(`foto_${'I'.repeat(pos + 1)}`).src = `imagens/produtos/${item}`;
        });

        /*especificaçõse*/
        name.especificacoes.forEach((item) => {
            document.getElementById('especs').innerHTML += `<li class="list-group-item">${item}</li>`
        })
    }
}

/*pesquisa no catalogo*/
function pesquisa_catalogo() {
    const pesquisa_index = document.getElementById('busca_top').value;
    localStorage.setItem('busca', pesquisa_index);
    window.location.href = 'catalogo.html'
}

/*quantidade*/
let contador = 0;
const display = document.getElementById('valor');

function alterar(valor) {
    contador += valor;
    att_display();
}

function att_display() {
    if(contador >= 0) {
        display.innerText = contador;
    } else {
        contador = 0;
    }
}

/*carrinho*/
function carrinho() {
    contador = parseInt(contador);
    if (contador != 0) {
        if(localStorage.getItem(prod_atual)) {
            let nova_quant = parseInt(localStorage.getItem(prod_atual));
            nova_quant += contador;
            localStorage.setItem(prod_atual, nova_quant);
        } else {
            localStorage.setItem(prod_atual, contador);
        }

        const qnt_suc = document.getElementById('qnt_car');
        if (contador == 1) {
            qnt_suc.innerHTML = `${contador} item foi adicionado com sucesso!`;
        } else {
            qnt_suc.innerHTML = `${contador} itens foi adicionado com sucesso!`;
        }
    }
}