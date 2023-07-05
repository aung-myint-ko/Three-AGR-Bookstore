const useTruncate = (text, maxLength) => {
  if (!text) {
    return null;
  }
  if (text.length <= maxLength) {
    return text;
  }
  const truncatedText = text.substring(0, maxLength) + "...";
  return truncatedText;
};

export default useTruncate;
