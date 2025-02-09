import { useGameContext } from "@/context/gameContext"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

export const WinDialog = () => {
    const { winner, setupNewGame, winDialog, closeDialog } = useGameContext()

    return (
        <Dialog
            open={winDialog}
            onClose={closeDialog}
            aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                Winner Chicken Dinner
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Congratulations to <strong>player {winner}</strong>! Get
                    your bragging rights!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={closeDialog}>
                    Close
                </Button>
                <Button autoFocus onClick={setupNewGame}>
                    Reset Game
                </Button>
            </DialogActions>
        </Dialog>
    )
}
