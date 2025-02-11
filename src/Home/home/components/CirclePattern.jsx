export function CirclePattern() {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 -z-10 opacity-10"
        aria-hidden="true"
      >
        <defs>
          <pattern id="circles" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <circle cx="25" cy="25" r="2" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circles)" />
      </svg>
    )
  }
  
  