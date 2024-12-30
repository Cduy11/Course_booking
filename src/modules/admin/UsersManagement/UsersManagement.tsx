import { yupResolver } from "@hookform/resolvers/yup";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import ErrorIcon from "@mui/icons-material/Error";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import KeyIcon from "@mui/icons-material/Key";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { LoadingButton } from "@mui/lab";
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
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { userApi } from "../../../apis/user.api";
import { QueryKeys } from "../../../constants/queryKeys";
import useOpen from "../../../hooks/useOpen";
import { Users } from "../../../interfaces/users.interface";
import { CustomTableCell } from "../components/CustomTableCell";
import FormItem from "../components/FormItem/FormItem";
import AddSearchBar from "../components/HeaderBar";
interface DataEdit {
  taiKhoan: string;
  matKhau: string;
  hoTen: string;
  soDt: string;
  maLoaiNguoiDung: string;
  maNhom: string;
  email: string;
  tenLoaiNguoiDung: string;
}

const validationSchema = Yup.object({
  taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
  hoTen: Yup.string().required("Họ và tên không được bỏ trống"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được bỏ trống"),
  matKhau: Yup.string().required("Mật khẩu không được bỏ trống"),
  soDT: Yup.string()
    .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
    .required("Số điện thoại không được bỏ trống"),
  maLoaiNguoiDung: Yup.string().required("Xin vui lòng chọn loại người dùng"),
});
const UsersManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [dataEdit, setDataEdit] = useState<DataEdit | null>(null);
  const [flag, setFlag] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isAddOrEditDialog, setIsAddOrEditDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { open, handleClickOpen, onClose } = useOpen();
  const queryClient = useQueryClient();
  const [totalPagesSearch, setTotalPagesSearch] = useState<number>(1);
  const [totalPagesList, setTotalPagesList] = useState<number>(1);
  const pageSize = 5;
  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
      setErrorMessage(
        error?.message || "Xóa người dùng thất bại. Vui lòng thử lại."
      );
      setErrorDialogOpen(true);
    },
    onSuccess: () => {
      setSuccessDialogOpen(true);
      queryClient.setQueryData(
        [QueryKeys.LIST_USER, keyword, page],
        (oldData: any) => {
          if (!oldData) return oldData;

          const updatedItems = oldData.items
            ? oldData.items.filter((item: Users) => item.taiKhoan !== userId)
            : oldData.filter((item: any) => item.taiKhoan !== userId);

          return {
            ...oldData,
            items: updatedItems,
          };
        }
      );
    },
    onSettled: () => {
      onClose();
      setUserId(null);
    },
  });
  const { mutate: addUser } = useMutation({
    mutationFn: (formData: Users) => userApi.addUser(formData),
    onError: (error: any) => {
      toast.error(
        error.response.data || "Thêm người dùng thất bại. Vui lòng thử lại."
      );
    },
    onSuccess: (newUser) => {
      toast.success("Thêm người dùng thành công!");

      queryClient.setQueryData(
        [QueryKeys.LIST_USER, keyword, page],
        (oldData: any) => {
          if (!oldData) return { items: [newUser], totalPages: 1 };

          const updatedItems = oldData.items
            ? [newUser, ...oldData.items]
            : [newUser];
          return {
            ...oldData,
            items: updatedItems,
          };
        }
      );

      reset();
      setIsAddOrEditDialog(false);
    },
  });
  const { mutate: updateUser } = useMutation({
    mutationFn: (formData: Users) => userApi.updateUser(formData),
    onError: (error: any) => {
      toast.error(
        error.response.data || "Cập nhật người dùng thất bại. Vui lòng thử lại."
      );
    },
    onSuccess: (newUser) => {
      toast.success("Cập nhật người dùng thành công!");

      queryClient.setQueryData(
        [QueryKeys.LIST_USER, keyword, page],
        (oldData: any) => {
          if (!oldData) return { items: [newUser], totalPages: 1 };

          const updatedItems = oldData.items
            ? [newUser, ...oldData.items]
            : [newUser];
          return {
            ...oldData,
            items: updatedItems,
          };
        }
      );
      queryClient.refetchQueries({
        queryKey: [QueryKeys.LIST_USER, keyword, page],
      });
      reset();
      setIsAddOrEditDialog(false);
    },
  });

  useEffect(() => {
    if (dataEdit) {
      reset(dataEdit);
    }
  }, [dataEdit, reset]);
  const handleClose = () => {
    if (!isPending) {
      onClose();
      setUserId(null);
    }
    setDataEdit(null);
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
  const onSubmit = (data: any) => {
    addUser({ ...data, maNhom: "GP01" });
    reset();
  };
  const dropdownItems = [
    {
      content: "Giáo vụ",
      value: "GV",
    },
    {
      content: "Học viên",
      value: "HV",
    },
  ];
  return (
    <div>
      <AddSearchBar
        buttonLabel="Thêm người dùng"
        searchPlaceholder="Nhập vào họ tên người dùng hoặc tài khoản cần tìm"
        onSearch={handleSearch}
        handleOpenDialogAdd={() => {
          reset({
            taiKhoan: "",
            hoTen: "",
            email: "",
            matKhau: "",
            soDT: "",
            maLoaiNguoiDung: "",
          });
          setIsAddOrEditDialog(true);
          setDataEdit(null);
        }}
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
                {paginatedItems.map((item, index) =>
                  item ? (
                    <TableRow key={item.taiKhoan || index}>
                      <CustomTableCell variant="body">
                        {(page - 1) * pageSize + index + 1}
                      </CustomTableCell>
                      <CustomTableCell variant="body">
                        {item.taiKhoan || "N/A"}
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
                            onClick={() => {
                              setIsAddOrEditDialog(true);
                              setDataEdit(item);
                            }}
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
                              setUserId(item.taiKhoan);
                              handleClickOpen();
                            }}
                          >
                            Xoá
                          </Button>
                        </Box>
                      </CustomTableCell>
                    </TableRow>
                  ) : null
                )}
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

      <Dialog
        open={isAddOrEditDialog}
        onClose={() => setIsAddOrEditDialog(false)}
      >
        <form className="w-[450px]" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className="text-center" sx={{ fontWeight: "bold" }}>
            {dataEdit ? "CẬP NHẬT THÔNG TIN" : "THÔNG TIN NGƯỜI DÙNG"}
          </DialogTitle>
          <Stack spacing={2} p={3}>
            <FormItem
              icon={<PersonIcon />}
              placeholder="Tài khoản"
              error={errors.taiKhoan?.message}
              control={control}
              name="taiKhoan"
              disabled={dataEdit ? true : false}
            />
            <FormItem
              icon={<PeopleIcon />}
              placeholder="Họ và tên"
              error={errors.hoTen?.message}
              control={control}
              name="hoTen"
            />
            <FormItem
              icon={<EmailIcon />}
              placeholder="Email"
              error={errors.email?.message}
              control={control}
              name="email"
            />
            {!dataEdit && (
              <FormItem
                icon={<KeyIcon />}
                placeholder="Mật khẩu"
                error={errors.matKhau?.message}
                control={control}
                name="matKhau"
              />
            )}
            <FormItem
              icon={<PhoneEnabledIcon />}
              placeholder="Số điện thoại"
              error={errors.soDT?.message}
              control={control}
              name="soDT"
            />
            <FormItem
              icon={<HomeRepairServiceIcon />}
              placeholder="Loại người dùng"
              isDropdown={true}
              dropdownItems={dropdownItems}
              error={errors.maLoaiNguoiDung?.message}
              control={control}
              name="maLoaiNguoiDung"
            />
          </Stack>
          <DialogActions>
            {!dataEdit ? (
              <Button
                type="submit"
                sx={{
                  color: "white",
                  backgroundColor: "#3fb394",
                }}
              >
                Thêm người dùng
              </Button>
            ) : (
              <Button
                onClick={() => {
                  type UpdatedDataType = {
                    taiKhoan: string;
                    hoTen: string;
                    email: string;
                    maLoaiNguoiDung?: string;
                    maNhom?: string;
                  };
                  const updatedData = getValues() as UpdatedDataType;
                  const updateMaLoaiNguoiDung = getValues("maLoaiNguoiDung");
                  const tenLoaiNguoiDung =
                    updateMaLoaiNguoiDung === "HV" ? "Học viên" : "Giáo vụ";
                  updateUser({
                    ...updatedData,
                    maLoaiNguoiDung: updateMaLoaiNguoiDung,
                    tenLoaiNguoiDung,
                    maNhom: updatedData?.maNhom || "GP01",
                  });
                }}
                sx={{
                  color: "white",
                  backgroundColor: "#3fb394",
                }}
              >
                Cập nhật
              </Button>
            )}
            <Button
              onClick={() => {
                setIsAddOrEditDialog(false);
                setDataEdit(null);
                reset();
              }}
              sx={{
                color: "white",
                backgroundColor: "#e13247",
              }}
            >
              Huỷ
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default UsersManagement;
