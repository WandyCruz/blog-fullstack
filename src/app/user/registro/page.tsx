"use client";
import Inputs from "@/componentes/inputs";
import Link from "next/link";
import Btn from "@/componentes/user/btn";
import Image from "next/image";
import BtnGoogle from "@/componentes/user/btnGoogle";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const Router = useRouter();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [verPassword, setVerPassword] = useState(false);

  const fechin = async (e: React.FormEvent) => {
    e.preventDefault(); // evita recargar la página al enviar
    const data = { correo, contraseña, nombre };

    try {
      const res = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      console.log(resData);
      console.log(data);
      if (resData.registro_exitoso) {
        Router.push("../../user/login");
      }

      return resData;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center h-screen w-full">
      <section className=" w-8/12 h-full ">
        <div className="relative w-full h-full">
          <Image
            className="object-cover"
            src="https://picsum.photos/seed/picsum/1200/800"
            alt="imagen"
            fill
          />
        </div>
      </section>
      <section className="w-9/12 max-w-md ml-auto mr-auto">
        <div className="mb-32">
          <h1 className="font-bold text-amber-400 text-3xl">logo</h1>
        </div>
        <form onSubmit={fechin}>
          <div className="mb-12">
            <h1 className="text-2xl font-bold">Nice to see you again</h1>
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="email">Nombre completo</label>
            <Inputs
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={setNombre}
            />
          </div>
          <div className="mb-8 w-full">
            <label htmlFor="email">Email</label>
            <Inputs
              type="text"
              placeholder="Email"
              value={correo}
              onChange={setCorreo}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="password">Password</label>
            <Inputs
              type={verPassword ? "text" : "password"}
              placeholder="Password"
              value={contraseña}
              onChange={setContraseña}
            />
          </div>
          <div className="w-full mb-4">
            <label htmlFor="password">repetir Password</label>
            <Inputs
              type={verPassword ? "text" : "password"}
              placeholder="Password"
              value={contraseña}
              onChange={setContraseña}
            />
          </div>
          <div className="flex items-center gap-2 mb-8 justify-between mt-5">
            <div className="flex items-center gap-2">
              <label htmlFor="remember">ver password</label>
              <input
                type="checkbox"
                name="remember"
                id="remember"
                onClick={() => {
                  setVerPassword(!verPassword);
                }}
              />
            </div>
            <Link href="/user/forgot-password">Forgot password?</Link>
          </div>
          <div>
            <Btn data="Registrarse" />
          </div>
          {/* separador con línea */}
          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <BtnGoogle data="Google" />
          <div className="mt-4 flex justify-center">
            <p>Terminos y condiciones</p>
          </div>
        </form>
      </section>
    </div>
  );
}
