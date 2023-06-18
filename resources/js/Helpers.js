import iziToast from 'iziToast'
import 'iziToast/dist/css/iziToast.css';
import { fadeIn } from 'animate.css'

export function showSznNotification(params) {
    return iziToast.show({
        title: params.title ? params.title : '',
        message: params.message,
        messageSize: 14,
        position: 'topRight',
        theme: 'ligth',
        pauseOnHover: true,
        color: params.type == 'success' ? '#ffffff ' : '#ffffff ',
        messageColor: params.type == 'success' ? '#1bcfb4 ' : '#fe7c96',
        icon: params.type == 'success' ? 'mdi mdi-check' : 'mdi mdi-alert-circle-outline'
    });
}


