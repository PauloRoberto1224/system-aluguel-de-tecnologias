import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { Aluguel } from "./Aluguel";
import { Produtos } from "./Produtos";
import { LoginForm } from "./Login";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const isAuthenticated = localStorage.getItem('session') === 'loggedIn';
  return isAuthenticated ? element : <Navigate to="/" />;
};

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoginForm />} path="/" />
        <Route element={<PrivateRoute element={<Home />} />} path="/home" />
        <Route element={<PrivateRoute element={<Aluguel />} />} path="/aluguel" />
        <Route element={<PrivateRoute element={<Produtos />} />} path="/produtos" />
      </Routes>
    </BrowserRouter>
  );
}
