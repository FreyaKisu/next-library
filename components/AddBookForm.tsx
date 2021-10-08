import { useForm } from "react-hook-form";
import Input from "../shared/components/Input";
import InputSpacer from "../shared/components/InputSpacer";
import React from "react";

const FormError = ({ errorMessage }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddBookFormProps {
  onSubmit: any;
}

type FormData = {
  title: string;
  author: string;
  description: string;
};

export default function AddBookForm(props: AddBookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>
      <InputSpacer>
        <input
          className="rounded p-4 text-xl w-full"
          {...register("title")}
          placeholder="Title"
        />
        {errors.title && <FormError errorMessage="Book title is required!" />}
      </InputSpacer>
      <InputSpacer>
        <input
          className="rounded p-4 text-xl w-full"
          {...register("author")}
          placeholder="Author"
        />
        {errors.author && (
          <FormError errorMessage="Author of the book is required!" />
        )}
      </InputSpacer>
      <InputSpacer>
        <input
          className="rounded p-4 text-xl w-full"
          {...register("description")}
          placeholder="Description"
        />
        {errors.description && (
          <FormError errorMessage="A short description of the content is required!" />
        )}
      </InputSpacer>
      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Add Book
      </button>
    </form>
  );
}
