import type { Action } from 'svelte/action';

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

/** Fades/pops the element in the first time it scrolls into view; sets [data-shown] for CSS. */
export const reveal: Action<HTMLElement, (() => void) | undefined> = (node, onshow) => {
	node.dataset.reveal = '';
	const io = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.dataset.shown = '';
			onshow?.();
			io.disconnect();
		},
		{ rootMargin: '0px 0px -12% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
};

/** Exposes the pointer position as --mx/--my for hover glows. */
export const spotlight: Action<HTMLElement> = (node) => {
	const move = (e: PointerEvent) => {
		const r = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${e.clientX - r.left}px`);
		node.style.setProperty('--my', `${e.clientY - r.top}px`);
	};
	node.addEventListener('pointermove', move);
	return { destroy: () => node.removeEventListener('pointermove', move) };
};

/** Tilts the element toward the pointer in 3D; pair with the .tilt class. */
export const tilt: Action<HTMLElement, number | undefined> = (node, max = 4) => {
	if (!finePointer() || prefersReducedMotion()) return;
	let frame = 0;
	const set = (rx: number, ry: number) => {
		node.style.setProperty('--rx', `${rx}deg`);
		node.style.setProperty('--ry', `${ry}deg`);
	};
	const move = (e: PointerEvent) => {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const r = node.getBoundingClientRect();
			set(-((e.clientY - r.top) / r.height - 0.5) * max, ((e.clientX - r.left) / r.width - 0.5) * max);
		});
	};
	const leave = () => {
		cancelAnimationFrame(frame);
		set(0, 0);
	};
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			cancelAnimationFrame(frame);
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
};

/** Throws a small ring of particles out of the clicked element. */
export function burst(e: MouseEvent, count = 12) {
	if (prefersReducedMotion()) return;
	const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
	const x = r.left + r.width / 2;
	const y = r.top + r.height / 2;
	for (let i = 0; i < count; i++) {
		const p = document.createElement('span');
		const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
		const dist = 24 + Math.random() * 22;
		p.className = i % 3 === 0 ? 'burst-particle burst-particle-alt' : 'burst-particle';
		p.style.left = `${x}px`;
		p.style.top = `${y}px`;
		p.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
		p.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
		p.addEventListener('animationend', () => p.remove());
		document.body.append(p);
	}
}
