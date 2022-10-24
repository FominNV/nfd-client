import Button from "components/UI/AdminButton";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import { FC, MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setError } from "store/admin/actions";
import { useTypedSelector } from "store/selectors";

import "./styles.scss";

const Error: FC = () => {
  const { error } = useTypedSelector((state) => state.admin);
  const dispatch = useDispatch();

  const clearError = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(setError(null));
  }, [dispatch]);

  const errorMessage = error && error.message;
  const errorCode = error && error.code;

  return (
    <div className="Error">
      <div className="Error__content">
        <div className="Error__error-number">{errorMessage}</div>
        <div className="Error__code">{errorCode}</div>
        <div className="Error__text">Попробуйте перезагрузить страницу</div>
        <div className="Error__btn">
          <Button
            name="Назад"
            bgColor={AdminButtonBgColor.BLUE}
            onClick={clearError}
          />
        </div>
      </div>
    </div>
  );
};

export default Error;
