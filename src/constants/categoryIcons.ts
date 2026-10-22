import {
  Banknote,
  BookOpen,
  Car,
  Dumbbell,
  HeartPulse,
  type LucideIcon,
  Martini,
  PartyPopper,
  Receipt,
  Shapes,
  ShoppingBasket,
  Sofa,
  Wallet,
  Wrench,
} from 'lucide-react';

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  // витрати
  products: ShoppingBasket,
  alcohol: Martini,
  entertainment: PartyPopper,
  health: HeartPulse,
  transport: Car,
  home: Sofa,
  tech: Wrench,
  utilities: Receipt,
  sport: Dumbbell,
  education: BookOpen,
  other: Shapes,
  // доходи
  salary: Banknote,
  extra: Wallet,
};