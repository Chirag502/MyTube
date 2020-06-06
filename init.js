import app from "./app";
import chalk from 'chalk'

const PORT=3000;
app.listen(PORT,()=>console.log(chalk.inverse("✅  Listening to Post 3000")));