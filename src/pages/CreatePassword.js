import React, { Fragment, useState } from "react";
import Header from "../layouts/Header";
import InputPlaceholdrEffec from "../components/inputs/InputPlaceholdrEffec";
import { ButtonRed } from "../components/buttons";
import Footer from "../layouts/Footer";
import axios from "axios";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    setDoc,
    doc,
    Timestamp,
    onSnapshot,
    where,
    collection,
    query,
    getDocs,
} from "firebase/firestore";
const CreatePassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const regexEmail =
        // eslint-disable-next-line no-control-regex
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    const errorEmail = "Email invalid";
    const regexPassword = /^.{6,60}$/;
    const errorPassword = "Password should be between 6 and 60 characters";
    const handleCreateAndSignIn = async () => {
        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in
        //         setError("Email already exists.");
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         if (errorCode === "auth/user-not-found") {
        //             createUserWithEmailAndPassword(auth, email, password)
        //                 .then((userCredential) => {
        //                     const user = userCredential.user;
        //                     user.displayName = email;
        //                     const id = user.uid;
        //                     setDoc(doc(db, "users", id), {
        //                         account: email,
        //                         password: password,
        //                         createAt: Timestamp.fromDate(new Date()),
        //                         updateAt: Timestamp.fromDate(new Date()),
        //                     })
        //                         .then(() => {
        //                             console.log("User added to Firestore");
        //                         })
        //                         .catch((error) => {
        //                             console.error(
        //                                 "Error adding user to Firestore: ",
        //                                 error
        //                             );
        //                         });
        //                 })
        //                 .catch((createError) => {
        //                     setError(createError.message);
        //                 });
        //         }
        //     });
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         const user = userCredential.user;
        //         user.displayName = email;
        //         const id = user.uid;
        //         setDoc(doc(db, "users", id), {
        //             account: email,
        //             password: password,
        //             createAt: Timestamp.fromDate(new Date()),
        //             updateAt: Timestamp.fromDate(new Date()),
        //         })
        //             .then(() => {
        //                 console.log("User added to Firestore");
        //             })
        //             .catch((error) => {
        //                 console.error(
        //                     "Error adding user to Firestore: ",
        //                     error
        //                 );
        //             });
        //     })
        //     .catch((createError) => {
        //         setError(createError.message);
        //     });

        const q = query(collection(db, "users"), where("account", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            toast.error("Tài khoản đã tồn tại");
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    user.displayName = email;
                    const id = user.uid;
                    setDoc(doc(db, "users", id), {
                        account: email,
                        password: password,
                        createAt: Timestamp.fromDate(new Date()),
                        updateAt: Timestamp.fromDate(new Date()),
                    })
                        .then(() => {
                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed in
                                    const user = userCredential.user;
                                    window.location.href = "/home";
                                    // ...
                                })
                                .catch((errorSignIn) => {
                                    const errorSignInCode = errorSignIn.code;
                                    const errorSignInMessage =
                                        errorSignIn.message;
                                });
                        })
                        .catch((error) => {
                            console.error(
                                "Error adding user to Firestore: ",
                                error
                            );
                        });
                })
                .catch((createError) => {
                    setError(createError.message);
                });
        }
    };
    return (
        <div className="relative">
            <ToastContainer></ToastContainer>
            <Header></Header>
            <div className="pt-10 border-t-2 text-gray-950">
                <form className="w-[400px] mx-auto">
                    <h3 className="text-[40px] font-semibold">
                        Create a password to start your membership
                    </h3>
                    <p className="my-4 text-xl text-gray-500">
                        Just a few more steps and you're done! <br /> We hate
                        paperwork, too.
                    </p>
                    <InputPlaceholdrEffec
                        paddingNum={10}
                        width={"400px"}
                        placeHolder={"Email"}
                        textSizeNum={20}
                        regex={regexEmail}
                        errorNoti={errorEmail}
                        classNameSub={" bg-[#eee!important] outline-black"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></InputPlaceholdrEffec>
                    <div className="mt-14"></div>
                    <InputPlaceholdrEffec
                        paddingNum={10}
                        width={"400px"}
                        placeHolder={"Password"}
                        textSizeNum={20}
                        regex={regexPassword}
                        errorNoti={errorPassword}
                        classNameSub={" bg-[#eee!important] outline-black"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></InputPlaceholdrEffec>

                    <ButtonRed
                        classNameSub={
                            "mt-16 text-[20px] " +
                            (regexEmail.test(email) &&
                            regexPassword.test(password)
                                ? ""
                                : "opacity-50")
                        }
                        padding={20}
                        width={"100%"}
                        type="button"
                        handleClick={() => handleCreateAndSignIn()}
                        disabled={
                            regexEmail.test(email) &&
                            regexPassword.test(password)
                                ? false
                                : true
                        }
                    >
                        NEXT
                    </ButtonRed>
                </form>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default CreatePassword;
