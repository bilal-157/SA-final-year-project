// api/users/route.js
import connectToDB from '@/utils/database';
import User from "@/models/User"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Connect to MongoDB
await connectToDB();

export async function POST(request) {
  try {
    const { email, password, name, action } = await request.json();

    if (action === 'signup') {
      // Signup logic
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return new Response(JSON.stringify({ message: 'User created successfully' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (action === 'login') {
      // Login logic
      const user = await User.findOne({ email });
      if (!user) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      return new Response(
        JSON.stringify({
          message: 'Login successful',
          token,
          user: { id: user._id, name: user.name, email: user.email },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      return new Response(JSON.stringify({ error: 'Invalid action' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}