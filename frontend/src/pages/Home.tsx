import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import loginImage from "../assets/home/login.webp";
import registerImage from "../assets/home/register.webp";
import { useAuthService } from "../services/authService";
import { useAuthStore } from "../hooks/useAuthStore";


export default function Login() {

  const { registerService, loginService, data } = useAuthService()
  const { startLogin } = useAuthStore()

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    userType: "",
    email: "",
    password: "",
  });

  const handleChangeRegister = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onRegister = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    registerService(formData)
  };

  const onLogin = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    loginService(formData)
  };

  useEffect(() => {
    startLogin(data)
  }, [ data ])

  return (
      <div className="w-full flex flex-col items-center justify-center p-8 mt-20 md:mt-0">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Web para realizar evaluaciones 
        </h1>
      <div className="flex flex-col md:flex-row items-center w-full max-w-4xl p-8">
        {/* Imagen Dinámica */}
        <div className="hidden md:flex w-1/2 justify-center items-center">
          <img
            src={isLogin ? loginImage : registerImage}
            alt={isLogin ? "Login" : "Registro"}
            className="w-[300px] h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 mt-10 md:mt-0">
          <div className="bg-gray-900 p-10 rounded-xl shadow-lg w-full max-w-md">
            <h1 className="text-3xl font-bold text-center text-black mb-6">
              Nolatech
            </h1>

            {/* Switch entre Login y Registro */}
            <div className="flex justify-around mb-6 border-b border-gray-700 pb-2">
              <button
                className={`py-2 px-4 text-lg font-medium ${
                  isLogin ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Iniciar Sesión
              </button>
              <button
                className={`py-2 px-4 text-lg font-medium ${
                  !isLogin ? "border-b-2 border-blue-500 text-blue-400" : "text-gray-400"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Registrarse
              </button>
            </div>

            {/* Formulario de Iniciar Sesión */}
            {isLogin ? (
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="email"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChangeRegister}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChangeRegister}
                  />
                </div>
                <button className="w-full bg-blue-500 text-black py-3 rounded-lg font-semibold hover:bg-blue-600 transition" onClick={ onLogin }>
                  Entrar
                </button>
                <div className="text-center text-gray-400 mt-3">
                  <a href="#" className="text-blue-400 text-sm">
                    ¿Has olvidado la contraseña?
                  </a>
                </div>
              </form>
            ) : (
              // Formulario de Registro
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nombre"
                    value={formData.name}
                    onChange={handleChangeRegister}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Apellido"
                    value={formData.lastName}
                    onChange={handleChangeRegister}
                  />
                </div>
                <div>
                  <select
                    className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                    name="userType"
                    value={formData.userType}
                    onChange={handleChangeRegister}
                  >
                    {/* Opción que actúa como placeholder */}
                    <option value="" disabled hidden>
                      Tipo de Usuario
                    </option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Empleado</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    name="email"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleChangeRegister}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 border rounded-lg bg-gray-800 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChangeRegister}
                  />
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition" onClick={ onRegister }>
                  Registrarse
                </button>
              </form>
            )}

            <div className="text-center text-gray-400 mt-6">
              {isLogin ? (
                <>
                  ¿No tienes una cuenta?{" "}
                  <button
                    className="text-blue-400 font-semibold"
                    onClick={() => setIsLogin(false)}
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes una cuenta?{" "}
                  <button
                    className="text-blue-400 font-semibold"
                    onClick={() => setIsLogin(true)}
                  >
                    Inicia Sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}