import { Metadata } from "next";
import signupImagem from "@/assets/anime-cadastro.png";
import Image from "next/image";
import Link from "next/link";
import SignupForm from "./signup-form";

export const metadata: Metadata = {
  title: "Cadastro",
};

const SingUpPage = () => {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Cadastro</h1>
            <p className="text-muted-foreground">
              Um lugar, todos os <span className="italic">animes</span> que você
              ama em uma só comunidade.
            </p>
          </div>

          <div className="space-y-5">
            <SignupForm />

            <Link
              href={"/entrar"}
              className="block text-center hover:underline"
            >
              Já tem uma conta? Faça login
            </Link>
          </div>
        </div>

        <Image
          src={signupImagem}
          alt="personagem da tela de cadastro"
          className="hidden w-1/2 object-cover md:block"
        />
      </div>
    </main>
  );
};

export default SingUpPage;
