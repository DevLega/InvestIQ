import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import type { AppUser } from '../types';

const mapUser = (user: User): AppUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});

export const registerWithEmail = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return mapUser(user);
};

export const loginWithEmail = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return mapUser(user);
};

export const loginWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);
  return mapUser(user);
};

export const logout = () => signOut(auth);

export const subscribeToAuth = (callback: (user: AppUser | null) => void) =>
  onAuthStateChanged(
    auth,
    (user) => callback(user ? mapUser(user) : null),
    () => callback(null)
  );

export const getAuthErrorMessage = (error: unknown): string => {
  const code = (error as { code?: string })?.code;

  switch (code) {
    case 'auth/invalid-email':
      return 'Некоректний email';
    case 'auth/email-already-in-use':
      return 'Користувач з таким email вже існує';
    case 'auth/weak-password':
      return 'Пароль має містити щонайменше 6 символів';
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Невірний email або пароль';
    case 'auth/too-many-requests':
      return 'Забагато спроб. Спробуйте пізніше';
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request':
      return '';
    case 'auth/network-request-failed':
      return 'Проблеми з мережею';
    default:
      return 'Щось пішло не так. Спробуйте ще раз';
  }
};