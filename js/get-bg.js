'use strict';
//please dont's steal key I'm too stupid to write back end requests :(
export async function generateBg() {
  const definitlyNotSecretApiKey =
    'ejysjaxcrMlWyR3Z2iG63NJylnsPSUFAzfBo3xWBoup13o3DzEbYBIBa';
  const imgObj = await fetch(
    'https://api.pexels.com/v1/search?query=night nature landscape&orientation=landscape&per_page=15',
    {
      headers: {
        Authorization: definitlyNotSecretApiKey,
      },
    }
  )
    .then((resp) => resp.json())
    .then((imgObj) => {
      const imgIndex = Math.floor(Math.random() * imgObj.per_page);
      return imgObj.photos[imgIndex];
    });
  return imgObj;
}
