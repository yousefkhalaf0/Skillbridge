import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc, setDoc, getDoc
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import { setCourses, setError, setLoading,setUserCourses,setUserCoursesLoading,setUserCoursesError } from "./redux/store";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDS4UtLzEMaMZezI1rzYlgK1zXBPSgkXhk",
  authDomain: "teachoo.firebaseapp.com",
  projectId: "teachoo",
  storageBucket: "teachoo.firebasestorage.app",
  messagingSenderId: "680716096200",
  appId: "1:680716096200:web:07539307cf334977b98bfd",
  measurementId: "G-5DCH45KZEB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();


export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken(); // Get token

    // Store the token in Firestore under the admin's document
    const adminRef = doc(db, "admins", user.uid);
    await setDoc(adminRef, { email: user.email, token }, { merge: true });

    console.log("Admin logged in and token stored.");
    return token; // Return token for further use
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken(); // Get token

    // Store the token in Firestore under the admin's document
    const adminRef = doc(db, "users", user.uid);
    await setDoc(adminRef, { email: user.email, token }, { merge: true });

    console.log("Admin logged in and token stored.");
    return token; // Return token for further use
  } catch (error) {
    console.error("Login error:", error);
  }
};
export const fetchData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const coursesQuerySnapshot = await getDocs(collection(db, "Courses"));
    const courses = [];
    for (const courseDoc of coursesQuerySnapshot.docs) {
      const courseData = { id: courseDoc.id, ...courseDoc.data() };
      const modulesQuerySnapshot = await getDocs(
        collection(db, "Courses", courseDoc.id, "modules")
      );
      const modules = [];
      for (const moduleDoc of modulesQuerySnapshot.docs) {
        const moduleData = { id: moduleDoc.id, ...moduleDoc.data() };
        const lessonsQuerySnapshot = await getDocs(
          collection(
            db,
            "Courses",
            courseDoc.id,
            "modules",
            moduleDoc.id,
            "lessons"
          )
        );
        const lessons = lessonsQuerySnapshot.docs.map((lessonDoc) => ({
          id: lessonDoc.id,
          ...lessonDoc.data(),
        }));
        moduleData.lessons = lessons;
        modules.push(moduleData);
      }
      courseData.modules = modules;
      courses.push(courseData);
    }
    dispatch(setCourses(courses));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

//admin cycle API'S
export const checkIfAdmin = async (userId) => {
  const adminRef = doc(db, "admins", userId);
  const adminSnap = await getDoc(adminRef);

  return adminSnap.exists(); // Returns true if the user is an admin
};

export const fetchUserCourses = (userId, isAdmin) => async (dispatch) => {
  dispatch(setUserCoursesLoading(true));
  try {
    const coursesQuerySnapshot = await getDocs(collection(db, "Courses"));
    const userCourses = [];

    coursesQuerySnapshot.forEach((courseDoc) => {
      const courseData = { id: courseDoc.id, ...courseDoc.data() };

      if (isAdmin) {
        // Admin: Fetch only their created courses
        if (courseData.course_creator_id === userId) {
          userCourses.push(courseData);
        }
      } else {
        // Regular User: Fetch all enrolled courses
        if (courseData.enrolled_users?.includes(userId)) {
          userCourses.push(courseData);
        }
      }
    });

    dispatch(setUserCourses(userCourses));
  } catch (error) {
    dispatch(setUserCoursesError(error.message));
  }
};
export const fetchAdminWatchlaterCourses = () => async (dispatch) => {


};
