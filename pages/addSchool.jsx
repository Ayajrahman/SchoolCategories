"use client";
import "../app/globals.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (key === "image" && data.image[0]) {
        formData.append("image", data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    }

    try {
      const res = await fetch("/api/school/add", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      setMessage(result.message);
    } catch (error) {
      setMessage("Failed to add school");
    }
  };

  return (
    <div className="flex w-screen h-screen justify-center items-center min-h-screen bg-[url('../public/images.jpeg')] bg-cover   p-4">
      <div className="w-full max-w-lg backdrop-blur-sm shadow-2xl rounded-2xl p-5 m-10 ">
        <h2 className="text-2xl font-bold text-blue-950 text-center mb-6">Add New School</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-2"
          encType="multipart/form-data"
        >
          <input
            {...register("name", { required: true })}
            placeholder="School Name"
            className="w-full border p-3 rounded-lg"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">Name is required</span>
          )}

          <textarea
            {...register("address", { required: true })}
            placeholder="Address"
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <input
            {...register("city", { required: true })}
            placeholder="City"
            className="w-full border p-3 rounded-lg"
          />
          <input
            {...register("state", { required: true })}
            placeholder="State"
            className="w-full border p-3 rounded-lg"
          />

          <input
            {...register("contact", { required: true, pattern: /^[0-9]{10}$/ })}
            placeholder="Contact Number"
            className="w-full border p-3 rounded-lg"
          />
          {errors.contact && (
            <span className="text-red-500 text-sm">
              Enter valid 10 digit number
            </span>
          )}

          <input
            {...register("email_id", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
          />
          {errors.email_id && (
            <span className="text-red-500 text-sm">Enter valid email</span>
          )}

          <input
            type="file"
            {...register("image")}
            accept="image/*"
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center bg-green-400 m-5 p-5 rounded-4xl text-green-900">{message}</p>
        )}
      </div>
    </div>
  );
}
