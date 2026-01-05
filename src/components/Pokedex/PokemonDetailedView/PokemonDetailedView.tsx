import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Avatar,
  Tooltip,
  Container,
  Chip,
  LinearProgress,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Home as HomeIcon,
  Star as StarIcon,
  Palette as PaletteIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  addCapturedPokemon,
  removeCapturedPokemon,
} from "../../../store/slices/pokemon-slice";
import { useGetPokemonQuery } from "../../../api/pokemonApi";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Header from "../../Header/Header";

// Mapping des types Pokémon vers les couleurs de gradient
const getTypeColors = (primaryType: string) => {
  const typeColors: { [key: string]: { start: string; end: string } } = {
    normal: { start: "#A8A878", end: "#8A8A59" },
    feu: { start: "#F08030", end: "#DD6610" },
    eau: { start: "#6890F0", end: "#386CEB" },
    électrik: { start: "#F8D030", end: "#FBD000" },
    plante: { start: "#78C850", end: "#5CA935" },
    glace: { start: "#98D8D8", end: "#69C6C6" },
    combat: { start: "#C03028", end: "#9D2721" },
    poison: { start: "#A040A0", end: "#803380" },
    sol: { start: "#E0C068", end: "#D4A82F" },
    vol: { start: "#A890F0", end: "#9180C4" },
    psy: { start: "#F85888", end: "#F61C5D" },
    insecte: { start: "#A8B820", end: "#8D9A1B" },
    roche: { start: "#B8A038", end: "#93802D" },
    spectre: { start: "#705898", end: "#554374" },
    dragon: { start: "#7038F8", end: "#4C08EF" },
    ténèbres: { start: "black", end: "#513F35" },
    acier: { start: "#B8B8D0", end: "#9797BA" },
    fée: { start: "#EE99AC", end: "#E7798F" },
  };

  return (
    typeColors[primaryType.toLowerCase()] || {
      start: "#667eea",
      end: "#764ba2",
    }
  );
};

