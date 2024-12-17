import { FastifyReply, FastifyRequest } from "fastify";

export class NewFoodController {
    async handler(request: FastifyRequest<{Body: {}}>, reply: FastifyReply) {
        try {
            const food = request.body; 
            
            reply.status(201).send({ message: "Food created successfully" });
        } catch (error) {
            console.error(error);
            reply.status(500).send({ message: "Error creating food" });
        }
    }
}

/*
  id            BigInt   @id @default(autoincrement())
  Meal          Meal?    @relation(fields: [mealId], references: [id])
  mealId        Int?
  name          String   @db.VarChar(255)
  calories      Float
  carbohydrates Float
  proteins      Float
  fats          Float
  createdAt     DateTime @default(now())


* */