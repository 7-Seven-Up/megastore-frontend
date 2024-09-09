import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import RoutesProvider from "./RoutesProvider.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();
export default function AppProvider() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster richColors />
          <RoutesProvider />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}