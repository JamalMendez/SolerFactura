import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 2000,
  maxHeight: '500px',
  overflowY: 'scroll'
};

export default function BasicModal({ setIsModal, children, modalNombre }) {
  const handleClose = () => setIsModal(false);

  return (
    <Modal
      open
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{ ...style, position: "relative" }}>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Agregar {modalNombre}
        </Typography>

        {/* CAMPOS */}
        {children}
      </Box>
    </Modal>
  );
}
