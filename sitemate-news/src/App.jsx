import React, { useState } from "react";
import { Button, Card, CardContent, Dialog, DialogTitle, DialogActions, DialogContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";

const TableWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNews = async () => {
    const apiKey = "183daca270264bad86fc5b72972fb82a";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.articles) {
        const formattedRows = data.articles.map((article, index) => ({
          id: index + 1,
          name: article.title || "No Title",
          author: article.author || "Unknown Author",
          content: article.content || "No Content Available",
        }));
        setRows(formattedRows);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleOpenModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <Card className="rounded-2xl shadow-lg">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Latest News</h1>
          <Button variant="contained" onClick={fetchNews} className="mb-2">
            Fetch News
          </Button>
          <div style={{ marginBottom: "16px" }}></div>
          <TextField
            label="Search by Title"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.author}</TableCell>
                    <TableCell>
                      <Button variant="contained" onClick={() => handleOpenModal(row)}>
                        View Details
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
        <DialogTitle>Article Details</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <div>
              <p><strong>Title:</strong> {selectedRow.name}</p>
              <p><strong>Author:</strong> {selectedRow.author}</p>
              <p><strong>Content:</strong> {selectedRow.content}</p>
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
