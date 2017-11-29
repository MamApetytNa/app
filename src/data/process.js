import fse from 'fs-extra';
import glob from 'globby';
import path from 'path';
import getSlug from 'slug';
import crc from 'node-crc';
import leftPad from 'left-pad';

function getHash(str) {
  return leftPad(parseInt(crc.crc16(Buffer.from(str, 'utf-8')).toString('hex'), 16), 5, '0');
}

function getOrAdd(coll, prop, obj) {
  const existing = coll.find(item => item[prop] === obj);

  if (existing) {
    return existing.id;
  }

  const id = getHash(obj);

  coll.push({ id, [prop]: obj });

  return id;
}

async function justDo() {
  const filePaths = await glob('*-????.js', {
    cwd: __dirname,
  });
  const data = filePaths.map(filePath => require(`./${filePath}`).default);

  const tagsColl = [];
  const photosColl = [];

  const mapped = data.map(({
    name,
    thumbnail,
    photos,
    tags,
    ...rest
  }) => {
    const id = getHash(name);
    const slug = getSlug(name);

    const resolvedPhotos = photos.map(photo => getOrAdd(photosColl, 'url', photo));
    const resolvedThumbnail = getOrAdd(photosColl, 'url', thumbnail);
    const resolvedTags = tags.map(tag => getOrAdd(tagsColl, 'label', tag.label));

    return {
      ...rest,
      id,
      url: `/${slug.toLowerCase()}-${id}`,
      name,
      photos: resolvedPhotos,
      thumbnail: resolvedThumbnail,
      tags: resolvedTags,
    };
  });

  const outDir = path.join(__dirname, 'json');

  await fse.mkdirp(outDir);

  console.log(mapped.map(item => item.id).sort());

  await Promise.all(mapped.map(item => Promise.all([
    fse.writeFile(path.join(outDir, `${item.url.slice(1)}.json`), JSON.stringify(item, null, '  ')),
    fse.writeFile(path.join(outDir, 'photos.json'), JSON.stringify(photosColl, null, '  ')),
    fse.writeFile(path.join(outDir, 'tags.json'), JSON.stringify(tagsColl, null, '  ')),
  ])));
}


justDo().then(() => {
  process.exit(0);
}, (err) => {
  console.error(err);
  process.exit(1);
});
