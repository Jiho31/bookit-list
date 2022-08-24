import React, { useState } from "react";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { addUserInfo } from "redux/users";
import { useDispatch } from "react-redux";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // login
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const addUsers = (userId) => {
    const userObj = {
      id: userId,
      bookshelves: [],
      memos: [],
    };

    // check if user object exists in local storage (later change to database)
    // and add newly logged in user info
    if (localStorage.getItem("bookitListUsers")) {
      const { ids, entities } = JSON.parse(
        localStorage.getItem("bookitListUser")
      );

      localStorage.setItem(
        "bookitListUsers",
        JSON.stringify({
          ids: [...ids, userId],
          entities: {
            ...entities,
            userObj,
          },
        })
      );
    } else {
      const users = {
        ids: [userId],
        entities: {
          userObj,
        },
      };
      localStorage.setItem("bookitListUsers", JSON.stringify(users));
    }

    // add user object to redux store
    dispatch(addUserInfo(userObj));
  };

  const onSocialClick = async (e) => {
    const {
      target: { name },
    } = e;
    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    console.log(provider);
    const data = await signInWithPopup(authService, provider);
    console.log(data); // data.user.uid

    // firebase에서 users 컬렉션 불러와서 아이디 추가

    // redux 스토어에 users 객체 생성
    addUsers(data.user.uid);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={onChangeHandler}
          value={email}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onChangeHandler}
          value={password}
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
}

export default Auth;
