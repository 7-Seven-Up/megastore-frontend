import "@testing-library/jest-dom";
import { vi } from "vitest";
import { httpClient } from "@shared/lib/httpClient.ts";

vi.spyOn(httpClient, "get").mockResolvedValue({});
vi.spyOn(httpClient, "post").mockResolvedValue({});
