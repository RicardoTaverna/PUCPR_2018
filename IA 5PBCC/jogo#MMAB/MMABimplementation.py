from sys import maxsize


def tic_tac_toe():
    board = [None] + list(range(1, 10))
    winCombinations = [
        (1, 2, 3),
        (4, 5, 6),
        (7, 8, 9),
        (1, 4, 7),
        (2, 5, 8),
        (3, 6, 9),
        (1, 5, 9),
        (3, 5, 7),
    ]

    def draw():
        print('  {}  |  {}  |  {}  '.format(board[7], board[8], board[9]))
        print('----------------')
        print('  {}  |  {}  |  {}  '.format(board[4], board[5], board[6]))
        print('----------------')
        print('  {}  |  {}  |  {}  '.format(board[1], board[2], board[3]))
        print()

    def choose_number():
        while True:
            try:
                a = int(input())
                if a in board:
                    return a
                else:
                    print("\nInvalid move. Try again")
            except ValueError:
                print("\nThat's not a number. Try again")

    def is_game_over():
        for a, b, c in winCombinations:
            if board[a] == board[b] == board[c]:
                print("Player {0} wins!\n".format(board[a]))
                print("Congratulations!\n")
                return True
        if 9 == sum((pos == 'X' or pos == 'O') for pos in board):
            print("The game ends in a tie\n")
            return True

    ## Tree Builder
    class Node(object):
        def __init_(self, i_depth, i_playerNum, i_fieldsRemaining, i_value = 0):
            self.i_depth = i_depth
            self.i_playerNum = i_playerNum
            self.i_fieldsRemaining = i_fieldsRemaining
            self.i_value = i_value
            self.children = []
            self.CreateChildren()

        def CreateChildren(self):
            if self.i_depth >= 0:
                for i in range(1, 9):
                    v = self.i_fieldsRemaining - 1
                    self.children.append( Node( self.i_depth - 1,
                                                -self.i_playerNum,
                                                v,
                                                self.RealVal(v)))

        def RealVal(self, value):
            if (value == 0):
                return maxsize * self.i_playerNum
            elif (value < 0):
                return maxsize * -self.i_playerNum
            return 0

    ## Algorhithm
    class MinMax(node, i_depth, i_playerNum):
        if (i_depth == 0) or (abs(node.i_value) == maxsize):
            return node.i_value

        i_bestValue = maxsize * -i_playernNum

        for i in range(len(node.children)):
            child = node.children[i]
            i_val = MinMax(child, i_depth - 1, -i_playerNum)
            if(abs(maxsize * i_playerNum - i_val) < abs(maxsize * i_playerNum - i_bestValue)):
                i_bestValue = i_val

        return i_bestValue
        

    for player in 'XO' * 9:
        draw()
        if is_game_over():
            break
        print("Player {0} pick your move".format(player))
        board[choose_number()] = player
        print()


while True:
    tic_tac_toe()
    if input("Play again (y/n)\n") != "y":
        break
