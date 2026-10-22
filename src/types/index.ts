export type TransactionType = 'expense' | 'income';

export interface Transaction {
    id: string;
    type: TransactionType;
    date: string; // 'YYYY-MM-DD'
    description: string;
    category: string; // value из constants/categories.ts
    amount: number;
}

export interface AppUser {
    uid: string;
    email: string | null;
    displayName: string | null;
}