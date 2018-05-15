import { createElement } from 'react';
import unified from 'unified';
import { omit } from 'ramda';
import markdown from 'remark-parse';

const omitPositionAndChildren = omit(['position', 'children']);

const parser = unified()
  .use(markdown, { commonmark: true })
  .use(function compile() {
    this.Compiler = function removePosition(node) {
      return {
        ...omitPositionAndChildren(node),
        ...(node.children && { children: node.children.map(removePosition) }),
      };
    };
  });

export default function parseMarkdown(content) {
  return new Promise((resolve, reject) => {
    parser.process(content, (err, parsed) => {
      if (err) {
        reject(err);
      } else {
        resolve(parsed.contents);
      }
    });
  });
}

const defaultRenderers = {
  root: ({ children }) => children,
  default: ({ key, ...node }) => createElement('pre', { key }, JSON.stringify(node, null, '  ')),
  strong: ({ key, children }) => createElement('strong', { key }, ...children),
  delete: ({ key, children }) => createElement('del', { key }, ...children),
  link: ({ key, url, children }) => createElement('a', { key, href: url }, ...children),
  heading: ({ key, depth, children }) => createElement(`h${depth}`, { key }, ...children),
  paragraph: ({ key, children }) => createElement('p', { key }, ...children),
  text: ({ value }) => value,
};

export function createRenderer(customRenderers) {
  return function render(node, commonProps) {
    const renderer = (customRenderers[node.type] || defaultRenderers[node.type])
      || (customRenderers.default || defaultRenderers.default);
    return renderer({
      ...commonProps,
      ...node,
      children: (node.children || []).map((child, index) =>
        render({ ...child, key: index }, commonProps)),
    });
  };
}
