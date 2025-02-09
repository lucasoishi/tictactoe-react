import { Cell } from "@/types"

const winningConditions = [
    // line winning condition
    [
        [0, 0],
        [0, 1],
        [0, 2],
    ],
    [
        [1, 0],
        [1, 1],
        [1, 2],
    ],
    [
        [2, 0],
        [2, 1],
        [2, 2],
    ],
    // column winning condition
    [
        [0, 0],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [0, 2],
        [1, 2],
        [2, 2],
    ],
    // diagonals winning condition
    [
        [0, 0],
        [1, 1],
        [2, 2],
    ],
    [
        [0, 2],
        [1, 1],
        [2, 0],
    ],
]

type GameState = 'GOING' | 'DRAW' | 'X_WIN' | 'O_WIN'

export const verifyWinner = (board: Cell[][]): GameState | null => {
    for (let i = 0; i < winningConditions.length; i++) {
        const result = winningConditions[i]
            .map<number>((position) => {
                const cell = board[position[0]][position[1]]
                return cell === 'X' ? 1 : cell === 'O' ? -1 : 0
            })
            .reduce((acc, val) => {
                return acc + val
            })
        if (result === 3) {
            return 'X_WIN'
        }
        if (result === -3) {
            return 'O_WIN'
        }
    }
    return null
}

export const isDraw = (board: Cell[][]): boolean => {
    return board
        .flatMap((row) =>
            row.map((value) => {
                if (value !== null) {
                    return true
                } else {
                    return false
                }
            }),
        )
        .reduce((acc, value) => acc && value, true)
}

export const checkGameState = (board: Cell[][]): GameState => {
    const possibleWinner = verifyWinner(board)
    if (possibleWinner) {
        return possibleWinner
    }
    if (isDraw(board)) {
        return 'DRAW'
    }

    return 'GOING'
}
