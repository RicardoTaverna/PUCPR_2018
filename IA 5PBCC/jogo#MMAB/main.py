
# -*- coding: utf-8 -*-

#       === SMART SCHOOL ===
#   JOGO DA VELHA COM PYTHON v1.0.0 
#        www.smartweb.co.ao

# Libs do Python

from sys import maxsize


#======================== VARIAVEIS GLOBAIS


# ========================= FUNCOES =========================
def tic_tac_toe():
    board = [None] + list(range(1, 10))
    combinacoesVencedoras = [
        (1, 2, 3),
        (4, 5, 6),
        (7, 8, 9),
        (1, 4, 7),
        (2, 5, 8),
        (3, 6, 9),
        (1, 5, 9),
        (3, 5, 7),
    ]

def desenhar():
    print('  {}  |  {}  |  {}  '.format(board[7], board[8], board[9]))
    print('----------------')
    print('  {}  |  {}  |  {}  '.format(board[4], board[5], board[6]))
    print('----------------')
    print('  {}  |  {}  |  {}  '.format(board[1], board[2], board[3]))
    print()

def escolherNumero():
    while True:
        try:
            a = int(input())
            if a in board:
                return a
            else:
                print("\nMovimento invalido. Tente novamente")
        except ValueError:
            print("\nEste nao e um numero. Tente novamente")
def gameOver():
    for a, b, c in combinacoesVencedoras:
        if board[a] == board[b] == board[c]:
            print("Jogador {0} Venceu!\n".format(board[a]))
            print("Parabens!\n")
            return True
    if 9 == sum((pos == 'X' or pos == 'O') for pos in board):
        print("Deu ####VELHA####\n")
        return True

# ========================== FUNCOES IA =========================




# =======================================================================

if __name__ == '__main__':
    tic_tac_toe()
    desenhar()

