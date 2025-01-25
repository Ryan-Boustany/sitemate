import React, { useState } from "react";
import { Button, Card, CardContent, Dialog, DialogTitle, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const TableWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const rows = [
    { id: 1, title: "title 1", author: "Row 1", description: "This is the first row." },
    { id: 2, title: "title 2", author: "Row 2", description: "This is the second row." },
    { id: 3, title: "title 3", author: "Row 3", description: "This is the third row." },
  ];

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <div className="p-4">
      <Card className="rounded-2xl shadow-lg">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">SiteMate News Articles</h1>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Open Article</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleOpenModal(row)}>
                        Open Modal
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Modal Title</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              <p><strong>ID:</strong> {selectedRow.id}</p>
              <p><strong>Name:</strong> {selectedRow.name}</p>
              <p><strong>Description:</strong> {selectedRow.description}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableWithModal;