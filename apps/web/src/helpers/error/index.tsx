import { notifications } from "@/components/ui/Notifications";

const logErrorForDev = (error: unknown) => {
  if (process.env.NODE_ENV === "development") {
    console.error(error);
  }
};

/**
 * ユーザーにエラーを通知する
 */
export const showErrorNotificationToUser = (message: string) => {
  notifications.show({
    message: message,
    color: "red",
  });
};

/**
 * エラーが発生した場合に（必要に応じて）エラーをコンソールに出力し、ユーザーに通知する
 */
export const handleError = (error: unknown, userMessage: string) => {
  logErrorForDev(error);
  showErrorNotificationToUser(userMessage);
};
