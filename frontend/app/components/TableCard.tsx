"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDayOfWeek, getStartAndEndDate } from "@/utils/contants";
import { AddDetailsForm } from "./AddDetailsForm";
import useSWR from "swr";
import { fetcher } from "@/utils/fetcher";
import { USER_ROUTES } from "@/utils/routes";
// const meals_data = [
//   {
//     id: 1,
//     date: "2024-04-06T12:39:34.271Z",
//     breakfast: "bread, eggs, tea",
//     lunch: "chapo beans",
//     dinner: null,
//     snacks: "smochaa",
//     notes: null,
//     userId: 1,
//     createdAt: "2024-04-06T13:14:51.658Z",
//     updatedAt: "2024-04-06T12:39:34.271Z",
//   },
//   {
//     id: 2,
//     date: "2024-04-06T13:26:32.344Z",
//     breakfast: "Scrambled eggs and toast",
//     lunch: "Grilled chicken salad",
//     dinner: "Salmon with roasted vegetables",
//     snacks: "Almonds",
//     notes: "Remember to drink plenty of water throughout the day.",
//     userId: 1,
//     createdAt: "2024-04-06T13:26:32.423Z",
//     updatedAt: "2024-04-06T13:26:32.423Z",
//   },
//   {
//     id: 5,
//     date: "2024-04-09T10:15:00.000Z",
//     breakfast: "Avocado toast with poached eggs",
//     lunch: "Shrimp stir-fry with vegetables",
//     dinner: "Baked chicken with quinoa and broccoli",
//     snacks: "Mixed nuts",
//     notes: "Plan meals ahead for the week to stay on track.",
//     userId: 1,
//     createdAt: "2024-04-06T13:29:45.989Z",
//     updatedAt: "2024-04-06T13:29:45.989Z",
//   },
//   {
//     id: 6,
//     date: "2024-04-08T19:30:00.000Z",
//     breakfast: "Smoothie with spinach, banana, and protein powder",
//     lunch: "Tuna sandwich with mixed greens",
//     dinner: "Pasta primavera with garlic bread",
//     snacks: "Hummus",
//     notes: "Limit caffeine intake after 4 PM.",
//     userId: 3,
//     createdAt: "2024-04-06T13:31:06.157Z",
//     updatedAt: "2024-04-06T13:31:06.157Z",
//   },
//   {
//     id: 7,
//     date: "2024-04-06T19:30:00.000Z",
//     breakfast: "Smoothie with spinach, banana, and protein powder",
//     lunch: "Tuna sandwich with mixed greens",
//     dinner: "Pasta primavera with garlic bread",
//     snacks: "Hummus",
//     notes: "Limit caffeine intake after 4 PM.",
//     userId: 3,
//     createdAt: "2024-04-06T13:31:30.611Z",
//     updatedAt: "2024-04-06T13:31:30.611Z",
//   },
//   {
//     id: 8,
//     date: "2024-04-05T19:30:00.000Z",
//     breakfast: "Smoothie with spinach, banana, and protein powder",
//     lunch: "Tuna sandwich with mixed greens",
//     dinner: "Pasta primavera with garlic bread",
//     snacks: "Hummus",
//     notes: "Limit caffeine intake after 4 PM.",
//     userId: 3,
//     createdAt: "2024-04-06T13:31:38.580Z",
//     updatedAt: "2024-04-06T13:31:38.580Z",
//   },
//   {
//     id: 9,
//     date: "2024-04-06T08:00:00.000Z",
//     breakfast: "Oatmeal with berries",
//     lunch: "Quinoa salad with avocado",
//     dinner: "Grilled steak with sweet potato fries",
//     snacks: "Greek yogurt",
//     notes: "Incorporate more vegetables into every meal.",
//     userId: 4,
//     createdAt: "2024-04-06T13:32:08.186Z",
//     updatedAt: "2024-04-06T13:32:08.186Z",
//   },
//   {
//     id: 10,
//     date: "2024-04-06T08:00:00.000Z",
//     breakfast: "Oatmeal with berries",
//     lunch: "Quinoa salad with avocado",
//     dinner: "Grilled steak with sweet potato fries",
//     snacks: "Greek yogurt",
//     notes: "Incorporate more vegetables into every meal.",
//     userId: 4,
//     createdAt: "2024-04-06T13:38:03.030Z",
//     updatedAt: "2024-04-06T13:38:03.030Z",
//   },
// ];

const meals_plan = ["Break Fast", "Lunch", "Dinner", "Snacks", "Notes"];
export function TableCard({ dateFilter }) {
  const userId = 1; // get this from the logged in used
  const { startDate, endDate } = getStartAndEndDate(dateFilter);

  const { data, error, isLoading } = useSWR(
    () =>
      userId
        ? `${USER_ROUTES.GET_USER}/${userId}?startDate=${startDate}&endDate=${endDate}`
        : null,
    fetcher
  );

  if (error)
    return (
      <div className="w-full h-screen grid place-items-center">
        failed to load
      </div>
    );
  if (isLoading)
    return (
      <div className="w-full h-screen grid place-items-center">loading...</div>
    );

  console.log("plans", data);

  return (
    <Table className="w-full p-2">
      <TableHeader>
        <TableRow className=" bg-slate-100">
          <TableHead></TableHead>
          {meals_plan?.map((day) => (
            <TableHead className="border-l font-semibold text-lg" key={day}>
              {day}
            </TableHead>
          ))}
          <TableHead className="border-l">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.plans?.map((meal) => (
          <TableRow key={meal.id}>
            <TableCell className="font-semibold text-lg border-r bg-slate-100">
              {getDayOfWeek(meal.date)}
            </TableCell>
            <TableCell className="border-r  ">{meal.breakfast}</TableCell>
            <TableCell className="border-r  ">{meal.lunch}</TableCell>
            <TableCell className="border-r  ">{meal.dinner}</TableCell>
            <TableCell className="border-r  ">{meal.snacks}</TableCell>
            <TableCell className="border-r">{meal.notes}</TableCell>{" "}
            <TableCell className=" grid place-items-center">
              <AddDetailsForm {...{ meal }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell
            className="font-semibold text-lg  bg-slate-100 text-center"
            colSpan={6}
          >
            #Stay Healthy
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
