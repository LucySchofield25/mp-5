'use client';

import { useState } from 'react';
import {
  PageContainer,
  Heading,
  Subheading,
  FormWrapper,
  Input,
  Button,
  ShortUrlOutput,
  ErrorMessage,
} from "./src/components/Style";

export default function Home() {
  const [alias, setAlias] = useState('');
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alias, url }),
      });

      const text = await res.text();
      const data = JSON.parse(text);

      if (!res.ok) {
        setError(data.error || 'An error occurred');
      } else {
        setShortUrl(`${window.location.origin}/${alias}`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error occurred.');
    }
  };

  return (
      <PageContainer>
        <Heading>Custom URL Shortener</Heading>
        <Subheading>Create a custom url alias for long urls.</Subheading>

        <FormWrapper onSubmit={handleSubmit}>
          <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter your full URL"
              required
          />
          <Input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Enter your custom alias"
              required
          />
          <Button type="submit">Shorten URL</Button>
        </FormWrapper>

        {shortUrl && (
            <ShortUrlOutput
                type="text"
                readOnly
                value={shortUrl}
                onClick={(e) => e.currentTarget.select()}
            />
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PageContainer>
  );
}

