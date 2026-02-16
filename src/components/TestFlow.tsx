import { useState, useEffect } from "react";
import { useRefreshMutation } from "../api/authApi";
import { useLazyGetProfileQuery } from "../api/profileApi";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

// Composant interne pour décoder et afficher proprement un Token
const TokenDecoder = ({
  token,
  label,
}: {
  token: string | null;
  label: string;
}) => {
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now();

    return (
      <Paper variant="outlined" sx={{ p: 2, mb: 2, bgcolor: "#f8f9fa" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography variant="subtitle2" color="primary">
            {label} (Payload)
          </Typography>
          <Chip
            label={isExpired ? "Expiré" : "Valide"}
            color={isExpired ? "error" : "success"}
            size="small"
          />
        </Stack>
        <Box
          component="pre"
          sx={{ fontSize: "0.75rem", m: 0, overflow: "auto" }}
        >
          {JSON.stringify(decoded, null, 2)}
        </Box>
      </Paper>
    );
  } catch (e) {
    return <Typography color="error">Token invalide</Typography>;
  }
};

export function FlowTester() {
  const [refresh, { isLoading: isRefreshLoading }] = useRefreshMutation();
  const [
    triggerProfile,
    { data: profileData, isFetching: isProfileLoading, error: profileError },
  ] = useLazyGetProfileQuery();

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => setAccessToken(localStorage.getItem("access_token"));
    const id = setInterval(sync, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        p: 4,
        display: "flex",
        gap: 4,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* SECTION 1 : ACTIONS CONTROLLER */}
      <Paper elevation={3} sx={{ p: 3, width: 350, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          🕹️ Control Panel
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Simulez les interactions utilisateur
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => triggerProfile()}
            disabled={isProfileLoading}
            startIcon={isProfileLoading && <CircularProgress size={16} />}
          >
            Appeler /profile
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => refresh()}
            disabled={isRefreshLoading}
            startIcon={isRefreshLoading && <CircularProgress size={16} />}
          >
            Forcer Refresh
          </Button>

          <Button
            variant="text"
            color="error"
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
          >
            Clear LocalStorage & Reset
          </Button>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle2" gutterBottom>
          Dernière réponse API :
        </Typography>
        <Box
          sx={{
            bgcolor: "#2d2d2d",
            color: "#61dafb",
            p: 1.5,
            borderRadius: 1,
            fontSize: "0.8rem",
            minHeight: 60,
            overflow: "auto",
          }}
        >
          {profileError ? (
            <span style={{ color: "#ff8a8a" }}>
              Erreur: {(profileError as any).status}
            </span>
          ) : profileData ? (
            <>
              {" "}
              {profileData.message}
              <br />
              Bienvenue {profileData.user?.username}!
            </>
          ) : (
            "En attente d'action..."
          )}
        </Box>
      </Paper>

      {/* SECTION 2 : TOKEN MONITORING & DECODING */}
      <Box sx={{ width: 450 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          🔍 Token Monitor{" "}
          <Chip label="Live" color="primary" variant="outlined" size="small" />
        </Typography>

        <TokenDecoder token={accessToken} label="Access Token" />
      </Box>
    </Box>
  );
}

export default FlowTester;
