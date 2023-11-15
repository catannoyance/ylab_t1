import styles from './LoadingSpinner.module.scss';

export const LoadingSpinner = () => {
    return <div className={styles.loadingSpinner}>
        <div className={styles.dot1} />
        <div className={styles.dot2} />
        <div className={styles.dot3} />
    </div>
}