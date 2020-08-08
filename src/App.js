import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import './App.css';

function App() {
	const headerRef = useRef(null);
	const [background, setBackground] = useState('#fff');

	const toggleBackground = () => {
		const color = background !== '#fff' ? '#232323' : '#000';
		setBackground(color);
	};

	useEffect(
		() => {
			gsap.to(headerRef.current, { duration: 1, backgroundColor: background, ease: 'none' });
		},
		[background]
	);

	useEffect(() => {
		gsap.from(headerRef.current, {
			duration: 1,
			autoAlpha: 0,
			ease: 'none',
			delay: 1
		});
	}, []);
	return (
		<div className="App">
			<header ref={headerRef} className="App-header">
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<button onClick={() => toggleBackground()}>Toggle Background</button>
			</header>
		</div>
	);
}

export default App;
