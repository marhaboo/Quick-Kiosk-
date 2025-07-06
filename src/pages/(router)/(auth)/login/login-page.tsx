import PrimaryButton from "@/shared/primary-button/primary-button";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="bg-[url('/images/bg-of-site.png')] bg-cover bg-center h-screen flex items-center justify-start px-10 md:px-15">
      <div className="flex flex-col items-center justify-evenly gap-6 max-w-[350px] w-full">
        <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-2xl bg-black/10 backdrop-blur-md border border-white/20 shadow flex items-center justify-center text-white">
          <span className="text-white/70">Logo</span>
        </div>

        <form className="flex flex-col bg-black/10 backdrop-blur-md border border-white/20 shadow p-6 px-4 items-center justify-start rounded-2xl w-full text-white">
          <p className="mb-4 md:text-2xl text-xl font-bold">Имя ресторана</p>

          <label className="mb-1 ml-3 self-start text-white/60">Логин</label>
          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 border border-white/20 outline-none text-white placeholder:text-white/40"
            placeholder="Введите логин"
          />

          <label className="mb-1 ml-3  self-start text-white/60">Пароль</label>
          <input
            className="mb-6 px-4 w-full py-2 rounded-2xl bg-white/5 border border-white/20 outline-none text-white placeholder:text-white/40"
            placeholder="Введите пароль"
            type="password"
          />

          <div className="flex self-center justify-between gap-4 w-full">
            <Link href="/registration" className="w-full">
              <PrimaryButton text="Регистрация" />
            </Link>
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
