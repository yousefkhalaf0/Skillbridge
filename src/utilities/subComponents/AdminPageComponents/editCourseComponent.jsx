import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import CourseForm from "./AddingCourseComponent";

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
        const courseData = courseSnap.data();

        // Fetch modules
        const modulesCollection = collection(courseRef, "modules");
        const modulesSnapshot = await getDocs(modulesCollection);
        const modulesData = await Promise.all(
          modulesSnapshot.docs.map(async (moduleDoc) => {
            const moduleData = moduleDoc.data();

            // Fetch lessons for each module
            const lessonsCollection = collection(moduleDoc.ref, "lessons");
            const lessonsSnapshot = await getDocs(lessonsCollection);
            const lessonsData = lessonsSnapshot.docs.map((lessonDoc) =>
              lessonDoc.data()
            );

            return {
              ...moduleData,
              id: moduleDoc.id,
              lessons: lessonsData,
            };
          })
        );

        setCourse({
          ...courseData,
          modules: modulesData,
        });
      } else {
        navigate("/");
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId, navigate]);

  const handleSubmit = async (updatedCourse) => {
    const courseRef = doc(db, "Courses", courseId);

    // Update the main course document
    await updateDoc(courseRef, {
      course_name: updatedCourse.course_name,
      course_nameAR: updatedCourse.course_nameAR,
      course_description: updatedCourse.course_description,
      course_descriptionAR: updatedCourse.course_descriptionAR,
      level: updatedCourse.level,
      levelAR: updatedCourse.levelAR,
      duration: updatedCourse.duration,
      durationAR: updatedCourse.durationAR,
      course_images: updatedCourse.course_images,
    });

    // Update modules and lessons
    const modulesCollection = collection(courseRef, "modules");

    // Delete existing modules and lessons
    const modulesSnapshot = await getDocs(modulesCollection);
    await Promise.all(
      modulesSnapshot.docs.map(async (moduleDoc) => {
        const lessonsCollection = collection(moduleDoc.ref, "lessons");
        const lessonsSnapshot = await getDocs(lessonsCollection);
        await Promise.all(
          lessonsSnapshot.docs.map((lessonDoc) =>
            deleteDoc(doc(lessonsCollection, lessonDoc.id))
          )
        );
        await deleteDoc(moduleDoc.ref);
      })
    );

    // Add updated modules and lessons
    for (let i = 0; i < updatedCourse.modules.length; i++) {
      const moduleData = {
        title: updatedCourse.modules[i].title,
        number: i + 1,
      };
      const moduleRef = await addDoc(modulesCollection, moduleData);

      for (let j = 0; j < updatedCourse.modules[i].lessons.length; j++) {
        const lessonData = {
          title: updatedCourse.modules[i].lessons[j].title,
          duration: updatedCourse.modules[i].lessons[j].duration,
          number: j + 1,
        };
        await addDoc(collection(moduleRef, "lessons"), lessonData);
      }
    }

    navigate(`/course/${courseId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <CourseForm course={course} onSubmit={handleSubmit} />;
};

export default EditCourse;
