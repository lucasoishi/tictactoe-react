import {Button} from '@mui/material'
import styles from './tile.module.css'

export const Tile = ({
    value,
    onClick,
}: {
    value: string | null
    onClick: any
}) => (
    <Button variant="outlined" className={styles['squared-button']} onClick={onClick}>
        {value}
    </Button>
)
