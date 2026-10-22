import type { TransactionType } from "../types";

export interface Category {
    value: string,
    label: string,
}

export const CATEGORIES: Record<TransactionType, Category[]> = {
    expense: [
        { value: 'transport', label: 'Транспорт' },
        { value: 'products', label: 'Продукти' },
        { value: 'health', label: "Здоров'я" },
        { value: 'alcohol', label: 'Алкоголь' },
        { value: 'entertainment', label: 'Розваги' },
        { value: 'home', label: 'Все для дому' },
        { value: 'tech', label: 'Техніка' },
        { value: 'utilities', label: "Комуналка, зв'язок" },
        { value: 'sport', label: 'Спорт, хобі' },
        { value: 'education', label: 'Навчання' },
        { value: 'other', label: 'Інше' },
    ],
    income: [
        { value: 'salary', label: 'ЗП' },
        { value: 'extra', label: 'Дод. дохід' },
    ],
};

export const getCategoryLabel = (type: TransactionType, value: string) =>
    CATEGORIES[type].find((c) => c.value === value)?.label ?? value;