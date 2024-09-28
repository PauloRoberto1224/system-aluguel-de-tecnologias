import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Aluguel } from "./Aluguel";
import { Produtos } from "./Produtos";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/"/>
        <Route element={<Aluguel />} path="/aluguel"/>
        <Route element={<Produtos />} path="/produtos"/>
      </Routes>
    </BrowserRouter>
  )
}
