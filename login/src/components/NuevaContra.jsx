import React, { useState } from "react";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import "../styles.css";

const NuevaContra = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  //Handleresetpassword se encarga de mandar el email de reinicio de contraseña usando la funcion de sendPasswordResetEmail de firebase
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setEmailSent(true);
      
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm"  className="fondo">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Password resset
        </Typography>
        {/* el emailsent se encarga de quitar el formulario de reenvio si ya se envio el correo, para evitar que se pueda mandar varias veces */}
        {!emailSent ? (
        <form onSubmit={handleResetPassword} style={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send Email
          </Button>
        </form>
        ) : (
            // Mensaje que se muestra si ya se mando el correo
            <Typography color="success.main" sx={{ mt: 2 }}>
              Correo enviado. Revisa tu bandeja de entrada.
            </Typography>
          )}
        <Button
          onClick={() => navigate("/")}
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
        >
          Back to Log in
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

export default NuevaContra;
