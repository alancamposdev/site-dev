import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer__container}>
      <p>@<span>{new Date().getFullYear()}</span> Alan Campos Dev -  All rights reserved.</p>     
    </footer>
  )
}