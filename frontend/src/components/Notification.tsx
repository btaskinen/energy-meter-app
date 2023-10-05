type Props = {
  message: string;
  type: string;
};

const Notification = ({ message, type }: Props) => {
  return <div className={`Notification ${type}`}>{message}</div>;
};

export default Notification;
