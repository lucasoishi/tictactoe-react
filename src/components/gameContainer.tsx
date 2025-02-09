import {useGameContext} from '@/context/gameContext'
import {Button} from '@mui/material'
import Board from './board'
import {Fragment} from 'react'
import { WinDialog } from './winDialog'

export const GameContainer = () => {
    const {setupNewGame} = useGameContext()
    return (
        <Fragment>
            <div>
                <Board></Board>
            </div>
            <div>
                <Button variant="contained" onClick={setupNewGame}>
                    Reset Game
                </Button>
            </div>
            <WinDialog />
        </Fragment>
    )
}
