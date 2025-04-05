import { useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { TextField } from "@mui/material";

const EmailDialog = ({ styleSection, handleClose, title, emailDialog, setEmailDialog, darkMode }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [stateMessage, setStateMessage] = useState(null);
    const sendEmail = (e) => {
        e.persist();
        e.preventDefault();
        setIsSubmitting(true);
        emailjs
            .sendForm(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                e.target,
                process.env.REACT_APP_PUBLIC_KEY
            )
            .then(
                (result) => {
                    setStateMessage("Message sent!");
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // hide message after 5 seconds
                },
                (error) => {
                    setStateMessage(
                        "Something went wrong, please try again later"
                    );
                    setIsSubmitting(false);
                    setTimeout(() => {
                        setStateMessage(null);
                    }, 5000); // hide message after 5 seconds
                }
            );

        // Clears the form after sending the email
        e.target.reset();
    };
    return (
        <div className={styleSection}>
            <Dialog
                open={emailDialog}
                keepMounted
                onClose={() => setEmailDialog(false)}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                maxWidth="xl"
                className="container_email"
            >
                <div className={"background_dialog " + (darkMode && "background_dialog_dark")}>
                <DialogActions>
                    <Button onClick={() => setEmailDialog(false)}>
                        <CloseIcon />
                    </Button>
                </DialogActions>
                <DialogTitle className="dialog_title">Me envie uma menssagem abaixo! (Não se preocupe, eu respondo meus e-mails mais rápido que o Whatsapp)</DialogTitle>
                <DialogContent>
                    <DialogContentText
                        id="alert-dialog-slide-description"
                        className="dialog_content"
                    >
                        <form onSubmit={sendEmail} className="email_form">
                            <span className="form_fields">
                                <TextField label="Name" variant="outlined" name="name" className={"email_input " + (darkMode && "email_input_dark")}/>
                                <TextField label="Title" variant="outlined" name="title"  className={"email_input " + (darkMode && "email_input_dark")}/>
                                <TextField label="e-mail" variant="outlined" name="email"  className={"email_input " + (darkMode && "email_input_dark")}/>
                            </span>
                            <span className="form_fields">
                                <TextField label="Message" variant="outlined" name="message" multiline rows={5} maxRows={10} className={"email_input " + (darkMode && "email_input_dark")}/>
                                <Button variant="outlined" type="submit" disabled={isSubmitting} className={"button " + (darkMode && "button_dark") }>
                                    Send
                                </Button>
                                {stateMessage && <p>{stateMessage}</p>}
                            </span>
                        </form>
                    </DialogContentText>
                </DialogContent>
                </div>
            </Dialog>
        </div>
    );
};
export default EmailDialog;
