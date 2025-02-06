// import React, { useState } from 'react'
// import {
//     Box, Button, Grid, Typography, Pagination, PaginationItem
// } from '../../muiComponents.js';
// import { useSelector } from 'react-redux';
// import '../smallCourseCard/smallCourseCard.css';
// import course1_img from '../../../assets/images/course1_img.svg';
// import course2_img from '../../../assets/images/course2_img.svg';
// import course3_img from '../../../assets/images/course3_img.svg';
// import course4_img from '../../../assets/images/course4_img.svg';
// import course5_img from '../../../assets/images/course5_img.svg';
// import course6_img from '../../../assets/images/course6_img.svg';

// const courses = [
//     { img: course1_img, weeks: '4 Weeks', level: 'Beginner', vendor: 'By John Smith', courseTitle: 'Web Design Fundamentals', courseDescription: 'Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.' },
//     { img: course2_img, weeks: '6 Weeks', level: 'Intermediate', vendor: 'By Emily Johnson', courseTitle: 'UI/UX Design', courseDescription: 'Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.' },
//     { img: course3_img, weeks: '8 Weeks', level: 'Intermediate', vendor: 'By David Brown', courseTitle: 'Mobile App Development', courseDescription: 'Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.' },
//     { img: course4_img, weeks: '10 Weeks', level: 'Beginner', vendor: 'By Sarah Thompson', courseTitle: 'Graphic Design for Beginners', courseDescription: 'Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.' },
//     { img: course5_img, weeks: '10 Weeks', level: 'Intermediate', vendor: 'By Michael Adams', courseTitle: 'Front-End Web Development', courseDescription: 'Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites.' },
//     { img: course6_img, weeks: '6 Weeks', level: 'Advance', vendor: 'By Jennifer Wilson', courseTitle: 'Advanced JavaScript', courseDescription: 'Take your JavaScript skills to the next level. Explore advanced concepts like closures, prototypes, asynchronous programming, and ES6 features. Build complex applications with confidence.' }
// ];


// export default function SmallCourseCard() {
//     const theme = useSelector((state) => state.themeReducer);

//     const [page, setPage] = useState(1);
//     const itemsPerPage = 2;

//     const totalPages = Math.ceil(courses.length / itemsPerPage);

//     const currentCourses = courses.slice(
//         (page - 1) * itemsPerPage,
//         page * itemsPerPage
//     );

//     const handlePageChange = (event, value) => {
//         setPage(value);
//     };

//     return (
//         <Box>
//             <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
//                 {currentCourses.map((course, index) => (
//                     <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
//                         <Box className={`${theme}SmallCourseCard`} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
//                             <Box className='courseImgBox'
//                                 component="img"
//                                 src={course.img}
//                                 alt="courseImg" />
//                             <Grid className='courseCardRow' container spacing={2} >
//                                 <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
//                                     <Typography className={`${theme}WeeksLevelBox`} variant='caption' sx={{ marginRight: 1 }}>
//                                         {course.weeks}
//                                     </Typography>
//                                     <Typography className={`${theme}WeeksLevelBox`} variant='caption'>
//                                         {course.level}
//                                     </Typography>
//                                 </Grid>
//                                 <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
//                                     <Typography className={`${theme}Vendor`} variant='subtitle1'>
//                                         {course.vendor}
//                                     </Typography>
//                                 </Grid>
//                             </Grid>
//                             <Typography className={`courseTitle`} variant='h5' gutterBottom>
//                                 {course.courseTitle}
//                             </Typography>
//                             <Typography className={`courseDescription`} variant='body1' sx={{ flexGrow: 1 }}>
//                                 {course.courseDescription}
//                             </Typography>
//                             <Button className={`${theme}ExploreCourseBtn`} variant="contained" sx={{ textTransform: 'none' }}>
//                                 Get it Now
//                             </Button>
//                         </Box>
//                     </Grid>
//                 ))}
//             </Grid>

//             <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
//                 <Pagination
//                     count={totalPages}
//                     page={page}
//                     onChange={handlePageChange}
//                     renderItem={(item) => (
//                         <PaginationItem
//                             {...item}
//                             sx={{
//                                 margin: '0 4px',
//                                 borderRadius: '4px',
//                                 backgroundColor: item.page === page ? '#E8A710' : 'transparent',
//                                 color: item.page === page ? '#fff' : '#000',
//                                 '&:hover': {
//                                     backgroundColor: item.page === page ? '#E8A710' : '#f5f5f5',
//                                 },
//                                 '&.Mui-selected': {
//                                     backgroundColor: '#E8A710',
//                                     color: '#fff',
//                                 },
//                                 '&.MuiPaginationItem-previousNext': {
//                                     color: '#000',
//                                     backgroundColor: 'transparent',
//                                     '&:hover': {
//                                         backgroundColor: '#f5f5f5',
//                                     },
//                                 },
//                             }} />
//                     )} />
//             </Box>
//         </Box>
//     );
// }

