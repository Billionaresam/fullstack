export const getCategories = (req, res) => {
  res.json([
    'Politics',
    'Health',
    'Technology',
    'Sports',
    'Entertainment',
    'Business'
  ]);
};
