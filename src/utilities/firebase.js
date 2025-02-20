import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  documentId,
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
export const db = getFirestore(app);
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

const createUserDocument = async (userId, userData, isAdmin) => {
  const userCollection = isAdmin ? "admins" : "users";
  const userRef = doc(db, userCollection, userId);

  const userSnapshot = await getDoc(userRef);
  if (!userSnapshot.exists()) {
    await setDoc(userRef, userData);

    await setDoc(doc(db, userCollection, userId, "watchLaterList"));
    await setDoc(doc(db, userCollection, userId, "coursesProgress"), {});
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
      courses_completed: 0,
      courses_in_progress: 0,
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

export const fetchData = (callback) => {
  return onSnapshot(collection(db, "Courses"), (coursesSnapshot) => {
    console.log("Courses updated:", coursesSnapshot.docs.length);

    const courses = [];
    coursesSnapshot.forEach((courseDoc) => {
      const courseData = { id: courseDoc.id, ...courseDoc.data() };
      console.log("Course data:", courseData);

      // Listen for real-time updates in modules
      const modulesUnsub = onSnapshot(
        collection(db, "Courses", courseDoc.id, "modules"),
        (modulesSnapshot) => {
          const modules = [];
          modulesSnapshot.forEach((moduleDoc) => {
            const moduleData = { id: moduleDoc.id, ...moduleDoc.data() };
            console.log("Module data:", moduleData);

            // Listen for real-time updates in lessons
            const lessonsUnsub = onSnapshot(
              collection(
                db,
                "Courses",
                courseDoc.id,
                "modules",
                moduleDoc.id,
                "lessons"
              ),
              (lessonsSnapshot) => {
                moduleData.lessons = lessonsSnapshot.docs.map((lessonDoc) => ({
                  id: lessonDoc.id,
                  ...lessonDoc.data(),
                }));
                console.log("Updated module with lessons:", moduleData);
              }
            );

            modules.push(moduleData);
          });

          courseData.modules = modules;
          callback([...courses]); // Update UI with new data
        }
      );

      courses.push(courseData);
    });

    callback(courses); // Initial callback update
  });
};
export const checkIfAdmin = async (userId) => {
  const userDoc = await getDoc(doc(db, "admins", userId));
  return userDoc.exists();
};

export const fetchUserCourses = (userId, isAdmin) => async (dispatch) => {
  dispatch(setUserCoursesLoading(true));

  try {
    console.log("Fetching courses for user:", userId, "Admin:", isAdmin);

    let userCourses = [];

    if (isAdmin) {
      // If user is an admin, fetch courses they created
      const coursesQuery = query(
        collection(db, "Courses"),
        where("course_creator_id", "==", userId)
      );
      const coursesQuerySnapshot = await getDocs(coursesQuery);
      userCourses = coursesQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } else {
      // Fetch the user's document to get enrolled courses
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const enrolledCourseIds = userData.courses || [];

        console.log("User's enrolled courses:", enrolledCourseIds);

        if (enrolledCourseIds.length > 0) {
          // Fetch courses where the ID matches enrolled courses
          const coursesQuery = query(
            collection(db, "Courses"),
            where(documentId(), "in", enrolledCourseIds)
          );
          const coursesQuerySnapshot = await getDocs(coursesQuery);
          userCourses = coursesQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
        }
      } else {
        console.error("User document not found");
      }
    }

    console.log("Fetched courses:", userCourses);
    dispatch(setUserCourses(userCourses));
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    dispatch(setUserCoursesError(error.message));
  }
};

export const fetchAdminWatchLaterCourses =
  (adminId, isAdmin) => async (dispatch) => {
    dispatch(setAdminWatchLaterLoading(true));

    try {
      // Determine the correct collection path based on user role
      const watchLaterRef = isAdmin
        ? collection(db, "admins", adminId, "watchLaterList")
        : collection(db, "users", adminId, "watchLaterList");

      console.log("Fetching watch later list from:", watchLaterRef.path);

      const snapshot = await getDocs(watchLaterRef);
      if (snapshot.empty) {
        console.error("No watch later courses found for user:", adminId);
        dispatch(setAdminWatchLaterError("No courses found."));
        return;
      }

      // Log the fetched documents
      console.log("Fetched watch later documents:", snapshot.docs);

      // Extract course IDs and adding time
      const watchLaterData = snapshot.docs.map((doc) => ({
        courseId: doc.data().courseId,
        addingTime:
          doc.data().addingTime?.toDate?.().toISOString() ||
          new Date().toISOString(),
      }));

      console.log("Watch later data:", watchLaterData);

      // Fetch actual course details
      const courses = await Promise.all(
        watchLaterData.map(async ({ courseId, addingTime }) => {
          const courseRef = doc(db, "Courses", courseId);
          const courseSnap = await getDoc(courseRef);
          if (!courseSnap.exists()) {
            console.error("Course not found:", courseId);
            return null;
          }
          return {
            id: courseId,
            addingTime,
            ...courseSnap.data(),
          };
        })
      );

      // Remove null values (courses that no longer exist)
      const validCourses = courses.filter((course) => course !== null);
      console.log("Valid courses:", validCourses);

      dispatch(setAdminWatchLaterCourses(validCourses));
    } catch (error) {
      console.error("Error fetching watch later courses:", error);
      dispatch(setAdminWatchLaterError(error.message));
    } finally {
      dispatch(setAdminWatchLaterLoading(false));
    }
  };

export const removeWatchLaterCourse =
  (adminId, courseId, isAdmin) => async (dispatch) => {
    try {
      await deleteDoc(
        isAdmin
          ? doc(db, "admins", adminId, "watchLaterList", courseId)
          : doc(db, "users", adminId, "watchLaterList", courseId)
      );
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
export const fetchUserData = async (userId, isAdmin) => {
  try {
    const userRef = doc(db, isAdmin ? "admins" : "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error("User data not found");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export { getDoc, updateDoc, doc };
