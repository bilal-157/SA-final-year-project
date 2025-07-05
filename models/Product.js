import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: Number, // 👈 ADD THIS
  name: String,
  category: String,
  origin: String,
  material: String,
  price: Number,
  rating: Number,
  image: String,
  isNew: Boolean,
  artisan: String,
  description: String,
  badge: String
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
