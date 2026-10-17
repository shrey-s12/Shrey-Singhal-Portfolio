// Height of the fixed navbar, so sections don't land underneath it
export const NAVBAR_HEIGHT_PX = 80;

export function scrollToSection(sectionId: string): void {
	const element = document.getElementById(sectionId);
	if (!element) {
		return;
	}

	const top = element.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT_PX;
	window.scrollTo({ top, behavior: 'smooth' });
}
