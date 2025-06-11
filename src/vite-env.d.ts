/// <reference types="vite/client" />

declare module 'markdown-it-katex' {
    import MarkdownIt from 'markdown-it';

    function markdownItKatex(md: MarkdownIt, options?: any): void;

    export = markdownItKatex;
}

declare module 'github-markdown-css';