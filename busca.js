const busca = document.getElementById('busca');
const tabela = document.querySelector('.tabela');
const preco_max = document.getElementById('preco');
const preco_tela = document.getElementById('preco_label');
const uso = document.getElementById('uso');
let cards, sem, valor;
/*Dá tempo pros cards se formarem antes de declarar "cards"*/
setTimeout(() => {
    cards = Array.from(document.querySelectorAll('.card'));
    sem = Array.from(document.querySelectorAll('.card'));
}, 1000);

/*busca dinamica*/
busca.addEventListener('input', function() {
    busca_dinamica();
});

function busca_dinamica() {
    const pesquisa = busca.value.toLowerCase().trim();
    
    cards.forEach(card => {
        const nome = card.querySelector('.pesq');        
        
        if (nome) {
            const produto = nome.textContent.toLowerCase();            

            if (produto.includes(pesquisa)) {
                card.style.display = 'grid';
                
            } else {
                card.style.display = 'none';
            }
        }
    });
}

/*ordena em ordem alfabetica*/
function ordem() {
    if (document.getElementById('r_2').checked) {
        ordem_az();
    } else if (document.getElementById('r_3').checked) {
        ordem_za();
    } else if (document.getElementById('r_1').checked) {
        ordem_sem();
    }
}

function ordem_az() {
    cards.sort((a, b) => {
        const nomeA = a.querySelector('.pesq').textContent.toLowerCase().trim();
        const nomeB = b.querySelector('.pesq').textContent.toLowerCase().trim();
        return nomeA.localeCompare(nomeB);
    });

    cards.forEach(card => tabela.appendChild(card));
}

function ordem_za() {   
    cards.sort((a, b) => {
        const nomeA = a.querySelector('.pesq').textContent.toLowerCase().trim();
        const nomeB = b.querySelector('.pesq').textContent.toLowerCase().trim();
        return nomeB.localeCompare(nomeA);
    });

    cards.forEach(card => tabela.appendChild(card));
}

function ordem_sem() {
    sem.forEach(card => tabela.appendChild(card))
}

/*range de preço*/
preco_max.addEventListener('input', function() {
    let valor = parseFloat(preco_max.value);
    preco_tela.textContent = "R$" + valor;
    
    cards.forEach(card => {
        let preco_menor = card.querySelector('.preco').textContent.slice(2);

        if (valor >= preco_menor) {
            card.style.display = 'grid';
        } else {
            card.style.display = 'none';
        }
        
    });
});

/*tipo de uso*/
uso.addEventListener('change', function() {
    const isso = this.value;
    
    if (isso == "sem") {
        cards.forEach(card => {
            card.style.display = 'grid'; 
        });
    } else {
        cards.forEach(card => {
            const verifica = card.querySelector('.pesq').dataset.nome;            
            
            if (isso == "gamer") {
                if (verifica == "gamer") {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            } else if (isso == "casual") {
                if (verifica == "casual") {
                    card.style.display = 'grid';
                } else {
                    card.style.display = 'none';
                }
            }        
        });
    }    
});

/*pesquisa index*/
if (localStorage.getItem('busca')) {
    setTimeout(() => {
        const temp = localStorage.getItem('busca');
        busca.value = temp;
        busca_dinamica();
        localStorage.removeItem('busca');
    }, 1000);
}