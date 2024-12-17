
interface FoodDTO {
    name: string;
    calories: number;
    carbohydrate: number;
    protein: number;
    fats: number;
    meals: any[];
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




 */