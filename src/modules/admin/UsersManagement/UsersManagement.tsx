import { yupResolver } from "@hookform/resolvers/yup";
import EmailIcon from "@mui/icons-material/Email";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import KeyIcon from "@mui/icons-material/Key";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Pagination,
  PaginationItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
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
import DialogDelete from "../../../components/DialogDelete/DialogDelete";
import DialogEnrollSuccess from "../../../components/DialogEnrollSuccess/DialogEnrollSuccess";
import DialogError from "../../../components/DialogError/DialogError";
import DialogSuccess from "../../../components/DialogSuccess/DialogSuccess";
import { QueryKeys } from "../../../constants/queryKeys";
import useOpen from "../../../hooks/useOpen";
import { Users } from "../../../interfaces/users.interface";
import { CustomTableCell } from "../components/CustomTableCell";
import FormItem from "../components/FormItem/FormItem";
import AddSearchBar from "../components/HeaderBar";
import {
  enrollCourse,
  unenrolledCourse,
} from "./../../../apis/enrolledCourse.api";
import { loaiNguoiDung } from "../../../constants/dropdownItems";

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
interface Course {
  biDanh?: string;
  maKhoaHoc: string;
  tenKhoaHoc: string;
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
  const [unenrolledCourseState, setUnenrolledCourseState] = useState<
    Course[] | null
  >(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successEnrollDialogOpen, setSuccessEnrollDialogOpen] = useState(false);
  const [isAddOrEditDialog, setIsAddOrEditDialog] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
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

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedCourseName = event.target.value;
    const course = unenrolledCourseState?.find(
      (c) => c.tenKhoaHoc === selectedCourseName
    );
    setSelectedCourse(selectedCourseName);
    setSelectedCourseId(course?.maKhoaHoc || "");
  };
  const handleFetchUnenrolledCourse = async (userId: string) => {
    try {
      const result = await unenrolledCourse(userId);
      setUnenrolledCourseState(result);
      return result;
    } catch (error) {
      console.error("Error fetching unenrolled courses:", error);
    }
  };
  const handleEnroll = async (courseId: string, userId: string | null) => {
    const dataEnroll = {
      maKhoaHoc: courseId,
      taiKhoan: userId,
    };
    try {
      await enrollCourse(dataEnroll);
      setSelectedCourse("");
      if (userId) {
        await handleFetchUnenrolledCourse(userId);
      }
      setSuccessEnrollDialogOpen(true);
    } catch (error) {
      setErrorDialogOpen(true);
      setErrorMessage("Xảy ra lỗi, xin vui lòng thử lại!");
    }
  };
  // const handleGetEnrolledCourse = async (userId: string) => {
  //   const result = await getUserEnrolledCourses(userId);
  //   return result;
  // };
  return (
    <Box>
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
                            onClick={() => {
                              setEnrollDialogOpen(true);
                              setUserId(item.taiKhoan);
                              handleFetchUnenrolledCourse(item.taiKhoan);
                            }}
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
      <DialogDelete
        open={open}
        message="người dùng"
        handleClose={handleClose}
        isPending={isPending}
        handleDelete={handleDeleteUser}
      />

      <DialogSuccess
        message="Người dùng"
        isOpen={successDialogOpen}
        onClose={() => {
          setSuccessDialogOpen(false);
        }}
      />
      <DialogError
        isOpen={errorDialogOpen}
        onClose={() => {
          setErrorDialogOpen(false);
        }}
        errorMessage={errorMessage}
      />

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
              dropdownItems={loaiNguoiDung}
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

      <Dialog
        open={enrollDialogOpen}
        onClose={() => setEnrollDialogOpen(false)}
        className="w-full max-w-lg mx-auto"
        PaperProps={{
          sx: {
            width: "500px",
            maxWidth: "unset",
          },
        }}
      >
        <DialogTitle className="text-center text-lg font-semibold">
          Chọn khóa học
        </DialogTitle>
        <DialogContent>
          <Box className="flex items-center gap-4 mb-4">
            <Select
              value={selectedCourse || ""}
              onChange={handleSelectChange}
              displayEmpty
              sx={{
                flex: 1,
                height: "40px",
                borderRadius: "4px",
              }}
            >
              <MenuItem value="">
                <Typography color="#adadad">Chọn khoá học</Typography>
              </MenuItem>
              {unenrolledCourseState?.map((course) => (
                <MenuItem key={course.maKhoaHoc} value={course.tenKhoaHoc}>
                  {course.tenKhoaHoc}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#47b094",
                color: "white",
                minWidth: "100px",
                height: "40px",
              }}
              onClick={() => {
                handleEnroll(selectedCourseId, userId);
              }}
            >
              Ghi danh
            </Button>
          </Box>
          <Box className="mb-6">
            <Typography className="text-sm font-semibold mb-2">
              Khóa học chờ xác thực
            </Typography>
            <Table className="border">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-center">STT</TableCell>
                  <TableCell className="font-bold text-center">
                    Tên khóa học
                  </TableCell>
                  <TableCell className="font-bold text-center">
                    Chờ xác nhận
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">Khóa học A</TableCell>
                  <TableCell className="text-center">Đang chờ</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box>
            <Typography className="text-sm font-semibold mb-2">
              Khóa học đã ghi danh
            </Typography>
            <Table className="border">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-center">STT</TableCell>
                  <TableCell className="font-bold text-center">
                    Tên khóa học
                  </TableCell>
                  <TableCell className="font-bold text-center">
                    Chờ xác nhận
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">1</TableCell>
                  <TableCell className="text-center">Khóa học B</TableCell>
                  <TableCell className="text-center">Đã xác nhận</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </DialogContent>
        <DialogActions className="justify-center">
          <Button
            onClick={() => setEnrollDialogOpen(false)}
            variant="contained"
            className="bg-gray-500 text-white hover:bg-gray-600"
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
      <DialogEnrollSuccess
        onClose={() => setSuccessEnrollDialogOpen(false)}
        isOpen={successEnrollDialogOpen}
      />
    </Box>
  );
};

export default UsersManagement;
