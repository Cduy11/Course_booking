import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import StarIcon from '@mui/icons-material/Star';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PersonIcon from "@mui/icons-material/Person";
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
  Typography
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { courseApi } from "../../../apis/course.api";
import { QueryKeys } from "../../../constants/queryKeys";
import useOpen from "../../../hooks/useOpen";
import { CustomTableCell } from "../components/CustomTableCell";
import FormItem from "../components/FormItem/FormItem";
import AddSearchBar from "../components/HeaderBar";
import { Courses } from "../../../interfaces/courses.interface";

const CoursesManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [courseId, setCourseId] = useState(null);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [isAddOrEditDialog, setIsAddOrEditDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(true);
  const { open, handleClickOpen, onClose } = useOpen();
  const queryClient = useQueryClient();
  const pageSize = 5;
  const [totalPagesSearch, setTotalPagesSearch] = useState<number>(1);
  const [totalPagesList, setTotalPagesList] = useState<number>(1);
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
      queryClient.setQueryData([QueryKeys.LIST_COURSE, keyword, page], (oldData: any) => {
        if (!oldData) return oldData;
        const updatedItems = oldData.items
          ? oldData.items.filter((item: Courses) => item.maKhoaHoc !== courseId)
          : oldData.filter((item: any) => item.maKhoaHoc !== courseId);

        return {
          ...oldData,
          items: updatedItems,
        };
      });
    },
    onSettled: () => {
      onClose();
      setCourseId(null);
    },
  });

  const handleClose = () => {
    if (!isPending) {
      onClose();
      setCourseId(null);
    }
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

  const handleSearch = (value: string) => {
    setFlag(false);
    setKeyword(value);
    setPage(1);
  };

  return (
    <div>
      <AddSearchBar
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
                {paginatedItems.map((course, index) => (
                  <TableRow key={course.maKhoaHoc}>
                    <CustomTableCell variant="body">
                      {(page - 1) * pageSize + index + 1}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {course.maKhoaHoc}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {course.tenKhoaHoc}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      <img
                        src={course.hinhAnh}
                        alt={course.tenKhoaHoc}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {course.luotXem}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      {course.nguoiTao?.hoTen || "N/A"}
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
                            setCourseId(course.maKhoaHoc);
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
          onChange={(_, value) => setPage(value)}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              {...item}
              components={{
                previous: () => <span>{"< Trước"}</span>,
                next: () => <span>{"Sau >"}</span>,
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
          Xoá khoá học này?
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
            Bạn có chắc chắn muốn xoá khoá học này? Việc này sẽ không thể khôi
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
            onClick={handleDeleteCourse}
            autoFocus
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
        open={errorDialogOpen}
        onClose={() => setErrorDialogOpen(false)}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          },
        }}
      >
        <DialogTitle
          id="error-dialog-title"
          sx={{
            fontWeight: "bold",
            fontSize: "22px",
            color: "#D32F2F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ErrorIcon
            sx={{ marginRight: "10px", fontSize: "28px", color: "#D32F2F" }}
          />
          Lỗi
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="error-dialog-description"
            sx={{
              fontSize: "16px",
              color: "#333",
              textAlign: "center",
              padding: "10px 0",
            }}
          >
            Đã xảy ra lỗi vui lòng quay về trang chủ hoặc thử lại
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            onClick={() => setErrorDialogOpen(false)}
            autoFocus
            sx={{
              backgroundColor: "#D32F2F",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": {
                backgroundColor: "#C2185B",
              },
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "16px",
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffffff",
            animation: "fadeIn 0.3s ease-in-out",
          },
        }}
      >
        <DialogTitle
          id="success-dialog-title"
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            color: "#388E3C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <CheckCircleIcon
            sx={{ marginRight: "12px", fontSize: "36px", color: "#388E3C" }}
          />
          Thành công
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="success-dialog-description"
            sx={{
              fontSize: "16px",
              textAlign: "center",
              color: "#555",
              padding: "10px 0",
            }}
          >
            Khoá học đã được xoá thành công.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <Button
            onClick={() => setSuccessDialogOpen(false)}
            autoFocus
            sx={{
              backgroundColor: "#388E3C",
              color: "white",
              fontWeight: "bold",
              padding: "8px 24px",
              borderRadius: "30px",
              transition: "background-color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                backgroundColor: "#2c6b29",
                transform: "scale(1.05)",
              },
            }}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>

      {/* thêm khoá học ở đây */}
      <Dialog
        open={isAddOrEditDialog}
        onClose={() => setIsAddOrEditDialog(false)}
      >
        <form>
          <DialogTitle className="text-center" sx={{ fontWeight: "bold" }}>
            THÊM KHOÁ HỌC
          </DialogTitle>
          <Stack spacing={2} p={3}>
            <FormItem icon={<PersonIcon/>} placeholder="Mã khoá học"/>
            <FormItem icon={<HomeRepairServiceIcon/>} isDropdown={true} placeholder="Danh mục khoá học"/>
            <FormItem icon={<StarIcon/>} placeholder="Đánh giá"/>
          </Stack>
        </form>
      </Dialog>
    </div>
  );
};

export default CoursesManagement;
