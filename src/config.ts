process.loadEnvFile()

export const envOrThrow = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing mandatory environment variable: ${key}`);
  }

  return value;
};

type APIConfig = {
    filserverHits: number;
    dbURL: string;
}

export const config: APIConfig = {
    filserverHits: 0,
    dbURL: envOrThrow("DB_URL"),
}