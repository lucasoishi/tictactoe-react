'use client'

import {createContext, useContext, useState} from 'react'
import {Cell, GameBoard} from '@/types'
import { checkGameState } from '@/services/gameLogic'

type Player = 'X' | 'O'

export type boardCell = string | null | undefined

interface GameContextType {
    board: GameBoard
    winner: Player | null
    nextToPlay: Player | null
    winDialog: boolean
    setupNewGame: () => void
    computePlay: (board: Cell[][], row: number, column: number) => void
    closeDialog: () => void
}

const buildContext = () => {
    const row = Array<Cell>(3).fill(null)
    const emptyBoard = Array<Array<string | null>>(row, row, row)

    return {
        winner: null,
        nextToPlay: null,
        board: emptyBoard,
        winDialog: false,
        setupNewGame: () => {},
        computePlay: () => {},
        closeDialog: () => {},
    }
}
const GameContext = createContext<GameContextType>(buildContext())

export const GameProvider: React.FC<{children?: React.ReactNode}> = ({
    children,
}) => {
    const emptyBoard = Array(3)
        .fill(null)
        .map(() => Array(3).fill(null))

    const [player, setPlayer] = useState<Player | null>('X')
    const [winner, setWinner] = useState<Player | null>(null)
    const [winDialog, setWinDialog] = useState<boolean>(false)
    const [gameBoard, setGameBoard] = useState(emptyBoard.slice())
    const setupNewGame = () => {
        setWinDialog(false)
        setGameBoard(emptyBoard)
        setWinner(null)
        setPlayer('X')
    }

    const computePlay = (board: Cell[][], row: number, column: number) => {
        if (checkGameState(board) !== 'GOING') { // make sure that play can be made
            return
        }
    
        const newBoard = board.slice()
        newBoard[column][row] = player
        setGameBoard(newBoard)
    
        const gameState = checkGameState(newBoard) // Check the new board state
        if (gameState === 'GOING') {
            const nextPlayer = player === 'X' ? 'O' : 'X' 
            setPlayer(nextPlayer)
            return
        }
    
        // Set winner based on game state
        if (gameState === 'X_WIN') {
            setWinner('X')
        } else if (gameState === 'O_WIN') {
            setWinner('O')
        }
        
        setWinDialog(true)
    }

    const closeDialog = () => {
        setWinDialog(false)
    }

    return (
        <GameContext.Provider
            value={{
                board: gameBoard,
                winner: winner,
                nextToPlay: player,
                winDialog: winDialog,
                setupNewGame: setupNewGame,
                computePlay: computePlay,
                closeDialog: closeDialog,
            }}>
            {children}
        </GameContext.Provider>
    )
}

export const useGameContext = (): GameContextType => {
    const context = useContext(GameContext)
    if (context === undefined) {
        throw new Error('GameContext must be used within a GameProvider')
    }

    return context
}
