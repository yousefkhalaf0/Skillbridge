import React, { useState, useEffect } from 'react';
import {
    Box, Button, Grid, Typography, CircularProgress, Alert
} from '../../muiComponents.js';
import { useSelector } from 'react-redux';
import { fetchData } from "../../firebase.js";
import '../smallCourseCard/smallCourseCard.css';


export default function SmallCourseCard() {
    const theme = useSelector((state) => state.themeReducer);
    const [page, setPage] = useState(1);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const itemsPerPage = 2;

    useEffect(() => {
        const getCourses = async () => {
            try {
                const data = await fetchData();
                setCourses(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch courses. Please try again later.");
                setLoading(false);
            }
        };

        getCourses();
    }, []);

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

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                <CircularProgress sx={{ color: "#E8A710" }} />
            </Box>
        );
    }
    if (error) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Grid container spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
                {currentCourses.map((course) => (
                    <Grid item xs={12} md={6} key={course.id} sx={{ display: "flex" }}>
                        <Box
                            className={`${theme}SmallCourseCard`}
                            sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                            <Box
                                className="courseImgBox"
                                component="img"
                                src={course.course_images[0]}
                                alt="courseImg" />
                            <Grid className="courseCardRow" container spacing={2}>
                                <Grid item xs={12} sm={6} sx={{ display: "flex" }}>
                                    <Typography
                                        className={`${theme}WeeksLevelBox`}
                                        variant="caption"
                                        sx={{ marginRight: 1 }}>
                                        {course.duration}
                                    </Typography>
                                    <Typography
                                        className={`${theme}WeeksLevelBox`}
                                        variant="caption">
                                        {course.level}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    sx={{ textAlign: { xs: "left", sm: "right" } }}>
                                    <Typography className={`${theme}Vendor`} variant="subtitle1">
                                        {`By ${course.course_creator_id}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Typography className="courseTitle" variant="h5" gutterBottom>
                                {course.course_name}
                            </Typography>
                            <Typography className="courseDescription" variant="body1" sx={{ flexGrow: 1 }}>
                                {course.course_description}
                            </Typography>
                            <Button
                                className={`${theme}ExploreCourseBtn`}
                                variant="contained"
                                sx={{ textTransform: "none" }}>
                                Get it Now
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4, gap: 2 }}>
                {page > 1 && (
                    <Button
                        onClick={handlePrevious}
                        sx={{
                            textTransform: "none",
                            color: theme === "dark" ? "#fff" : "#000",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: theme === "dark" ? "#333" : "#f5f5f5",
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
                            textTransform: "none",
                            color: pageNumber === page ? "#fff" : theme === "dark" ? "#fff" : "#000",
                            backgroundColor: pageNumber === page ? "#E8A710" : "transparent",
                            borderRadius: "4px",
                            minWidth: "32px",
                            "&:hover": {
                                backgroundColor: pageNumber === page ? "#E8A710" : theme === "dark" ? "#333" : "#f5f5f5",
                            },
                        }}>
                        {pageNumber}
                    </Button>
                ))}
                {page < totalPages && (
                    <Button
                        onClick={handleNext}
                        sx={{
                            textTransform: "none",
                            color: theme === "dark" ? "#fff" : "#000",
                            backgroundColor: "transparent",
                            "&:hover": {
                                backgroundColor: theme === "dark" ? "#333" : "#f5f5f5",
                            },
                        }}>
                        Next
                    </Button>
                )}
            </Box>
        </Box>
    );
}