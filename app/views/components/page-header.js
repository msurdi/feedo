import html from "html-string";

const pageHeader = ({ title }) => html`
  <h1 class="text-lg font-bold py-4">${title}</h1>
`;
export default pageHeader;
