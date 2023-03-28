import Swal from "sweetalert2";

const swalPlugin = {
    install(app) {
        app.config.globalProperties.$swal = function (message,type ="success",title = null) {
            if (type === "success") {
                title = title ? title : "Success!";
                return Swal.fire({
                    title: title,
                    icon: "success",
                    text: message,
                });
            } else if (type === "error") {
                title = title ? title : "Failed!";
                return Swal.fire({
                    title: title,
                    text: message,
                    icon: "error",
                });
            } else if (type === "delete") {
                title = title ? title : "Are you sure?";
                return Swal.fire({
                    title:title,
                    text:message,
                    type:"question",
                    icon: 'question',
                    confirmButtonColor:"#348cd4",
                    showCancelButton:!0,
                    confirmButtonText:"Yes, delete it!",
                    cancelButtonText:"No, cancel!",
                    confirmButtonClass:"btn sa-success btn-success mt-2 mr-2 px-3",
                    cancelButtonClass:"btn sa-error btn-danger ml-2 mt-2",
                    buttonsStyling:!1
                });
            }
        };
    },
};

export default swalPlugin;