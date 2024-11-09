import styles from './styles.module.css';

const Modal = (props) => {
  return (
    <section>
      {props.modal ? (
        <dialog className={styles.modal} open>
            {props.children}
        </dialog>
      ) : (
        <dialog></dialog>
      )}
    </section>
  );
}

export default Modal;