import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import RoutesProvider from "./RoutesProvider.tsx";
import { ConfirmModal } from "@shared/components/ConfirmModal.tsx";

const queryClient = new QueryClient();
export default function AppProvider() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Toaster richColors />
          <ConfirmModal />
          <RoutesProvider />
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
}
