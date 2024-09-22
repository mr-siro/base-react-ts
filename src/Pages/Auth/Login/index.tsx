import React, { useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { styles } from "./styles";

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const classes = styles.login;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = useCallback(() => {
    setLoading(true);
    navigate("/");
    setLoading(false);
  }, []);

  const renderForm = (
    <Box display="flex" flexDirection="column" alignItems="flex-end">
      <TextField
        fullWidth
        name="email"
        label="Email address"
        defaultValue="hello@gmail.com"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 3 }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Quên mật khẩu ?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        InputLabelProps={{ shrink: true }}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      <Button type="submit" variant="contained" fullWidth disabled={loading} onClick={handleSignIn}>
        {loading ? <CircularProgress color="success" size={25} /> : "Đăng nhập"}
      </Button>
    </Box>
  );

  return (
    <Box sx={classes.wrapper}>
      <Box sx={classes.loginContainer}>
        <Box
          gap={1.5}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ mb: 5 }}
        >
          <Typography variant="h5">Đăng nhập</Typography>
        </Box>
        {renderForm}
      </Box>
    </Box>
  );
};
