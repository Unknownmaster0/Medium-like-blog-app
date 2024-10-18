export const BlogContent = ({ content }: { content: string }) => {
  return (
    <div className="md:text-lg text-gray-600 text-pretty">
      {content.length > 100 ? content.slice(0, 100) + "..." : content}
    </div>
  );
};
