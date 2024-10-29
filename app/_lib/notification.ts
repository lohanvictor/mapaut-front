import toast from "react-hot-toast";

export class Notification {
  static success(message: string) {
    toast(message, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#3CB371",
        color: "#fff",
        fontWeight: "normal",
      },
    });
  }
  static error(message: string) {
    toast(message, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#F94144",
        color: "#fff",
      },
    });
  }
  static info(message: string) {
    toast(message, {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#577590",
        color: "#fff",
        fontWeight: 'normal'
      },
    });
  }
}
