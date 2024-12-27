import {
  Box,
  Button,
  CircularProgress,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { userApi } from "../../../apis/user.api";
import { QueryKeys } from "../../../constants/queryKeys";
import { CustomTableCell } from "../components/CustomTableCell";
import AddSearchBar from "../components/HeaderBar";

const UsersManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [flag, setFlag] = useState(true);
  const [totalPagesSearch, setTotalPagesSearch] = useState<number>(1);
  const [totalPagesList, setTotalPagesList] = useState<number>(1);
  const pageSize = 5;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.LIST_USER, keyword, page],
    queryFn: async () => {
      try {
        let response;
        if (keyword) {
          response = await userApi.searchUser({ keyword, page, pageSize });
          const totalPages = Math.ceil(
            (response.length ?? response.items.length) / pageSize
          );
          setTotalPagesSearch(totalPages);
        } else {
          response = await userApi.getUserListPagination({ page, pageSize });
          setTotalPagesList(response.totalPages);
        }
        return response;
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err);
        throw new Error("Có lỗi khi tải dữ liệu.");
      }
    },
    enabled: true,
    staleTime: 0,
  });
  const items = Array.isArray(data) ? data : data?.items || [];
  const totalPages = keyword ? totalPagesSearch : totalPagesList;
  const paginatedItems = flag
    ? items
    : items.slice((page - 1) * pageSize, page * pageSize);
  const hasNoDataCondition =
    !isLoading && !isError && paginatedItems.length === 0;

  const handleSearch = (value: string) => {
    setFlag(false);
    setKeyword(value);
    setPage(1);
  };

  return (
    <div>
      <AddSearchBar
        buttonLabel="Thêm người dùng"
        searchPlaceholder="Nhập vào họ tên người dùng hoặc tài khoản cần tìm"
        onSearch={handleSearch}
      />
      <Box sx={{ margin: "10px 20px" }}>
        {isLoading && (
          <Box
            height={200}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontSize={25} textAlign="center" marginRight="10px">
              Đang tải dữ liệu
            </Typography>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Box
            height={200}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography textAlign="center">
              Có lỗi xảy ra: {error?.message || "Vui lòng thử lại."}
            </Typography>
          </Box>
        )}

        {hasNoDataCondition && (
          <Box
            height={200}
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography textAlign="center">
              Không tìm thấy kết quả nào
            </Typography>
          </Box>
        )}
      </Box>
      {!isLoading && !isError && !hasNoDataCondition && (
        <Box sx={{ margin: "10px 20px" }}>
          <TableContainer component={Paper}>
            <Table className="container-fluid">
              <TableHead>
                <TableRow>
                  <CustomTableCell sx={{ width: "20px" }}>STT</CustomTableCell>
                  <CustomTableCell sx={{ width: "150px" }}>
                    Tài khoản
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>
                    Loại người dùng
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>
                    Họ và tên
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "20px" }}>
                    Email
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>
                    Số điện thoại
                  </CustomTableCell>
                  <CustomTableCell sx={{ fontSize: "30px" }}>⚙</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((item, index) => (
                  <TableRow key={item.taiKhoan || index}>
                    <CustomTableCell variant="body">
                      {(page - 1) * pageSize + index + 1}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {item.taiKhoan}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {item.tenLoaiNguoiDung}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {item.hoTen}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {item.email}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {item.soDT || item.soDt}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          padding: "0 20px",
                        }}
                      >
                        <Button
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#47b094",
                            color: "white",
                          }}
                        >
                          Ghi danh
                        </Button>
                        <Button
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#fcc205",
                            color: "black",
                          }}
                        >
                          Sửa
                        </Button>
                        <Button
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#e13346",
                            color: "white",
                          }}
                        >
                          Xoá
                        </Button>
                      </Box>
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      <Box my={5} display="flex" justifyContent="center">
        <Pagination
          size="large"
          count={totalPages > 1 ? totalPages : 1}
          page={page}
          onChange={(_event, page) => setPage(page)}
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
    </div>
  );
};

export default UsersManagement;
