import { TableCell } from '@mui/material'
import React from 'react'
 
interface CustomTableCellProps {
    children: React.ReactNode,
    sx?: object,
    variant?: string,
    colSpan?: number,
}

export const CustomTableCell: React.FC<CustomTableCellProps> = ({children, sx={}, variant = "head"}) => {
  return (
    <TableCell sx={{
        border: "1px solid #dcdddd",
        backgroundColor: variant === "body" ? "white" : "#f8f9fb",
        fontSize: "16px",
        fontWeight: variant === "body" ? "normal" : "bold",
        textAlign: "center",
        ...sx
    }}>{children}</TableCell>
  )
}
