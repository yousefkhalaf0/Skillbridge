import React from "react";
import {
  Box,
  Grid,
  Typography,
  ArrowOutwardIcon,
} from "../../muiComponents.js";
import { useSelector } from "react-redux";
import "../benefitsCard/benefitsCard.css";

const benefits = [
  {
    num: "01",
    title: "Flexible Learning Schedule",
    titleAR: "جدول تعليمي مرن",
    description:
      "Fit your coursework around your existing commitments and obligations.",
    descriptionAR: "ضع دوراتك الدراسية حول التزاماتك والالتزامات الحالية.",
  },
  {
    num: "02",
    title: "Expert Instruction",
    titleAR: "تعليم خبير",
    description:
      "Learn from industry experts who have hands-on experience in design and development.",
    descriptionAR:
      "تعلم من خبراء الصناعة الذين لديهم خبرة عملية في التصميم والتطوير.",
  },
  {
    num: "03",
    title: "Diverse Course Offerings",
    titleAR: "عروض دورات متنوعة",
    description:
      "Explore a wide range of design and development courses covering various topics.",
    descriptionAR:
      "استكشف مجموعة واسعة من دورات التصميم والتطوير تغطي مواضيع مختلفة.",
  },
  {
    num: "04",
    title: "Updated Curriculum",
    titleAR: "منهج دراسي محدث",
    description:
      "Access courses with up-to-date content reflecting the latest trends and industry practices.",
    descriptionAR:
      "احصل على دورات تحتوي على محتوى محدث يعكس أحدث الاتجاهات والممارسات الصناعية.",
  },
  {
    num: "05",
    title: "Practical Projects and Assignments",
    titleAR: "مشاريع ومهام عملية",
    description:
      "Develop a portfolio showcasing your skills and abilities to potential employers.",
    descriptionAR:
      "قم بتطوير محفظة تعرض مهاراتك وقدراتك لأصحاب العمل المحتملين.",
  },
  {
    num: "06",
    title: "Interactive Learning Environment",
    titleAR: "بيئة تعليمية تفاعلية",
    description:
      "Collaborate with fellow learners, exchanging ideas and feedback to enhance your understanding.",
    descriptionAR:
      "تعاون مع زملائك المتعلمين، وتبادل الأفكار والتغذية الراجعة لتعزيز فهمك.",
  },
];

export default function BenefitsCard({ showAll }) {
  const theme = useSelector((state) => state.themeReducer);
  const lang = useSelector((state) => state.languageReducer);

  return (
    <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
      {benefits
        .slice(0, showAll ? benefits.length : 3)
        .map((benefit, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index} sx={{ display: "flex" }}>
            <Box
              className={`${theme}BenefitsCard`}
              sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
            >
              <Typography
                className={`benefitsCardText cardTitle`}
                variant="h2"
                gutterBottom
              >
                {benefit.num}
              </Typography>
              <Typography
                className={`benefitsCardText`}
                variant="h6"
                gutterBottom
              >
                {lang == "en" ? benefit.title : benefit.titleAR}
              </Typography>
              <Typography
                className={`benefitsCardSubText`}
                variant="subtitle1"
                sx={{ flexGrow: 1 }}
              >
                {lang == "en" ? benefit.description : benefit.descriptionAR}
              </Typography>
              <Box className={`benefitsCardBtnBox`}>
                <ArrowOutwardIcon />
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
}
