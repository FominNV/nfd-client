import {
  FC, ReactNode, useCallback, useEffect, useMemo,
} from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { getPostedOrder, setOrderStatus } from "store/user/actions";
import { setLoading, setPageTitle } from "store/common/actions";
import PopupOrder from "components/Popups/PopupOrder";
import OrderLayout from "layouts/OrderLayout";
import Container from "components/Container";
import classNames from "classnames";
import { PATHS } from "routes/consts";
import { getEntities } from "store/admin/actions";
import { URLS } from "api/Axios/data";
import { AdminActionTypes, IOrderStatus } from "store/admin/types";
import OrderSideBar from "components/Sidebars/OrderSideBarBlock/OrderSideBar";
import { OrderStatusType } from "store/user/types";
import { OrderStepId } from "./types";
import { dataOrderStatuses, dataOrderSteps, dataPageTitles } from "./data";

import "./styles.scss";

const OrderPage: FC = () => {
  const { postedOrder, orderData, orderStatuses } = useTypedSelector(
    (state) => state.user,
  );
  const { orderPopup } = useTypedSelector((state) => state.common);
  const { statuses } = useTypedSelector((state) => state.admin);
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadOrderStatuses = useCallback<VoidFunc<void>>(async () => {
    await dispatch(
      getEntities(
        URLS.ORDER_STATUS_URL,
        AdminActionTypes.GET_ALL_ORDER_STATUSES,
      ),
    );
  }, [dispatch]);

  const setOrderStatuses = useCallback<VoidFunc<IOrderStatus[]>>(
    (data) => data.map((elem) => {
      dataOrderStatuses.map((item) => {
        if (item.status.toLowerCase() === elem.name.toLowerCase()) {
          dispatch(setOrderStatus(item.key, elem));
        }
      });
    }),
    [dispatch],
  );

  const loadOrder = useCallback<VoidFunc<string>>(
    async (id) => {
      dispatch(setLoading(true));
      await dispatch(getPostedOrder(id));
      dispatch(setLoading(false));
    },
    [dispatch],
  );

  const orderSteps = useMemo<ReactNode>(
    () => dataOrderSteps.map((elem, index) => {
      let blockClassName = classNames("OrderPage__step", {
        OrderPage__step_active: params.id === elem.id,
      });
      if (elem.id === OrderStepId.ORDERED && postedOrder) {
        blockClassName = classNames("OrderPage__step", {
          OrderPage__step_active: params.id === postedOrder.id.toString(),
        });
      }

      return (
        <div
          className={blockClassName}
          key={elem.id + index}
        >
          {elem.component}
        </div>
      );
    }),
    [params.id, postedOrder],
  );

  useEffect(() => {
    if (
      location.pathname !== PATHS.ORDER_PLACE
      && !orderData.pointId
      && location.pathname !== PATHS.ORDER_CANCELED
    ) {
      navigate(PATHS.ORDER_PLACE);
    }
  }, [location.pathname, postedOrder, orderData.pointId, loadOrder, navigate]);

  useEffect(() => {
    if (!statuses.all) {
      loadOrderStatuses();
    } else if (
      statuses.all
      && Object.values(orderStatuses).some((elem) => elem === null)
    ) {
      setOrderStatuses(statuses.all);
    }
  }, [
    statuses.all,
    orderStatuses,
    dispatch,
    loadOrderStatuses,
    setOrderStatuses,
  ]);

  useEffect(() => {
    dataPageTitles.map((elem) => {
      if (elem.id === params.id) dispatch(setPageTitle(elem.title));
      if (postedOrder && postedOrder.id.toString() === params.id) {
        dispatch(setPageTitle("NFD / Ваш заказ"));
      }
    });
  }, [params.id, postedOrder, dispatch]);

  useEffect(() => {
    if (
      postedOrder
      && postedOrder.orderStatusId.name === OrderStatusType.CONFIRM
      && location.pathname !== PATHS.ORDER_CANCELED
    ) {
      localStorage.setItem("nfd_ordered_id", postedOrder.id.toString());
      navigate(`${PATHS.ORDER}${postedOrder.id}`);
    } else if (!postedOrder && localStorage.getItem("nfd_ordered_id")) {
      const id = localStorage.getItem("nfd_ordered_id") as string;
      loadOrder(id);
    }
  }, [loadOrder, navigate, postedOrder]);

  const popup = useMemo<ReactNode>(
    () => orderPopup && <PopupOrder />,
    [orderPopup],
  );

  return (
    <OrderLayout>
      <div className="OrderPage">
        <Container>
          {popup}
          <div className="OrderPage__content">
            <main className="OrderPage__main">{orderSteps}</main>
            <OrderSideBar />
          </div>
        </Container>
      </div>
    </OrderLayout>
  );
};

export default OrderPage;
