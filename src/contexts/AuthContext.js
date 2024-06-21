import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase-config2";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const value = { userInfo, setUserInfo };
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const docRef = query(
                    collection(db, "users"),
                    where("email", "==", user.email)
                );
                onSnapshot(docRef, (snapshot) => {
                    snapshot.forEach((doc) => {
                        setUserInfo({
                            id: doc.id,
                            ...doc.data(),
                        });
                    });
                });
                setUserInfo(user);
                console.log(userInfo);
            } else {
                setUserInfo(null);
            }
        });
    }, []);
    return (
        <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    );
};
export default AuthContext;
