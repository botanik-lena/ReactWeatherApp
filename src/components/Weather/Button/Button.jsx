import React from 'react';
import style from './button.module.css';

function Button({ onClick, buttonStyle, buttonText }) {
	return (
		<button type="button" onClick={onClick} className={style[buttonStyle]}>{buttonText}</button>
	);
}
export default React.memo(Button);
