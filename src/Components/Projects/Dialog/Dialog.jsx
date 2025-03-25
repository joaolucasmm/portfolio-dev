import { Fragment } from "react";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkIcon from "@mui/icons-material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function projectDialog({ projectIndex, open, handleClose, title, image, fullDescription }) {
    return (
        <Fragment>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                maxWidth="xl"
            >
                <DialogActions>
                    <Button onClick={handleClose}>
                        <CloseIcon />
                    </Button>
                </DialogActions>
                <DialogTitle className="dialog_title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        className="dialog_content"
                    >
                        <CardMedia
                            component="img"
                            image={image}
                            alt="Screenshot"
                            className="dialog_rows dialog_media"
                        />
                        <span className="dialog_rows dialog_description">
                            <section>
                                {fullDescription} Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut
                                enim ad minim veniam, quis nostrud exercitation
                                ullamco laboris nisi ut aliquip ex ea commodo
                                consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum
                                dolore eu fugiat nulla pariatur. Excepteur sint
                                occaecat cupidatat non proident, sunt in culpa
                                qui officia deserunt mollit anim id est laborum.
                            </section>
                            <section>
                                <Button>
                                    <LinkIcon />
                                    Site
                                </Button>
                                <Button>
                                    <GitHubIcon />
                                    Git
                                </Button>
                                <Button>
                                    <LinkedInIcon />
                                    Linkedin
                                </Button>
                            </section>
                            <section>
                                <Chip label="Tag" variant="outlined" />
                            </section>
                        </span>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}

export default projectDialog;