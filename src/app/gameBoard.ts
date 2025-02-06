export type boardCell = string | null | undefined

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

export const verifyWinner = (board: boardCell[][]): string | undefined => {
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
            console.log(winningConditions[i])
            return 'X'
        }
        if (result === -3) {
            console.log(winningConditions[i])
            return 'O'
        }
    }
    return
}

export const isGameCompleted = (board: boardCell[][]): boolean => {
    const winner = verifyWinner(board)
    return winner !== undefined
}
