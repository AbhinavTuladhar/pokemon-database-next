import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    headerStyle?: string
    cellStyle?: string
  }
}
