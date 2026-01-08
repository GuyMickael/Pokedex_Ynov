import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Generation {
  id: number;
  name: string;
  region: string;
  image: string;
  description: string;
  pokemonCount: number;
}

const generations: Generation[] = [
  {
    id: 1,
    name: "Génération I",
    region: "Kanto",
    image: "/Carte_Kanto.png",
    description: "La région de Kanto, berceau des Pokémon",
    pokemonCount: 151,
  },
  {
    id: 2,
    name: "Génération II",
    region: "Johto",
    image:
      "https://daily.pokecommunity.com/wp-content/uploads/2020/05/Johto_HGSSmap-1038x576.png",
    description: "La région de Johto, terre de traditions",
    pokemonCount: 100,
  },
  {
    id: 3,
    name: "Génération III",
    region: "Hoenn",
    image:
      "https://www.pokepedia.fr/images/thumb/4/4c/Carte_de_Hoenn_ROSA.png/800px-Carte_de_Hoenn_ROSA.png",
    description: "La région de Hoenn, entre terre et mer",
    pokemonCount: 135,
  },
  {
    id: 4,
    name: "Génération IV",
    region: "Sinnoh",
    image: "https://images.shoutwiki.com/pokemmo/a/ae/Map_Sinnoh_Art.png",
    description: "La région de Sinnoh, mystérieuse et légendaire",
    pokemonCount: 107,
  },
  {
    id: 5,
    name: "Génération V",
    region: "Unys",
    image: "https://www.pokepedia.fr/images/a/ae/Unys_-_NB2.png",
    description: "La région d'Unys, moderne et contrastée",
    pokemonCount: 156,
  },
  {
    id: 6,
    name: "Génération VI",
    region: "Kalos",
    image: "https://www.pokepedia.fr/images/d/d1/Kalos_-_XY.png",
    description: "La région de Kalos, élégante et raffinée",
    pokemonCount: 72,
  },
  {
    id: 7,
    name: "Génération VII",
    region: "Alola",
    image: "https://www.pokepedia.fr/images/4/4d/Alola_-_USUL.png",
    description: "La région d'Alola, paradis tropical",
    pokemonCount: 88,
  },
  {
    id: 8,
    name: "Génération VIII",
    region: "Galar",
    image:
      "https://nintendosoup.com/wp-content/uploads/2019/02/Pokemon_Sword-Shield-Galar_Map1-1038x576.jpg",
    description: "La région de Galar, inspirée de la Grande-Bretagne",
    pokemonCount: 89,
  },
  {
    id: 9,
    name: "Génération IX",
    region: "Paldea",
    image:
      "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-scarlet-violet/e/ef/Pokemon_Paldea_Map.jpg",
    description: "La région de Paldea, terre d'exploration",
    pokemonCount: 120,
  },
];

export function GenerationSelector() {
  const navigate = useNavigate();

  const handleGenerationSelect = (generationId: number) => {
    navigate(`/generation/${generationId}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#f5f5f5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          py: 4,
          mt: 8,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#2c3e50",
            mb: 4,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            width: "100%",
          }}
        >
          Choisissez votre Génération
        </Typography>

        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 6, width: "100%" }}
        >
          Explorez les différentes régions et leurs Pokémon légendaires
        </Typography>

        <Grid
          container
          spacing={4}
          sx={{ flex: 1, alignItems: "stretch", width: "100%" }}
        >
          {generations.map((generation) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={generation.id}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: "400px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                  },
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardActionArea
                  onClick={() => handleGenerationSelect(generation.id)}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    "&:hover": {
                      backgroundColor: "rgba(44, 62, 80, 0.08)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={generation.image}
                    alt={`Carte de ${generation.region}`}
                    sx={{
                      height: 200,
                      objectFit: "cover",
                      filter: "brightness(0.9)",
                    }}
                  />
                  <CardContent
                    sx={{
                      p: 3,
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        color: "#2c3e50",
                        mb: 1,
                      }}
                    >
                      {generation.name}
                    </Typography>

                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        fontWeight: "bold",
                        mb: 1,
                      }}
                    >
                      Région {generation.region}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {generation.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          background:
                            "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
                          color: "white",
                          px: 2,
                          py: 0.5,
                          borderRadius: 2,
                          fontWeight: "bold",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            background:
                              "linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)",
                          },
                        }}
                      >
                        {generation.pokemonCount} Pokémon
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#2c3e50",
                          fontWeight: "bold",
                          transition: "all 0.2s ease-in-out",
                          "&:hover": {
                            color: "#1a252f",
                          },
                        }}
                      >
                        Explorer →
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
