import toast from "react-hot-toast";

export class Notification {
  static success(message: string) {
    toast(message, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#fff",
        color: "#3CB371",
        fontWeight: "normal",
      },
    });
  }
  static error(message: string) {
    toast(message, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#fff",
        color: "#F94144",
      },
    });
  }
  static info(message: string) {
    toast(message, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#fff",
        color: "#577590",
        fontWeight: 'normal'
      },
    });
  }
}
