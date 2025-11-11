import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

const code = `#include <iostream>
using namespace std;

int main() {
  string name = "Darel";
  if (name == "Darel")
    cout << "Certified cool." << endl; // true
  return 0;
}`;

const CodeSnippet = () => {
  const [html, setHtml] = useState('');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !resolvedTheme) return;

    const theme = resolvedTheme === 'dark' ? 'dracula' : 'vitesse-dark';

    codeToHtml(code, {
      lang: 'cpp',
      theme
    }).then(setHtml);
  }, [resolvedTheme, mounted]);

  if (!mounted) return null;

  return (
    <div
      className="rounded-md p-4 overflow-auto font-mono text-sm shadow-[var(--shadow)]"
      style={{
        background: resolvedTheme === 'dark' ? '#282A36' : '#121212',
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default CodeSnippet;
