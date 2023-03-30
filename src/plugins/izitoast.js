import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const iziToastPlugin = {
    install: (app) => {
        app.config.globalProperties.$toast = function (message, type = "success", title = null) {
            if (type === "success") {
                title = title ? title : "";
                return iziToast.success({
                    title: title,
                    message: message,
                    position: "bottomLeft",
                });
            } else if (type === "error") {
                title = title ? title : "";
                return iziToast.error({
                    title: title,
                    message: message,
                    position: "bottomLeft",
                });
            } else if (type === "warning") {
                title = title ? title : "";
                return iziToast.warning({
                    title: title,
                    message: message,
                    position: "bottomLeft",
                });
            } else if (type === "info") {
                title = title ? title : "";
                return iziToast.info({
                    title: title,
                    message: message,
                    position: "bottomLeft",
                });
            }
        };
    },
};

export default iziToastPlugin;