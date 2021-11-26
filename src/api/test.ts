export const fetchTest = async (): Promise<void> => {
	const res = await fetch('/api/test');
	const data = await res.json();
	console.log(data);
};
