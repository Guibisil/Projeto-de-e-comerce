fetch("banco.json").then((resposta) => {
    resposta.json().then((dados) => {
        dados.produtos.map((name) => {

        car_itens(name);
        total(name);
        })
    })               
})
let prod_id, prod_total, mont = 0;

function car_itens(name) {
    prod_id = name.id;    

    if (localStorage.getItem(prod_id)) {
        const qnt = parseInt(localStorage.getItem(prod_id));
        const novo_list = document.getElementById('car_lista');

        if (name.promocao > 0) {
            const novo_preco = name.preco - (name.preco*name.promocao/100);

            novo_list.innerHTML += `<tr id="t${prod_id}">
                                    <td class="text-start fw-bold">${name.nome}</td>
                                    <td id="p${prod_id}">R$ ${novo_preco}</td>

                                    <td>
                                        <div class="d-flex justify-content-between align-items-center" style="min-height: 43.5px; min-width: 90px;">
                                        <button onclick="alterar(-1, 'd${prod_id}')" class="btn btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                                        style="width: 25px; height: 25px; line-height: 1">-</button>
                                        <div id="d${prod_id}">${qnt}</div>
                                        <button onclick="alterar(1, 'd${prod_id}')" class="btn btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                                        style="width: 25px; height: 25px; line-height: 1">+</button></div>
                                    </td>

                                    <td id="s${prod_id}">R$ ${(novo_preco * qnt).toFixed(2)}</td>
                                    <td class="text-center">
                                        <img src="imagens/lixeira.png" onclick="remove(${prod_id})" class="img-fluid click" role="button">
                                    </td>`
        } else {
            novo_list.innerHTML += `<tr id="t${prod_id}">
                                    <td class="text-start fw-bold">${name.nome}</td>
                                    <td id="p${prod_id}">R$ ${name.preco}</td>

                                    <td>
                                        <div class="d-flex justify-content-between align-items-center" style="min-height: 43.5px; min-width: 90px;">
                                        <button onclick="alterar(-1, 'd${prod_id}')" class="btn btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                                        style="width: 25px; height: 25px; line-height: 1">-</button>
                                        <div id="d${prod_id}">${qnt}</div>
                                        <button onclick="alterar(1, 'd${prod_id}')" class="btn btn-outline-secondary p-0 d-flex align-items-center justify-content-center"
                                        style="width: 25px; height: 25px; line-height: 1">+</button></div>
                                    </td>

                                    <td id="s${prod_id}">R$ ${(name.preco * qnt).toFixed(2)}</td>
                                    <td class="text-center">
                                        <img src="imagens/lixeira.png" onclick="remove(${prod_id})" class="img-fluid click" role="button">
                                    </td>`
        }
    }
}

function total(name) {
    prod_total = parseFloat(name.preco);

    if (localStorage.getItem(prod_id)) {
        if (name.promocao > 0) {
            prod_total = prod_total - (prod_total*name.promocao/100);
            prod_total = prod_total * parseInt(localStorage.getItem(prod_id));
            mont += prod_total;
        } else {
            prod_total = prod_total * parseInt(localStorage.getItem(prod_id));
            mont += prod_total;
        }
    }
    
    const mont_total = document.getElementById('total_pagar')
    mont_total.innerHTML = `<h4 class="text-primary">R$ ${mont.toFixed(2)}</h4>`
}

function remove(e) {
    const eleminar = 't'+e;
    const elemento = document.getElementById(eleminar);
    elemento.remove();
    
    localStorage.removeItem(e)
    montante();
}


function alterar(valor, id_div) {
    let lista_qnt = parseInt(document.getElementById(id_div).textContent);
    lista_qnt += valor;
    att_display(id_div, lista_qnt);
    montante();
}

function att_display(e, d) {
    if(d >= 1) {
        document.getElementById(e).textContent = d;
        localStorage.setItem((e.slice(1)), d)
    } else {
        document.getElementById(e).textContent = 1;
        d = 1;
    }

    e = e.slice(1);
    att (e, d)
}

function att(e, d) {
    const preco_ele = document.getElementById('p' + e).textContent;
    const preco_certo = parseFloat(preco_ele.slice(3).replace(',', '.'));
    
    const subtotal = preco_certo * d;
    
    const sub = document.getElementById('s' + e);
    sub.innerHTML = "R$ " + subtotal.toFixed(2).replace('.', ',');
}

function montante() {
    const linhas = document.querySelectorAll('#car_lista tr');
    let sup_mont = 0;

    linhas.forEach((linha) => {
        const sub_preco = parseFloat(linha.cells[3].textContent.slice(3).replace(',', '.'));
        sup_mont += sub_preco
    });
    const mont_total = document.getElementById('total_pagar')
        mont_total.innerHTML = `<h4 class="text-primary">R$ ${sup_mont.toFixed(2)}</h4>`
}

/*pesquisa no catalogo*/
function pesquisa_catalogo() {
    const pesquisa_index = document.getElementById('busca_top').value;
    localStorage.setItem('busca', pesquisa_index);
    window.location.href = 'catalogo.html'
}