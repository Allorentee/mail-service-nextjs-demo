module.exports = {
  apps: [
    {
      name: "mail-service",
      script: "npm",
      args: "start -- -H 0.0.0.0",
      cwd: "/home/ll-raspi/source/mail-service",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
