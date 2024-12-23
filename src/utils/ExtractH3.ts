export const extractH3Headings = (content: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    const headings = tempDiv.querySelectorAll('h3');
    return Array.from(headings).map((heading, index) => ({
    id: `heading-${index}`,
    text: heading.textContent || '',
    }));
};
  
export const addAnchorIdsToH3 = (content: string) => {
    let idCounter = 0;
    return content.replace(/<h3>(.*?)<\/h3>/g, (match, text) => {
        const id = `heading-${idCounter++}`;
        return `<h3 id="${id}" className="text-custom">${text}</h3>`;
    });
};