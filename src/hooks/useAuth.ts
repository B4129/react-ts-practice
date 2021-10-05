import { useCallback, useState } from "react";
import axios from "axios";
import { User } from "../types/api/user";
import { useHistory } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useLoginUser } from "./useLoginUser";

export const useAuth = () => {
  const history = useHistory();
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();

  const [loading, setLoading] = useState(false);
  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            showMessage({ title: "ログインしました", status: "success" });
            const isAdmin = res.data.id === 10;
            setLoginUser({ ...res.data, isAdmin });
            history.push("/home");
          } else {
            showMessage({
              title: "ユーザーが見つかりません",
              status: "error",
            });
          }
          setLoading(false);
        })
        .catch(() => {
          showMessage({
            title: "ログインできません",
            status: "error",
          });
          setLoading(false);
        });
    },
    [history, setLoginUser, showMessage]
  );
  return { login, loading };
};
