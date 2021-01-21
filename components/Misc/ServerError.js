import styles from './ServerError.module.scss';

const Error = () => (
  <div className={styles.servererror}>
    <span className={styles['servererror-message']}>
      Oops, there was an error while trying to reach the server, please try again.
    </span>
  </div>
);

export default Error;