import React, { useState } from 'react';
import {
    Box, Button, Grid, Typography
} from '../../muiComponents.js';
import { useSelector } from 'react-redux';
import '../smallCourseCard/smallCourseCard.css';
import course1_img from '../../../assets/images/course1_img.svg';
import course2_img from '../../../assets/images/course2_img.svg';
import course3_img from '../../../assets/images/course3_img.svg';
import course4_img from '../../../assets/images/course4_img.svg';
import course5_img from '../../../assets/images/course5_img.svg';
import course6_img from '../../../assets/images/course6_img.svg';

const courses = [
    { img: course1_img, weeks: '4 Weeks', level: 'Beginner', vendor: 'By John Smith', courseTitle: 'Web Design Fundamentals', courseDescription: 'Learn the fundamentals of web design, including HTML, CSS, and responsive design principles. Develop the skills to create visually appealing and user-friendly websites.' },
    { img: course2_img, weeks: '6 Weeks', level: 'Intermediate', vendor: 'By Emily Johnson', courseTitle: 'UI/UX Design', courseDescription: 'Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX). Learn design principles, wireframing, prototyping, and usability testing techniques.' },
    { img: course3_img, weeks: '8 Weeks', level: 'Intermediate', vendor: 'By David Brown', courseTitle: 'Mobile App Development', courseDescription: 'Dive into the world of mobile app development. Learn to build native iOS and Android applications using industry-leading frameworks like Swift and Kotlin.' },
    { img: course4_img, weeks: '10 Weeks', level: 'Beginner', vendor: 'By Sarah Thompson', courseTitle: 'Graphic Design for Beginners', courseDescription: 'Discover the fundamentals of graphic design, including typography, color theory, layout design, and image manipulation techniques. Create visually stunning designs for print and digital media.' },
    { img: course5_img, weeks: '10 Weeks', level: 'Intermediate', vendor: 'By Michael Adams', courseTitle: 'Front-End Web Development', courseDescription: 'Become proficient in front-end web development. Learn HTML, CSS, JavaScript, and popular frameworks like Bootstrap and React. Build interactive and responsive websites.' },
    { img: course6_img, weeks: '6 Weeks', level: 'Advance', vendor: 'By Jennifer Wilson', courseTitle: 'Advanced JavaScript', courseDescription: 'Take your JavaScript skills to the next level. Explore advanced concepts like closures, prototypes, asynchronous programming, and ES6 features. Build complex applications with confidence.' }
];

export default function SmallCourseCard() {
    const theme = useSelector((state) => state.themeReducer);
    const [page, setPage] = useState(1);
    const itemsPerPage = 2;

    const totalPages = Math.ceil(courses.length / itemsPerPage);

    const currentCourses = courses.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    const handleNext = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <Box>
            <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {currentCourses.map((course, index) => (
                    <Grid item xs={12} md={6} key={index} sx={{ display: 'flex' }}>
                        <Box className={`${theme}SmallCourseCard`} sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                            <Box className='courseImgBox'
                                component="img"
                                src={course.img}
                                alt="courseImg" />
                            <Grid className='courseCardRow' container spacing={2} >
                                <Grid item xs={12} sm={6} sx={{ display: 'flex' }}>
                                    <Typography className={`${theme}WeeksLevelBox`} variant='caption' sx={{ marginRight: 1 }}>
                                        {course.weeks}
                                    </Typography>
                                    <Typography className={`${theme}WeeksLevelBox`} variant='caption'>
                                        {course.level}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                                    <Typography className={`${theme}Vendor`} variant='subtitle1'>
                                        {course.vendor}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography className={`courseTitle`} variant='h5' gutterBottom>
                                {course.courseTitle}
                            </Typography>
                            <Typography className={`courseDescription`} variant='body1' sx={{ flexGrow: 1 }}>
                                {course.courseDescription}
                            </Typography>
                            <Button className={`${theme}ExploreCourseBtn`} variant="contained" sx={{ textTransform: 'none' }}>
                                Get it Now
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4, gap: 2 }}>
                {page > 1 && (
                    <Button
                        onClick={handlePrevious}
                        sx={{
                            textTransform: 'none',
                            color: theme === 'dark' ? '#fff' : '#000',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
                            },
                        }}>
                        Previous
                    </Button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        sx={{
                            textTransform: 'none',
                            color: pageNumber === page ? '#fff' : (theme === 'dark' ? '#fff' : '#000'),
                            backgroundColor: pageNumber === page ? '#E8A710' : 'transparent',
                            borderRadius: '4px',
                            minWidth: '32px',
                            '&:hover': {
                                backgroundColor: pageNumber === page ? '#E8A710' : (theme === 'dark' ? '#333' : '#f5f5f5'),
                            },
                        }}>
                        {pageNumber}
                    </Button>
                ))}
                {page < totalPages && (
                    <Button
                        onClick={handleNext}
                        sx={{
                            textTransform: 'none',
                            color: theme === 'dark' ? '#fff' : '#000',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5',
                            },
                        }}>
                        Next
                    </Button>
                )}
            </Box>
        </Box>
    );
}