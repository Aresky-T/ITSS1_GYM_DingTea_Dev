import { toast } from "react-hot-toast";

export const customToast = (message, icon) => {
    return toast(message, {
        icon: icon,
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        }
    })
}