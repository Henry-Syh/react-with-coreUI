import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { storge } from "src/utils";

export default function useGlobalSaveALL() {
  // 用hook方式設定全部全域變數
  const dispatch = useDispatch();

  useEffect(() => {
    // 設定全域變數
    dispatch({
      type: "UPDATE_TOKEN",
      token: storge.getStorge(storge.TOKEN_NAME),
      type: "UPDATE_USERNAME",
      userName: storge.getStorge(storge.USERNAME),
      type: "ISVERIFY",
      verify: storge.getStorge(storge.VERIFY),
      type: "POWERBOX_BOUGHT",
      pb_bought: storge.getStorge(storge.POWERBOX_BOUGHT),
      type: "LINENOTIFY",
      lineBind: storge.getStorge(storge.LINEBINDED),
    });
  });
};


export function useGlobalClearALL() {
  // 用hook方式清除全部全域變數
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "UPDATE_TOKEN",
      token: '',
      type: "UPDATE_USERNAME",
      userName: '',
      type: "ISVERIFY",
      verify: null,
      type: "POWERBOX_BOUGHT",
      pb_bought: false,
      type: "LINENOTIFY",
      lineBind: false,
    });
  });
};
