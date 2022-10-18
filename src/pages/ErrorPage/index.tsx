import {
  FC, MouseEvent, useCallback, useEffect,
} from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setPageTitle } from "store/common/actions";
import { ReactComponent as Sadness } from "assets/icons/Page404/sadness.svg";
import { PATHS } from "routes/consts";

import "./styles.scss";

const ErrorPage: FC = () => {
  const { common } = useTypedSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setError(null));
    navigate(PATHS.MAIN);
  }, [navigate, dispatch]);

  useEffect(() => {
    dispatch(setPageTitle("NFD / Ошибка"));
  }, [dispatch]);

  const error = common.error ? `Error: ${common.error.number}` : "Error: 404";
  const message = common.error ? common.error.message : "Страница не найдена!";

  return (
    <div className="ErrorPage">
      <div className="ErrorPage__content">
        <Sadness
          width="150px"
          height="150px"
        />
        <div className="ErrorPage__error">{error}</div>
        <div className="ErrorPage__message">{message}</div>
        <button
          onClick={onClickHandler}
          className="ErrorPage__btn"
        >
          На главную
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
