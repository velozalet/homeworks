type HtmlContentProps = {
  htmlString: string;
};

const HtmlContent = ({ htmlString }: HtmlContentProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};
export default HtmlContent;

