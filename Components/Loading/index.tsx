import styles from './loading.module.scss'

export const Loading = () => {
  return (
    <img src="images/loading.svg" alt="Carregando..." className={styles.loading} />
  )
}
