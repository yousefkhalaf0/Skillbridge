import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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


// Fetch courses and their modules data from Firestore
const fetchData = async () => {
    try {
        const coursesQuerySnapshot = await getDocs(collection(db, "Courses"));
        const courses = [];

        for (const courseDoc of coursesQuerySnapshot.docs) {
            const courseData = { id: courseDoc.id, ...courseDoc.data() };

            const modulesQuerySnapshot = await getDocs(
                collection(db, "Courses", courseDoc.id, "modules")
            );

            const modules = modulesQuerySnapshot.docs.map((moduleDoc) => ({
                id: moduleDoc.id,
                ...moduleDoc.data(),
            }));

            courseData.modules = modules;
            courses.push(courseData);
        }

        return courses;
    } catch (error) {
        throw error;
    }
};

export { fetchData };