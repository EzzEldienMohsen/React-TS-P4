import React from 'react';
import { get } from './util/http';
import BlogPosts, { type BlogPost } from './components/BlogPosts';
import img from './assets/data-fetching.png';
type RawPost = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = React.useState<BlogPost[]>();
  React.useEffect(() => {
    async function dataGetter() {
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
    }

    dataGetter();
  }, []);
  let content: React.ReactNode;
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts} />;
  }

  return (
    <main>
      <img src={img} alt="image" />
      {content}
    </main>
  );
}

export default App;
