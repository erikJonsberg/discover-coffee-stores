
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { fetchCoffeeStores } from "@/lib/coffee-stores.lib";
import styles from "@/styles/coffee-store.module.css";
import { StoreContext } from "@/store/store.context";
import { isEmpty } from "@/utils/utils";

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log('params', params)

  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffeeStore) => 
  {
  return coffeeStore.id.toString() === params.id;
  });
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
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

const CoffeeStore = (initialProps) => {
    const router = useRouter()
      // if (router.isFallback) {
      //   return <div>Loading...</div>;
      // }

    const id = router.query.id;

    const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);

    const {
      state: { coffeeStores },
    } = useContext(StoreContext);

    const handleCreateCoffeeStores = async (coffeeStore) => {
      try {
        const { id, name, address, locality, votes, imgUrl } = coffeeStore;
        const response = await fetch("/api/createCoffeeStores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            address: address || '',
            locality: locality || '',
            votes: votes || 0,
            imgUrl
          }),
        });
        const dbCoffeeStore = await response.json();
        console.log('dbCoffeeStore', dbCoffeeStore)
      } catch(error) {
        console.error('Error creating coffee store', error)
      }
    }

    useEffect(() => {
      if(isEmpty(initialProps.coffeeStore)) {
        if (coffeeStores.length > 0) {
          const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
            return coffeeStore.id.toString() === id;
          });
              setCoffeeStore(findCoffeeStoreById);
              handleCreateCoffeeStores(findCoffeeStoreById);
          }
        } else {
          handleCreateCoffeeStores(initialProps.coffeeStore);
        }
      }, [id, initialProps, initialProps.coffeeStore, coffeeStores]);

    const { name, address, locality, imgUrl } = coffeeStore;

    const [voteCount, setVoteCount] = useState(0);

    const handleVoteButton = () => {
      console.log("handle votes");
      let count = voteCount + 1
      setVoteCount(count);
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
                alt="store image"
                className={styles.storeImg}
                as="image"
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
              <p className={styles.text}>{voteCount}</p>
            </div>
            <button
              className={styles.voteButton}
              onClick={handleVoteButton}
            >
              Up Vote!
            </button>
          </div>
        </div>
      </div>
    );
};

export default CoffeeStore;