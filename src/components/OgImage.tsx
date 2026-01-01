import satori from 'satori';
import sharp from 'sharp';

const SITE_NAME = '日記です';
const SITE_URL = 'nikkinikki.vercel.app';
const X_ID = '@pankas_web';

export async function getOgImage(title: string): Promise<Buffer> {
  const fontData = await getFontData();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background:
            'linear-gradient(90deg, #cfedff 0%, #e8e2f3 50%, #ffd5e7 100%)',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                width: '1140px',
                height: '567px',
                background: 'rgba(255,255,255,0.85)',
                borderRadius: '12px',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              },
              children: [
                // ===== タイトル（上下・左右 中央）=====
                {
                  type: 'div',
                  props: {
                    style: {
                      position: 'absolute',
                      inset: 0,
                      left: '0px',
                      right: '0px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0 32px',
                      textAlign: 'center',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '64px',
                            fontWeight: 500,
                            lineHeight: 1.35,
                            textAlign: 'center',
                            wordBreak: 'break-word',
                            background:
                              'linear-gradient(90deg, #b5e1ff 0%, #c7c3e9 50%, #fca6cc 100%)',
                            backgroundClip: 'text',
                            color: 'transparent',
                          },
                          children: title,
                        },
                      },
                    ],
                  },
                },

                // ===== 左下のユーザー情報 =====
                {
                  type: 'div',
                  props: {
                    style: {
                      position: 'absolute',
                      left: '48px',
                      bottom: '32px',
                      fontSize: '28px',
                      background:
                        'linear-gradient(90deg, #b5e1ff 0%, #c7c3e9 50%, #fca6cc 100%)',
                      backgroundClip: 'text',
                      color: 'transparent',
                    },
                    children: `${SITE_NAME} | ${SITE_URL} | ${X_ID}`,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          weight: 500,
          style: 'normal',
        },
      ],
    }
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}

async function getFontData(): Promise<ArrayBuffer> {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap',
    {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    }
  ).then((res) => res.text());

  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) {
    throw new Error('Font URL not found');
  }

  return fetch(match[1]).then((res) => res.arrayBuffer());
}
