import { inject } from "vue";

export function useTableProvider() {
  const table = inject("TableProvider");
  if (!table) {
    throw new Error("useTable must be used within a <TableProvider>");
  }
  return table;
}
