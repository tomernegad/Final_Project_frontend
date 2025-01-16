import React, { useState } from "react";
import { addCost } from "../db/idb";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";

function CostForm() {
  const [sum, setSum] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await addCost({ sum, category, description, date });
    setSum("");
    setCategory("");
    setDescription("");
    setDate("");
    alert("Cost added successfully!");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        Add New Cost
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <TextField
          label="Sum"
          type="number"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          required
          variant="outlined"
        />

        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          variant="outlined"
        />

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          variant="outlined"
          multiline
          rows={2}
        />

        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          variant="outlined"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
        >
          Add Cost
        </Button>
      </Box>

      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Cost added successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}

export default CostForm;
