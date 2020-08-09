import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

const sections = [
	{
		title: 'Title 1',
		subtitle: 'Subtitle 1'
	},
	{
		title: 'Title 2',
		subtitle: 'Subtitle 2'
	},
	{
		title: 'Title 3',
		subtitle: 'Subtitle 3'
	}
];

function App() {
	const headerRef = useRef(null);
	const revealRefs = useRef([]);
	revealRefs.current = [];
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

		revealRefs.current.forEach((el, index) => {
			gsap.fromTo(
				el,
				{
					autoAlpha: 0
				},
				{
					duration: 1,
					autoAlpha: 1,
					ease: 'none',
					scrollTrigger: {
						id: `section-${index + 1}`,
						trigger: el,
						start: 'top center+=100',
						toggleActions: 'play none none reverse',
						markers: true
					}
				}
			);
		});
	}, []);

	const addToRefs = el => {
		if (el && !revealRefs.current.includes(el)) {
			revealRefs.current.push(el);
		}
		console.log(el, revealRefs.current);
	};

	return (
		<div className="App">
			<header ref={headerRef} className="App-header">
				<button onClick={() => toggleBackground()}>Toggle Background</button>
			</header>
			<main>
				{sections.map(({ title, subtitle, index }) => {
					return (
						<div className="heading" key={title} ref={addToRefs}>
							<h2>{title}</h2>
							<h4>{subtitle}</h4>
						</div>
					);
				})}
			</main>
		</div>
	);
}

export default App;
