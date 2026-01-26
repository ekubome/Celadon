import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');
const outputPath = path.join(process.cwd(), 'public/search-index.json');

function generateSearchIndex() {
  if (!fs.existsSync(postsDirectory)) {
    console.log('No posts directory found, creating empty search index.');
    fs.writeFileSync(outputPath, JSON.stringify([]));
    return;
  }

  const folders = fs.readdirSync(postsDirectory);
  const posts = folders
    .filter((folder) => {
      const indexPath = path.join(postsDirectory, folder, 'index.md');
      return fs.existsSync(indexPath);
    })
    .map((folder) => {
      const filePath = path.join(postsDirectory, folder, 'index.md');
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      return {
        slug: folder,
        title: data.title || '无标题',
        excerpt: data.excerpt || '',
        category: data.category || '未分类',
        tags: data.tags || [],
        date: data.date || new Date().toISOString().split('T')[0],
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0));

  // Ensure public directory exists
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
  console.log(`Search index generated with ${posts.length} posts.`);
}

generateSearchIndex();
