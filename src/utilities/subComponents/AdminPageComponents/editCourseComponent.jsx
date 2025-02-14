import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import CourseForm from "./CourseForm";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      const courseRef = doc(db, "Courses", courseId);
      const courseSnap = await getDoc(courseRef);

      if (courseSnap.exists()) {
        setCourse(courseSnap.data());
      } else {
        navigate("/");
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId, navigate]);

  const handleSubmit = async (updatedCourse) => {
    const courseRef = doc(db, "Courses", courseId);
    await updateDoc(courseRef, updatedCourse);
    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <CourseForm course={course} onSubmit={handleSubmit} />;
};

export default EditCourse;
