// app/api/products/route.js
import connectToDB from '@/utils/database';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find();
    return Response.json(products);
  } catch (error) {
    return new Response('Failed to fetch products', { status: 500 });
  }
}
