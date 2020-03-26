const Post = require('../../models/Post');

const createFakeData = () => {
  const posts = Array.from({ length: 40 }).map((v, i) => ({
    title: `포스트 #${i + 1}`,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    tags: ['가짜', '데이터']
  }));

  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  });
};

module.exports = {
  createFakeData
};