export default function PokemonDetailedView() {
  /* -------------------- routing + RTK Query -------------------- */
  const { pokeId } = useParams<{ pokeId: string }>();
  const id = Number(pokeId);
  const navigate = useNavigate();

  /** Pokémon courant */
  const { data: pokemon, isLoading, isError } = useGetPokemonQuery(id);

  /** Sprites voisins (cache partagé) */
  const { data: prev } = useGetPokemonQuery(id - 1, { skip: id <= 1 });
  const { data: next } = useGetPokemonQuery(id + 1);

  /* -------------------- Redux : capture -------------------- */
  const dispatch = useAppDispatch();
  const capturedIds = useAppSelector((s) => s.pokemon.capturedPokemonIds);
  const isCaptured = capturedIds.includes(id);
  const toggleCapture = () =>
    dispatch(isCaptured ? removeCapturedPokemon(id) : addCapturedPokemon(id));

  /* -------------------- UI state -------------------- */
  const [spriteMode, setSpriteMode] = useState<"normal" | "shiny">("normal");
  const handleSpriteToggle = (
    _: React.MouseEvent<HTMLElement>,
    newMode: "normal" | "shiny" | null
  ) => newMode && setSpriteMode(newMode);

  /* -------------------- Loading / Error -------------------- */
  if (isLoading)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={60} sx={{ color: "#667eea" }} />
      </Box>
    );
  if (isError || !pokemon)
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="error" variant="h6">
          Impossible de charger le Pokémon.
        </Typography>
      </Box>
    );

  /* -------------------- Render -------------------- */
  const primaryType = pokemon.types?.[0]?.name || "normal";
  const typeColors = getTypeColors(primaryType);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#f5f5f5",
        transition: "background 0.5s ease",
      }}
    >
      <Header />

      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          {/* Header avec navigation */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${typeColors.start} 0%, ${typeColors.end} 100%)`,
              color: "white",
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                onClick={() => navigate(`/generation/${pokemon.generation}`)}
                sx={{
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" fontWeight="bold">
                #{pokemon.pokedex_id} - {pokemon.name.fr}
              </Typography>
            </Box>

            {isCaptured && (
              <Tooltip title="Pokémon capturé !">
                <Avatar
                  src="/pokeball.png"
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: "white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                />
              </Tooltip>
            )}
          </Box>

          <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
              {/* Colonne gauche - Image et contrôles */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ textAlign: "center" }}>
                  {/* Image du Pokémon */}
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      p: 3,
                      borderRadius: 4,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      mb: 3,
                    }}
                  >
                    <img
                      src={
                        spriteMode === "normal"
                          ? pokemon.sprites.regular ?? ""
                          : pokemon.sprites.shiny ?? ""
                      }
                      alt={pokemon.name.fr}
                      style={{
                        width: 280,
                        height: 280,
                        objectFit: "contain",
                        filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.3))",
                      }}
                    />
                  </Box>

                  {/* Container pour les boutons */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    {/* Toggle Shiny/Normal */}
                    <ToggleButtonGroup
                      value={spriteMode}
                      exclusive
                      onChange={handleSpriteToggle}
                      sx={{
                        "& .MuiToggleButton-root": {
                          borderRadius: 3,
                          px: 3,
                          py: 1,
                          fontWeight: "bold",
                          textTransform: "none",
                          border: "1px solid rgba(0,0,0,0.1)",
                          "&.Mui-selected": {
                            background: `linear-gradient(135deg, ${typeColors.start} 0%, ${typeColors.end} 100%)`,
                            color: "white",
                            "&:hover": {
                              background: `linear-gradient(135deg, ${typeColors.end} 0%, ${typeColors.start} 100%)`,
                            },
                          },
                        },
                      }}
                    >
                      <ToggleButton value="normal">
                        <PaletteIcon sx={{ mr: 1, ml: 1 }} />
                        Normal
                      </ToggleButton>
                      <ToggleButton value="shiny">
                        <StarIcon sx={{ mr: 1, ml: 1 }} />
                        Shiny
                      </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Bouton Capture */}
                    <Button
                      variant={isCaptured ? "outlined" : "contained"}
                      onClick={toggleCapture}
                      size="large"
                      sx={{
                        gap: 2,
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        fontSize: "1.1rem",
                        background: isCaptured
                          ? "transparent"
                          : "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
                        color: isCaptured ? "#2c3e50" : "white",
                        border: isCaptured ? "2px solid #2c3e50" : "none",
                        "&:hover": {
                          background: isCaptured
                            ? "rgba(44, 62, 80, 0.1)"
                            : "linear-gradient(135deg, #34495e 0%, #2c3e50 100%)",
                          transform: "translateY(-1px)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <Avatar
                        src={isCaptured ? "/pokeball.png" : "/pokeball.png"}
                        sx={{
                          width: 28,
                          height: 28,
                          bgcolor: "white",
                        }}
                      />
                      {isCaptured ? "Relâcher" : "Capturer"}
                    </Button>
                  </Box>
                </Box>
              </Grid>

              {/* Colonne droite - Informations */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ height: "100%" }}>
                  {/* Types */}
                  <Card sx={{ mb: 3, borderRadius: 3, overflow: "hidden" }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        color="primary"
                      >
                        🧬 Types
                      </Typography>
                      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                        {pokemon.types?.map((t) => (
                          <Chip
                            key={t.name}
                            icon={
                              <img
                                src={t.image}
                                alt={t.name}
                                style={{ width: 16, height: 16 }}
                              />
                            }
                            label={t.name}
                            sx={{
                              borderRadius: 2,
                              fontWeight: "bold",
                              background: `linear-gradient(135deg, ${typeColors.start} 0%, ${typeColors.end} 100%)`,
                              color: "white",
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Stats */}
                  <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        color="primary"
                      >
                        📊 Statistiques
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        {Object.entries(pokemon.stats).map(([stat, value]) => (
                          <Box key={stat} sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                textTransform="uppercase"
                              >
                                {stat}
                              </Typography>
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="primary"
                              >
                                {value}
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={(value / 255) * 100}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: "rgba(0,0,0,0.1)",
                                "& .MuiLinearProgress-bar": {
                                  background: `linear-gradient(135deg, ${typeColors.start} 0%, ${typeColors.end} 100%)`,
                                  borderRadius: 4,
                                },
                              }}
                            />
                          </Box>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            </Grid>

            {/* Navigation */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
                pt: 3,
                borderTop: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              {prev?.sprites.regular && (
                <Button
                  variant="outlined"
                  disabled={id <= 1}
                  onClick={() => navigate(`/pokemon/${id - 1}`)}
                  startIcon={<ArrowBackIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    borderColor: "rgba(44, 62, 80, 0.3)",
                    color: "#2c3e50",
                    "&:hover": {
                      borderColor: "#2c3e50",
                      backgroundColor: "rgba(44, 62, 80, 0.1)",
                    },
                    "&:disabled": {
                      borderColor: "rgba(0,0,0,0.12)",
                      color: "rgba(0,0,0,0.26)",
                    },
                  }}
                >
                  <Avatar
                    src={prev.sprites.regular}
                    sx={{ width: 40, height: 40, mr: 1 }}
                  />
                  #{prev.pokedex_id} {prev.name.fr}
                </Button>
              )}

              {next?.sprites.regular && (
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/pokemon/${id + 1}`)}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    borderColor: "rgba(44, 62, 80, 0.3)",
                    color: "#2c3e50",
                    "&:hover": {
                      borderColor: "#2c3e50",
                      backgroundColor: "rgba(44, 62, 80, 0.1)",
                    },
                  }}
                >
                  #{next.pokedex_id} {next.name.fr}
                  <Avatar
                    src={next.sprites.regular}
                    sx={{ width: 40, height: 40, ml: 1 }}
                  />
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
