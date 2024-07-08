import server from './server';

const port = process.env.PORT;
if (!port) {
  console.error('Please define the PORT variable in the .env file');
  process.exit(1);
}
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
