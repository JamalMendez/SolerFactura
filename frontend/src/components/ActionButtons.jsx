import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ActionButtons({index, row, onShowModal, setIsModalConfirmacion}) {
  return (
    <div>
      <Button
        variant="contained"
        color="warning"
        size="small"
        onClick={() => onShowModal(index)}
        startIcon={<EditIcon />}
        style={{ marginRight: "5px", paddingRight: 0 }}
      />
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() =>
          setIsModalConfirmacion({
            active: true,
            id: row.id,
          })
        }
        startIcon={<DeleteIcon />}
        style={{ paddingRight: 0 }}
      />
    </div>
  );
}
