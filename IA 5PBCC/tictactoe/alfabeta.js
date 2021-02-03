var estado = [];	// estado do tabuleiro na tela
var raiz; 			// primeiro nodo da arvore
var atual;			// ponteiro para o nodo que representa o estado atual do jogo

var pilha = []; // array de ponteiros para nodo - usada para construir a árvore
var nodos = 0;	// nodos na árvore

/* objeto nodo: 

	{ pai: ponteiro para nodo,
	  estado: array[3][3] de char,
	  filhos: array de ponteiros para nodo,
	  jogador: char,
	  minimax: int }
*/

function inicializa() {
	estado = [ [],[],[] ];
	raiz = null;
	atual = null;
	
	exibeEstado(estado);
	
	document.getElementById("CPUcomeca").style.display = '';
	document.getElementById("reiniciar").style.display = 'none';
	document.getElementById("info").style.display = 'none';
	document.getElementById("infoFilhos").style.display = 'none';
	document.getElementById("quadroFilhos").innerHTML = '';
	//mostraNetos();
}

function geraArvore() {
	pilha = []; // limpa pilha
	nodos = 0;
	// gera nodo raiz a partir do estado do tabuleiro na tela (vazio ou com a primeira jogada do humano)
	raiz = {pai: null, estado: estado, filhos: [], jogador: "O", minimax: null};
	pilha.push(raiz);	// coloca na pilha
	
	document.getElementById("CPUcomeca").style.display = 'none';
	document.getElementById("info").style.display = '';
	document.getElementById("info").innerHTML = "Gerando árvore, aguarde...";
	
	while (pilha.length) {		// enquanto houver elementos na pilha
		nodo = pilha.pop();		// retira um nodo
		geraFilhos(nodo);		// e gera filhos desse nodo
	}

	calculaMinimax(raiz);	// calcula valores Minimax a partir da raiz
	
	document.getElementById("info").innerHTML = "Tamanho da árvore: "+nosex+" nodos";
	atual = raiz;	// situação atual do jogo
}
	
	
function geraFilhos(pai) {
	var estado = [];
	var x,y,minimax;
	var	jogador = (pai.jogador=="X")?"O":"X";	// verifica de quem é a vez de jogar nesse nível
	
	for (y=0; y<3; y++)
		for (x=0; x<3; x++)
			if (pai.estado[y][x] == undefined) {	// se encontrou espaço vago no tabuleiro
				estado = copiaEstado(pai.estado);	// gera uma cópia do estado atual
				estado[y][x] = jogador;				// adiciona a jogada
				var nodo = {pai: pai, estado: estado, filhos: [], jogador: jogador, minimax: null};	// cria um novo nodo para o filho

				nodo.minimax = ehTerminal(nodo.estado,0);	// se for nodo terminal, recebe valor de utilidade 
				pai.filhos.push(nodo);	// adiciona esse nodo no array de filhos do nodo pai
				nodos++;

				if (!nodo.minimax)		// se filho não é terminal, vai para a pilha, para gerar os filhos dele
					pilha.push(nodo);
			}
}

var nosex = 0;



function calculaMinimax(nodo,a,b) {	// calcula o valor minimax de um nodo
	nosex ++;
	var i, min, max, a, b;
	a = -10;
	b = 10;
	for (i=0; i < nodo.filhos.length; i++) {	// percorre todos os filhos do nodo
		if (nodo.filhos[i].minimax === null)	// se um filho ainda não tem um valor minimax (não é folha da árvore)
			calculaMinimax(nodo.filhos[i]);		// chama a função recursivamente para aquele filho

		if (max == undefined || nodo.filhos[i].minimax > max)	// guarda valor max (maior minimax entre os filhos)
			if(a<b)
				max = nodo.filhos[i].minimax;
			if (max > a)
				a = max;
				
		if (min == undefined || nodo.filhos[i].minimax < min)	// guarda valor min (menor minimax entre os filhos)
			if(a<b)
				min = nodo.filhos[i].minimax;
			if(min < b)
				b = min;
		
	}
	if (nodo.jogador == "O")
		nodo.minimax = max;		// se a próxima jogada é da CPU, retorna valor max
	else
		nodo.minimax = min;		// caso contrário, retorna valor min
		
	
}

