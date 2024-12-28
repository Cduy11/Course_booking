import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { userApi } from "../../../apis/user.api";
import { QueryKeys } from "../../../constants/queryKeys";
import { CustomTableCell } from "../components/CustomTableCell";
import AddSearchBar from "../components/HeaderBar";
import useOpen from "../../../hooks/useOpen";
import { LoadingButton } from "@mui/lab";
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Users } from "../../../interfaces/users.interface";

const UsersManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [flag, setFlag] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { open, handleClickOpen, onClose } = useOpen();
  const queryClient = useQueryClient();
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

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onError: (error) => {
      setErrorMessage(error?.message || "Xóa người dùng thất bại. Vui lòng thử lại.");
      setErrorDialogOpen(true);
    },
    onSuccess: () => {
      setSuccessDialogOpen(true);
      queryClient.setQueryData([QueryKeys.LIST_USER, keyword, page], (oldData: any) => {
        if (!oldData) return oldData;

        const updatedItems = oldData.items
          ? oldData.items.filter((item: Users) => item.taiKhoan !== userId)
          : oldData.filter((item: any) => item.taiKhoan !== userId);

        return {
          ...oldData,
          items: updatedItems,
        };
      });
    },
    onSettled: () => {
      onClose();
      setUserId(null);
    },
  });

  const handleClose = () => {
    if (!isPending) {
      onClose();
      setUserId(null);
    }
  };

  const handleDeleteUser = () => {
    if (!userId) {
      return;
    }
    mutate(userId);
  };

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
                  <CustomTableCell sx={{ width: "150px" }}>Tài khoản</CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>Loại người dùng</CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>Họ và tên</CustomTableCell>
                  <CustomTableCell sx={{ width: "20px" }}>Email</CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>Số điện thoại</CustomTableCell>
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
                          onClick={() => {
                            setUserId(item.taiKhoan)
                            handleClickOpen();
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
                previous: () => <span style={{ color: "black" }}>{"< Trước"}</span>,
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#D32F2F",
          }}
        >
          <ErrorIcon
            sx={{ marginRight: "8px", fontSize: "24px", color: "#D32F2F" }}
          />
          Xoá người dùng này?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              fontSize: "16px",
              textAlign: "center",
              color: "#333",
              padding: "10px 0",
            }}
          >
            Bạn có chắc chắn muốn xoá người dùng này? Việc này sẽ không thể khôi
            phục lại!
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between",
            padding: "15px 20px",
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            disabled={isPending}
            onClick={handleClose}
            sx={{
              width: "48%",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#f2f2f2",
              },
            }}
          >
            Hủy
          </Button>
          <LoadingButton
            loading={isPending}
            variant="contained"
            color="error"
            disabled={isPending}
            onClick={handleDeleteUser}
            sx={{
              width: "48%",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "#D32F2F",
              "&:hover": {
                backgroundColor: "#C2185B",
              },
            }}
          >
            Xoá
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        aria-labelledby="success-dialog-title"
      >
        <DialogTitle
          id="success-dialog-title"
          sx={{
            color: "#388E3C",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CheckCircleIcon sx={{ marginRight: "8px" }} />
          Xoá thành công
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            Người dùng đã được xoá thành công khỏi hệ thống.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSuccessDialogOpen(false)}
            color="primary"
            autoFocus
            sx={{
              textTransform: "none",
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        aria-labelledby="error-dialog-title"
      >
        <DialogTitle
          id="error-dialog-title"
          sx={{
            color: "#D32F2F",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ErrorIcon sx={{ marginRight: "8px" }} />
          Lỗi
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setErrorDialogOpen(false)}
            color="primary"
            autoFocus
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
