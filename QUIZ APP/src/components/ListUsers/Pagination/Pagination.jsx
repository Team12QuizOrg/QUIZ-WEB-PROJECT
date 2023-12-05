import { Button, Flex } from "@chakra-ui/react";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    return (
      <Flex justify={'center'} margin={'5px'} m={'10px'}>
        <Button margin={'10px'} maxW={'70px'} background={"brand.200"} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        {pages.map((page) => (
          <Button margin={'10px'} maxW={'70px'} background={"brand.200"} key={page} onClick={() => onPageChange(page)} disabled={currentPage === page}>
            {page}
          </Button>
        ))}
        <Button margin={'10px'} maxW={'70px'}  background={"brand.200"} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>
    );
  };
  
  export default Pagination;