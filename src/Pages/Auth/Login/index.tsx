import React, { useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, FormControl } from "@mui/material";
import { styles } from "./styles";
import authProxy from "@src/Proxies/Modules/Auth";
import { useAppDispatch } from "@src/App/Store";
import { login } from "@src/App/Features/Auth";
import { openToast } from "@src/Helpers/functions";
import * as yup from "yup";
import { emailValidation } from "@src/Utils/validation";
import { UserLogin } from "@src/Types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { isEmpty } from "lodash";

const schema = yup.object().shape({
  email: emailValidation({}),
  password: yup.string().required("Vui lòng nhập mật khẩu").min(8, 'Mật khẩu tối thiểu 8 kí tự'),
});

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const classes = styles.login;

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserLogin>({ mode: "onSubmit", resolver: yupResolver(schema), defaultValues: {
    email: '',
    password: '',
  } });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onSubmit = async (params: UserLogin) => {
    if (!isEmpty(errors)) return;
    try {
      const { data } = await authProxy.login(params);
      dispatch(login(data));
      navigate("/");
    } catch (error: any) {
      openToast({ message: error?.message, type: "error" });
    }
  };

  const renderForm = (
    <FormControl onSubmit={handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <TextField
          fullWidth
          label="Email address"
          {...register('email')}
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 3 }}
          helperText={errors?.email?.message}
        />

        <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
          Quên mật khẩu ?
        </Link>

        <TextField
          fullWidth
          label="Password"
          {...register('password')}
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
          helperText={errors?.password?.message}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          {isSubmitting ? (
            <CircularProgress color="success" size={25} />
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </Box>
    </FormControl>
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
