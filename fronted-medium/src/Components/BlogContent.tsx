export const BlogContent = ({ content }: { content: string }) => {
  return (
    <div className="md:text-lg text-gray-600 text-pretty">
      {content.slice(0, 100) + "..."}
    </div>
  );
};
