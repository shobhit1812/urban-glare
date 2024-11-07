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
      <Button>
        <Link to="/">Home</Link>
      </Button>
    </div>
  );
};

export default Error;
