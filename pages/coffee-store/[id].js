import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./coffee-store.module.css"

const CoffeeStore = () => {
    const router = useRouter()
    console.log(router)
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/">Back to home</Link>
          <h1>Coffee Store Page</h1>
          <h3>{router.query.id}</h3>
        </div>
      </main>
    );
};

export default CoffeeStore;