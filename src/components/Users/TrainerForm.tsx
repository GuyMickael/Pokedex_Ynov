import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface TrainerFormProps {
  onCreate: (name: string) => void;
}

const TrainerForm: React.FC<TrainerFormProps> = ({ onCreate }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      setName("");
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Créer un Dresseur
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nom du dresseur"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Créer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TrainerForm;
