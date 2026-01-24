import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Container, 
  Typography, 
  Box, 
  Paper 
} from '@mui/material';
import axios from "axios";
import {config} from "../../index.js";
import {useNavigate} from "react-router";

const RegisterForm = () => {
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!formData.fullname) {
      tempErrors.fullname = "Full name is required";
    } else if (formData.fullname.length < 3) {
      tempErrors.fullname = "Full name must be at least 3 characters";
    }

    if (!formData.username) {
      tempErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.username)) {
      tempErrors.username = "Username must only contain letters and numbers (no spaces)";
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    
    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    } else if (!passwordRegex.test(formData.password)) {
      tempErrors.password = "Must contain uppercase, lowercase, number, and a symbol (!@#$%^&*)";
    }

    if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Passwords do not match";
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

    try {
        const { fullname, username, email, password } = formData;

        const response = await axios.post(
            `${config.backendPoint}/api/users/register`,
            { fullname, username, email, password }, 
            { withCredentials: true }
        );

        if(response.data.success) navigate('/login');
    } catch (err) {
        console.error("Server Error:", err.response?.data);
        
        if (err.response?.data?.errors) {
            setErrors(err.response.data.errors);
        }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
          <Typography variant="h5" fontWeight="600" color="#2c3e50">
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Join our task manager today
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullname"
            margin="normal"
            value={formData.fullname}
            onChange={handleChange}
            error={!!errors.fullname}
            helperText={errors.fullname}
            color="success"
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            color="success"
          />
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
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            color="success"
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ 
              marginTop: 3, 
              padding: 1.2, 
              backgroundColor: '#2ecc71',
              '&:hover': { backgroundColor: '#27ae60' }
            }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;