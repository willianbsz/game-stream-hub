"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { List as MenuIcon } from "@phosphor-icons/react/dist/ssr/List";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { usePathname, useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/use-auth-user";
import { paths } from "@/paths";
import { DynamicLogo } from "./logo";

function ResponsiveAppBar() {
  const { authUser, signOut } = useAuthUser();
  const router = useRouter();
  const pathName = usePathname();

  const settings = [
    { text: "Meu perfil", onClick: () => router.push(paths.app.profile) },
    {
      text: "Sair",
      onClick: () => signOut().then(() => console.log("User signed out")),
    },
  ];

  const pages = [
    { text: "Sobre", link: "/#about-us" },
    { text: "Contate-nos", link: "/#contact-us" },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box component={"a"} href={authUser ? paths.app.home : paths.home}>
            <DynamicLogo
              colorDark="light"
              colorLight="light"
              height={50}
              width={50}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {authUser ? (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pathName === paths.home ? (
                  <>
                    {pages.map((page) => (
                      <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                        <Typography
                          component={"a"}
                          sx={{ textAlign: "center" }}
                          href={page.link}
                        >
                          {page.text}
                        </Typography>
                      </MenuItem>
                    ))}
                  </>
                ) : null}
              </Menu>
            ) : (
              <Button>Login</Button>
            )}
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href={paths.home}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pathName === paths.home ? (
              <>
                {pages.map((page) => (
                  <Button
                    LinkComponent={"a"}
                    href={page.link}
                    key={page.text}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.text}
                  </Button>
                ))}
              </>
            ) : null}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {authUser ? (
              <>
                <Tooltip title="Ver perfil">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={authUser?.avatar} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                      <Typography
                        sx={{ textAlign: "center" }}
                        onClick={setting.onClick}
                      >
                        {setting.text}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Button variant="contained" color="primary">
                Entrar
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
