export interface MealProps {
  id: number;
  date: string;
  breakfast?: string;
  lunch?: string;
  dinner?: string;
  snacks?: string;
  notes?: string;
  // user    :    User  ,
  userId: number;
  createdAt: string;
  updatedAt: string;
}

