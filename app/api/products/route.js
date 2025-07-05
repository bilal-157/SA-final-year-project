import clientPromise from "@/lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("Artisan-collection");
  const products = await db.collection("products").find().toArray();

  return Response.json(products);
}

export async function POST(req) {
  const data = await req.json();
  const client = await clientPromise;
  const db = client.db("Artisan-collection");
  const result = await db.collection("products").insertOne(data);

  return Response.json({ message: "Inserted", id: result.insertedId });
}
