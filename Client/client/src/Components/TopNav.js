import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Container } from "@mui/material";
import { Home, Chat, Explore, Gavel, Assignment } from "@mui/icons-material";
import { useRouteMatch, useHistory } from "react-router-dom";

const paraStyle = {
  marginTop: 0,
  marginBottom: 0,
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLinkClick = (name) => {
    history.push(`${url}/${name}`);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleLinkClick("home");
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={null} color="error">
            <Home />
          </Badge>
        </IconButton>
        <p style={paraStyle}>Home</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLinkClick("chat");
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={null} color="error">
            <Chat />
          </Badge>
        </IconButton>
        <p style={paraStyle}>Chat</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLinkClick("explore");
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={null} color="error">
            <Explore />
          </Badge>
        </IconButton>
        <p style={paraStyle}>Explore</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLinkClick("auction");
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={null} color="error">
            <Gavel />
          </Badge>
        </IconButton>
        <p style={paraStyle}>Auction</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLinkClick("tender");
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={null} color="error">
            <Assignment />
          </Badge>
        </IconButton>
        <p style={paraStyle}>Tender</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleLinkClick("profile");
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p style={paraStyle}>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Social-Media MarketPlace
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  handleLinkClick("home");
                }}
              >
                <Badge badgeContent={null} color="error">
                  <Home />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  handleLinkClick("chat");
                }}
              >
                <Badge badgeContent={null} color="error">
                  <Chat />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  handleLinkClick("explore");
                }}
              >
                <Badge badgeContent={null} color="error">
                  <Explore />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  handleLinkClick("auction");
                }}
              >
                <Badge badgeContent={null} color="error">
                  <Gavel />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                  handleLinkClick("tender");
                }}
              >
                <Badge badgeContent={null} color="error">
                  <Assignment />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={() => {
                  handleLinkClick("profile");
                }}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
