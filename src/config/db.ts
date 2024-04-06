import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();


// Function to disconnect PrismaClient client
export async function disconnectClient() {
  await prismaClient.$disconnect();
  console.log("PrismaClient client disconnected!");
  // process.exit(1);
}
