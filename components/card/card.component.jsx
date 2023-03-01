import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";

const Card = (props) => {
    return (
        <Link className={styles.cardLink} href={props.href}>
        <div className={`glass ${styles.container}`}>
        <div className={styles.cardHeaderWrapper}>
        <h2 className={styles.cardHeader} >{props.name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
        <Image
            width={260} 
            height={160} 
            src={props.imgUrl} 
            alt=""
            className={styles.cardImage}
            priority
        />
        </div>
        </div>
        </Link>
    );
}

export default Card;