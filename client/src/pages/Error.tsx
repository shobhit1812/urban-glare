import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const Error: React.FC = () => {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-600">Oops!</h1>
        <p className="text-lg mt-4">An unexpected error occurred.</p>
        <Link to="/" className="mt-4 text-blue-500 underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  const { status, statusText } = error;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-600">
        {status} - {statusText}
      </h1>
      <p className="text-lg mt-4 mb-4">
        Sorry, something went wrong. Please try again later.
      </p>
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default Error;
