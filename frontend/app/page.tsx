"use client";

import { useState } from "react";
import DateFilterForm from "./components/DateFilterForm";
import { TableCard } from "./components/TableCard";

export default function Home() {
  const [dateFilter, setDateFilter] = useState();
  return (
    <main className="  min-h-screen  md:p-8">
      <header className="text-center p-4 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Weekly Food Diary</h1>
        <DateFilterForm {...{ setDateFilter }} />
      </header>
      <section className="border rounded-xl overflow-hidden">
        <TableCard {...{ dateFilter }} />
      </section>
    </main>
  );
}
