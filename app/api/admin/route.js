// app/api/fetch-data/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb"; // ✅ Add this line
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const users = await db.collection("users").find({}).toArray();
    const products = await db.collection("products").find({}).toArray();

    return Response.json({ users, products });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const { collection, id, updates } = await request.json();

    if (!collection || !id || !updates) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.modifiedCount === 0) {
      return Response.json({ error: "No documents were updated" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating data:", error);
    return Response.json({ error: "Failed to update data" }, { status: 500 });
  }
}