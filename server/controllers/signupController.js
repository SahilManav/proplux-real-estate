// controllers/signupController.js

import prisma from '../prisma/client.js';  // Your prisma client
import bcrypt from 'bcrypt';  // To hash the password
import jwt from 'jsonwebtoken';  // To generate a token

// Handle user signup
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate a JWT token (optional, for authentication)
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the newly created user and token
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error('Error signing up:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
