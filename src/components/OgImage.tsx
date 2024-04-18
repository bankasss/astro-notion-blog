import satori from 'satori';
import sharp from 'sharp';

// サイト名
const site = '日記です';
const url = 'nikkinikki.vercel.app';

// ユーザー
const user = 'ぱんかす';
const x = '@pankas_web';

export async function getOgImage(title: string) {
  const fontData = (await getFontData()) as ArrayBuffer;
  const svg = await satori(
    <div
      style={{
        width: '1200px',
        height: '630px',
        backgroundColor: '#ffd5e7',
        backgroundImage: 'linear-gradient(90deg, #cfedff 0%, #e8e2f3 50%, #ffd5e7 100%)',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      <div
        style={{
          display: 'flex',
          width: '1140px',
          height: '567px',
          background: 'rgba(255,255,255,0.8)',
          borderRadius: '8px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '90%',
            height: '85%',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '60px',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundImage: 'linear-gradient(90deg, #b5e1ff 0%, #c7c3e9 50%, #fca6cc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '960px',
            paddingBottom: '4px',
            height: '40px',
          }}
        >
          <div         
           style={{
            fontSize: '1.75rem',
            backgroundImage: 'linear-gradient(90deg, #b5e1ff 0%, #c7c3e9 50%, #fca6cc 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
          >
            {site + " | " + url + " | " + x}
          </div>

        </div>
        <div
          style={{
            flexBasis: '54%',
            marginRight: '5.5rem',
            display: 'flex',
          }}
        ></div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );

  return await sharp(Buffer.from(svg)).png().toBuffer();
}

async function getFontData() {
  const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap`;

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/
  );

  if (!resource) return;

  return await fetch(resource[1]).then((res) => res.arrayBuffer());
}