import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationItem,
  PaginationContent,
} from "@/components/ui/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (newPage: number) => {
    window.scrollTo(0, 0);
    onPageChange(newPage);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>
        </PaginationItem>

        <PaginationItem>
          <Button
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
