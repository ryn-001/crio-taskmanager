import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper,
  Link
} from '@mui/material';
import {useNavigate} from "react-router";
import axios from "axios";
import { config } from '../../index.js';

const LoginForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try{
      const { email, password } = formData;

        const response = await axios.post(
            `${config.backendPoint}/api/users/login`,
            { email, password }, 
            { withCredentials: true }
        );

        navigate('/');
    }catch(error){
      console.log("Error : " + error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 12, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="600" color="#2c3e50">
            Welcome Back
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Login to manage your tasks
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            color="success"
            autoComplete="email"
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            color="success"
            autoComplete="current-password"
          />
          
          <Box sx={{ textAlign: 'right', marginTop: 1 }}>
            <Link href="#" variant="body2" sx={{ color: '#2ecc71', textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </Box>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ 
              marginTop: 3, 
              padding: 1.2, 
              backgroundColor: '#2ecc71',
              fontWeight: '600',
              '&:hover': { backgroundColor: '#27ae60' }
            }}
          >
            Login
          </Button>
        </form>

        <Box sx={{ marginTop: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="#" sx={{ color: '#2ecc71', fontWeight: '600', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;