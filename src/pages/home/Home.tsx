import React from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';

import rehypeRaw from 'rehype-raw';
import markdownText from './HOME.md?raw';

const Home = () => {
  return (
    <div className='markdown-body'>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdownText}</ReactMarkdown>
    </div>
  );
};

export default Home;
