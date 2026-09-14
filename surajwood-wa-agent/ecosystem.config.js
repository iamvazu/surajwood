module.exports = {
  apps: [
    {
      name: "surajwood-wa-agent",
      script: "dist/index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
      error_file: "./logs/error.log",
      out_file: "./logs/combined.log",
      time: true,
    },
  ],
};
