import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function userAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth is not in AuthProvider');
  }
  return context;
}