import React, { useState } from "react";
import {
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import Gitlogo from "../assets/Gitlogo.png";
import Goologo from "../assets/Goologo.png";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //maneja el log in normal mediante correo

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  //maneja el log in mediante google, usando la funcion de GoogleAuthProvider de firebase para definir a google como el proveedor

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    //signinwithpopup se encarga de iniciar la sesion, si hay un error, es detectado por el catch
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  //similar al de google pero con github como proveedor
  const handleGitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm" className="fondo">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          {/* El boton de forgot password redirige al usuario a NuevaContra, donde se manda el email de reinicio de contraseña*/}
          <Button
            onClick={() => navigate("/NuevaContra")}
            variant="text"
            fullWidth
            sx={{ mt: 2 }}
          >
            Forgot Password?
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
        {/* Los botones de google y github ejecutan las funciones que se encargan de manejar el login de google y github */}
        <Button
          onClick={handleGoogleSignIn}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          <img src={Goologo} alt="Google" style={{ width: 20, height: 20 }} /> Login with Google
        </Button>
        <Button
          onClick={handleGitHubSignIn}
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          <img src={Gitlogo} alt="Google" style={{ width: 20, height: 20 }} /> Login with Github
        </Button>
        <Button
          onClick={() => navigate("/register")}
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
        >
          Dont have an account? Register
        </Button>
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Login;
