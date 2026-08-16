export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex gap-2">
      <a
        href="https://wa.me/919486781846"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
        Message
      </a>

      <a
        href="tel:+919486781846"
        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22 16.923c-.56-3.837-2.067-7.136-4.934-9.167A12.297 12.297 0 0 0 3.691 2.5A11.982 11.982 0 0 0 1.5 5.283c0 .38.08.753.23 1.123C3.044 15.368 9.608 18 14.502 18a11.965 11.965 0 0 0 5.967-2.283zM8.234 5.283A11.964 11.964 0 0 0 1.5 5.283c0 .38.08.753.23 1.123 1.717.965 3.26 1.878 4.737 2.137a11.918 11.918 0 0 0 3.136-5.518 5.942 5.942 0 0 0-.394-2.067zM8.043 14.073A5.943 5.943 0 0 1 1.5 13.5c0-.38.08-.753.23-1.123 3.607-3.54 9.933-4.783 14.502-4.934.693-.26 1.226-.373 1.81-.373s1.123.113 1.81.373c4.568.151 9.894.894 14.502 4.934.15.37.23.743.23 1.123z" />
        </svg>
        Call
      </a>
    </div>
  );
}