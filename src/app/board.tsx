'use client'

import {useState} from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Paper from '@mui/material/Paper'
import {isGameCompleted, verifyWinner} from './gameBoard'

const Square = ({value, onClick}: {value: string | null; onClick: any}) => (
    <Button variant="outlined" className="squared-button" onClick={onClick}>
        {value}
    </Button>
)

const Board = () => {
    const rowOne = Array<string | null>(3).fill(null)
    const rowTwo = Array<string | null>(3).fill(null)
    const rowThree = Array<string | null>(3).fill(null)
    const emptyBoard = Array<Array<string | null>>(rowOne, rowTwo, rowThree)
    const [player, setPlayer] = useState('X')
    const [winner, setWinner] = useState<null | string>(null)
    const [gameBoard, setGameBoard] = useState(emptyBoard    )
    const [openWinDialog, setOpenWinDialog] = useState(false)

    const handClick = (
        board: (string | null)[][],
        rowIdx: number,
        columnIdx: number,
    ) => {
        if (isGameCompleted(board)){
        return 
        }
        const currentCell = board[rowIdx][columnIdx]

        if (currentCell) {
            return
        }
        const newBoard = board.slice()

        if (player === 'X') {
            newBoard[rowIdx][columnIdx] = 'X'
            setGameBoard(newBoard)
            setPlayer('O')
        } else {
            newBoard[rowIdx][columnIdx] = 'O'
            setGameBoard(newBoard)
            setPlayer('X')
        }

        const winner = verifyWinner(board)
        console.log(winner)
        if (winner) {
            setWinner(winner)
            setOpenWinDialog(true)
        }
    }
    const handleResetGame = () => {
        setGameBoard(emptyBoard)
        setWinner(null)
    }

    const DraggableDialog = () => {
        const handleClose = () => {
            setOpenWinDialog(false)
        }
        return (
            <Dialog
                open={openWinDialog}
                onClose={handleClose}
                PaperComponent={Paper}
                aria-labelledby="draggable-dialog-title">
                <DialogTitle
                    style={{cursor: 'move'}}
                    id="draggable-dialog-title">
                    Winner Chicken Dinner
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Congratulations to <strong>player {winner}</strong>! Get
                        your bragging rights!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Button autoFocus onClick={handleResetGame}>
                        Reset Game
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <>
            {gameBoard.map((row, rowIdx) => (
                <div className="board-row">
                    {row.map((cell, columnIdx) => (
                        <Square
                            value={cell}
                            onClick={() => {
                                handClick(gameBoard, rowIdx, columnIdx)
                            }}
                        />
                    ))}
                </div>
            ))}
            <DraggableDialog></DraggableDialog>
            <div> <Button variant="contained" onClick={handleResetGame}> Reset Game </Button> </div>
        </>
    )
}

export default Board
