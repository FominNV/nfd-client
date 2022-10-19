import { FC, MouseEvent, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store/selectors";
import { setLoading, showOrderPopup } from "store/common/actions";
import { postOrder } from "store/user/actions";
import { PATHS } from "routes/consts";
import { OrderButtonBgColor, OrderButtonBorderRadius } from "components/UI/OrderButton/types";
import OrderButton from "components/UI/OrderButton";
import { OrderStatusType } from "store/user/types";
import { OrderStepId } from "pages/OrderPage/types";
import { URLS } from "api/Axios/data";
import { ChangeOrderStatusType } from "./types";

import "./styles.scss";

const PopupOrder: FC = () => {
  const { orderStatuses } = useTypedSelector((state) => state.user);
  const { postedOrder } = useTypedSelector((state) => state.user);
  const { loading } = useTypedSelector((state) => state.common);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeOrderStatus = useCallback<ChangeOrderStatusType>(
    async (order, orderStatusId, path) => {
      dispatch(setLoading(true));
      const url = `${URLS.ORDER_URL}?statusId=${orderStatusId}`;
      await dispatch(postOrder(url as URLS, order));
      dispatch(showOrderPopup(false));
      navigate(path);
      dispatch(setLoading(false));
    },
    [navigate, dispatch],
  );

  const confirmOrder = useCallback<EventFunc<MouseEvent>>(async () => {
    if (orderStatuses.confirm && postedOrder) {
      const url = `${PATHS.ORDER}${postedOrder.id}`;
      changeOrderStatus(postedOrder, orderStatuses.confirm.id, url);
    }
  }, [orderStatuses.confirm, postedOrder, changeOrderStatus]);

  const cancelOrder = useCallback<EventFunc<MouseEvent>>(async () => {
    if (orderStatuses.cancel && postedOrder) {
      const url = `${PATHS.ORDER}${postedOrder.id}`;
      await changeOrderStatus(postedOrder, orderStatuses.cancel.id, url);
      localStorage.removeItem("nfd_ordered_id");
      navigate(PATHS.ORDER_CANCELED);
    }
  }, [orderStatuses.cancel, postedOrder, changeOrderStatus, navigate]);

  const closePopup = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(showOrderPopup(false));
  }, [dispatch]);

  const buttonName =    (postedOrder
      && postedOrder.orderStatusId.name === OrderStatusType.NEW
      && "Подтвердить")
    || "Отменить";
  const popupTitle = (params.id === OrderStepId.TOTAL && "Подтвердить заказ") || "Отменить заказ";
  const postAction =    (postedOrder
      && postedOrder.orderStatusId.name === OrderStatusType.NEW
      && confirmOrder)
    || (postedOrder
      && postedOrder.orderStatusId.name === OrderStatusType.CONFIRM
      && cancelOrder)
    || undefined;

  return (
    <div className="PopupOrder">
      <div className="PopupOrder__bacground-left" />
      <div className="PopupOrder__bacground-right" />

      <div className="PopupOrder__content">
        <div className="PopupOrder__title">{popupTitle}</div>
        <div className="PopupOrder__buttons">
          <div className="PopupOrder__buttons__confirm-cancel">
            <OrderButton
              name={buttonName}
              bgColor={OrderButtonBgColor.GREEN}
              borderRadius={OrderButtonBorderRadius.SMALL}
              disabled={loading}
              loading={loading}
              onClick={postAction}
            />
          </div>
          <div className="PopupOrder__buttons__cancel">
            <OrderButton
              name="Вернуться"
              bgColor={OrderButtonBgColor.BROWN_RED}
              borderRadius={OrderButtonBorderRadius.SMALL}
              onClick={closePopup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupOrder;
