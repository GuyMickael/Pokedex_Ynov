import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  List as ListIcon,
  Person as PersonIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigationItems = [
    { path: "/generations", label: "Générations", icon: <HomeIcon /> },
    { path: "/pokemons", label: "Pokédex National", icon: <ListIcon /> },
    { path: "/404errorUrl", label: "404", icon: <PersonIcon /> },
    { path: "/flow", label: "Flow", icon: <PersonIcon /> },
  ];

  const isActive = (path: string) => {
    if (path === "/generations") {
      return location.pathname === "/" || location.pathname === "/generations";
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: "50px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
              borderRadius: "50%",
              boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            }}
          >
            <img
              src="/pokeball.png"
              alt="Pokéball"
              style={{
                width: "35px",
                height: "35px",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            />
          </Box>
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isActive(item.path)}
              onClick={handleDrawerToggle}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: isActive(item.path) ? "white" : "inherit",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(135deg, #2c3e50 0%, #34495e 100%)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          zIndex: 1200,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo et titre */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link to="/generations" style={{ textDecoration: "none" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src="/pokeball.png"
                    alt="Pokédex"
                    style={{
                      height: "45px",
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                    }}
                    data-testid="pokeball-test-img"
                  />
                </Box>
              </Link>
            </Box>

            {/* Navigation desktop */}
            {!isMobile && (
              <Box sx={{ display: "flex", gap: 1 }}>
                {navigationItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: "white",
                      backgroundColor: isActive(item.path)
                        ? "rgba(255,255,255,0.2)"
                        : "transparent",
                      backdropFilter: "blur(10px)",
                      border: isActive(item.path)
                        ? "1px solid rgba(255,255,255,0.3)"
                        : "1px solid rgba(255,255,255,0.1)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(255,255,255,0.3)",
                      },
                      borderRadius: 2,
                      px: 2,
                      py: 1,
                      textTransform: "none",
                      fontWeight: isActive(item.path) ? "bold" : "normal",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Menu mobile */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ ml: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Spacer pour le contenu */}
      <Toolbar />

      {/* Drawer mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
