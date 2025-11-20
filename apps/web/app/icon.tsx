import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#2563EB', // blue-600
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="20"
          height="20"
        >
          {/* 시냇물을 상징하는 두 개의 물결 라인 */}
          <path d="M2 10c5.5-6 16.5-6 22 0" />
          <path d="M2 15c5.5-6 16.5-6 22 0" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}

