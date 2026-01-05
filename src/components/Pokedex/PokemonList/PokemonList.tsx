import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Fab,
  Avatar,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppSelector } from "../../../hooks/useAppSelector";
import {
  useGetAllPokemonsQuery,
  useGetGenQuery,
} from "../../../api/pokemonApi";
import Header from "../../Header/Header";

export function PokemonList() {
  const [page, setPage] = useState(0);
  const itemsPerPage = 35;
  const navigate = useNavigate();
  const { generationId } = useParams<{ generationId: string }>();
  const location = useLocation();
  const isAllPokemonsRoute = location.pathname === "/pokemons";
  const generation = generationId ? parseInt(generationId) : 2; // Default to gen 2

  const pokemonCapturedIds = useAppSelector(
    (state) => state.pokemon.capturedPokemonIds
  );
  const {
    data: allPokemons = [],
    isLoading: isLoadingAllPokemons,
    isError: isErrorAllPokemons,
  } = useGetAllPokemonsQuery();
  const {
    data: pokemons = [],
    isLoading,
    isError,
  } = useGetGenQuery(generation);

  // Utiliser tous les Pokémon si on est sur /pokemons, sinon utiliser la génération
  const displayPokemons = isAllPokemonsRoute ? allPokemons : pokemons;
  const isLoadingData = isAllPokemonsRoute ? isLoadingAllPokemons : isLoading;
  const isErrorData = isAllPokemonsRoute ? isErrorAllPokemons : isError;
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemons = displayPokemons.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (endIndex < displayPokemons.length) setPage(page + 1);
  };

  if (isLoadingData) {
    return <p>Loading...</p>;
  }
  if (isErrorData) {
    return <p>Erreur de chargement des Pokémon, l'api est down</p>;
  }

  return (
    <Box p={2} position="relative" pt={4}>
      <Header />
      <Grid container spacing={2}>
        {currentPokemons.map((poke) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Card
              sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardActionArea
                onClick={() => navigate(`/pokemon/${poke.pokedex_id}`)}
              >
                <CardMedia
                  component="img"
                  image={poke.sprites?.regular}
                  alt={poke.name.fr}
                  sx={{
                    width: "85%",
                    height: 100,
                    objectFit: "contain",
                    p: 1,
                  }}
                />
                <CardContent sx={{ textAlign: "center", p: 1 }}>
                  {pokemonCapturedIds.includes(poke.pokedex_id) && (
                    <Avatar
                      src="/pokeball.png"
                      alt="Pokéball"
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 24,
                        height: 24,
                        backgroundColor: "white",
                      }}
                    />
                  )}
                  <Typography variant="body2" fontWeight="bold">
                    {poke.name.fr}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Boutons flottants */}
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          display: "flex",
          gap: 2,
          zIndex: 1000,
        }}
      >
        <Fab
          size="medium"
          onClick={handlePrevious}
          disabled={page === 0}
          sx={{
            background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
            color: "white",
            boxShadow: "0 4px 12px rgba(44, 62, 80, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
              boxShadow: "0 6px 16px rgba(44, 62, 80, 0.4)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.26)",
              boxShadow: "none",
            },
            transition: "all 0.2s ease",
            width: 56,
            height: 56,
          }}
        >
          <ArrowBackIcon />
        </Fab>
        <Fab
          size="medium"
          onClick={handleNext}
          disabled={endIndex >= displayPokemons.length}
          sx={{
            background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
            color: "white",
            boxShadow: "0 4px 12px rgba(44, 62, 80, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
              boxShadow: "0 6px 16px rgba(44, 62, 80, 0.4)",
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              background: "rgba(0,0,0,0.12)",
              color: "rgba(0,0,0,0.26)",
              boxShadow: "none",
            },
            transition: "all 0.2s ease",
            width: 56,
            height: 56,
          }}
        >
          <ArrowForwardIcon />
        </Fab>
      </Box>
    </Box>
  );
}
