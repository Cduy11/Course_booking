import { yupResolver } from "@hookform/resolvers/yup";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ContactsIcon from "@mui/icons-material/Contacts";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
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
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { courseApi } from "../../../apis/course.api";
import { CustomTableCell } from "../../../components/CustomTableCell/CustomTableCell";
import DialogDelete from "../../../components/DialogDelete/DialogDelete";
import DialogError from "../../../components/DialogError/DialogError";
import DialogSuccess from "../../../components/DialogSuccess/DialogSuccess";
import FormItem from "../../../components/FormItem/FormItem";
import HeaderBar from "../../../components/HeaderBar/HeaderBar";
import PaginationCustom from "../../../components/PaginationCustom/PaginationCustom";
import { danhMucKhoaHoc, maNhom } from "../../../constants/dropdownItems";
import { QueryKeys } from "../../../constants/queryKeys";
import useOpen from "../../../hooks/useOpen";
import { Courses } from "../../../interfaces/courses.interface";
import {
  getEnrolledUsers,
  getPendingUsers,
  getUnenrolledUser,
} from "../../../apis/userEnroll.api";
import {
  cancelEnrollCourse,
  enrollCourse,
} from "../../../apis/enrolledCourse.api";

interface CourseEdit {
  maKhoaHoc: string;
  tenKhoaHoc: string;
  moTa: string;
  ngayTao: string;
  maDanhMucKhoaHoc: string;
  maNhom: string;
  hinhAnh: FileList;
  luotXem: number;
  danhGia: number;
  biDanh: string;
  taiKhoanNguoiTao?: string;
}
interface User {
  taiKhoan: string;
  hoTen: string;
  biDanh: string;
}
const validationSchema = yup.object({
  maKhoaHoc: yup.string().required("Mã khóa học không được để trống"),
  biDanh: yup.string().required("Bí danh không được để trống"),
  tenKhoaHoc: yup.string().required("Tên khóa học không được để trống"),
  moTa: yup.string().required("Mô tả không được để trống"),
  luotXem: yup
    .number()
    .required("Lượt xem không được để trống")
    .min(0, "Lượt xem không được âm"),
  danhGia: yup
    .number()
    .required("Đánh giá không được để trống")
    .min(0, "Đánh giá không được âm"),
  hinhAnh: yup
    .mixed<FileList>()
    .required("Hình ảnh không được để trống")
    .test("fileSize", "Hình ảnh không được để trống", (value) => {
      if (value && value[0]) {
        const file = value[0];
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
        return allowedFormats.includes(file.type);
      }
      return false;
    })
    .test(
      "fileCount",
      "Chỉ được chọn một tệp tin",
      (value) => value && value.length === 1
    ),
  maNhom: yup.string().required("Xin vui lòng chọn mã nhóm"),
  ngayTao: yup
    .string()
    .required("Xin vui lòng nhập ngày tạo")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/,
      "Ngày tạo phải có định dạng dd/mm/yyyy"
    )
    .test("notInPast", "Ngày tạo không được là ngày trong quá khứ", (value) => {
      if (!value) return false;
      const [day, month, year] = value.split("/").map(Number);
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return inputDate >= today;
    }),
  maDanhMucKhoaHoc: yup
    .string()
    .required("Xin vui lòng chọn danh mục khoá học"),
});
const CoursesManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [enrolledUserListPage, setEnrolledUserListPage] = useState(1);
  const [pendingUserListPage, setPendingUserListPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [courseId, setCourseId] = useState(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isAddOrEditDialog, setIsAddOrEditDialog] = useState(false);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState<CourseEdit | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [unenrolledUser, setUnenrolledUser] = useState<User[] | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [flag, setFlag] = useState(true);
  const { open, handleClickOpen, onClose } = useOpen();
  const queryClient = useQueryClient();
  const [enrolledUsers, setEnrolledUsers] = useState<User[]>([]);
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const pageSize = 5;
  const startIndex = (enrolledUserListPage - 1) * 2;
  const paginatedEnrolledUser = enrolledUsers?.slice(
    startIndex,
    startIndex + 2
  );
  const startIndexPending = (pendingUserListPage - 1) * 2;
  const paginatedPendingUser = pendingUsers?.slice(
    startIndexPending,
    startIndexPending + 2
  );
  const [totalPagesSearch, setTotalPagesSearch] = useState<number>(1);
  const [totalPagesList, setTotalPagesList] = useState<number>(1);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.LIST_COURSE, keyword, page],
    queryFn: async () => {
      try {
        let response;
        if (keyword) {
          response = await courseApi.searchCourse({ keyword, page, pageSize });
          const totalPages = Math.ceil(
            (response.length ?? response.items.length) / pageSize
          );
          setTotalPagesSearch(totalPages);
        } else {
          response = await courseApi.getCourseListPagination({
            page,
            pageSize,
          });
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

  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => courseApi.deleteCourse(id),
    onError: (error) => {
      setErrorMessage(error?.message || "Xóa phim thất bại. Vui lòng thử lại");
      setErrorDialogOpen(true);
    },
    onSuccess: () => {
      setSuccessDialogOpen(true);
      onClose();
      queryClient.setQueryData(
        [QueryKeys.LIST_COURSE, keyword, page],
        (oldData: any) => {
          if (!oldData) return oldData;
          const updatedItems = oldData.items
            ? oldData.items.filter(
                (item: Courses) => item.maKhoaHoc !== courseId
              )
            : oldData.filter((item: any) => item.maKhoaHoc !== courseId);

          return {
            ...oldData,
            items: updatedItems,
          };
        }
      );
    },
  });

  const handleClose = () => {
    if (!isPending) {
      onClose();
      setCourseId(null);
    }
    setDataEdit(null);
  };

  const handleDeleteCourse = () => {
    if (!courseId) {
      return;
    }
    mutate(courseId);
  };

  const items = Array.isArray(data) ? data : data?.items || [];
  const totalPages = keyword ? totalPagesSearch : totalPagesList;
  const paginatedItems = flag
    ? items
    : items.slice((page - 1) * pageSize, page * pageSize);
  const hasNoDataCondition =
    !isLoading && !isError && paginatedItems.length === 0;
  const { mutate: addCourse } = useMutation({
    mutationFn: (formData: Courses) => courseApi.addCourse(formData),
    onError: (error: any) => {
      toast.error(
        error.response.data || "Thêm khoá học thất bại. Vui lòng thử lại."
      );
    },
    onSuccess: (newCourse) => {
      toast.success("Thêm khoá học thành công!");

      queryClient.setQueryData(
        [QueryKeys.LIST_COURSE, keyword, page],
        (oldData: any) => {
          if (!oldData) return { items: [newCourse], totalPages: 1 };

          const updatedItems = oldData.items
            ? [newCourse, ...oldData.items]
            : [newCourse];
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
  const { mutate: updateCourse } = useMutation({
    mutationFn: (formData: Courses) => courseApi.updateCourse(formData),
    onError: (error: any) => {
      toast.error(
        error.response.data ||
          "Cập nhật thông tin khoá học thất bại. Vui lòng thử lại."
      );
    },
    onSuccess: () => {
      toast.success("Cập nhật thông tin khoá học thành công!");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.LIST_COURSE, keyword, page],
      });
  
      reset();
      setIsAddOrEditDialog(false);
      setDataEdit(null);
    },
  });
  useEffect(() => {
    if (dataEdit) {
      const resetData = {
        maKhoaHoc: dataEdit.maKhoaHoc,
        biDanh: dataEdit.biDanh,
        tenKhoaHoc: dataEdit.tenKhoaHoc,
        moTa: dataEdit.moTa,
        luotXem: dataEdit.luotXem,
        danhGia: dataEdit.danhGia,
        hinhAnh: dataEdit.hinhAnh,
        maNhom: dataEdit.maNhom,
        ngayTao: dataEdit.ngayTao,
        maDanhMucKhoaHoc: dataEdit.maDanhMucKhoaHoc,
      };
      reset(resetData);
    } else {
      reset({
        maKhoaHoc: "",
        biDanh: "",
        tenKhoaHoc: "",
        moTa: "",
        luotXem: 0,
        danhGia: 0,
        hinhAnh: undefined,
        maNhom: "",
        ngayTao: "",
        maDanhMucKhoaHoc: "",
      });
    }
  }, [dataEdit, reset]);
  const handleSearch = (value: string) => {
    setFlag(false);
    setKeyword(value);
    setPage(1);
  };

  const onSubmit = (data: any) => {
    const currentUser = localStorage.getItem("currentUser");
    let taiKhoanNguoiTao = "";
    if (currentUser) {
      const user = JSON.parse(currentUser);
      taiKhoanNguoiTao = user.taiKhoan;
    }
    const formData = { ...data };
    const { hinhAnh } = formData;
    if (hinhAnh) {
      if (typeof hinhAnh === "string") {
        formData.hinhAnh = hinhAnh;
      } else if (hinhAnh instanceof FileList && hinhAnh.length > 0) {
        formData.hinhAnh = hinhAnh[0].name;
      }
    }
    if (dataEdit) {
      updateCourse({
        ...formData,
        maKhoaHoc: dataEdit.maKhoaHoc,
        taiKhoanNguoiTao,
      });
    } else {
      addCourse({
        ...formData,
        taiKhoanNguoiTao,
      });
    }
  };
  const handleEdit = (courseData: CourseEdit) => {
    setDataEdit({
      ...courseData,
      hinhAnh: courseData.hinhAnh,
    });
    setIsAddOrEditDialog(true);
  };
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedUserId = event.target.value;
    setSelectedUserId(selectedUserId);
  };
  const handleFetchUnenrolledUser = async (maKhoaHoc: string) => {
    try {
      const res = await getUnenrolledUser(maKhoaHoc);
      setUnenrolledUser(res);
      return res;
    } catch (error) {
      throw error;
    }
  };
  const handleEnrollUser = async (maKhoaHoc: string, taiKhoan: string) => {
    try {
      await enrollCourse({ maKhoaHoc, taiKhoan });

      if (selectedCourseId) {
        const [unenrolled, enrolled, pending] = await Promise.all([
          handleFetchUnenrolledUser(selectedCourseId),
          handleGetEnrolledUser(selectedCourseId),
          handleFetchPendingUserList(selectedCourseId),
        ]);
        setUnenrolledUser(unenrolled);
        setEnrolledUsers(enrolled);
        setPendingUsers(pending);
      }

      setSelectedUserId("");
      toast.success("Ghi danh thành công!");
    } catch (error) {
      setErrorDialogOpen(true);
      setErrorMessage("Xảy ra lỗi, xin vui lòng thử lại!");
    }
  };
  const handleGetEnrolledUser = async (maKhoaHoc: string | null) => {
    try {
      const result = await getEnrolledUsers(maKhoaHoc);
      setEnrolledUsers(result);
      return result;
    } catch (error) {
      throw error;
    }
  };
  const handleCancelEnrollUser = async (
    maKhoaHoc: string,
    taiKhoan: string | null
  ) => {
    try {
      await cancelEnrollCourse({ maKhoaHoc, taiKhoan });
      if (selectedCourseId) {
        const [enrolled, unenrolled, pending] = await Promise.all([
          handleGetEnrolledUser(selectedCourseId),
          handleFetchUnenrolledUser(selectedCourseId),
          handleFetchPendingUserList(selectedCourseId),
        ]);
        setEnrolledUsers(enrolled);
        setUnenrolledUser(unenrolled);
        setPendingUsers(pending);
      }

      toast.success("Huỷ ghi danh thành công!");
    } catch (error) {
      setErrorDialogOpen(true);
      setErrorMessage("Xảy ra lỗi khi hủy ghi danh!");
    }
  };
  const handleFetchPendingUserList = async (maKhoaHoc: string | null) => {
    try {
      const res = await getPendingUsers(maKhoaHoc);
      setPendingUsers(res);
      return res;
    } catch (error) {
      throw error;
    }
  };
  return (
    <div>
      <HeaderBar
        buttonLabel="Thêm khoá học"
        searchPlaceholder="Nhập vào tên khoá học cần tìm"
        onSearch={handleSearch}
        handleOpenDialogAdd={() => {
          setIsAddOrEditDialog(true);
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
                    Mã khoá học
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>
                    Tên khoá học
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>
                    Hình ảnh
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>
                    Lượt xem
                  </CustomTableCell>
                  <CustomTableCell sx={{ width: "200px" }}>
                    Người tạo
                  </CustomTableCell>
                  <CustomTableCell sx={{ fontSize: "30px" }}>⚙</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedItems.map((course, index) =>
                  course ? (
                    <TableRow key={course.maKhoaHoc}>
                      <CustomTableCell variant="body">
                        {(page - 1) * pageSize + index + 1}
                      </CustomTableCell>
                      <CustomTableCell variant="body">
                        {course?.maKhoaHoc || "Không có mã khóa học"}
                      </CustomTableCell>
                      <CustomTableCell variant="body">
                        {course?.tenKhoaHoc || "Không có tên khóa học"}
                      </CustomTableCell>
                      <CustomTableCell variant="body">
                        <img
                          src={course?.hinhAnh || ""}
                          alt={
                            course?.tenKhoaHoc || "Khóa học không có hình ảnh"
                          }
                          style={{ width: "100px", height: "auto" }}
                        />
                      </CustomTableCell>
                      <CustomTableCell variant="body">
                        {course?.luotXem || 0}
                      </CustomTableCell>
                      <CustomTableCell variant="body">
                        {course?.nguoiTao?.hoTen || "N/A"}
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
                              setSelectedCourseId(course.maKhoaHoc);
                              handleFetchUnenrolledUser(course.maKhoaHoc);
                              handleGetEnrolledUser(course.maKhoaHoc);
                              handleFetchPendingUserList(course.maKhoaHoc);
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
                            onClick={() => handleEdit(course)}
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
                              setCourseId(course.maKhoaHoc);
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

      <PaginationCustom
        size="large"
        count={totalPages > 1 ? totalPages : 1}
        page={page}
        onChange={(_event, page) => setPage(page)}
      />

      <DialogDelete
        open={open}
        message="khoá học"
        isPending={isPending}
        handleClose={handleClose}
        handleDelete={handleDeleteCourse}
      />

      <DialogError
        isOpen={errorDialogOpen}
        onClose={() => {
          setErrorDialogOpen(false);
          reset();
        }}
        errorMessage={errorMessage}
      />

      <DialogSuccess
        message="Khoá học đã được xoá thành công khỏi hệ thống!"
        isOpen={successDialogOpen}
        onClose={() => {
          setSuccessDialogOpen(false);
        }}
      />
      <Dialog
        open={isAddOrEditDialog}
        onClose={() => {
          setIsAddOrEditDialog(false);
        }}
      >
        <form className="w-[600px]" onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle className="text-center" sx={{ fontWeight: "bold" }}>
            {dataEdit ? "CẬP NHẬT THÔNG TIN" : "THÊM KHOÁ HỌC"}
          </DialogTitle>
          <Stack direction="row" spacing={3} p={2}>
            <Box sx={{ width: "50%" }}>
              <Stack spacing={2}>
                <FormItem
                  icon={<PersonIcon />}
                  placeholder="Mã khoá học"
                  error={errors.maKhoaHoc?.message}
                  control={control}
                  name="maKhoaHoc"
                />
                <FormItem
                  icon={<HomeRepairServiceIcon />}
                  placeholder="Danh mục khoá học"
                  isDropdown={true}
                  dropdownItems={danhMucKhoaHoc}
                  error={errors.maDanhMucKhoaHoc?.message}
                  control={control}
                  name="maDanhMucKhoaHoc"
                  defaultValue={dataEdit?.maDanhMucKhoaHoc || ""}
                />
                <FormItem
                  icon={<StarIcon />}
                  placeholder="Đánh giá"
                  error={errors.danhGia?.message}
                  control={control}
                  name="danhGia"
                />
                <FormItem
                  icon={<HomeRepairServiceIcon />}
                  placeholder="Mã nhóm"
                  isDropdown={true}
                  dropdownItems={maNhom}
                  error={errors.maNhom?.message}
                  control={control}
                  name="maNhom"
                />
                <Box>
                  <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    {...control.register("hinhAnh")}
                  />
                  {errors.hinhAnh && (
                    <Typography color="error" fontSize="14px" mt={1}>
                      {errors.hinhAnh.message as string}
                    </Typography>
                  )}
                </Box>
              </Stack>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Stack spacing={2}>
                <FormItem
                  icon={<ContactsIcon />}
                  placeholder="Tên khoá học"
                  error={errors.tenKhoaHoc?.message}
                  control={control}
                  name="tenKhoaHoc"
                />
                <FormItem
                  icon={<CalendarMonthIcon />}
                  placeholder="Ngày tạo"
                  error={errors.ngayTao?.message}
                  control={control}
                  name="ngayTao"
                />
                <FormItem
                  icon={<VisibilityIcon />}
                  placeholder="Lượt xem"
                  error={errors.luotXem?.message}
                  control={control}
                  name="luotXem"
                />
                <FormItem
                  icon={<TextSnippetIcon />}
                  placeholder="Bí danh"
                  error={errors.biDanh?.message}
                  control={control}
                  name="biDanh"
                />
              </Stack>
            </Box>
          </Stack>
          <Box p={2}>
            <Typography
              sx={{
                padding: "0.8rem 0",
                paddingLeft: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "4px 4px 0 0",
                fontWeight: "bold",
                fontSize: "1.2rem",
                mb: 1,
                borderBottom: "1px solid #cacaca",
              }}
            >
              Mô tả khóa học
            </Typography>
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <TextField
                placeholder="Nhập mô tả"
                multiline
                rows={4}
                fullWidth
                {...control.register("moTa")}
                error={!!errors.moTa}
                helperText={errors.moTa?.message}
              />
            </Stack>
          </Box>
          <DialogActions>
            <Button
              type="submit"
              sx={{
                color: "white",
                backgroundColor: "#3fb394",
              }}
            >
              {dataEdit ? "Cập nhật" : "Thêm khoá học"}
            </Button>
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
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            width: "600px",
            maxWidth: "90vw",
          },
        }}
      >
        <DialogTitle className="text-center text-lg font-semibold">
          Chọn người dùng
        </DialogTitle>
        <DialogContent>
          <Box className="flex items-center gap-4 mb-4">
            <Select
              value={selectedUserId || ""}
              onChange={handleSelectChange}
              displayEmpty
              sx={{
                flex: 1,
                height: "40px",
                borderRadius: "4px",
              }}
            >
              <MenuItem value="">
                <Typography color="#adadad">Chọn người dùng</Typography>
              </MenuItem>
              {unenrolledUser?.map((user) => (
                <MenuItem key={user.taiKhoan} value={user.taiKhoan}>
                  {user.hoTen}
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
                handleEnrollUser(selectedCourseId, selectedUserId);
              }}
            >
              Ghi danh
            </Button>
          </Box>
          <Box className="mb-6">
            <Typography className="text-sm font-semibold mb-2">
              Học viên chờ xác thực
            </Typography>
            <Table className="border">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-center">STT</TableCell>
                  <TableCell className="font-bold text-center">
                    Tài khoản
                  </TableCell>
                  <TableCell className="font-bold text-center">
                    Học viên
                  </TableCell>
                  <TableCell className="font-bold text-center">
                    Chờ xác nhận
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedPendingUser?.map((users, index) => (
                  <TableRow key={users.biDanh}>
                    <TableCell className="text-center">
                      {startIndexPending + index + 1}
                    </TableCell>
                    <TableCell className="text-center">
                      {users.taiKhoan}
                    </TableCell>
                    <TableCell className="text-center">{users.hoTen}</TableCell>
                    <TableCell className="text-center d-flex">
                      <Box
                        sx={{
                          display: "flex",
                        }}
                      >
                        <Button
                          onClick={async () => {
                            await handleEnrollUser(
                              selectedCourseId,
                              users.taiKhoan
                            );
                          }}
                          sx={{
                            backgroundColor: "#47b094",
                            color: "white",
                            fontSize: "10px",
                            minWidth: "80px",
                            mr: 1,
                          }}
                        >
                          Xác thực
                        </Button>
                        <Button
                          onClick={async () => {
                            await handleCancelEnrollUser(
                              selectedCourseId,
                              users.taiKhoan
                            );
                          }}
                          sx={{
                            backgroundColor: "#de3442",
                            color: "white",
                            fontSize: "10px",
                          }}
                        >
                          Xoá
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {pendingUsers && pendingUsers.length > 0 && (
              <PaginationCustom
                size="small"
                count={Math.ceil((pendingUsers?.length || 0) / 2)}
                page={pendingUserListPage}
                onChange={(_event, page) => setPendingUserListPage(page)}
              />
            )}
          </Box>
          <Box>
            <Typography className="text-sm font-semibold mb-2">
              Học viên đã tham gia khoá học
            </Typography>
            <Table className="border">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold text-center">STT</TableCell>
                  <TableCell className="font-bold text-center">
                    Tài khoản
                  </TableCell>
                  <TableCell className="font-bold text-center">
                    Học viên
                  </TableCell>
                  <TableCell className="font-bold text-center">
                    Chờ xác nhận
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedEnrolledUser?.map((user, index) => (
                  <TableRow key={user.taiKhoan}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">
                      {user.taiKhoan}
                    </TableCell>
                    <TableCell className="text-center">{user.hoTen}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        onClick={() => {
                          handleCancelEnrollUser(
                            selectedCourseId,
                            user.taiKhoan
                          );
                          if (selectedCourseId) {
                            handleGetEnrolledUser(selectedCourseId);
                            handleFetchUnenrolledUser(selectedCourseId);
                          }
                        }}
                        sx={{
                          backgroundColor: "#de3442",
                          color: "white",
                          fontSize: "10px",
                        }}
                      >
                        Xoá
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {enrolledUsers && enrolledUsers.length > 0 && (
              <PaginationCustom
                size="small"
                count={Math.ceil((enrolledUsers?.length || 0) / 2)}
                page={enrolledUserListPage}
                onChange={(_event, page) => setEnrolledUserListPage(page)}
              />
            )}
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
    </div>
  );
};

export default CoursesManagement;
