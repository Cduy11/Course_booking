import { Box, Pagination, PaginationItem } from "@mui/material";
import React from "react";
interface PaginationCustomProps {
  size: any;
  count: number;
  page: number;
  onChange: (_event: any, page: any) => void;

}
const PaginationCustom: React.FC<PaginationCustomProps> = ({
  size,
  count,
  page,
  onChange,
}) => {
  return (
    <Box my={5} display="flex" justifyContent="center">
      <Pagination
        size={size}
        count={count}
        page={page}
        onChange={onChange}
        shape="rounded"
        renderItem={(item) => (
          <PaginationItem
            {...item}
            components={{
              previous: () => (
                <span style={{ color: "black" }}>{"< Trước"}</span>
              ),
              next: () => <span style={{ color: "black" }}>{"Sau >"}</span>,
            }}
          />
        )}
        sx={{
          "& .MuiPaginationItem-root": {
            backgroundColor: "white",
            color: "black",
            border: "1px solid #40b394",
            "&.Mui-selected": {
              backgroundColor: "#40b394",
              color: "white",
            },
            "&:hover": {
              backgroundColor: "#40b394",
              color: "white",
            },
          },
        }}
      />
    </Box>
  );
};

export default PaginationCustom;
