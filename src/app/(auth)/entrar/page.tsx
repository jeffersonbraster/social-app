import React from "react";
import LoginForm from "./login-form";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/assets/login-image.png";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrar",
};

const LoginPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <h1 className="text-center text-3xl font-bold">
            Entre no AnimesBook
          </h1>

          <div className="space-y-5">
            <LoginForm />
            <Link
              href={"/cadastro"}
              className="block text-clip hover:underline"
            >
              Ainda não tem uma conta? Cadastre aqui!
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt="imagem de login"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};

export default LoginPage;
