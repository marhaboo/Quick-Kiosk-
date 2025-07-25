"use client";

import { AppDispatch } from "@/app/store/store";
import { loginPost } from "@/entities/auth/api/api";
import PrimaryButton from "@/shared/primary-button/primary-button";
import { UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useState } from "react";

const LoginPage = () => {
  const dispatch: AppDispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginPost({ userName, password }));

      if (result.meta.requestStatus === "fulfilled" && result.payload?.token) {
        window.location.href = "/admin";
      } else {
        setError("Неверный логин или пароль");
      }

    } catch (err) {
      setError("Произошла ошибка при входе");
    }
  };

  return (
    <div className="bg-[url('/images/bg-of-site.png')] bg-cover bg-center h-screen flex items-center justify-start px-10 md:px-15">
      <div className="flex flex-col items-center justify-evenly gap-6 max-w-[350px] w-full">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-bold text-xl">ResNet</span>
        </Link>

        <form
          className="flex flex-col bg-black/10 backdrop-blur-md border border-white/20 shadow p-6 px-4 items-center justify-start rounded-2xl w-full text-white"
          onSubmit={handleSubmit}
        >
          <p className="mb-4 md:text-2xl text-xl font-bold">Имя ресторана</p>

          {error && (
            <div className="mb-4 text-red-400 text-sm text-center">{error}</div>
          )}

          <label className="mb-1 ml-3 self-start text-white/60">Логин</label>
          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 border border-white/20 outline-none text-white placeholder:text-white/40"
            placeholder="Введите логин"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <label className="mb-1 ml-3 self-start text-white/60">Пароль</label>
          <input
            className="mb-6 px-4 w-full py-2 rounded-2xl bg-white/5 border border-white/20 outline-none text-white placeholder:text-white/40"
            placeholder="Введите пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex self-center justify-between gap-4 w-full">
            <div className="w-full">
              <PrimaryButton text="Вход" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
