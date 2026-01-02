import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils.ts

export const getBaseUrl = () => {
  // Se siamo nel browser, usiamo un percorso relativo
  if (typeof window !== "undefined") return ""; 
  
  // Se siamo su Vercel, usiamo l'URL fornito da Vercel
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; 
  
  // In locale, usiamo localhost
  return `http://localhost:3000`; 
};
