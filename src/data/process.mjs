import fse from 'fs-extra';
import glob from 'globby';
import path from 'path';

import e from './dirname';

const root = path.join(e.dirname, 'json');

function writeFile([filePath, data]) {
  console.log(`Writing ${filePath}...`);
  return fse.writeJson(path.join(root, filePath), data, { spaces: 2 });
}

async function justDo() {
  const filePaths = await glob('*-?????.json', {
    cwd: root,
  });
  const items = await Promise.all(filePaths.map(async (filePath) => {
    console.log(`Reading ${filePath}...`);
    const data = await fse.readJson(path.join(root, filePath));
    return [filePath, data];
  }));

  //   const updatedItems = items.map(([filePath, data]) => [
  //     filePath,
  //     {
  //       ...data,
  //       thumbnail: data.photos[0],
  //     },
  //   ]);
  const updatedItems = items;

  return Promise.all(updatedItems.map(writeFile));
}

async function updatePhotos() {
  console.log('Reading photos.json');
  const photos = await fse.readJson(path.join(root, 'photos.json'));

  const updatedPhotos = photos.filter(({ original }) => original.length > 0);
  //   const updatedPhotos = photos;

  return writeFile(['photos.json', updatedPhotos]);
}

justDo().then(updatePhotos).then(() => {
  process.exit(0);
}, (err) => {
  console.error(err);
  process.exit(1);
});
