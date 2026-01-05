import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

interface PokemonSelectorProps {
  onAdd: (pokemon: string) => void;
}

const starters = ["Bulbizarre", "Carapuce", "Salamèche"];

const PokemonSelector: React.FC<PokemonSelectorProps> = ({ onAdd }) => {
  const [selected, setSelected] = useState("");

  const handleAdd = () => {
    if (selected) {
      onAdd(selected);
      setSelected("");
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", mt: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Ajouter un Pokémon
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="pokemon-select-label">Choisir un Pokémon</InputLabel>
          <Select
            labelId="pokemon-select-label"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            label="Choisir un Pokémon"
          >
            {starters.map((pokemon) => (
              <MenuItem key={pokemon} value={pokemon}>
                {pokemon}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handleAdd}
          disabled={!selected}
        >
          Ajouter
        </Button>
      </CardContent>
    </Card>
  );
};

export default PokemonSelector;
