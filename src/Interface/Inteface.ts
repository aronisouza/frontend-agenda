import { ReactNode } from "react";

export interface IInput {
  placeholder: string;
  type: 'password' | 'text' | 'date' | 'number';
  error?: string;
  icon?: ReactNode;
}

export interface IButton{
  text: string;
}