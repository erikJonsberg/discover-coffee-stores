import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { fetchCoffeeStores } from "@/lib/coffee-stores.lib";
import styles from "@/styles/coffee-store.module.css";

export async function getStaticProps({ params }) {
  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

  export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore) => {
      return {
        params: {
          id: coffeeStore.id.toString(),
        },
      };
    });
    return {
      paths,
      fallback: true
    }
  }

const CoffeeStore = (props) => {
    const router = useRouter()
    if (router.isFallback) {
      return <div>Loading...</div>
    }
      
    const { locality, address, name, imgUrl } = props.coffeeStore;

    const handleUpvoteButton = () => {
      console.log('upvote button clicked')
    }

    return (
      <div className={styles.layout}>
        <Head>
          <title as="title">{name}</title>
        </Head>
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.iconWrapper}>
              <div className={styles.backToHomeLink}>
                <Link href="/">
                  <Image
                    className={styles.backArrow}
                    src="/static-assets/icons/back.svg"
                    width="28"
                    height="28"
                    alt="icon"
                  />
                  Back to home
                </Link>
              </div>
            </div>
            <div className={styles.nameWrapper}>
              <h1>{name}</h1>
            </div>
            <div className={styles.storeImgWrapper}>
              <Image
                src={imgUrl || 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw0MTQzMzh8MHwxfHNlYXJjaHw2fHxjb2ZmZWUlMjBzaG9wfGVufDB8MHx8fDE2NzcxNzQ2NjU&ixlib=rb-4.0.3&q=80&w=1080' }
                width={600}
                height={360}
                alt={name}
                className={styles.storeImg}
                priority
              />
            </div>
          </div>

          <div className={`glass ${styles.col2}`}>
            {address && <div className={styles.iconWrapper}>
              <Image
                src="/static-assets/icons/places.svg"
                width="24"
                height="24"
                alt="icon"
              />
              <p className={styles.text}>{address}</p>
            </div>}
            {locality && <div className={styles.iconWrapper}>
              <Image
                src="/static-assets/icons/nearMe.svg"
                width="24"
                height="24"
                alt="icon"
              />
              <p className={styles.text}>{locality}</p>
            </div>}
            <div className={styles.iconWrapper}>
              <Image
                src="/static-assets/icons/star.svg"
                width="24"
                height="24"
                alt="icon"
              />
              <p className={styles.text}>10</p>
            </div>
            <button
              className={styles.upvoteButton}
              onClick={handleUpvoteButton}
            >
              Upvote!
            </button>
          </div>
        </div>
      </div>
    );
};

export default CoffeeStore;