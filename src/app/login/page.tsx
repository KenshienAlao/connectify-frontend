"use client";
import { initloginRequest, LoginRequest } from "@/model/auth/login.model";
import { AuthService } from "@/service/auth/auth.service";
import { notifError, notifSuccess } from "@/utils/notification";
import { LoginSchema } from "@/validation/auth.schema";
import { Eye, EyeClosed, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [isLoding, setIsLoading] = useState<boolean>(false);
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [form, setForm] = useState<LoginRequest>(initloginRequest);
    const input = [
        {
            id: "email",
            name: "Email",
            type: "email",
            placeholder: "enter email",
            value: form.email,
            onchange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, email: e.target.value }),
        },
        {
            id: "password",
            name: "Password",
            type: isShowPassword ? "text" : "password",
            placeholder: "enter password",
            value: form.password,
            onchange: (e: React.ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, password: e.target.value }),
        },
    ];

    const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = LoginSchema.safeParse(form);
        if (!result.success) {
            const firstError = result.error.issues[0].message;
            return notifError(firstError);
        }

        setIsLoading(true)

        const { data, error } = await AuthService.login(result.data);

        console.log(data);

        if (error) {
            setIsLoading(false)
            return notifError(error.message)
        }

        setIsLoading(false)
        notifSuccess(data.message)
    };

    return (
        <main className="mx-auto flex min-h-screen items-center">
            <form onSubmit={handleSubmitLogin}>
                <fieldset disabled={isLoding}>
                    <div className="relative flex flex-col gap-5">
                        {input.map((i, idx) => (
                            <div key={`${i.id}-${idx}`} className="flex flex-col space-y-2">
                                <label htmlFor={i.id} className="font-medium">{i.name}</label>
                                <input
                                    type={i.type}
                                    id={i.id}
                                    name={i.id}
                                    placeholder={i.placeholder}
                                    value={i.value}
                                    onChange={i.onchange}
                                    className="rounded p-2 ring-1"
                                />
                            </div>
                        ))}
                        {form.password && (
                            <button
                                type="button"
                                onClick={() => setIsShowPassword(!isShowPassword)}
                                className="absolute right-1 bottom-0.5"
                            >
                                {isShowPassword ? <Eye /> : <EyeClosed />}
                            </button>
                        )}
                    </div>
                    <button type="submit" className="rounded p-2 ring-1">
                        {isLoding ? <Loader2 className="animate-spin" /> : "Submit"}
                    </button>

                    <Link href="/register" className="text-blue-500 underline">
                        Register
                    </Link>
                </fieldset>
            </form>
        </main>
    );
}
