import {
  FC, FormEvent, useCallback, useEffect, useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "store/admin/actions";
import { setLoading } from "store/common/actions";
import { useTypedSelector } from "store/selectors";
import classNames from "classnames";
import AdminButton from "components/UI/AdminButton";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import { PATHS } from "routes/consts";
import { CheckFieldType, WatchFieldType } from "./types";
import AdminInput from "../AdminInput";

import "./styles.scss";

const LoginForm: FC = () => {
  const { admin, error } = useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const [username, setUsername] = useState<string>("admin");
  const [password, setPassword] = useState<string>("password");
  const [loginError, setLoginError] = useState<Nullable<string>>(null);
  const [passwordError, setPasswordError] = useState<Nullable<string>>(null);
  const [formError, setLoginFormError] = useState<Nullable<string>>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkField = useCallback<CheckFieldType>((value, label, setState) => {
    if (!value || !value.trim()) {
      setState("Заполните поле");
      return false;
    }
    if (value.trim().length < 5) {
      setState(`${label} должен содержать 5 и более символов`);
      return false;
    }
    setState(null);
    return true;
  }, []);

  const fieldWatcher = useCallback<WatchFieldType>(
    (inputValue, errorValue, setError) => {
      if (errorValue === "Заполните поле" && inputValue.trim()) {
        setError(null);
      } else if (
        errorValue.includes("должен содержать 5 и более символов")
        && inputValue.length >= 5
      ) {
        setError(null);
      }
    },
    [],
  );

  const onSubmitHandler = useCallback<EventFunc<FormEvent>>(
    async (e) => {
      e.preventDefault();

      if (!checkField(username, "Логин", setLoginError)) return;
      if (!checkField(password, "Пароль", setPasswordError)) return;

      dispatch(setLoading(true));
      await dispatch(loginAdmin({ username, password }));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 1000);
    },
    [username, password, checkField, dispatch],
  );

  useEffect(() => {
    if (loginError) {
      fieldWatcher(username, loginError, setLoginError);
    }
  }, [username, loginError, fieldWatcher]);

  useEffect(() => {
    if (passwordError) {
      fieldWatcher(password, passwordError, setPasswordError);
    }
  }, [password, passwordError, fieldWatcher]);

  useEffect(() => {
    if (error && error.status === 401) {
      setLoginFormError("Почта или пароль введены неверно");
    } else if (error && error.status !== 401) {
      setLoginFormError(error.code);
    }
  }, [error]);

  useEffect(() => {
    if (admin) {
      setLoginFormError(null);
    }
  }, [admin]);

  const errorClassName = classNames("LoginForm__error", {
    LoginForm__error_active: formError,
  });

  return (
    <div className="LoginForm">
      <div className="LoginForm__logo">Вход</div>

      <form
        className="LoginForm__form"
        onSubmit={onSubmitHandler}
      >
        <div className={errorClassName}>{formError}</div>

        <div className="LoginForm__input">
          <AdminInput
            key="email"
            id="email"
            label="Почта"
            type="text"
            placeholder="Введите E-mail"
            value={username}
            error={loginError}
            setState={setUsername}
          />
        </div>
        <div className="LoginForm__input">
          <AdminInput
            key="password"
            id="password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
            value={password}
            error={passwordError}
            setState={setPassword}
          />
        </div>

        <div className="LoginForm__buttons">
          <button
            onClick={() => navigate(PATHS.MAIN)}
            className="LoginForm__btn-access"
          >
            Главная
          </button>
          <div className="LoginForm__btn-submit">
            <AdminButton
              name="Войти"
              bgColor={AdminButtonBgColor.BLUE}
              loading={loading}
              disabled={loading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
