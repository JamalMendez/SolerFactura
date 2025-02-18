import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// NORMALIZAR EL NOMBRE DE LAS COLUMNAS
const normalizeKey = (str) =>
  str.toLowerCase().replace(/\s+/g, "").replace(/[^\w]/g, "");

export default function ColumnGroupingTable({
  columnas,
  data,
  setIsModalConfirmacion,
}) {
  const columnMap = columnas.reduce((acc, col) => {
    acc[normalizeKey(col)] = col;
    return acc;
  }, {});

  const columns = [
    ...columnas.map((col, i) => ({
      id: normalizeKey(col),
      label: col,
      minWidth: i === 0 ? 40 : 100,
      align: "left",
    })),
    { id: "acciones", label: "Acciones", minWidth: 100, align: "center" },
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditar = (index) => {
    console.log(`Editar fila en índice: ${index}`);
  };

  return (
    <Paper sx={{ width: "95%" }}>
      <TableContainer sx={{ maxHeight: 420 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{
                  top: 57,
                  minWidth: column.minWidth,
                  color: "green",
                  fontWeight: 700,
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    if (column.id === "acciones") {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button
                            variant="contained"
                            color="warning"
                            size="small"
                            onClick={() => handleEditar(index)}
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
                        </TableCell>
                      );
                    }
                    const value =
                      row[column.id] !== undefined ? row[column.id] : "N/A";
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