function ehTerminal(estado,encerra) {	// verifica se estado é terminal, retornando seu valor de utilidade
	var x,y;							// retorna null caso não seja estado terminal
	var brancos = 0;					// encerra = 0 para calcular o valor de utilidade durante a geração da árvore
	var utilidade = null;				//         = 1 para encerrar o jogo quando estado for terminal
	
	for (y=0; y<3; y++)		// testa linhas
		if (estado[y][0] != undefined && estado[y][0] == estado[y][1] && estado[y][0] == estado[y][2]) {
			utilidade = (estado[y][0] == "X")? 1: -1;	// utilidade 1 para X (CPU), -1 para O (humano)
			break;
		}
	if (!utilidade)			// testa colunas
		for (x=0; x<3; x++)	
			if (estado[0][x] != undefined && estado[0][x] == estado[1][x] && estado[0][x] == estado[2][x]) {
				utilidade = (estado[0][x] == "X")? 1: -1;
				break;
			}
	if (!utilidade)			// testa diagonais
		if ( estado[1][1] != undefined && (
			 (estado[0][0] == estado[1][1] && estado[0][0] == estado[2][2]) ||
			 (estado[0][2] == estado[1][1] && estado[0][2] == estado[2][0])    ) )
			utilidade = (estado[1][1] == "X")? 1: -1;
				
	for (y=0; y<3; y++)
		for (x=0; x<3; x++)
			if (estado[y][x] == undefined)	// conta espaços em branco no tabuleiro
				brancos++;
				
	if (utilidade)					// se achou um vencedor
		if (encerra)
			if (utilidade > 0)		// utilidade > 0 venceu CPU
				termina("Eu ganhei!");
			else
				termina("Você ganhou!");	// essa mensagem nunca será exibida :)
		else
			return utilidade*(brancos+1); 	// retorna valor de utilidade - nº de casas vagas dá um peso maior,
											// favorecendo a escolha da jogada vitoriosa no nível mais raso
	else							
		if (!brancos)				// se não tem mais espaços em branco também é terminal...
			if (encerra)
				termina("Empatamos!");
			else
				return 0;			// ...com utilidade 0 (empate)
		else
			return null; 			// se ainda tem brancos, não é terminal
}


function jogaHumano(elemento) {
	var i = Number(elemento.id.substr(1,1)); // pega linha a partir da id do elemento (ex. "p02")
	var j = Number(elemento.id.substr(2,1)); // pega coluna a partir da id do elemento

	if (estado[i][j] != undefined) {
		swal("Posicao invalida");
		return;
	}
	else {
		estado[i][j] = "O";		// coloca a jogada do humano
		exibeEstado(estado);	// atualiza tabuleiro na tela
	}
	
	if (!ehTerminal(estado,1)) {	// verifica se jogada do humano resultou em um estado terminal
		if (!raiz)			// se raiz é null, árvore ainda não foi gerada (humano começa o jogo)
			geraArvore();	// a raiz será o estado atual, já com a jogada do humano
		else
			for (i=0;i < atual.filhos.length; i++)	// procura nos filhos do estado atual, qual representa a situação após a jogada do humano
				if (comparaEstados(estado,atual.filhos[i].estado)) {
					atual = atual.filhos[i];
					break;
				}
		jogaCPU();	// passa a vez para a CPU
	}
}

function jogaCPU() {
	var max;
	var opcoes = [];	// array das opções de jogadas
	var i,r;
	
	if (!raiz)			// se raiz é null, árvore ainda não foi gerada (CPU começa o jogo)
		geraArvore();

	document.getElementById("infoFilhos").style.display = '';	// limpa exibição dos filhos e netos
	document.getElementById("quadroFilhos").innerHTML = '';
	//mostraNetos();
	
	// avalia qual a melhor opção de jogada, dentre as possíveis (filhos do estado atual)
	for (i=0;i < atual.filhos.length; i++) {
		mostraFilho(atual.filhos[i],i,0);
		if (atual.filhos[i].minimax != null && (max == undefined || atual.filhos[i].minimax > max))
			max = atual.filhos[i].minimax;	// salva maior valor minimax dos filhos
	}
	
	// percorre novamente os filhos, checando todos que tenham o mesmo valor minimax ótimo
	for (i=0;i < atual.filhos.length; i++)
		if (atual.filhos[i].minimax == max)
			opcoes.push(i);	// coloca índice deste filho no array de opções de jogada
		
	// e escolhe aleatoriamente um deles, para dar mais variedade às jogadas
	r = Math.floor(Math.random()*opcoes.length);
	atual = atual.filhos[opcoes[r]];
	estado = atual.estado;
	exibeEstado(estado);
	
	ehTerminal(estado,1);	// Verifica se atingiu estado terminal, encerrando o jogo 
}

/* funções de display */

function exibeEstado(estado) {	// atualiza tabuleiro na tela
	for (var i=0; i<3; i++)
		for (var j=0; j<3; j++) {
			elemento = document.getElementById("p"+i+j);
			if (estado[i][j] == undefined)
				elemento.innerHTML = "&nbsp;";
			else
				elemento.innerHTML = estado[i][j];
		}
}

function mostraFilho(nodo,i,n) {	// adiciona um nodo aos blocos de filhos ou netos, abaixo do tabuleiro
	var html;						// n=0 filhos, n=1 netos
	var x,y;
	
	for (y=0; y<3; y++) {
		for (x=0; x<3; x++)
			if (nodo.estado[y][x] == undefined)
				html += "   ";
			else
				html += nodo.estado[y][x]+"  ";
		html += "\n";
	}
	
}



function termina(msg) {
	swal(msg);
	document.getElementById("reiniciar").style.display = '';
	document.getElementById("CPUcomeca").style.display = 'none';
}

/* funções auxiliares */

function copiaEstado(estado) {
	var retorno = [];
	for(var i = 0; i < estado.length; i++)	// copia elementos do array
		retorno[i] = estado[i].slice(0);	// necessário para evitar a cópia por referência
    
	return retorno;
}

function comparaEstados(estado1,estado2) {
	for (var i=0; i<3; i++)
		for (var j=0; j<3; j++)
			if (estado1[i][j] != estado2[i][j])
				return false;
				
	return true;
}
