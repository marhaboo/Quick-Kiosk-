"use client"
import { useState } from "react";
import PrimaryButton from "@/shared/primary-button/primary-button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store/store";
import { postUser } from "@/entities/auth/api/api";

interface AddUserModalProps {
  onClose: () => void;
  onSubmit?: (data: any) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    imageUrl: "",
    phoneNumber: "",
    role: "Cashier",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch: AppDispatch = useDispatch();

  // Validation logic
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim() || !form.fullName.includes(" ")) {
      newErrors.fullName = "ФИО должно содержать пробел (имя и фамилия)";
    }
    if (!form.password || form.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }
    if (/^\d+$/.test(form.password)) {
      newErrors.password = "Пароль не должен состоять только из цифр";
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await dispatch(postUser(form)).unwrap();
      onClose();
    } catch (err) {
      setErrors({ submit: "Ошибка при добавлении пользователя" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#18181b]/90 to-[#23272f]/90">
      <div className="rounded-2xl shadow-2xl p-0 w-full max-w-lg animate-fade-in-up bg-black/60 border border-white/20 backdrop-blur-2xl flex flex-col items-center justify-center">
        <form
          autoComplete="off"
          className="flex flex-col max-w-[400px] mx-auto bg-black/30 backdrop-blur-lg border border-white/20 shadow p-8 items-center justify-center rounded-2xl w-full text-white"
          onSubmit={handleSubmit}
        >
          <p className="mb-6 md:text-2xl text-xl font-bold text-center">Добавить пользователя</p>
          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Логин"
            type="text"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <input
            className={`mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300 ${errors.fullName ? "border-red-500" : ""}`}
            placeholder="ФИО"
            type="text"
            value={form.fullName}
            onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
            required
          />
          {errors.fullName && <div className="text-red-400 text-xs mb-2 w-full">{errors.fullName}</div>}
          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
          />
          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Ссылка на фото (imageUrl)"
            type="text"
            value={form.imageUrl}
            onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
          />
          <input
            className="mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300"
            placeholder="Телефон"
            type="text"
            value={form.phoneNumber}
            onChange={e => setForm(f => ({ ...f, phoneNumber: e.target.value }))}
          />
          <div className="mb-2 w-full relative">
            <select
              className="w-full px-4 py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white transition-colors duration-300 appearance-none pr-8"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='16' height='16' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E\")",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.25em 1.25em",
              }}
            >
              <option value="Cashier" className="text-black">Кассир</option>
              <option value="Admin" className="text-black">Админ</option>
            </select>
          </div>
          <input
            className={`mb-2 px-4 w-full py-2 rounded-xl bg-white/10 focus:bg-white/20 border border-white/20 outline-none text-white placeholder:text-white/40 transition-colors duration-300 ${errors.password ? "border-red-500" : ""}`}
            placeholder="Пароль"
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          {errors.password && <div className="text-red-400 text-xs mb-2 w-full">{errors.password}</div>}
          {errors.submit && <div className="text-red-400 text-xs mb-2 w-full">{errors.submit}</div>}
          <div className="flex gap-4 w-full justify-center mt-2">
            <PrimaryButton text="Отмена" onClick={onClose} />
            <PrimaryButton text="Добавить" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;