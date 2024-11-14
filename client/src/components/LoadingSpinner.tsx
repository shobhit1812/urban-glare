import { ThreeDots } from "react-loader-spinner";

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <ThreeDots height="80" width="80" color="#4fa94d" ariaLabel="loading" />
  </div>
);

export default LoadingSpinner;
