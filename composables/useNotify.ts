import type { Notification, NotificationGenerator } from "@/notiwind.d";

let count = 0;

const generateId = () => {
  return count++;
};

const notify = (notificationData: NotificationGenerator, timeout: number) => {
  const { $emitter } = useNuxtApp();

  const notification: Notification = {
    id: generateId(),
    ...notificationData,
  };
  $emitter.emit("notify", { notification, timeout });

  return () => $emitter.emit("close", notification.id);
};

const useNotify = () => notify;

export { useNotify };
