export function Celsius(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="0.75em"
      height="0.75em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M4.5 10a3.5 3.5 0 1 1 0-7a3.5 3.5 0 0 1 0 7m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3M22 10h-2a4 4 0 0 0-8 0v5a4 4 0 0 0 8 0h2a6 6 0 0 1-12 0v-5a6 6 0 0 1 12 0"
      ></path>
    </svg>
  )
}

export function Fahrenheit(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="0.75em"
      height="0.75em"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 12h7v2h-7v7h-2V8a4 4 0 0 1 4-4h7v2h-7a2 2 0 0 0-2 2zm-7.5-2a3.5 3.5 0 1 1 0-7a3.5 3.5 0 0 1 0 7m0-2a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"
      ></path>
    </svg>
  )
}

export function LinkDiagonal(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m301.255 180.575l30.169 30.17l-120.679 120.68l-30.17-30.17zm0 150.85L256 376.68c-33.272 33.271-87.408 33.271-120.68 0s-33.272-87.408 0-120.68l45.255-45.255l-30.17-30.17l-45.255 45.255c-49.987 49.987-49.987 131.032 0 181.02s131.032 49.987 181.02 0l45.254-45.255zM225.83 105.151l-45.255 45.254l30.17 30.17L256 135.321c33.272-33.272 87.408-33.272 120.679 0s33.272 87.407 0 120.679l-45.255 45.255l30.17 30.17l45.255-45.255c49.987-49.987 49.987-131.032 0-181.019c-49.987-49.988-131.032-49.988-181.019 0"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}
