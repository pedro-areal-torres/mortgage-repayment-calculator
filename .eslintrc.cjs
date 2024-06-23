module.exports = {
  extends: ['prettier'],
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // Your custom rules here
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
