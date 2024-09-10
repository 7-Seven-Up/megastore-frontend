import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import AppProvider from "./providers/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(<AppProvider />);
