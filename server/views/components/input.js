import html from "html-string";

const input = ({ type = "text", ...attrs }) => html`
  <input
    type="${type}"
    class="bg-gray-200 placeholder-gray-400 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
    ${attrs}:attrs
  />
`;

export default input;
