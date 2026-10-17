const HTML_ESCAPES: Record<string, string> = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#39;',
};

// Makes user-supplied text safe to place inside an HTML document
export function escapeHtml(text: string): string {
	return text.replace(/[&<>"']/g, (character) => HTML_ESCAPES[character]);
}
