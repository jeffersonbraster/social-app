import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatDate, formatDistanceToNowStrict } from 'date-fns'
import { ptBR } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatRelativeDate(from: Date) {
  const currentDate = new Date()
  if (currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
    return formatDistanceToNowStrict(from, { addSuffix: true, locale: ptBR })
  } else {
    if (currentDate.getFullYear() === from.getFullYear()) {
      return formatDate(from, 'dd/MM', { locale: ptBR })
    } else {
      return formatDate(from, 'dd/MM/yyyy', { locale: ptBR })
    }
  }
}

export function formatNumber(n: number): string {
  return Intl.NumberFormat('pt-BR', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n)
}