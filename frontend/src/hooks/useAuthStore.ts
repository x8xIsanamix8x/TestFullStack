import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { onLogin, onLogout } from "../store/auth/authSlice";

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch();

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          dispatch(onLogout("Token no encontrado"));
        } else {
          console.log("Token encontrado, se debería llamar a onLogin si es válido");
        }
      };

      const startLogin = (data) => {
        if (!data) return;
        dispatch( onLogin({ 
            name: data?.name, 
            lastName: data?.lastName, 
            uid: data?.uid, 
            token: data?.token,
            role: data?.role 
        }))
      };

      const startLogout = () => {
        dispatch(onLogout("Token no encontrado"));
      }

  

    return {
        status,
        user,
        errorMessage,

        checkAuthToken,
        startLogin,
        startLogout,
    };
};
