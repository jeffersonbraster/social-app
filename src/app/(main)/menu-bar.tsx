import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home, Mail } from "lucide-react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

const MenuBar = ({ className }: MenuBarProps) => {
  return (
    <div className={className}>
      <Button
        variant={"ghost"}
        className="flex items-center justify-start gap-3"
        title="Inicio"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Inicio</span>
        </Link>
      </Button>

      <Button
        variant={"ghost"}
        className="flex items-center justify-start gap-3"
        title="Notificações"
        asChild
      >
        <Link href="/notificacoes">
          <Bell />
          <span className="hidden lg:inline">Notificações</span>
        </Link>
      </Button>

      <Button
        variant={"ghost"}
        className="flex items-center justify-start gap-3"
        title="Mensagens"
        asChild
      >
        <Link href="/mensagens">
          <Mail />
          <span className="hidden lg:inline">Mensagens</span>
        </Link>
      </Button>

      <Button
        variant={"ghost"}
        className="flex items-center justify-start gap-3"
        title="Favoritos"
        asChild
      >
        <Link href="/">
          <Bookmark />
          <span className="hidden lg:inline">Favoritos</span>
        </Link>
      </Button>
    </div>
  );
};

export default MenuBar;
