import PrimaryButton from "@/shared/primary-button/primary-button";
import Link from "next/link";

const RegistrationPage = () => {
  return (
    <div className="bg-[url('/images/bg-of-site.png')] bg-cover bg-center h-screen justify-around flex items-center  px-4">
      <div className="flex items-center gap-6  max-w-[340px]  w-full">
        {/* Форма регистрации */}
        <form   autoComplete="off" className="flex flex-col bg-black/10 backdrop-blur-md border border-white/20 shadow p-6 items-center justify-start rounded-2xl w-full text-white">
          <p className="mb-4 text-2xl font-bold">Регистрация</p>

          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 focus:bg-white/10 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Имя"
            type="text"
              autoComplete="off"
          />

          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 focus:bg-white/10 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Фамилия"
            type="text"
              autoComplete="off"
          />

          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 focus:bg-white/10 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Логин"
            type="text"
              autoComplete="off"
          />

          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 focus:bg-white/10 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Mail"
            autoComplete="false"
            type="email"
          />

          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 focus:bg-white/10 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="+992"
            type="text"
              autoComplete="off"
          />

          <input
            className="mb-4 px-4 w-full py-2 rounded-2xl bg-white/5 focus:bg-white/10 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Пароль"
            type="password"
              autoComplete="off"
          />

          <input
            className="mb-6 px-4 w-full py-2 rounded-2xl bg-white/5 focus:bg-white/10 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Повтор пароль"
            type="password"
              autoComplete="off"
          />

          <div className="flex self-center justify-between  gap-4 w-full">
            <Link href="/login" className="w-full">
              <div className="w-full">
                <PrimaryButton text="Вход" />
              </div>
            </Link>

            <PrimaryButton text="Регистрация" />
          </div>
        </form>
      </div>
      {/* Логотипный блок */}
      <div className="w-[350px] h-[350px] rounded-2xl self-center bg-black/10 backdrop-blur-md border border-white/20 shadow flex items-center justify-center text-white">
        <span className="text-white/70">Logo</span>
      </div>
    </div>
  );
};

export default RegistrationPage;
