import { Application } from "express";

export const startServer = (app: Application) => {
  const port = Number(process.env.PORT) || 3000;

  app.listen(port, () => {
    console.log(`Server is running - http://localhost:${port}`);
  });
};
