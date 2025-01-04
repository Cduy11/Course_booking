import { Box, Button, Card, Grid, MenuItem, Typography } from "@mui/material";
import CampaignIcon from "@mui/icons-material/Campaign";
import img1 from "../../../assets/613a1e8d8fc47.jpg";
import img2 from "../../../assets/Thumbnail-TAILWIND-CSS-vippro-700x369.webp";
import img3 from "../../../assets/41fdcca6-806d-4594-9e4e-061ea8705999.webp";
import img4 from "../../../assets/1702278492-Cac_component_trong_ReactJS.png";
import img5 from "../../../assets/batDongBo.jpg";
import img6 from "../../../assets/tyscript.jpg";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FavoriteIcon from "@mui/icons-material/Favorite";
import avt1 from "../../../assets/avatar2.bb9626e2.png";
import "./BlogPage.css";

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Cấu trúc cơ bản trong HTML",
      likes: [300, 500, 200],
      author: "Công Duy",
      description:
        "Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là 'timetable'. Hay dân dã hơn thì nguoi ta hay gọi là 'Lịch thường nhật',...",
      image: img1,
    },
    {
      id: 2,
      title: "Tailwind css và cách cài đặt cơ bản",
      likes: [150, 250, 100],
      author: "Công Duy",
      description:
        "Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là 'timetable'. Hay dân dã hơn thì người ta hay gọi là 'Lịch thường nhật',...",
      image: img2,
    },
    {
      id: 3,
      title: "Material UI custom theme với TypeScript",
      likes: [150, 250, 100],
      author: "Công Duy",
      description:
        "Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là 'timetable'. Hay dân dã hơn thì người ta hay gọi là 'Lịch thường nhật',...",
      image: img3,
    },
    {
      id: 4,
      title: "Cách tạo một component nhanh chóng chỉ bằng 3 ký tự",
      likes: [150, 250, 100],
      author: "Công Duy",
      description:
        "Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là 'timetable'. Hay dân dã hơn thì người ta hay gọi là 'Lịch thường nhật',...",
      image: img4,
    },
    {
      id: 5,
      title: "Xử lý bất đồng bộ trong Javascript (phần 2)",
      likes: [150, 250, 100],
      author: "Công Duy",
      description:
        "Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là 'timetable'. Hay dân dã hơn thì người ta hay gọi là 'Lịch thường nhật',...",
      image: img5,
    },
    {
      id: 6,
      title: "TyperScrip là gì, Vì sao nên dùng TyperScript",
      likes: [150, 250, 100],
      author: "Công Duy",
      description:
        "Có lẽ cũng rất lâu rồi mà tôi chưa đụng đến thứ được gọi là 'timetable'. Hay dân dã hơn thì người ta hay gọi là 'Lịch thường nhật',...",
      image: img6,
    },
  ];

  return (
    <Box className="blogPage">
      <Box className="coursePagination-title">
        <Typography variant="h4" sx={{ fontSize: "1.75rem" }}>
          Blog
        </Typography>
        <Typography sx={{ fontSize: "13px" }}>
          Thông tin công nghệ số!!!
        </Typography>
      </Box>
      <Box className="blogContent">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8} className="blogLeft">
            <Typography className="blogLeft__title">
              {" "}
              <CampaignIcon className="blogLeft__icons" /> Phù hợp với bạn
            </Typography>
            <Grid container spacing={2}>
              {blogPosts.map((post) => (
                <Grid item xs={12} sm={6} md={6} key={post.id}>
                  <Card className="cardBlog">
                    <Box className="cardBlogContent">
                      <img
                        className="imgCardBlog"
                        src={post.image}
                        alt="img"
                      ></img>
                      <Box className="contentBlog">
                        <Typography className="titleBlogCourse">
                          {post.title}
                        </Typography>
                        <Box className="timeBlogCourse">
                          <Box
                            className="reviewBlogCourse"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {post.likes.map((like, index) => (
                              <span
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginRight: "5px",
                                }}
                              >
                                {index === 0 && (
                                  <ThumbUpIcon
                                    sx={{
                                      color: "#8ad4c2",
                                      marginRight: "2px",
                                    }}
                                  />
                                )}
                                {index === 1 && (
                                  <ChatBubbleIcon
                                    sx={{
                                      color: "#8ad4c2",
                                      marginRight: "2px",
                                    }}
                                  />
                                )}
                                {index === 2 && (
                                  <FavoriteIcon
                                    sx={{
                                      color: "#8ad4c2",
                                      marginRight: "2px",
                                    }}
                                  />
                                )}
                                {like}
                              </span>
                            ))}
                          </Box>
                          <Typography>
                            Đăng bởi:{" "}
                            <Typography
                              component="span"
                              sx={{ color: "#f38daf" }}
                            >
                              {post.author}
                            </Typography>
                          </Typography>
                        </Box>
                        <Typography className="desBlogCourse">
                          {post.description.length > 100
                            ? post.description.slice(0, 100) + "..."
                            : post.description}
                        </Typography>
                        <Button className="btnBlogCourse">Xem thêm</Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4} className="blog__right">
            <Box className="cardBlogRight">
              <Box className="blogRightBox">
                <Typography variant="h6" className="titleBlogRight">
                  Các chủ đề được đề xuất
                </Typography>
                <Box className="blogMenu">
                  <MenuItem className="blogMenuName">
                    Front-end / Mobile apps
                  </MenuItem>
                  <MenuItem className="blogMenuName">BACK-END</MenuItem>
                  <MenuItem className="blogMenuName">Thư viện</MenuItem>
                  <MenuItem className="blogMenuName">
                    Chia sẻ người trong nghề
                  </MenuItem>
                  <MenuItem className="blogMenuName">Châm ngôn IT</MenuItem>
                  <MenuItem className="blogMenuName">Chủ đề khác</MenuItem>
                </Box>
              </Box>
            </Box>
            <Box className="cardBlogRight">
              <Box className="blogRightBox">
                <Typography variant="h6" className="titleBlogRight">
                  Bài đăng được đề xuất
                </Typography>
                <Box className="blogMenu">
                  <Box className="postLog">
                    <img className="imgCardBlog" src={img1} alt="img"></img>
                    <Typography
                      sx={{ paddingBottom: "10px", fontSize: "1rem" }}
                    >
                      Routing trong reactjs
                    </Typography>
                    <Typography sx={{ color: "#adadad" }}>
                      Chúng ta sẽ cùng nhau tìm hiểu cách routing trong
                      reactjs...
                    </Typography>
                    <Box
                      className="blogRightAvt"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img src={avt1} alt="avt1"></img>
                      <span style={{ marginLeft: "8px", color: "#adadad" }}>
                        Công Duy
                      </span>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
