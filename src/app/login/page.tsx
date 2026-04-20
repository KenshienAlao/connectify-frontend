"use client"
import { initloginRequest, loginRequest } from "@/model/auth/login.model";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function Page() {
    const [isLoding, setIsLoading] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [form, setForm] = useState<loginRequest>(initloginRequest);

    console.log(form)

    const input = [
        {
            id: "email",
            name: "Email",
            type: "email",
            placeholder: "enter email",
            value: form.email,
            onchange: (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })
        },
        {
            id: "password",
            name: "Password",
            type: isShowPassword ? "text" : "password",
            placeholder: "enter password",
            value: form.password,
            onchange: (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })
        }
    ]


    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

        } catch (err: any) {

        }
    }


    return (
        <main className="mx-auto flex min-h-screen items-center">
            <form onSubmit={handleSubmitLogin}>
                <fieldset disabled={isLoding}>
                    <div className="relative">
                        {input.map((i, idx) => (
                            <div key={`${i.id}-${idx}`} className="flex flex-col">
                                <label htmlFor={i.id}>{i.name}</label>
                                <input type={i.type} id={i.id} name={i.id} placeholder={i.placeholder} value={i.value} onChange={i.onchange} className="ring-1" />
                            </div>

                        ))}
                        {form.password && (
                            <button type="button" onClick={() => setIsShowPassword(!isShowPassword)} className="absolute bottom-0.5 right-1">
                                {isShowPassword ? <Eye /> : <EyeClosed />}
                            </button>
                        )}
                    </div>
                    <button type="submit" className="border">
                        Login
                    </button>

                    <Link href="/register" className="text-blue-500 underline">
                        Register
                    </Link>
                </fieldset>
            </form>
        </main>
    );
}
