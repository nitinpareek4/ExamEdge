import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const googleProvider = new GoogleAuthProvider();

/**
 * 1. SIGN UP (Email & Password)
 */
window.signUp = async (email, password, name) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Display Name update karein
        await updateProfile(user, { displayName: name });

        // Firestore mein entry (Points 0 se start)
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name: name,
            email: email,
            points: 0,
            createdAt: new Date()
        });

        alert("Account Created! 🎉 Welcome to ExamEdge.");
        window.location.href = "pages/dashboard.html";
    } catch (err) {
        alert("Signup Error: " + err.message);
    }
};

/**
 * 2. LOGIN (Email & Password)
 */
window.login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "pages/dashboard.html";
    } catch (err) {
        alert("Login Error: " + err.message);
    }
};

/**
 * 3. GOOGLE LOGIN
 */
window.loginWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Check karein agar naya user hai toh Firestore mein add karein
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            await setDoc(docRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                points: 0,
                createdAt: new Date()
            });
        }
        window.location.href = "pages/dashboard.html";
    } catch (err) {
        alert("Google Login Failed: " + err.message);
    }
};

/**
 * 4. RESET PASSWORD (Forgot Password)
 */
window.resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent! 📧 Check your email inbox/spam.");
    } catch (err) {
        alert("Error: " + err.message);
    }
};

/**
 * 5. LOGOUT
 */
window.logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "../index.html";
    } catch (err) {
        alert("Logout Error: " + err.message);
    }
};