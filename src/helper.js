import Swal from 'sweetalert2'

export const apiBaseURL = 'http://127.0.0.1:8000/api/';
export function swalError(message,title = "Failed!") {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'error'
    })
}
export function swalSuccess(message,title = "Success!") {
    return Swal.fire({
        title: title,
        icon: 'success',
        text: message
    })
}
