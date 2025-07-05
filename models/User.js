import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    validate: {
      validator: (v) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
}, { 
  timestamps: true 
});

// Prevent recompilation in development
if (mongoose.models.User) {
  delete mongoose.models.User;
}

const User = mongoose.model('User', userSchema);
export default User;