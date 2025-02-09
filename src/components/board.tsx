'use client'

import { Fragment } from 'react'
import {Tile} from './tile'
import {useGameContext} from '@/context/gameContext'
import styles from './board.module.css'

const Board = () => {
    const {board, computePlay} = useGameContext()
    return (
        <Fragment>
            {board.map((row, rowIdx) => (
                <div key={rowIdx} className={styles['board-row']}>
                    {row.map((cell, columnIdx) => (
                        <Tile
                            key={`${rowIdx}-${columnIdx}`}
                            value={cell}
                            onClick={() => {
                                computePlay(board, columnIdx, rowIdx)
                            }}
                        />
                    ))}
                </div>
            ))}
        </Fragment>
    )
}

export default Board
