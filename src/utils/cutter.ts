export const cutDesc = (description: string): string => {
  return description.length > 64 ? description.slice(0, 88) + '...' : description;
};
  
export const formatDate = (dateString: string) => {
  const publishDate = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const publishYear = publishDate.getFullYear();
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    ...(publishYear !== currentYear && { year: 'numeric' }),
  };
  return publishDate.toLocaleDateString('en-US', options);
};