import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Header from "../Header/Header";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(to bottom right, #e0f7fa, #e1bee7)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        pt: 2,
      }}
    >
      <Box
        component="img"
        src="/pikachu.png"
        alt="pikachu"
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 96,
          height: 96,
        }}
      />
      <Typography
        variant="h2"
        fontWeight="bold"
        color="text.primary"
        sx={{ display: "flex", alignItems: "center" }}
      >
        4
        <Box
          component="img"
          src="/pokeball.png"
          alt="pokeball"
          sx={{
            paddingTop: 2,
            width: 64,
            height: 64,
            animation: "bounce 1s infinite alternate",
          }}
        />
        4
      </Typography>

      <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
        <Typography component="span" color="error" fontWeight="bold">
          SORRY
        </Typography>{" "}
        – Page not found
      </Typography>

      <Link to="/" style={{ textDecoration: "none" }}>
        Back Home
      </Link>

      {/* Animations CSS */}
      <style>
        {`
          @keyframes bounce {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-20px); }
          }

          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(1.05); opacity: 0.85; }
          }
        `}
      </style>
    </Box>
  );
}
