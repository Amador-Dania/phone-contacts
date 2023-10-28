import styles from "./Notifications.module.css";

interface NotificationInterface {
  type: string;
}

export default function Notification({ type }: NotificationInterface) {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <div className={styles["notificationIcon"]}>
        {type === "saved" ? "✓" : "✕"}
      </div>
      <div className={styles["notificationText"]}>
        {type === "saved" ? "Contact saved" : "Contact deleted"}
      </div>
    </div>
  );
}
