import React from 'react';
import style from './button.module.css';

function Button({ onClick, className, buttonText }) {
	return (
		<button type="button" onClick={onClick} className={style[className]}>{buttonText}</button>
	);
}
export default React.memo(Button);
