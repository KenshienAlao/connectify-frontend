"use client";
import { initloginRequest, loginRequest } from "@/model/auth/login.model";
import {
  initRegisterRequest,
  registerRequest,
} from "@/model/auth/register.model";
import { RegisterService } from "@/services/auth/register";

import { notifError, notifSuccess } from "@/utils/notification";
import { RegisterSchema } from "@/validation/auth.schema";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {

  const router = useRouter();

  const [isLoding, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<registerRequest>(initRegisterRequest);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i,
  );

  const gender = ["Male", "Female", "Other"];

  const handleSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = RegisterSchema.safeParse(form);
    if (!result.success) {
      const firstError = result.error.issues[0].message;
      notifError(firstError);
      return;
    }

    setIsLoading(true);
    const { data, error } = await RegisterService.register(result.data);

    if (error) {
      setIsLoading(false)
      return notifError(error.message);

    }
    setIsLoading(false)
    notifSuccess(data.message);
    setForm(initRegisterRequest);
    router.push("/login");
  };

  return (
    <main className="mx-auto flex min-h-screen items-center">
      <form onSubmit={handleSubmitRegister}>
        <fieldset disabled={isLoding}>
          <div className="relative flex flex-col gap-5">
            {/* name */}
            <div className="space-y-2">
              <header> Name</header>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="rounded p-2 ring-1"
                  placeholder="Enter first name"
                  value={form.name.firstName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: { ...form.name, firstName: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  className="rounded p-2 ring-1"
                  placeholder="Enter last name"
                  value={form.name.lastName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: { ...form.name, lastName: e.target.value },
                    })
                  }
                />
              </div>
            </div>
            {/* birthday */}
            <div className="space-y-2">
              <header className="font-medium">Birthday</header>
              <div className="flex gap-2">
                <input
                  list="day"
                  className="rounded p-2 ring-1"
                  placeholder="Day"
                  value={form.birthday.day}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({
                      ...form,
                      birthday: { ...form.birthday, day: e.target.value },
                    })
                  }
                />
                <datalist id="day">
                  {" "}
                  {days.map((day: number) => (
                    <option key={day} value={day} />
                  ))}
                </datalist>
                <input
                  list="month"
                  className="rounded p-2 ring-1"
                  placeholder="Month"
                  value={form.birthday.month}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({
                      ...form,
                      birthday: { ...form.birthday, month: e.target.value },
                    })
                  }
                />
                <datalist id="month">
                  {" "}
                  {months.map((month: string) => (
                    <option key={month} value={month} />
                  ))}
                </datalist>
                <input
                  list="year"
                  className="rounded p-2 ring-1"
                  placeholder="Year"
                  value={form.birthday.year}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({
                      ...form,
                      birthday: { ...form.birthday, year: e.target.value },
                    })
                  }
                />
                <datalist id="year">
                  {" "}
                  {years.map((year: number) => (
                    <option key={year} value={year} />
                  ))}
                </datalist>
              </div>
            </div>
            {/* gender */}
            <div className="space-y-2">
              <header className="font-medium">Gender</header>
              <input
                list="gender"
                className="rounded p-2 ring-1"
                value={form.gender}
                placeholder="Select your gender"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, gender: e.target.value })
                }
              />
              <datalist id="gender">
                {gender.map((g: string) => (
                  <option key={g} value={g} />
                ))}
              </datalist>
            </div>
            {/* contact number */}
            <div className="space-y-2">
              <header> Contact Number</header>
              <input
                type="text"
                className="rounded p-2 ring-1"
                value={form.contactNumber}
                placeholder="Enter you contact number"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, contactNumber: e.target.value })
                }
              />
            </div>
            {/* email */}
            <div className="space-y-2">
              <header>Email</header>
              <input
                type="text"
                className="rounded p-2 ring-1"
                value={form.email}
                placeholder="Enter your emaill"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>
            {/* password */}
            <div className="relat space-y-2">
              <header>Password</header>
              <div className="relative">
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="rounded p-2 ring-1"
                  value={form.password}
                  placeholder="Enter your password"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
                {form.password && (
                  <button
                    type="button"
                    onClick={() => setIsShowPassword(!isShowPassword)}
                    className="absolute"
                  >
                    {isShowPassword ? <Eye /> : <EyeClosed />}
                  </button>
                )}
              </div>
            </div>
          </div>
          <button type="submit" className="rounded border p-2">
            {isLoding ? <Loader2 className="animate-spin" /> : "Submit"}
          </button>

          <Link href="/login" className="text-blue-500 underline">
            Login
          </Link>
        </fieldset>
      </form>
    </main>
  );
}
