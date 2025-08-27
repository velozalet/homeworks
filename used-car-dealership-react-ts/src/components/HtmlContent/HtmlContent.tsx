type HtmlContentProps = {
  htmlString: string;
};

const HtmlContent = ({ htmlString }: HtmlContentProps) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};
export default HtmlContent;
/*Usage:
	const myStringFromFirebase = `<p>****Payments O.A.C.* The advertised price...</p>
	<p>Discounts and/or incentives...</p>
	<p>See dealer for all current discount eligibility details...</p>`;

	//Render it as real HTML:
	<HtmlContent htmlString={myStringFromFirebase} />
*/
