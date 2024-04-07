"use client";

import { getCurrentWeek, getStartAndEndDate } from "@/utils/contants";
import React, { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function DateFilterForm({ setDateFilter }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    // shouldUnregister: false,
  });
  const currentWeek = getCurrentWeek();
  const userId = 1; // this will be the logged in user id
  useEffect(() => {
    if (userId) {
      let defaultValues = [
        {
          weekly: currentWeek,
        },
      ];
      reset(...defaultValues);
    }
  }, [reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setDateFilter(data);
   };
  console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm inline-flex items-center"
    >
      <div className="relative">
        <input
          type="week"
          placeholder="weekly"
          {...register("weekly", { required: true })}
          className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white  bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-md px-4 py-2"
      >
        Search
      </button>
    </form>
  );
}
