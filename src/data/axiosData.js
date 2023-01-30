import axios from 'axios';
// const BASE_URL = process.env.REACT_APP_BASE_URL;
const apiKey = '4c89a74079msh597deee4e411da1p101fd7jsnfbfba92451c7';
const host = 'soundcloud-scraper.p.rapidapi.com';
// const { ZingMp3 } = require("zingmp3-api-full")
export const getZingMp3 = async () => {
   try {
      const response = await axios.request({
         method: 'GET',
         url: 'https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata',
         params: { track: 'https://soundcloud.com/edsheeran/photograph' },
         headers: {
            'X-RapidAPI-Key':
               '4c89a74079msh597deee4e411da1p101fd7jsnfbfba92451c7',
            'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com',
         },
      });
      return response;
   } catch (error) {
      console.log(error.message);
   }
};
export const getUserAllPlaylists = async (user) => {
   let params = { user: user };
   console.log(params);
   try {
      const response = await axios.request({
         method: 'GET',
         url: 'https://soundcloud-scraper.p.rapidapi.com/v1/user/tracks',
         params: params,
         headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': host,
         },
      });
      return response;
   } catch (error) {
      console.log(error.message);
   }
};
export async function download(url) {
   // Regularly checks the progress until it equals `1`.
   while (true) {
      let headRes = await fetch(url, { method: 'HEAD' });
      switch (headRes.status) {
         case 202: // Queuing or processing
         case 200: // Completed
            break;
         case 403: // Invalid or expired
            throw new Error('The URL is invalid or expired.');
         default: // Unknown
            throw new Error(`Unknown error. Status: ${headRes.status}.`);
      }
      let isQueuing = headRes.headers.get('x-scd-is-queuing') === 'true';
      if (isQueuing) {
         console.log('Queuing...');
      } else {
         let progress = Number(headRes.headers.get('x-scd-progress'));
         console.log(`Processing: ${(progress * 100).toFixed(1)}%`);
         if (progress === 1) {
            console.log(
               `File size: ${headRes.headers.get('content-length')} bytes`,
            );
            break;
         }
      }
      // Waits for 1 second (1000 milliseconds).
      await new Promise((x) => setTimeout(x, 1000));
   }

   // Now the URL has become a normal URL of an audio file.
   console.log('Downloading...');

   // Use `XMLHttpRequest` instead of `fetch` to query download progress.
   // We just use `fetch` here to simply demonstrate the usage.
   let getRes = await fetch(url, { method: 'GET' });

   // Response header arrives.
   switch (getRes.status) {
      case 200: // OK
         break;
      case 403: // Expired
         throw new Error('The URL is expired.');
      default: // Unknown
         throw new Error(`Unknown error. Status: ${getRes.status}.`);
   }

   // Waits the file to arrive.
   let blob = await getRes.blob();
   console.log('Download completed');
   console.log(blob);

   // Saves the file.
   console.log(
      'Saving file... (click "allow" if the browser asks for download permission)',
   );
   //   let el = document.createElement('a')
   //   el.href = URL.createObjectURL(blob)
   //   el.download = name
   //   el.click()
   //   URL.revokeObjectURL(el.href)
   return blob;
}
// A third-party HTTP client library.
// let axios = require('axios');

// Libraries help you manipulate files.
// let fs = require('node:fs');
// let path = require('node:path');

// Replace this key with yours.
// let apiKey = '25cd9c4aa8msh6ab37b5fc3a6a44p131b48jsna79a39c2e7ef';

// let resultFileName = 'playlists.json';

// main();

// export async function main() {
//    // Scrapes playlists.
//    let playlists = await getUserAllPlaylists(paramUser, 10);

//    // Saves the playlists to a JSON file.
//    // await fs.promises.writeFile(
//    //    path.join(__dirname, resultFileName),
//    //    JSON.stringify(playlists, null, 2),
//    // );
//    return playlists;
// }

// export async function getUserAllPlaylists(user, limit = 10, maxPages = 10) {
//    // Sets query parameters for the first page.
//    let params = { user: user, limit: limit };

//    let playlists = [];

//    for (let i = 0; i < maxPages; ++i) {
//       console.log(`Fetching page ${i}`);
//       console.log(`Params: ${JSON.stringify(params)}`);

//       let res;
//       try {
//          res = await axios.request({
//             method: 'GET',
//             url: 'https://soundcloud-scraper.p.rapidapi.com/v1/user/playlists',
//             params: params,
//             headers: {
//                'X-RapidAPI-Key': apiKey,
//                'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com',
//             },
//          });
//       } catch (err) {
//          // For the HTTP library `axios`, an error will be thrown
//          // if the response status falls out of the range of 2xx
//          // or the request was made but no response was received.
//          // Learn more: https://axios-http.com/docs/handling_errors.
//          console.log(err);

//          break;
//       }

//       // Note that the number of items on a page may be less than `limit`,
//       // even if the page is not the last page.
//       // (SoundCloud's backend seems to simply discard some of the items fetched from the database.)
//       let page = res.data.playlists;
//       console.log(`Item count: ${page.items.length}\n`);

//       // Appends items of the current page.
//       playlists.push(...page.items);

//       // `nextOffset` is the only field that determines whether there are more items.
//       if (page.nextOffset === null) {
//          // No more playlists.
//          break;
//       }

//       // Resets the query parameters for the next page.
//       params = { user: user, offset: page.nextOffset, limit: limit };
//    }

//    return playlists;
// }
