export default () => ({
  port: Number(process.env.APP_PORT) || 8080,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
  isUseSeeds: process.env.IS_USE_SEEDS === 'true',
});
