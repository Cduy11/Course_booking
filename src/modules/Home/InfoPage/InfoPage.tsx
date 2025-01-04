import { Box, Grid, Typography } from "@mui/material";
import "./InfoPage.css";
import img1 from "../../../assets/img/hero-flex.553afb64.png";
import img2 from "../../../assets/img/education-hero.62147e5c.png";
import img3 from "../../../assets/img/olstudy.96378086.png";
import img4 from "../../../assets/img/students.fc2d9ab7.png";

export default function InfoPage() {
  const aboutItems = [
    {
      title: "V learning ?",
      subtitle: "Nơi hội tụ kiến thức",
      content:
        "Đây là nền tảng giảng dạy và học tập trực tuyến được xây dựng để hỗ trợ phát triển giáo dục trong thời đại công nghiệp 4.0, được xây dựng dựa trên cơ sở quan sát toàn bộ các nhu cầu cần thiết của một lớp học offline. Từ đó đáp ứng và đảm bảo cung cấp các công cụ toàn diện, dễ sử dụng cho giáo viên và học sinh, giúp tạo nên một lớp học trực tuyến thú vị và hấp dẫn.",
      img: img1,
      imgFirst: false,
    },
    {
      title: "Chương trình học V learning",
      subtitle: "Hệ thống học hàng đầu",
      content:
        "Giảng viên đều là các chuyên viên thiết kế đồ họa và giảng viên của các trường đại học danh tiếng trong thành phố: Đại học CNTT, KHTN, Bách Khoa,…Trang thiết bị phục vụ học tập đầy đủ, phòng học máy lạnh, màn hình LCD, máy cấu hình mạnh, mỗi học viên thực hành trên một máy riêng.100% các buổi học đều là thực hành trên máy tính. Đào tạo với tiêu chí: “học để làm được việc”, mang lại cho học viên những kiến thức hữu ích nhất, sát với thực tế nhất.",
      img: img2,
      imgFirst: true,
    },
    {
      title: "Tầm nhìn V learning",
      subtitle: "Đào tạo lập trình chuyên sâu",
      content:
        "Trở thành hệ thống đào tạo lập trình chuyên sâu theo nghề hàng đầu khu vực, cung cấp nhân lực có tay nghề cao, chuyên môn sâu cho sự phát triển công nghiệp phần mềm trong thời đại công nghệ số hiện nay, góp phần giúp sự phát triển của xã hội, đưa Việt Nam thành cường quốc về phát triển phần mềm.giúp người học phát triển cả tư duy, phân tích, chuyên sâu nghề nghiệp, học tập suốt đời, sẵn sàng đáp ứng mọi nhu cầu của doanh nghiệp.",
      img: img3,
      imgFirst: false,
    },
    {
      title: "Sứ mệnh V learning",
      subtitle: "Phương pháp đào tạo hiện đại",
      content:
        "Sử dụng các phương pháp đào tạo tiên tiến và hiện đại trên nền tảng công nghệ giáo dục, kết hợp phương pháp truyền thống, phương pháp trực tuyến, lớp học đảo ngược và học tập dựa trên dự án thực tế, phối hợp giữa đội ngũ training nhiều kinh nghiệm và yêu cầu từ các công ty, doanh nghiệp. Qua đó, V learning giúp người học phát triển cả tư duy, phân tích, chuyên sâu nghề nghiệp, học tập suốt đời, sẵn sàng đáp ứng mọi nhu cầu của doanh nghiệp.",
      img: img4,
      imgFirst: true,
    },
  ];
  return (
    <Box className="about">
      <Box className="sliderAbout">
        <Box className="sliderContentAbout">
          <Typography variant="h6">V learning học là vui</Typography>
          <Typography variant="h4">
            Cùng nhau khám phá nhưng điều mới mẻ
          </Typography>
          <Typography variant="h5">Học đi đôi với hành</Typography>
        </Box>
      </Box>
      {aboutItems.map((item, index) => (
        <Box className="aboutItem" key={index}>
          <Grid container spacing={2}>
            {item.imgFirst ? (
              <>
                <Grid item xs={12} sm={6} md={6} className="contentItemImg">
                  <img src={item.img} alt={`image${index + 1}`}></img>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="contentItemAbout">
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h5">{item.subtitle}</Typography>
                  <Typography variant="h4">
                    {" "}
                    <span className="firstLetter">
                      {item.content.charAt(0)}
                    </span>
                    {item.content.slice(1)}
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6} md={6} className="contentItemAbout">
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="h5">{item.subtitle}</Typography>
                  <Typography variant="h4">
                    {" "}
                    <span className="firstLetter">
                      {item.content.charAt(0)}
                    </span>
                    {item.content.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={6} className="contentItemImg">
                  <img src={item.img} alt={`image${index + 1}`}></img>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
