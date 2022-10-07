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
import styled from "styled-components";
import Button from "components/Button";

function Auth() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "email") {
      setEmail(value);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      let data;

      /*
      // 회원가입
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );

        setNewAccount(false);
      } else {
        // 로그인
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      */

      // 로그인 요청
      data = await signInWithEmailAndPassword(authService, email, password);

      // console.log(data);
    } catch (err) {
      // setError(err.message);
      setError("🥺 올바른 이메일주소와 비밀번호를 입력하세요!");
    }
  };

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
    const data = await signInWithPopup(authService, provider);
    // console.log(data); // data.user.uid

    // firebase에서 users 컬렉션 불러와서 아이디 추가

    // redux 스토어에 users 객체 생성
    addUsers(data.user.uid);
  };

  return (
    <AuthWrapper>
      <LogoWrapper>
        <img src={process.env.PUBLIC_URL + "logo.png"} alt="logo icon" />
      </LogoWrapper>

      <LoginContainer>
        <h1>
          로그인/회원가입 후<br /> 이용하세요!
        </h1>
        <LoginForm onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="email"
            placeholder="이메일을 입력해주세요"
            onChange={onChangeHandler}
            value={email}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeHandler}
            value={password}
            required
          />
          <Button type="submit">로그인</Button>
          <ErrorMessage>{error}</ErrorMessage>
        </LoginForm>
        <SocialLoginButtons>
          <Button
            name="google"
            onClick={onSocialClick}
            backgroundColor="#d9d9d9"
            color="#000"
          >
            Google 계정으로 로그인
          </Button>
          <Button
            name="github"
            onClick={onSocialClick}
            backgroundColor="#d9d9d9"
            color="#000"
          >
            Github 계정으로 로그인
          </Button>
        </SocialLoginButtons>
      </LoginContainer>
    </AuthWrapper>
  );
}

const AuthWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoWrapper = styled.div`
  margin: 70px 0;

  img {
    width: 200px;
    height: auto;
  }
`;

const LoginContainer = styled.section`
  width: 400px;
  height: min-content;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 8px 24px 0px #959da533;
  padding: 0 10px;

  h1 {
    font-size: 22px;
    font-weight: 700;
    text-align: center;
    line-height: 24px;
    padding: 40px 0;
  }
  button {
    height: 46px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    height: 46px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 10px 15px;
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

const SocialLoginButtons = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 30px;

  button {
    width: calc((100% - 10px) / 2);
  }
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
  padding: 6px 0;
`;

export default Auth;
