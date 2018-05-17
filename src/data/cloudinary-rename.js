/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'olgamawypieki',
  api_key: '649674376825668',
  api_secret: '5A8da1SlNLC8h1rAA4F8qu_IeSE',
});

cloudinary.v2.api.resources({ type: 'upload', max_results: 500 }, (error, { resources }) => {
  resources.forEach(({ public_id: pid }) => {
    const newPid = pid.replace(/_[a-z0-9]+$/i, '');

    if (pid === newPid) {
      console.log(`renaming ${pid} not necessary`);
      return;
    }

    cloudinary.v2.uploader.rename(pid, newPid, (err) => {
      if (err) {
        console.log(`renaming ${pid} failed`, err);
      } else {
        console.log(`renaming ${pid} done`);
      }
    });
  });
});

