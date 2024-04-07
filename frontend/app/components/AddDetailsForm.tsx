"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getDayOfWeek, getFormattedDate, getGreeting } from "@/utils/contants";
import { USER_ROUTES } from "@/utils/routes";
import { MealProps } from "@/utils/types";
import axios from "axios";
import React, { FC } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export const AddDetailsForm: FC<{ meal: MealProps }> = ({ meal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!data) {
      return;
    }
    try {
      axios
        .post(`${USER_ROUTES.GET_USER}/${1}`, {
          ...data,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      throw new Error("error saving data!");
    }
  };
  // console.log("erro fdsa", errors);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="  w-10 p-0 m-0 h-10  rounded-full hover:bg-slate-200"
        >
          <EditIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-slate-50 p-3">
        <DialogHeader>
          <DialogTitle>Hello, {getGreeting()}</DialogTitle>
          <DialogDescription>
            What did you eat on {getFormattedDate(meal.date)} ?
          </DialogDescription>
        </DialogHeader>
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <main className="grid grid-cols-1 md:grid-cols-1 pb-4 gap-1 h-fit max-h-[75vh] overflow-y-auto p-1 m-2">
              <section>
                <textarea
                  {...register("breakfast", { required: false })}
                  id="breakfast"
                  rows={3}
                  className="block cols-span-1 p-1 w-full  rounded-md border outline-0 ring-0 border-slate-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder={`What did you have for breakfast on ${getFormattedDate(
                    meal.date
                  )} ?`}
                ></textarea>
              </section>
              <section>
                <textarea
                  {...register("lunch", { required: false })}
                  id="lunch"
                  rows={3}
                  className="block cols-span-1 p-1 w-full  rounded-md border outline-0 ring-0 border-slate-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder={`What did you have for lunch on ${getFormattedDate(
                    meal.date
                  )} ?`}
                ></textarea>
              </section>
              <section>
                <textarea
                  {...register("dinner", { required: false })}
                  id="dinner"
                  rows={3}
                  className="block cols-span-1 p-1 w-full  rounded-md border outline-0 ring-0 border-slate-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder={`What did you have for dinner on ${getFormattedDate(
                    meal.date
                  )} ?`}
                ></textarea>
              </section>
              <section>
                <textarea
                  {...register("snacks", { required: false })}
                  id="snacks"
                  rows={3}
                  className="block cols-span-1 p-1 w-full  rounded-md border outline-0 ring-0 border-slate-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder={`Which snacks did you have on ${getFormattedDate(
                    meal.date
                  )} ?`}
                ></textarea>
              </section>
              <section>
                <textarea
                  {...register("notes", { required: false })}
                  id="notes"
                  rows={3}
                  className="block cols-span-1 p-1 w-full  rounded-md border outline-0 ring-0 border-slate-300 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder={`Add your notes for ${getFormattedDate(
                    meal.date
                  )} ?`}
                ></textarea>
              </section>
            </main>
            <DialogFooter className=" w-full ">
              <div className=" w-full  flex items-center justify-between p-1">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="secondary"
                    className="border bg-red-500 text-white"
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button type="submit" className="bg-blue-600 text-white">
                  Save changes
                </Button>
              </div>
            </DialogFooter>
          </form>
        </>
      </DialogContent>
    </Dialog>
  );
};
export default AddDetailsForm; // If this component is the default export

const EditIcon = () => (
  <svg
    data-slot="icon"
    fill="none"
    strokeWidth="1.5"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-6 h-6 p-[2px]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
    ></path>
  </svg>
);
