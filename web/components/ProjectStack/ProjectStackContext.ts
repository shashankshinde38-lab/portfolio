"use client";
import { createContext, useContext } from "react";
export const ProjectStackContext = createContext({ scrubEnabled: false });
export function useProjectStackState() {
  return useContext(ProjectStackContext);
}
