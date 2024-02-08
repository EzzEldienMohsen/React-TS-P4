import React from 'react';
import { get } from './util/http';
import BlogPosts, { type BlogPost } from './components/BlogPosts';
import img from './assets/data-fetching.png';
import ErrorMessage from './components/ErrorMessage';
type RawPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = React.useState<BlogPost[]>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  React.useEffect(() => {
    setIsLoading(true);
    async function dataGetter() {
      try {
        const data = (await get(
          'https://jsonplaceholder.typicode.com/posts'
        )) as RawPost[];

        const blogPosts: BlogPost[] = data.map((post) => {
          return {
            id: post.id,
            title: post.title,
            text: post.body,
          };
        });
        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
        // setError('failed fetching data');
      }
      setIsLoading(false);
    }

    dataGetter();
  }, []);
  let content: React.ReactNode;
  if (error) {
    content = <ErrorMessage text={error} />;
  }
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }
  if (isLoading) {
    content = <p id="loading-fallback">Fetching Posts...</p>;
  }
  return (
    <main>
      <img src={img} alt="image" />
      {content}
    </main>
  );
}

export default App;
