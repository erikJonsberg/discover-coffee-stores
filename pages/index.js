import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/banner/banner.component";
import Card from "@/components/card/card.component";
import { fetchCoffeeStores } from "@/lib/coffee-stores.lib";
import useGeolocation from "@/hooks/geolocation.hooks";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "@/store/store.context";

export async function getStaticProps(context) {
	const coffeeStores = await fetchCoffeeStores();
	return {
		props: {
			coffeeStores,
		}, // will be passed to the page component as props
	};
}

export default function Home(props) {
	const { handleGeolocation, locationErrorMsg, searchingForLocation } =
		useGeolocation();

	const [coffeeStoresError, setCoffeeStoresError] = useState(null);

	const { dispatch, state } = useContext(StoreContext);

	const { coffeeStores, latlong } = state;

	useEffect(() => {
		const setCoffeeStoresByLocation = async () => {
			if (latlong) {
				try {
					const response = await fetch(
						`/api/getCoffeeStoresByLocation?latLong=${latlong}&limit=30`
					);

					const coffeeStores = await response.json();

					dispatch({
						type: ACTION_TYPES.SET_COFFEE_STORES,
						payload: { coffeeStores },
					});
					setCoffeeStoresError("");
				} catch (error) {
					setCoffeeStoresError(error.message);
				}
			}
		};
		setCoffeeStoresByLocation();
	}, [latlong, dispatch]);

	const handleOnBannerButtonClick = () => {
		handleGeolocation();
	};
	return (
		<div className={styles.container}>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta
					name='description'
					content='An app to help you find nearby coffee shops'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link as='favicon' rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Banner
					buttonText={
						searchingForLocation ? "Locating..." : "View stores nearby"
					}
					handleOnClick={handleOnBannerButtonClick}
				/>
				{locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
				{coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
				<div className={styles.heroImage}>
					<Image
						alt=''
						src='/static-assets/hero-image.png'
						width={800}
						height={343}
						priority
					/>
				</div>

				{coffeeStores.length > 0 && (
					<div className={styles.section}>
						<h2 className={styles.heading2}>Stores near me</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map((coffeeStore) => {
								return (
									<Card
										key={coffeeStore.id}
										name={coffeeStore.name}
										imgUrl={coffeeStore.imgUrl}
										href={`/coffee-store/${coffeeStore.id}`}
										className={styles.card}
									/>
								);
							})}
						</div>
					</div>
				)}

				{props.coffeeStores.length > 0 && (
					<div className={styles.section}>
						<h2 className={styles.heading2}>Northampton stores</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map((coffeeStore) => {
								return (
									<Card
										key={coffeeStore.id}
										name={coffeeStore.name}
										imgUrl={coffeeStore.imgUrl}
										href={`/coffee-store/${coffeeStore.id}`}
										className={styles.card}
									/>
								);
							})}
						</div>
					</div>
				)}
			</main>
		</div>
	);
}
