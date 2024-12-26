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
import { courseApi } from "../../../apis/course.api";
import { QueryKeys } from "../../../constants/queryKeys";
import { CustomTableCell } from "../components/CustomTableCell";
import AddSearchBar from "../components/HeaderBar";

const CoursesManagement: React.FC = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [flag, setFlag] = useState(true);
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
                  <CustomTableCell>STT</CustomTableCell>
                  <CustomTableCell>Mã khoá học</CustomTableCell>
                  <CustomTableCell>Tên khoá học</CustomTableCell>
                  <CustomTableCell>Hình ảnh</CustomTableCell>
                  <CustomTableCell>Lượt xem</CustomTableCell>
                  <CustomTableCell>Người tạo</CustomTableCell>
                  <CustomTableCell>⚙</CustomTableCell>
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
                      {course.nguoiTao?.hoTen}
                    </CustomTableCell>
                    <CustomTableCell variant="body">
                      <Box
                        sx={{ display: "flex", justifyContent: "space-around" }}
                      >
                        <Button
                          sx={{ backgroundColor: "#47b094", color: "white" }}
                        >
                          Ghi danh
                        </Button>
                        <Button
                          sx={{ backgroundColor: "#fcc205", color: "black" }}
                        >
                          Sửa
                        </Button>
                        <Button
                          sx={{ backgroundColor: "#e13346", color: "white" }}
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
    </div>
  );
};

export default CoursesManagement;
