// app/api/products/route.js
import connectToDB from '@/utils/database';
import Product from '@/models/Product';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find();
    return Response.json(products);
  } catch (error) {
    return new Response('Failed to fetch products', { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDB();
    const rawData = await request.json();

    // Helper function to handle both Int and Double
    const getNumberValue = (value) => {
      if (!value) return 0;
      if (value.$numberInt) return parseInt(value.$numberInt);
      if (value.$numberDouble) return parseFloat(value.$numberDouble);
      return value;
    };

    // Transform MongoDB Extended JSON to regular JavaScript objects
    const productData = {
      _id: rawData._id?.$oid ? new ObjectId(rawData._id.$oid) : undefined,
      id: getNumberValue(rawData.id),
      name: rawData.name,
      category: rawData.category,
      origin: rawData.origin,
      material: rawData.material,
      price: getNumberValue(rawData.price),
      rating: getNumberValue(rawData.rating),
      image: rawData.image,
      isNew: rawData.isNew,
      artisan: rawData.artisan,
      description: rawData.description,
      badge: rawData.badge,
      __v: getNumberValue(rawData.__v)
    };

    // Create the product
    const newProduct = await Product.create(productData);
    
    // Return the created product in Extended JSON format
    const responseData = {
      ...newProduct.toObject(),
      _id: { $oid: newProduct._id.toString() },
      id: { $numberInt: newProduct.id.toString() },
      price: Number.isInteger(newProduct.price) 
        ? { $numberInt: newProduct.price.toString() }
        : { $numberDouble: newProduct.price.toString() },
      rating: { $numberDouble: newProduct.rating.toString() },
      __v: { $numberInt: newProduct.__v.toString() }
    };

    return Response.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to create product',
      details: error.message 
    }), { status: 500 });
  }
}