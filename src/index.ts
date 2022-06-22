import app from "./app";

const PORT = 4000; // trivial type annotation
app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
