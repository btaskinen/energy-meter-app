import './Notification.css';

type Props = {
  message: string;
  type: string;
};

const Notification = ({ message, type }: Props) => {
  const displaySetting = message === '' ? 'none' : 'block';
  return (
    <div style={{ display: displaySetting }} className={`Notification ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
