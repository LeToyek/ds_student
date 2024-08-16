import { ThemeProvider } from "@material-tailwind/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { PredictPage } from "./ui/pages/PredictPage.tsx"; // Import your new Predict component
import KanbanPage from "./ui/pages/KanbanPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path='/kanban' element={<KanbanPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
