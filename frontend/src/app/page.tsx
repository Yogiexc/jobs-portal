import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-7xl">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">DIGITEFA</span>
        </h1>
        <p className="text-xl text-gray-500 sm:text-2xl max-w-2xl mx-auto">
          The Talent Intelligence Platform connecting top skills with industry partners.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <Link href="/jobs" className="w-full sm:w-auto px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
            Find Jobs
          </Link>
          <Link href="/auth/login" className="w-full sm:w-auto px-8 py-4 border border-gray-200 text-lg font-bold rounded-xl text-blue-600 bg-white hover:bg-gray-50 shadow-sm transition-all">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
