import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
import {
  setCourses,
  setError,
  setLoading,
  setUserCourses,
  setUserCoursesLoading,
  setUserCoursesError,
  setAdminWatchLaterCourses,
  setAdminWatchLaterError,
  setAdminWatchLaterLoading,
} from "./redux/store";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

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
export const auth = getAuth();

export const loginAdmin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    const adminRef = doc(db, "admins", user.uid);
    await setDoc(adminRef, { email: user.email, token }, { merge: true });

    console.log("Admin logged in and token stored.");
    return token;
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    const adminRef = doc(db, "users", user.uid);
    await setDoc(adminRef, { email: user.email, token }, { merge: true });

    console.log("Admin logged in and token stored.");
    return token;
  } catch (error) {
    console.error("Login error:", error);
  }
};

const createUserDocument = async (userId, userData, isAdmin = false) => {
  const userCollection = isAdmin ? "admins" : "users ";
  const userRef = doc(db, userCollection, userId);

  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    await setDoc(userRef, userData);

    await setDoc(doc(db, userCollection, userId, "watchLaterList", "init"), {});
    await setDoc(
      doc(db, userCollection, userId, "coursesProgress", "init"),
      {}
    );
  } else {
    console.log("User already exists:", userRef.path);
  }
};
/**
 * Registers a user in Firebase Authentication and Firestore
 * @param {string} email
 * @param {string} password
 * @param {string} fullName
 * @param {boolean} isAdmin
 */
export const registerUser = async (
  email,
  password,
  fullName,
  isAdmin = false
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userAuthId = userCredential.user.uid;

    const userData = {
      user_auth_id: userAuthId,
      username: fullName,
      email: email,
      user_image_URL: "https://example.com/default-avatar.jpg",
    };
    if (isAdmin) {
      userData.students = [];
    } else {
      userData.courses = [];
    }
    await createUserDocument(userAuthId, userData, isAdmin);

    return { success: true, userAuthId };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, error: error.message };
  }
};

export const fetchData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const coursesQuerySnapshot = await getDocs(collection(db, "Courses"));
    console.log("Fetched courses:", coursesQuerySnapshot.docs.length);

    const courses = [];
    for (const courseDoc of coursesQuerySnapshot.docs) {
      const courseData = { id: courseDoc.id, ...courseDoc.data() };
      console.log("Course data:", courseData);

      const modulesQuerySnapshot = await getDocs(
        collection(db, "Courses", courseDoc.id, "modules")
      );
      const modules = [];
      for (const moduleDoc of modulesQuerySnapshot.docs) {
        const moduleData = { id: moduleDoc.id, ...moduleDoc.data() };
        console.log("Module data:", moduleData);

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
    console.error("Error fetching data:", error);
    dispatch(setError(error.message));
  }
};

export const checkIfAdmin = async (userId) => {
  const adminRef = doc(db, "admins", userId);
  const adminSnap = await getDoc(adminRef);

  return adminSnap.exists();
};

export const fetchUserCourses = (userId, isAdmin) => async (dispatch) => {
  dispatch(setUserCoursesLoading(true));
  try {
    const coursesQuerySnapshot = await getDocs(collection(db, "Courses"));
    const userCourses = [];

    coursesQuerySnapshot.forEach((courseDoc) => {
      const courseData = { id: courseDoc.id, ...courseDoc.data() };

      if (isAdmin) {
        if (courseData.course_creator_id === userId) {
          userCourses.push(courseData);
        }
      } else {
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

export const fetchAdminWatchLaterCourses = (adminId) => async (dispatch) => {
  dispatch(setAdminWatchLaterLoading(true));

  try {
    const watchLaterRef = collection(db, "admins", adminId, "whatchLaterList");
    const snapshot = await getDocs(watchLaterRef);

    if (snapshot.empty) {
      console.error("No watch later courses found for admin:", adminId);
      dispatch(setAdminWatchLaterError("No courses found."));
      return;
    }

    const watchLaterData = snapshot.docs.map((doc) => ({
      courseId: doc.data().courseId,
      addingTime: doc.data().addingTime?.toDate?.() || new Date(),
    }));

    const courses = await Promise.all(
      watchLaterData.map(async ({ courseId, addingTime }) => {
        const courseRef = doc(db, "Courses", courseId);
        const courseSnap = await getDoc(courseRef);

        if (!courseSnap.exists()) return null;

        return {
          id: courseId,
          addingTime,
          ...courseSnap.data(),
        };
      })
    );

    const validCourses = courses.filter((course) => course !== null);
  } catch (error) {
    dispatch(setAdminWatchLaterError(error.message));
  } finally {
    dispatch(setAdminWatchLaterLoading(false));
  }
};

export const removeWatchLaterCourse =
  (adminId, courseId) => async (dispatch) => {
    try {
      await deleteDoc(doc(db, "admins", adminId, "watchLater", courseId));
      dispatch(fetchAdminWatchLaterCourses(adminId));
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

export const checkUserAuthorization = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      if (user) {
        resolve(user.uid);
      } else {
        reject("User is not authorized");
      }
    });
  });
};

//to check the user :
// checkUserAuthorization()
//   .then((uid) => {
//     console.log("User is authorized. UID:", uid);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
