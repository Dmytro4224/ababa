import React, { useEffect, useState } from 'react';

interface IButton {
	text: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
}

export function Button(props: IButton) {
	return (
		<button {...props} className={'btn btn-primary'}>
			{props.text}
		</button>
	)
}