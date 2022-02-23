import React from 'react';
import styles from './location.module.css';
import location from '../../../assets/location.svg';

function Location({ city }) {
	return (
		<div>
			<img src={location} alt="Location mark" className={styles.location} />
			<span className={styles['city-name']}>{city}</span>
		</div>
	);
}

export default Location;
