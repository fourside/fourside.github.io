module.exports = {
  extends: ["react-app", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
  globals: {
    __PATH_PREFIX__: true,
  },
};
