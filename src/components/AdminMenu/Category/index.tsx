import { URLS } from "api/Axios/data";
import Button from "components/UI/AdminButton";
import { AdminButtonBgColor } from "components/UI/AdminButton/types";
import AdminTable from "components/UI/AdminTable";
import {
  FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import { useDispatch } from "react-redux";
import { getEntities } from "store/admin/actions";
import { AdminActionTypes, AdminMenu } from "store/admin/types";
import { setAdminPopup, setLoading } from "store/common/actions";
import { PopupConfigMode, PopupEntityMode } from "store/common/types";
import { useTypedSelector } from "store/selectors";
import { dataAdminTableColgroup, dataAdminTableHeads } from "./data";

import "./styles.scss";

const Category: FC = () => {
  const { adminToken, categories, adminMenu } = useTypedSelector((state) => state.admin);
  const { loading } = useTypedSelector((state) => state.common);
  const [tableScrollTop, setAdminTableScrollTop] = useState<number>(0);
  const [currentAdminTableScrollTop, setCurrentAdminTableScrollTop] = useState<number>(0);
  const dispatch = useDispatch();

  const loadCategories = useCallback<VoidFunc<void>>(async () => {
    dispatch(setLoading(true));
    await dispatch(getEntities(URLS.CATEGORY_URL, AdminActionTypes.GET_ALL_CATEGORIES));
    dispatch(setLoading(false));
  }, [dispatch]);

  const configCategory = useCallback<VoidFunc<number>>((id) => {
    setCurrentAdminTableScrollTop(tableScrollTop);
    dispatch(setAdminPopup({
      configMode: PopupConfigMode.UPDATE,
      entityMode: PopupEntityMode.CATEGORY,
      id,
    }));
  }, [tableScrollTop, dispatch]);

  const addCategory = useCallback<EventFunc<MouseEvent>>(() => {
    setCurrentAdminTableScrollTop(2000);
    dispatch(setAdminPopup({
      configMode: PopupConfigMode.CREATE,
      entityMode: PopupEntityMode.CATEGORY,
      id: null,
    }));
  }, [dispatch]);

  useEffect(() => {
    if (!categories.all && adminToken && adminMenu === AdminMenu.CATEGORY) {
      loadCategories();
    }
  }, [categories.all, adminToken, adminMenu, loadCategories]);

  useEffect(() => {
    if (categories.updated !== null) {
      loadCategories();
    }
  }, [categories.updated, loadCategories]);

  const result = useMemo<ReactNode>(
    () => !loading
      && categories.all && (
      <div className="Menu__result">
        Всего:
        {categories.all.length}
      </div>
    ),
    [loading, categories.all],
  );

  const dataTBody = useMemo<Nullable<string[][]>>(
    () => {
      if (categories.all) {
        const data: string[][] = [[]];
        categories.all.forEach((elem) => {
          data.push([elem.id.toString(), elem.name, elem.description]);
        });
        return data.sort((a, b) => a[1].localeCompare(b[1]));
      }
      return null;
    },
    [categories.all],
  );

  const addCategoryButton = useMemo<ReactNode>(
    () => !loading && (
    <div className="Menu__btn-add">
      <Button
        name="Добавить"
        bgColor={AdminButtonBgColor.BLUE}
        onClick={addCategory}
      />
    </div>
    ),
    [loading, addCategory],
  );

  return (
    <div className="Menu">
      <div className="Menu__header">
        {result}
        {addCategoryButton}
      </div>

      <div className="Menu__table">
        <AdminTable
          dataThead={dataAdminTableHeads}
          dataTbody={dataTBody}
          dataColgroup={dataAdminTableColgroup}
          loading={loading}
          scrollTop={currentAdminTableScrollTop}
          setScroll={setAdminTableScrollTop}
          callback={configCategory}
        />
      </div>
    </div>
  );
};

export default Category;
