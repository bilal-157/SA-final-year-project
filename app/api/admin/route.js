// app/api/fetch-data/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // Defaults to DB from connection URI

    const users = await db.collection("users").find({}).toArray();
    const products = await db.collection("products").find({}).toArray();

    return Response.json({
      users,
      products,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
